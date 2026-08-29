# Route Mapping Document

## Current URLs (Production) → React Routes

| Current URL | React Route | Page Component | Notes |
|-------------|-------------|----------------|-------|
| `/` or `/index.html` | `/` | `Home` | Homepage with multiple sections |
| `/faq.html` | `/faq` | `FAQ` | FAQ page with accordion |
| `/robotic-process-automation.html` | `/robotic-process-automation` | `RoboticProcessAutomation` | Long-form RPA page |
| `/b2b/` or `/b2b/index.html` | `/b2b` | `B2BLeadGeneration` | Service page |
| `/appointment-setting/` or `/appointment-setting/index.html` | `/appointment-setting` | `AppointmentSetting` | Service page |
| `/abm/` or `/abm/index.html` | `/abm` | `AccountBasedMarketing` | Service page |
| `/digital-marketing/` or `/digital-marketing/index.html` | `/digital-marketing` | `DigitalMarketing` | Service page |
| `/business-consulting/` or `/business-consulting/index.html` | `/business-consulting` | `BusinessConsulting` | Service page |
| `/business-optimization/` or `/business-optimization/index.html` | `/business-optimization` | `BusinessOptimization` | Service page |
| `/careers/` or `/careers/index.html` | `/careers` | `Careers` | Careers with HubSpot form |
| `/privacy-policy/` or `/privacy-policy/index.html` | `/privacy-policy` | `PrivacyPolicy` | Legal page |
| `/terms-conditions/` or `/terms-conditions/index.html` | `/terms-conditions` | `TermsConditions` | Legal page |

## SEO Metadata Preservation

Each page has unique:
- `<title>`
- `<meta name="description">`
- `<meta name="keywords">` (multiple)
- Open Graph: `og:title`, `og:description`, `og:image`
- Canonical/alternate: `<link rel="alternate" hreflang="en">`

## Analytics & Tracking (Preserve on all pages)

| Script | ID | Location |
|--------|----|----------|
| Google Analytics (gtag) | `G-NHMF0SVCVN` | All pages |
| Google Tag Manager | `GTM-MFT96PK` | All pages (noscript iframe) |
| HubSpot | `44898170` | All pages (forms + tracking) |
| Leadfeeder | `bElvO73MxzKaZMqj` | index.html header |
| AnyTrack | `DDZ8cstiqk3N` | privacy-policy, terms-conditions |

## HubSpot Forms (portalId: 44898170)

All service pages + FAQ + Careers use the same form:
- `formId: "f3a02ecc-85b0-4441-81a3-857b2919434b"`
- Region: `na1`

## Assets to Preserve

- All images in `assets/img/` and subdirectories
- Favicons: `favicon.ico`, `favicon.webp`, `favicon-16x16.png`, `favicon-32x32.webp`, `apple-touch-icon.webp`
- Logo: `logo.webp`, `absolute_logo.svg`, `absolute-logo-192x192.webp`, `absolute-logo-512x512.webp`
- Google Fonts: Open Sans, Raleway, Poppins (also Outfit/Inter on careers page)
- Custom CSS: `assets/css/style.css` (35KB)

## Vendor Libraries (Evaluate for React migration)

| Library | Used For | React Alternative |
|---------|----------|-------------------|
| Bootstrap 5 | Grid, utilities, components | CSS Grid/Flexbox + custom components |
| IcoFont | Icons in header/footer | Use SVG icons or keep icon font |
| Boxicons | Icons throughout | Use SVG icons or keep |
| Font Awesome | Some icons | Use SVG icons |
| Owl Carousel | Testimonials, portfolio | React carousel (e.g., `embla-carousel-react`) |
| Venobox | Lightbox/modal | React modal or lightbox |
| Waypoints | Scroll animations | IntersectionObserver + CSS |
| CounterUp | Number animations | Custom React hook |
| Isotope | Portfolio filter | Custom React implementation |
| jQuery | DOM manipulation | Remove - use React |
| jQuery Easing | Animations | CSS transitions |
| PHP Email Form | Contact forms | Already using HubSpot forms |

