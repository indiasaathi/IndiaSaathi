# Deploy — indiasaathi.com

## 1. Import into Vercel

1. Vercel dashboard → **Add New → Project** → import `indiasaathi/IndiaSaathi` from GitHub.
2. Framework preset auto-detects as **Astro**. `vercel.json` in this repo already pins
   `buildCommand`, `outputDirectory: dist`, and `installCommand: npm ci` — no manual config needed.
3. Deploy. Confirm the generated `*.vercel.app` preview URL renders correctly before touching DNS.

## 2. Add the domain

Vercel project → **Settings → Domains** → add both:

- `indiasaathi.com` (set as primary)
- `www.indiasaathi.com` (redirect to primary)

Vercel will show the exact DNS records it needs (an `A` record for the apex, a `CNAME` for `www`).
Copy those values from the dashboard at the time — Vercel's IPs have changed over the years, don't
reuse an old value from memory or docs.

## 3. GoDaddy DNS — ⚠️ read this before touching anything

**Do not switch nameservers to Vercel.** The mailbox `sureshshah@indiasaathi.com` is hosted via
GoDaddy's DNS (MX / SPF / DKIM / DMARC records live there). Moving nameservers to Vercel drops
those records and **breaks email delivery**.

Instead, **keep GoDaddy as the DNS host** and only add/edit these records in GoDaddy's DNS
management for indiasaathi.com:

| Type  | Name | Value                                | Notes                            |
| ----- | ---- | ------------------------------------ | -------------------------------- |
| A     | @    | _(IP shown in Vercel → Domains)_     | Points the apex domain at Vercel |
| CNAME | www  | _(target shown in Vercel → Domains)_ | Points www at Vercel             |

- Remove GoDaddy's default parking-page `A`/`CNAME`/forwarding records if they conflict.
- **Leave every `MX` record and every mail-related `TXT` record (SPF/DKIM/DMARC) exactly as is.**

DNS propagation can take up to 24–48 hours, though it's usually much faster. Vercel's Domains tab
shows a live status (pending → valid).

## 4. Verify nothing broke

- [ ] `https://indiasaathi.com` loads the site (not the GoDaddy parking page)
- [ ] `https://www.indiasaathi.com` redirects to the apex
- [ ] Send a test email to `sureshshah@indiasaathi.com` and confirm it arrives
- [ ] Check SPF/DKIM/DMARC still pass (mail-tester.com or similar) if you want extra assurance

## 5. Search visibility (optional but recommended)

- [Google Search Console](https://search.google.com/search-console) → add property `indiasaathi.com`
  → verify (Vercel domain verification or a DNS TXT record) → submit
  `https://indiasaathi.com/sitemap-index.xml`

## 6. Ongoing

- Every push to `main` auto-deploys via the Vercel GitHub integration.
- Content edits: see [README.md](./README.md#adding--reordering-sections).
