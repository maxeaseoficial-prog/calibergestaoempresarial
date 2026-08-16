# Implementation Plan - "Evolua Conosco" Flow

Implement the complete lead generation flow for the "Evolua Conosco" button, including a premium modal, validated form, and real server-side email delivery via Resend.

## User Review Required

> [!IMPORTANT]
> The `RESEND_API_KEY` and `RESEND_FROM_EMAIL` (if a custom domain is verified) must be configured in the project's environment variables (server-side secrets) for real delivery to work.

- **Recipient:** leonardo.froese@gmail.com (Fixed server-side).
- **Reply-To:** Visitor's email.
- **Security:** Honeypot, Rate Limiting (server-side), and Form Validation.

## Proposed Changes

### Backend (Server Logic)
- **Email Service:** Create `src/lib/email.server.ts` to handle Resend configuration and email templates.
- **Server Function:** Create `src/lib/leads.functions.ts` using `createServerFn` to process lead submissions.
  - Implement validation (Zod).
  - Implement basic Rate Limiting (using a simple in-memory store or project-specific cache if available).
  - Implement Honeypot check.
  - Send email via Resend.

### Frontend (Components)
- **Modal Component:** Create `src/components/site/EvoluaConoscoModal.tsx`.
  - Premium design with backdrop blur and smooth animations.
  - Focus trap and accessibility features (ESC, click outside).
- **Form Component:** Create `src/components/site/EvoluaConoscoForm.tsx`.
  - Multi-column layout for desktop.
  - Comprehensive validation (React Hook Form + Zod).
  - Brazilian phone mask.
  - Loading, Success, and Error states.

### Integration
- **Hero Section:** Update `src/components/site/Hero.tsx` to trigger the modal when "Evolua Conosco" is clicked.
- **Site Layout:** Mount the modal at the root or main level to ensure availability.

## Technical Details

### Security
- `RESEND_API_KEY` will NEVER be exposed to the client. It will be read inside the `.handler()` of `createServerFn`.
- Input sanitization and strict type checking with Zod.

### Form Fields
1. Name (Text)
2. Email (Email)
3. WhatsApp (Tel + Mask)
4. Role (Select)
5. Company (Text)
6. Monthly Revenue (Select)
7. Employees (Select)
8. Solution (Visual Selection)
9. Challenge (Textarea)

### Email Template
- Professional HTML layout with institutional branding (Purple #5F5587).
- Clean data presentation for quick scanning.

## Verification Plan

### Automated Tests
- Run `bunx vitest` (if configured) or manual verification of validation logic.
- Verify `createServerFn` returns correct error codes (INVALID_FORM, RATE_LIMITED, etc.).

### Manual Verification
1. Click "Evolua Conosco" -> Modal opens.
2. Submit empty form -> Validation errors show.
3. Fill honeypot (hidden) -> Submission rejected.
4. Fill valid data -> "Enviando..." state shown.
5. Successful response -> Success screen with "FECHAR" button shown.
6. Verify console/network -> No sensitive keys leaked.