## Navigation Structure

### Header Navigation (identical across pages)
- Home → `/`
- About (dropdown)
  - About Us → `/#about` (anchor on homepage)
  - What we do? → `/#what-we-do2` (anchor)
  - Why Partner With Us? → `/#why-partner` (anchor)
- Services (dropdown)
  - B2B Lead Generation → `/b2b`
  - Appointment Setting → `/appointment-setting`
  - Account Based Marketing → `/abm`
  - Digital Marketing → `/digital-marketing`
  - Consulting (sub-dropdown)
    - Business Process Consulting → `/business-consulting`
    - Business Process Optimization → `/business-optimization`
- Solutions (dropdown)
  - Web Hosting → `https://hosting.absolute-global.com/` (external)
  - Web Development → `https://absolute-global.netlify.app/` (external)
  - Robotic Process Automation → `/robotic-process-automation`
  - UI/UX → `https://absolute-global.vercel.app/` (external)
- Careers → `/careers`
- Contact Us button → `/#contact` (anchor on homepage) or contact form section
- Social links: Facebook, Instagram, LinkedIn

## Footer Links (identical across pages)
- Useful Links: Home, About us, Media Kit, FAQ, Terms, Privacy
- Our Services: ABM, Demand Generation, B2B Lead Gen, SQL, Webinar Leads, Intent Marketing
- Contact Info: Pune & USA addresses, phone, email
- Social: Facebook, Instagram, Skype, LinkedIn, Twitter
- Copyright + credits

## Forms

- All service pages + FAQ + Careers: HubSpot embedded form (same formId)
- Form loads via `hbspt.forms.create()` from `//js.hsforms.net/forms/embed/v2.js`

## JavaScript Functionality (from assets/js/main.js)

1. **Smooth scroll** - navigation anchors, `.scrollto` links
2. **Mobile navigation** - hamburger menu, dropdown toggles, click outside to close
3. **Active nav on scroll** - highlight current section
4. **Header scroll effect** - `.header-scrolled` class after 100px
5. **Back to top button** - show after 100px scroll
6. **Skills progress bars** - animate on scroll (waypoints)
7. **CounterUp** - animate numbers
8. **Portfolio isotope/filter** - filter portfolio items
9. **Venobox** - lightbox for portfolio
10. **Testimonials carousel** - Owl Carousel (autoplay, dots, responsive)
11. **Portfolio details carousel** - Owl Carousel (single item)

## Cookie Consent

Simple localStorage-based cookie banner on all pages.

---

## Migration Strategy

1. **Phase 1**: Scaffold React + Vite + React Router
2. **Phase 2**: Create shared layout (Header, Footer, MainLayout)
3. **Phase 3**: Migrate Home page sections as components
4. **Phase 4**: Create ServicePage base component + individual service pages
5. **Phase 5**: Migrate FAQ, RPA, Careers, Privacy, Terms
6. **Phase 6**: Migrate JS interactions to React hooks/components
7. **Phase 7**: Implement SEO metadata (react-helmet-async)
8. **Phase 8**: Implement analytics tracking (route changes)
9. **Phase 9**: Build, test, verify

## Vite Config Considerations

- `base: '/'` for production deployment
- Copy `assets/img` to `public/assets/img` or import via Vite
- Copy `favicon.*` to `public/`
- Handle `.html` extension redirects via hosting config (Netlify/Vercel/_redirects)
## Legacy URL Handling (post-cleanup)

The original standalone HTML files (aq.html, obotic-process-automation.html, and the per-page index.html files inside legacy page directories) have been removed. Legacy deep URLs are handled as follows:

- In-app: App.jsx contains redirect routes (aq.html -> /faq, /b2b/index.html -> /b2b, etc.).
- Dev/preview: the legacy-html-fallback plugin in ite.config.js serves the SPA for any GET request ending in .html that does not exist in public/.
- Production static hosting: configure redirects mapping legacy .html URLs to / (or the matching clean route). The mapping table above lists every legacy URL and its target.

