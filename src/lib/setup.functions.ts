import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const setupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

const confirmSchema = z.object({
  email: z.string().email(),
});

export const setupAdmin = createServerFn({ method: "POST" })
  .inputValidator((data) => setupSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // 1. Create or update the user
    const { data: userData, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    if (listError) {
      console.error("Auth Error:", listError);
      throw new Error("Erro ao acessar serviço de autenticação.");
    }

    const existingUser = userData.users.find(u => u.email?.toLowerCase() === data.email.toLowerCase());

    let userId;

    if (existingUser) {
      userId = existingUser.id;
      // Update password and confirm email
      const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
        userId,
        { 
          password: data.password,
          email_confirm: true 
        }
      );
      if (updateError) {
        console.error("Update Error:", updateError);
        throw updateError;
      }
    } else {
      // Create new
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: data.email,
        password: data.password,
        email_confirm: true,
      });
      if (authError) {
        console.error("Create Error:", authError);
        throw authError;
      }
      if (!authData.user) throw new Error("Falha ao criar usuário.");
      userId = authData.user.id;
    }

    // 2. Ensure admin role exists in user_roles table
    const { data: existingRoles, error: roleCheckError } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin');

    if (roleCheckError) console.error("Role Check Error:", roleCheckError);

    if (!existingRoles || existingRoles.length === 0) {
      const { error: roleError } = await supabaseAdmin
        .from('user_roles')
        .insert({
          user_id: userId,
          role: 'admin'
        });
      if (roleError) {
        console.error("Error assigning role:", roleError);
      }
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

    const user = userData.users.find(u => u.email === data.email || u.email === 'admin@caliber.com.br');

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
