## Auth-first Next.js Template

Reusable Next.js App Router starter with authentication flows (register/login) already wired.

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Included

- Auth pages: `/register`, `/login`
- Auth API routes under `/api/auth`
- Shared UI foundation (sections, buttons, theming)
- Email demo route: `POST /api/send` (disabled when `RESEND_API_KEY` is missing)

## Environment variables

Create a `.env` file (example: `.env.example`).

- `DATABASE_URL`: Prisma uses SQLite in this template (see `prisma/schema.prisma`).
- `RESEND_API_KEY`: required for `POST /api/send`.
  - If it is missing or an empty string, the route will `console.warn(...)` and return `503` (email sending disabled).

## Scripts

- `pnpm dev`
- `pnpm build`
- `pnpm lint`
- `pnpm test`

## Resend (email demo)

This template includes a demo endpoint to show how to send emails with Resend.

- Route: `POST /api/send`
- Note: `app/api/send/route.ts` uses placeholder/fake values for:
  - `from` address
  - `to` recipient(s)
  - `subject`
  - a sample `EmailTemplate({ firstName: 'John' })`

### Resend configuration

1. Set your API key
   - Add `RESEND_API_KEY` to `.env` (see `.env.example`).
   - If `RESEND_API_KEY` is missing or `""`, the route will `console.warn(...)` and return `503` (email sending disabled).

2. Update placeholders in `app/api/send/route.ts` 
   - Replace the `from` sender with a sender configured/verified in your Resend dashboard.
   - Replace the `to` list with your real recipient(s).
   - Replace the `subject` with what you need.

3. Update the email body/template
   - The demo currently calls `EmailTemplate({ firstName: 'John' })`.
   - Adjust the template props to match your real use-case.

### Test

```bash
curl -X POST http://localhost:3000/api/send