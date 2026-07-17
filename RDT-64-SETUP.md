# RDT-64 Contact Form Setup Guide

## Status: Frontend Complete, Ready for CF Dashboard Configuration

### What's Done ✅
- Backend API endpoint (`functions/api/contact.ts`) - MailChannels + Turnstile validation
- Frontend contact form component (`ContactForm.svelte`) with email validation, honeypot, Turnstile widget
- Form integrated into homepage (`+page.svelte`)
- Svelte build passes (no errors)

### What's Needed (Rick)

#### 1. Cloudflare Turnstile Setup
- Go to https://dash.cloudflare.com/
- Select your domain (rdtect.com)
- Challenge Platform → Turnstile
- Create a new site (if not already done)
- Get the **Site Key** and **Secret Key**

#### 2. CF Pages Dashboard Secrets (Environment Variables)

In Cloudflare Pages → Settings → Environment variables, add:

**Development:**
```
VITE_TURNSTILE_SITE_KEY=<your-turnstile-site-key>
TURNSTILE_SECRET_KEY=<your-turnstile-secret-key>
CF_ACCOUNT_EMAIL=<your-cf-account-email>
CF_API_TOKEN=<your-cf-api-token>
```

**Production:**
Same as development (Cloudflare Pages auto-injects at build time)

#### 3. Cloudflare Email Routing Setup

- Go to https://dash.cloudflare.com/
- Email → Email Routing
- Create a rule:
  - **From:** `contact@rdtect.com`
  - **To:** `ar.rickde@zoho.com`
  - Toggle ON

This catches all emails sent to contact@rdtect.com by the backend and forwards them to your Zoho inbox.

#### 4. DNS Record (if needed)
Email Routing requires an MX record pointing to Cloudflare. This is usually auto-configured, but verify:
- DNS setting includes MX record: `route.mg.cloudflare.net`

#### 5. Test
1. Deploy to CF Pages
2. Visit rdtect.com/contact (form is on homepage)
3. Fill out form + pass Turnstile
4. Check ar.rickde@zoho.com for the email

### Remaining Tasks

- [ ] Set up Turnstile Site/Secret keys in CF dashboard
- [ ] Set environment variables in CF Pages
- [ ] Configure Email Routing rule (contact@rdtect.com → ar.rickde@zoho.com)
- [ ] Deploy to production
- [ ] Send test message and confirm receipt in Zoho
- [ ] Mark RDT-64 done with screenshot/evidence

### Files Changed
- Created: `src/lib/components/ContactForm.svelte`
- Updated: `src/routes/+page.svelte` (added form import + section)
- Created: `.env.example` (reference for env vars)
- Backend: Already complete in commit 1541afe
