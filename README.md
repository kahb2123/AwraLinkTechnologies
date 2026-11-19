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

The contact form posts to `/api/contact.php`, which validates the inquiry and sends it
to `sales@awralink.com` over SMTP using PHPMailer. The deployment workflow installs the
PHP dependencies and uploads the endpoint with the static site.

On cPanel hosting, place a `.env` file **outside the public website directory**, in the
same parent directory as `public_html`. For example, if the endpoint is
`/home/ACCOUNT/public_html/api/contact.php`, put the file at `/home/ACCOUNT/.env`.
The endpoint loads this private file with phpdotenv. You can use
[`.env.example`](./.env.example) as a template:

- `CONTACT_SMTP_HOST`
- `CONTACT_SMTP_PORT` (usually `587` for TLS or `465` for SSL)
- `CONTACT_SMTP_USERNAME`
- `CONTACT_SMTP_PASSWORD`
- `CONTACT_SMTP_ENCRYPTION` (`tls` or `ssl`)
- `CONTACT_FROM_EMAIL` (an address permitted by the SMTP account)

Set the file permissions to `600` if cPanel allows it. Never commit the real `.env` file
or place it inside `public_html`; `.env` is ignored by Git. Hosting-provided environment
variables can also be used. The endpoint applies server-side field validation, a hidden
spam-trap field, and a per-IP submission limit. It only reports success after SMTP accepts
the message.

Also replace the placeholder phone/email in `src/config/company.js` with the official
company details before publishing.

## Notes

- No customer names, certifications, awards, years of experience, or project statistics are claimed anywhere on the site.
- All CTA buttons, navigation links, footer links, and service-card links are wired to real routes or page sections.
- The site is fully responsive (desktop, tablet, mobile) with a mobile hamburger menu, sticky navbar, back-to-top button, and subtle scroll-reveal animations (disabled for `prefers-reduced-motion`).
