import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Simple in-memory rate limiting for the dev/demo environment
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;

const LeadSchema = z.object({
  name: z.string().min(2, "Informe seu nome."),
  email: z.string().email("Informe um e-mail válido."),
  whatsapp: z.string().min(10, "Informe seu WhatsApp."),
  role: z.string().min(1, "Selecione um cargo."),
  company: z.string().min(2, "Informe o nome da empresa."),
  revenue: z.string().min(1, "Selecione uma faixa de faturamento."),
  employees: z.string().optional(),
  solution: z.string().min(1, "Selecione uma solução."),
  challenge: z.string().max(500, "Desafio muito longo.").optional(),
  honeypot: z.string().optional(), // Used for bot protection
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => LeadSchema.parse(data))
  .handler(async ({ data }) => {
    // 1. Honeypot check
    if (data.honeypot) {
      console.warn("Honeypot triggered");
      return { success: false, error: "INVALID_FORM" };
    }

    // 2. Rate limiting
    const now = Date.now();
    const mockIp = "anonymous";
    const limit = rateLimitMap.get(mockIp);

    if (limit) {
      if (now - limit.lastReset > RATE_LIMIT_WINDOW) {
        rateLimitMap.set(mockIp, { count: 1, lastReset: now });
      } else if (limit.count >= MAX_REQUESTS) {
        return { success: false, error: "RATE_LIMITED" };
      } else {
        limit.count++;
      }
    } else {
      rateLimitMap.set(mockIp, { count: 1, lastReset: now });
    }

    // 3. Resend Integration
    try {
      const apiKey = process.env['RESEND_API_KEY'];
      const fromEmail = process.env['RESEND_FROM_EMAIL'] || "onboarding@resend.dev";
      
      if (!apiKey) {
        console.error("RESEND_API_KEY not configured");
        return { success: false, error: "SEND_FAILED" };
      }

      const { Resend } = await import("resend");
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      
      const resend = new Resend(apiKey);

      // Fetch recipient from database
      const { data: settings } = await supabaseAdmin
        .from('site_settings')
        .select('value')
        .eq('key', 'lead_recipient_email')
        .single();
        
      const recipient = settings?.value || "leonardo.froese@gmail.com";
      const subject = `Novo lead pelo site Cáliber — ${data.company}`;

      const { data: resendData, error } = await resend.emails.send({
        from: `Cáliber Site <${fromEmail}>`,
        to: [recipient],
        replyTo: data.email,
        subject: subject,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #5F5587; color: white; padding: 24px; text-align: center;">
              <h1 style="margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 2px;">NOVO LEAD</h1>
              <p style="margin: 8px 0 0; opacity: 0.8;">Cáliber — Eficiência em Gestão</p>
            </div>
            <div style="padding: 32px; color: #333;">
              <p>Uma nova solicitação foi enviada pelo formulário "Evolua Conosco".</p>
              
              <h2 style="font-size: 14px; text-transform: uppercase; color: #5F5587; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-top: 32px;">CONTATO</h2>
              <p><strong>Nome:</strong> ${data.name}</p>
              <p><strong>E-mail:</strong> ${data.email}</p>
              <p><strong>WhatsApp:</strong> ${data.whatsapp}</p>
              <p><strong>Cargo / Atuação:</strong> ${data.role}</p>
              
              <h2 style="font-size: 14px; text-transform: uppercase; color: #5F5587; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-top: 32px;">EMPRESA</h2>
              <p><strong>Empresa:</strong> ${data.company}</p>
              <p><strong>Faturamento médio mensal:</strong> ${data.revenue}</p>
              <p><strong>Número de colaboradores:</strong> ${data.employees || "Não informado"}</p>
              
              <h2 style="font-size: 14px; text-transform: uppercase; color: #5F5587; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-top: 32px;">INTERESSE</h2>
              <p><strong>Solução:</strong> ${data.solution}</p>
              <p><strong>Principal desafio:</strong> ${data.challenge || "Não informado"}</p>
              
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
                <p>Origem: Site Cáliber — Evolua Conosco</p>
                <p>Data: ${new Date().toLocaleString("pt-BR")}</p>
              </div>
            </div>
          </div>
        `,
      });

      if (error) {
        console.error("Resend error:", error);
        return { success: false, error: "SEND_FAILED" };
      }

      console.log("Email sent successfully:", resendData?.id);
      return { success: true };
    } catch (err) {
      console.error("Unexpected error submitting lead:", err);
      return { success: false, error: "SEND_FAILED" };
    }
  });
