# AwraLink Technologies — Corporate Website

A modern, responsive corporate website for **AwraLink Technologies**, a technology and infrastructure solutions company based in Addis Ababa, Ethiopia.

## Tech Stack

- **React 18** (functional components, hooks)
- **Vite** (dev server and build)
- **React Router v6** (client-side routing)
- **Lucide React** (icons)
- **Standard CSS** (CSS custom properties, Flexbox, Grid, media queries — no Tailwind)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Then open http://localhost:5173

### Build for production

```bash
npm run build
```

### Preview the production build locally

```bash
npm run preview
```

## Project Structure

```
awralink-website/
├── index.html                  # HTML shell, meta/OG tags, fonts
├── public/favicon.svg          # Site favicon
├── server/                     # Node.js contact API for cPanel
└── src/
    ├── config/company.js       # Centralized company info (edit here first)
    ├── data/                   # Page content: services, industries, values, etc.
    ├── assets/                 # SVG illustrations (HeroVisual, AboutVisual)
    ├── components/             # Reusable components
    ├── pages/                  # Home, About, Services, Industries, Contact, NotFound
    ├── services/inquiry.js     # Contact form submission handler
    ├── styles/                 # global + per-page stylesheets
    ├── App.jsx                 # Router setup
    └── main.jsx                # Entry point
```

## Customization Guide

### Company contact details, address, hours, map, social links

Edit **`src/config/company.js`**. Everything editable lives there:

- `contact.phone` / `contact.phoneHref` — display text and optional `tel:` link
- `contact.email` / `contact.emailHref` — display text and optional `mailto:` link
- `hours` — business hours placeholder
- `location.addressLines` / `fullAddress`
- `map.embedUrl` — Google Maps iframe embed URL
- `map.linkUrl` — "Open in Google Maps" link
- `social[].url` — social profile URLs (empty = placeholder, non-clicking)

**To update the map to the exact office location:**

1. Go to Google Maps, search the exact address, and copy the share link.
2. For `map.embedUrl`, use the embed format:
   `https://www.google.com/maps?q=<URL-encoded address>&output=embed`
3. For `map.linkUrl`, use:
   `https://www.google.com/maps/search/?api=1&query=<URL-encoded address>`

### Logo

The site uses the full company logo supplied at **`public/awralink-logo.png`**,
rendered proportionally in the header and footer by `src/components/Logo.jsx`.

To use a different logo file instead:

1. Place the logo image (e.g. `image.jpg`, `logo.png`, or `logo.svg`) in `public/`.
2. In `src/components/Logo.jsx`, update the `<img>` `src` attribute (and optionally `alt`/`width`/`height`).
3. Adjust `.logo__name` / `.logo__sub` in `src/styles/global.css` if you want to hide the text lockup.

### SEO files

The following static files live in `public/` and are copied to `dist/` on build:

- **`robots.txt`** — allows all crawlers, points to the sitemap.
- **`sitemap.xml`** — lists the five public routes with change frequency and priority.
- **`og-image.svg`** — 1200×630 share image referenced by Open Graph and Twitter Card meta tags in `index.html`.

All social/OG URLs in `index.html` use the placeholder host `https://awralink.example/`.
Replace `awralink.example` with the real domain before publishing.

### Images and illustrations

The hero and about visuals are hand-built SVG illustrations
(`src/assets/HeroVisual.jsx`, `src/assets/AboutVisual.jsx`) — they never break and match the brand palette.
To replace them with photos, swap the component usage in `src/components/Hero.jsx` and
`src/pages/About.jsx` with an `<img>` tag pointing to files in `public/`, and add
`loading="lazy"` and descriptive `alt` text.

### Text content

- Page copy, service capabilities, industries, values, and process steps live in **`src/data/`**.
- Mission and vision copy (proposed brand copy) is in **`src/pages/About.jsx`** under the Mission & Vision section.

## Contact Form — Email Handling

The contact form posts to `/api/contact`. The Node.js application in `server/` validates
the inquiry and sends it to the address in `MAIL_TO` using Nodemailer.

### cPanel Node.js application

Configure the cPanel application with:

- Node.js 20 or newer
- Application root: `awralink-api`
- Application URL: `/api`
- Startup file: `app.js`

Upload the **contents** of `server/` (`app.js`, `contact-app.js`, `package.json`, and
`package-lock.json`) into the `awralink-api` application root. In cPanel, click **Run NPM
Install**, then restart the Node.js application. The GitHub workflow publishes the React
frontend; the API files are deployed separately to the cPanel application root.
Keep the cPanel-generated `public_html/api/.htaccess` file: it routes `/api` requests to
the Node.js application. The FTP deployment excludes this file so it is not removed during
frontend deployments. If it is missing, restart/reconfigure the cPanel application or ask
the hosting provider to recreate its LiteSpeed/Passenger routing file.

Set these variables in the cPanel Node.js application's **Environment variables** section:

- `MAIL_TO=sales@awralink.com`
- `SMTP_HOST=mail.awralink.com`
- `SMTP_PORT=465`
- `SMTP_USER=sales@awralink.com` (or `SMTP_USERNAME`)
- `SMTP_PASS=...` (or `SMTP_PASSWORD`)
- `SMTP_SECURE=true` for SSL on port 465; use `false` for TLS on port 587
- `FROM_EMAIL=sales@awralink.com` (optional; defaults to the SMTP username)

The app also accepts `SMTP_ENCRYPTION=ssl` or `tls` instead of `SMTP_SECURE`. Use the
mailbox's current password in cPanel, not in GitHub or `.env.example`. The contact endpoint
validates fields, includes a honeypot and per-IP rate limit, and reports success only after
the SMTP server accepts the message.

For local development, start the API with `npm --prefix server start` and the frontend
with `npm run dev`. Vite proxies `/api` requests to the local Node API.

Also replace the placeholder phone/email in `src/config/company.js` with the official
company details before publishing.

## Notes

- No customer names, certifications, awards, years of experience, or project statistics are claimed anywhere on the site.
- All CTA buttons, navigation links, footer links, and service-card links are wired to real routes or page sections.
- The site is fully responsive (desktop, tablet, mobile) with a mobile hamburger menu, sticky navbar, back-to-top button, and subtle scroll-reveal animations (disabled for `prefers-reduced-motion`).
