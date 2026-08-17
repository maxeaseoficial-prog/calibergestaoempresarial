# Security Fixes Plan

Fix identified security issues from the scan to improve application posture.

## Proposed Changes

### Database Security
- Revoke public execution permissions on `has_role` function to prevent role enumeration or metadata leaks.
- Ensure the function is only executable by `authenticated` and `service_role`.

### Server-Side Data Protection
- Remove hardcoded lead routing email from `src/lib/leads.functions.ts` fallback.
- Move "authorized emails" for admin setup into server-only environment variables or check against existing admin count more strictly.
- Ensure sensitive contact info is fetched from the database rather than hardcoded in source modules.

## Technical Details
- **Migration**: Create a new SQL migration to `REVOKE ALL ON FUNCTION public.has_role FROM PUBLIC, anon;` and `GRANT EXECUTE TO authenticated, service_role;`.
- **Server Function**: Update `submitLead` in `src/lib/leads.functions.ts` to strictly use database settings and handle missing configuration safely without leaking developer emails.
- **Admin Setup**: Refactor `src/lib/setup.functions.ts` to remove hardcoded email checks.
