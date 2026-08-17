import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Loader2, X, AlertCircle } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitLead } from "@/lib/leads.functions";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  name: z.string().min(2, "Informe seu nome."),
  email: z.string().email("Informe um e-mail válido."),
  whatsapp: z.string().transform(v => v.replace(/\D/g, "")).refine(v => v.length >= 10 && v.length <= 11, "Informe seu WhatsApp (mínimo 10 dígitos)."),
  role: z.string().min(1, "Selecione seu cargo."),
  company: z.string().min(2, "Informe o nome da empresa."),
  revenue: z.string().min(1, "Selecione a faixa de faturamento."),
  employees: z.string().optional(),
  solution: z.string().min(1, "Selecione uma solução."),
  challenge: z.string().max(500, "Limite de 500 caracteres.").optional(),
  honeypot: z.string().optional(),
});

type FormValues = z.infer<typeof FormSchema>;

const ROLES = [
  "Sócio(a) / Proprietário(a)",
  "CEO / Diretor(a)",
  "Gerente",
  "Coordenador(a)",
  "Administrativo / Financeiro",
  "Comercial / Vendas",
  "Outro",
];

const REVENUES = [
  "Até R$ 100 mil/mês",
  "R$ 100 mil a R$ 300 mil/mês",
  "R$ 300 mil a R$ 500 mil/mês",
  "R$ 500 mil a R$ 1 milhão/mês",
  "R$ 1 milhão a R$ 3 milhões/mês",
  "R$ 3 milhões a R$ 10 milhões/mês",
  "Acima de R$ 10 milhões/mês",
  "Prefiro conversar sobre isso",
];

const EMPLOYEES = ["Até 10", "11 a 30", "31 a 50", "51 a 100", "101 a 300", "Mais de 300"];

const SOLUTIONS = [
  { id: "comercial", label: "Controladoria Estratégica Comercial" },
  { id: "financeira", label: "Controladoria Estratégica Financeira" },
  { id: "conselho", label: "Conselho de Gestão Estratégica" },
  { id: "cor", label: "Cáliber COR — Ferramentas Especiais" },
  { id: "outros", label: "Ainda não sei / Quero entender" },
];

export function EvoluaConoscoForm({ onSuccess }: { onSuccess: () => void }) {
  const submitLeadFn = useServerFn(submitLead);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      solution: "",
    },
  });

  const selectedSolution = watch("solution");
  const whatsappValue = watch("whatsapp");

  // Apply Brazilian Phone Mask
  useEffect(() => {
    if (!whatsappValue) return;
    const digits = whatsappValue.replace(/\D/g, "");
    let masked = "";
    if (digits.length > 0) masked = "(" + digits.substring(0, 2);
    if (digits.length > 2) masked += ") " + digits.substring(2, 7);
    if (digits.length > 7) masked += "-" + digits.substring(7, 11);
    
    if (masked !== whatsappValue) {
      setValue("whatsapp", masked, { shouldValidate: true });
    }
  }, [whatsappValue, setValue]);

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    try {
      const result = await submitLeadFn({ data });
      if (result.success) {
        onSuccess();
      } else {
        if (result.error === "RATE_LIMITED") {
          setServerError("Muitas tentativas. Tente novamente mais tarde.");
        } else {
          setServerError("Não conseguimos enviar suas informações agora. Tente novamente em alguns instantes.");
        }
      }
    } catch (err) {
      setServerError("Erro inesperado. Tente novamente.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot (bot protection) */}
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-ink">Nome Completo *</label>
          <input
            {...register("name")}
            placeholder="Seu nome completo"
            className={cn(
              "flex h-11 w-full rounded-xl border bg-white px-4 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple/20",
              errors.name ? "border-red-500" : "border-ink/10"
            )}
          />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-ink">E-mail Corporativo *</label>
          <input
            {...register("email")}
            type="email"
            placeholder="seuemail@empresa.com.br"
            className={cn(
              "flex h-11 w-full rounded-xl border bg-white px-4 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple/20",
              errors.email ? "border-red-500" : "border-ink/10"
            )}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-ink">WhatsApp *</label>
          <input
            {...register("whatsapp")}
            type="tel"
            placeholder="(00) 00000-0000"
            className={cn(
              "flex h-11 w-full rounded-xl border bg-white px-4 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple/20",
              errors.whatsapp ? "border-red-500" : "border-ink/10"
            )}
          />
          {errors.whatsapp && <p className="text-xs text-red-500">{errors.whatsapp.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-ink">Cargo ou Atuação *</label>
          <select
            {...register("role")}
            className={cn(
              "flex h-11 w-full rounded-xl border bg-white px-4 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple/20",
              errors.role ? "border-red-500" : "border-ink/10"
            )}
          >
            <option value="">Selecione...</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {errors.role && <p className="text-xs text-red-500">{errors.role.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-ink">Nome da Empresa *</label>
          <input
            {...register("company")}
            placeholder="Nome da sua empresa"
            className={cn(
              "flex h-11 w-full rounded-xl border bg-white px-4 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple/20",
              errors.company ? "border-red-500" : "border-ink/10"
            )}
          />
          {errors.company && <p className="text-xs text-red-500">{errors.company.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-ink">Faturamento Médio Mensal *</label>
          <select
            {...register("revenue")}
            className={cn(
              "flex h-11 w-full rounded-xl border bg-white px-4 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple/20",
              errors.revenue ? "border-red-500" : "border-ink/10"
            )}
          >
            <option value="">Selecione...</option>
            {REVENUES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {errors.revenue && <p className="text-xs text-red-500">{errors.revenue.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-ink">Número de Colaboradores</label>
        <select
          {...register("employees")}
          className="flex h-11 w-full rounded-xl border border-ink/10 bg-white px-4 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple/20"
        >
          <option value="">Selecione...</option>
          {EMPLOYEES.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold text-ink">Qual solução mais interessa? *</label>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setValue("solution", s.label, { shouldValidate: true })}
              className={cn(
                "flex items-start rounded-xl border p-3 text-left transition-all duration-200",
                selectedSolution === s.label
                  ? "border-purple bg-purple/5 ring-1 ring-purple"
                  : "border-ink/10 bg-white hover:border-purple/30"
              )}
            >
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ink/20 mr-3 mt-0.5">
                {selectedSolution === s.label && <div className="h-2.5 w-2.5 rounded-full bg-purple" />}
              </div>
              <span className={cn("text-xs font-medium leading-snug", selectedSolution === s.label ? "text-purple" : "text-ink/80")}>
                {s.label}
              </span>
            </button>
          ))}
        </div>
        {errors.solution && <p className="text-xs text-red-500">{errors.solution.message}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-ink">Principal Desafio Atual</label>
        <textarea
          {...register("challenge")}
          placeholder="Conte brevemente qual é o principal desafio que vocês querem resolver."
          rows={3}
          className="flex w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple/20"
        />
      </div>

      {serverError && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          <AlertCircle className="size-4 shrink-0" />
          {serverError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "w-full rounded-xl bg-purple py-4 text-sm font-bold tracking-wider text-white uppercase transition-all duration-300 hover:bg-purple-deep hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-70",
          isSubmitting && "flex items-center justify-center gap-2"
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Enviando...
          </>
        ) : (
          "QUERO EVOLUIR MINHA EMPRESA"
        )}
      </button>
    </form>
  );
}
