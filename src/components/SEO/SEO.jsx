import { useEffect } from 'react';

/**
 * Lightweight, dependency-free SEO manager for a client-rendered SPA.
 *
 * Every route previously shared the single <title>/<meta description>/OG
 * block in index.html. This component gives each page its own title,
 * description, canonical URL, Open Graph / Twitter tags, and (optionally)
 * a JSON-LD structured-data block, updated on mount and whenever props
 * change.
 *
 * IMPORTANT CAVEAT: this app has no SSR/SSG — these tags are written to
 * the DOM by JavaScript after the page loads. Crawlers that execute
 * JavaScript (Googlebot, eventually) will see them. Crawlers that only
 * fetch raw HTML (several AI-answer-engine bots do this) will NOT see
 * them and will instead see only the generic fallback tags baked into
 * index.html. See the audit notes for why pre-rendering/SSR closes this
 * gap for good.
 */
const SITE_NAME = 'Absolute Global Outsourcing';
const SITE_URL = 'https://absolute-global.com';
const DEFAULT_IMAGE = `${SITE_URL}/assets/img/logo.webp`;

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!data) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * @param {string} title - Page title (site name is appended automatically)
 * @param {string} description - Meta description, ~150-160 characters
 * @param {string} path - Route path starting with "/", e.g. "/b2b"
 * @param {string} [image] - Absolute URL for og:image / twitter:image
 * @param {object|object[]} [jsonLd] - JSON-LD structured data object(s) for this page
 * @param {boolean} [noindex] - Set true to keep a page out of search/AI indexes
 */
const SEO = ({ title, description, path = '/', image = DEFAULT_IMAGE, jsonLd = null, noindex = false }) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const canonical = `${SITE_URL}${path}`;

    document.title = fullTitle;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    upsertLink('canonical', canonical);

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', image);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);

    upsertJsonLd('page-jsonld', jsonLd);
  }, [title, description, path, image, jsonLd, noindex]);

  return null;
};

export default SEO;
