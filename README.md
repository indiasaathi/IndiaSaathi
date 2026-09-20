# India Saathi

Marketing site for **India Saathi** — a Mumbai-based NRI India Desk offering end-to-end property,
asset closure, taxation/repatriation, legal, and society-representation services for NRIs.

Live at [indiasaathi.com](https://indiasaathi.com).

## Stack

- [Astro](https://astro.build) — static site, zero client JS except the contact dialog
- Plain CSS with custom properties (`src/styles/`) — no framework
- Deployed on [Vercel](https://vercel.com)

## Structure

- `src/data/` — all site copy (services, contact info, markets). Edit here first for content changes.
- `src/components/` — one component per brochure section (`Header`, `PropertySale`, `ServiceCard`,
  `AssetCard`, `Taxation`, `WhyUs`, `Footer`, `ContactModal`, …)
- `src/styles/brochure.css` — the full visual design, ported from `reference/brochure.html`
  (the original static template) with responsive breakpoints added.
- `reference/brochure.html` — the original single-file template this site is built from. Kept for
  reference; not served.

## Development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## Adding / reordering sections

Sections are composed in `src/pages/index.astro`. To add a new section: create a component in
`src/components/`, add its data to `src/data/services.ts` (or a new data file), then drop the
component into `index.astro` in the position you want. Styling tokens (`--navy`, `--gold`, etc.)
live in `src/styles/base.css`.

See [DEPLOY.md](./DEPLOY.md) for deployment and DNS steps.
