import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const setupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const confirmSchema = z.object({
  email: z.string().email(),
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

export const confirmUserManually = createServerFn({ method: "POST" })
  .inputValidator((data) => confirmSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Get user by email to get their ID
    const { data: userData, error: fetchError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (fetchError) {
      console.error("Error listing users:", fetchError);
      throw new Error("Erro ao buscar usuários.");
    }

    const user = userData.users.find(u => u.email === data.email);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    // Update user to confirm email
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      user.id,
      { email_confirm: true }
    );

    if (updateError) {
      console.error("Error confirming user:", updateError);
      throw new Error("Erro ao confirmar usuário.");
    }

    // Also ensure they have the admin role if they were meant to be the first admin
    // Check if they already have a role
    const { data: roles } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id);

    if (!roles || roles.length === 0) {
      await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: user.id,
          role: 'admin'
        });
    }

    return { success: true };
  });
