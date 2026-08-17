import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const setupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const setupAdmin = createServerFn({ method: "POST" })
  .inputValidator((data) => setupSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // 1. Check if any admin already exists
    const { data: existingAdmins, error: countError } = await supabaseAdmin
      .from('user_roles')
      .select('id')
      .eq('role', 'admin')
      .limit(1);

    if (countError) {
      console.error("Error checking existing admins:", countError);
      throw new Error("Erro ao verificar administradores existentes.");
    }

    if (existingAdmins && existingAdmins.length > 0) {
      throw new Error("Já existe um administrador configurado. Por segurança, não é possível criar outro por esta via.");
    }

    // 2. Create the user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });

    if (authError) {
      console.error("Error creating user:", authError);
      throw new Error(authError.message || "Erro ao criar usuário.");
    }

    if (!authData.user) {
      throw new Error("Não foi possível criar o usuário.");
    }

    // 3. Assign admin role
    const { error: roleError } = await supabaseAdmin
      .from('user_roles')
      .insert({
        user_id: authData.user.id,
        role: 'admin'
      });

    if (roleError) {
      console.error("Error assigning admin role:", roleError);
      throw new Error("Usuário criado, mas houve um erro ao atribuir a permissão de administrador.");
    }

    return { success: true };
  });
