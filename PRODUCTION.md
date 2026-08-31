# Production Operations Guide

## Required configuration

Configure all values separately for Preview and Production in Vercel. Never expose
`SUPABASE_SERVICE_ROLE_KEY` or `VAPID_PRIVATE_KEY` through `NEXT_PUBLIC_*` variables.

| Variable | Required | Purpose |
|---|---:|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Browser-safe RLS-protected key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server-only user and push administration |
| `NEXT_PUBLIC_VAPID_PUBLIC_KEY` | For push | Browser push subscription key |
| `VAPID_PRIVATE_KEY` | For push | Server-only push signing key |

## Release procedure

1. Create a Supabase point-in-time recovery marker or database backup.
2. Apply migrations in numeric order, including `010_weekly_ad_publishing.sql`, to a staging project.
3. Run `pnpm install --frozen-lockfile && pnpm check` with staging environment variables.
4. Test admin login, CRUD, private suggestion attachments, form submissions, weekly-ad publishing,
   subscriber export, and push subscribe/send/unsubscribe in staging.
5. Deploy a Vercel preview and verify `/api/health`, headers, redirects, metadata, and mobile layouts.
6. Apply the migration to production, deploy the reviewed commit, then run the smoke checklist below.

## Smoke checklist

- Home, weekly ad, locations, departments, events, jobs, contact, leasing, and suggestions return 200.
- `/admin` redirects signed-out users to `/admin/login`; a non-admin Supabase user receives no access.
- An authorized admin can create content and another admin, then sign out.
- Duplicate Deals Club signup succeeds without changing the existing record.
- A suggestion accepts JPG/PNG/WebP up to 5 MB and rejects other or larger files.
- The admin can open a private suggestion attachment through its short-lived signed URL.
- Quick Publish accepts a PNG, defaults to Wednesday–Tuesday, atomically replaces the old ad, and
  displays the new artwork on both the homepage and `/weekly-ad`.
- Push subscribe, send, and unsubscribe work with valid VAPID keys.
- `/api/health` returns `status: ok`; logs contain no repeated 4xx/5xx errors.

## Monitoring and alerting

- Configure Vercel alerts for elevated function errors, latency, and deployment failures.
- Add an external uptime check for `/api/health` and the homepage at one-minute intervals.
- Forward structured server errors to an error tracker (for example, Sentry) before launch; do not
  include form contents, subscriber data, tokens, or URLs containing secrets.
- Alert on Supabase database/storage utilization, failed auth attempts, and unusual service-role use.
- Review dependency alerts weekly and run `pnpm audit --prod` in CI.

## Backup and recovery

- Enable Supabase daily backups and point-in-time recovery appropriate to the business RPO/RTO.
- Test restoration into a separate project at least quarterly; a configured backup is not evidence
  that recovery works.
- Storage objects require their own retention/export plan. Preserve weekly ads and private suggestion
  attachments according to an approved retention policy.
- Export Vercel environment-variable names and domain configuration; never place secret values in Git.

## Rollback

1. Use Vercel's previous production deployment for an immediate application rollback.
2. Do not roll back `009_security_hardening.sql`; it removes unsafe access and only adds nullable fields.
3. Do not drop the `weekly_ads_one_active_idx` during an application rollback; it prevents conflicting
   live ads. Older code remains compatible with the columns used by migration 010.
4. If a later migration is incompatible, deploy code that supports both schemas, restore from the
   pre-release backup only when data integrity requires it, and document any lost writes.
5. Rotate the Supabase service-role key and VAPID private key if either may have been exposed.

## Manual production prerequisites

- Confirm domain ownership and point `juniorssupermarket.com`/`www` to the intended Vercel project.
- Replace placeholder/legal language with counsel-approved privacy, retention, SMS/email consent,
  accessibility-contact, and terms text.
- Configure distributed edge rate limiting or a managed WAF. The in-app limiter is intentionally only
  a best-effort per-instance guard for accidental abuse.
- Establish named owners, incident severity rules, an on-call contact, RPO/RTO, and a customer-support
  path for privacy deletion requests.
