# Implementation Plan - Admin Area & CMS Wiring

Building a complete administrative area with Supabase Auth to manage site content dynamically.

## User Review Required

> [!IMPORTANT]
> - The admin area will be accessible via `/admin`.
> - Authentication is managed via Lovable Cloud (Supabase).
> - We will use an "Admin" role check to restrict access.

## Proposed Changes

### 1. Database Schema & Security
- [x] Create tables for all site content: `clients`, `services`, `testimonials`, `served_states`, `social_links`, `site_settings`, `seo_settings`.
- [x] Enable RLS and setup `authenticated` policies for admins.
- [x] Implement `has_role` security definer function for safe role checks.

### 2. Admin Infrastructure
- [x] Create `/admin/login` for secure access.
- [x] Implement `src/routes/admin._admin.tsx` as the protected layout for the CMS.
- [x] Setup sidebar navigation for all CMS sections.

### 3. CMS Management Interfaces
- [x] **Clients**: CRUD for logos and names.
- [x] **Services**: Manage pilares, descriptions, and display order.
- [x] **Testimonials**: Edit, add, and remove client quotes.
- [x] **Presence**: Interactive map configuration.
- [x] **Communication**: Manage social links and lead recipient email.
- [x] **SEO**: Edit meta tags for every page.

### 4. Frontend Integration (Dynamic Content)
- [ ] Refactor `Header.tsx` and `Footer.tsx` to use dynamic social links and contact info.
- [ ] Wire `Hero.tsx` button to dynamic target if needed (already set to `#atuacao`).
- [ ] Connect `LogoCloud.tsx` and `Testimonials.tsx` to database hooks.
- [ ] Integrate `BrazilMap.tsx` with `served_states` table.
- [ ] Update `Methodology.tsx` to render services from CMS.

### 5. Final Polishing & Verification
- [x] Fix redirect loops in auth guard.
- [ ] Verify lead submission with dynamic recipient.
- [ ] Ensure SEO metatags update correctly on all routes.

## Technical Details
- **Framework**: React 19, TanStack Start, TanStack Query.
- **Backend**: Lovable Cloud (Supabase) for Auth and PostgreSQL.
- **Styling**: Tailwind CSS v4, Motion for animations.
- **Icons**: Lucide React.
