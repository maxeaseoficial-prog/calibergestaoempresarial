# Plan - Finalize Admin Area and Wire Content

Complete the integration of the administrative area (CMS) with the frontend components, ensuring all site content is dynamic and manageable via the dashboard.

## User Review Required

> [!IMPORTANT]
> The Resend API key is already configured. Please verify if the recipient email in the Admin panel (/admin/formulario) is correct.

- **Differentiators Layout**: The "Differentiators" section is currently using static data as a fallback. Should we create a specific table for Differentiators or continue using the `services` table with a flag?

## Proposed Changes

### CMS Integration
- Wire `LogoCloud.tsx` to use `useClients` hook.
- Wire `Testimonials.tsx` to use `useTestimonials` hook.
- Finalize `Methodology.tsx` (3D Carousel) wiring to `useServices` hook.
- Update `Differentiators.tsx` to use dynamic content from the database.

### Admin Enhancements
- Add "Differentiators" management to the Admin sidebar.
- Ensure all CRUD operations (Clients, Services, Testimonials, Map) are fully functional.

### Technical Details
- Use TanStack Query hooks from `src/hooks/use-site-content.ts` for all frontend data fetching.
- Maintain existing visual styles (3D carousel, organic frames, bento grid) while mapping dynamic data.
- Implement proper loading states and error boundaries for dynamic sections.
- Ensure SEO meta tags are correctly fetched and applied to each route using the `seo_settings` table.

## Deployment Profile
- Lovable Cloud (Supabase) for database and auth.
- TanStack Start server functions for lead submission (Resend).
- Edge runtime compatibility.
