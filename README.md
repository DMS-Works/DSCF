# Dee the Samaritan Charity Foundation — website

DMS Works project **DMS005**. Static site (HTML/CSS/JS), hosted on Netlify.

## Structure
- `index.html`, `about.html`, `programmes.html`, `gallery.html`, `testimonials.html` (Stories), `faqs.html`, `contact.html`, `support-us.html`
- `thank-you.html` — contact form success page · `404.html` — not-found page
- `css/style.css` — design system (indigo `#262161` from the logo, cream, gold, Playfair Display + Open Sans)
- `js/main.js` — sticky header, mobile menu, FAQ accordion, gallery lightbox, scroll reveal
- `assets/images/` — logo (`logo-mark.svg`, `logo-full.svg`), favicons, social share image, photo placeholder

## Netlify setup
1. Add new site → import `DMS-Works/DSCF` → publish directory `.` (no build command).
2. **Forms → Form notifications → Email notification** → `Deethesamaritanmother@gmail.com` for the `contact` form.

## Adding photos
Photo spots are `<div class="photo ...">` placeholders. Put the image in `assets/images/`, then inside the div
replace the `<span class="photo__label">…</span>` with `<img src="assets/images/NAME.jpg" alt="Describe the photo">`
and remove the div's `role` and `aria-label`. Gallery images: swap `placeholder.svg` for the real file.

## Still needed from Dorcas (search the code for `TODO` and `[`)
- [ ] WhatsApp number → `WHATSAPP_URL` (`https://wa.me/256XXXXXXXXX` in every page)
- [ ] Photos & videos (+ Luganda subtitle translations)
- [ ] Address for the Google Map (About + Contact)
- [ ] Gift amounts `[£ amount]` (Home, Programmes, Support Us)
- [ ] Donation platform decision → replace the "Online giving is coming soon" card on Support Us
- [x] Funding proposal PDF → `assets/docs/dscf-funding-proposal.pdf` (contact email added on the last page, 23 Nov 2026)
- [x] Full beneficiary stories (Shakirah, Esther, Malita Isha) + Kilisiru article (added 23 Nov 2026, plus Elvis)
- [ ] Team: Dorcas and Asiimwe for now (third card removed 23 Nov 2026). Still needed: communities served, registration number
- [ ] Confirm drafted values and FAQ answers marked `[Dorcas to confirm …]`
- [ ] Domain → then add sitemap.xml and absolute `og:image` URL, and add the website address to the funding proposal's last page (next to the email)

Scripture: NKJV (copyright notice in the footer).
