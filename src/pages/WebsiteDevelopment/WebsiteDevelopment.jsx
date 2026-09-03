import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useScroll, useTransform, useSpring, useMotionValue, motion, useReducedMotion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import WebDevScene from './WebDevScene';
import './WebsiteDevelopment.css';
import SEO from '../../components/SEO/SEO';
import { client } from '../../sanity/client';
import { SERVICE_BY_SLUG_QUERY } from '../../sanity/queries';

/* ---------- static chapter content (Sanity body enriches when present) ---------- */
const CHAPTERS = [
  {
    num: '01',
    type: 'hero',
    eyebrow: 'Absolute Global · Website Development',
    title: ['WE BUILD', 'DIGITAL EXPERIENCES'],
    text: 'From corporate sites to immersive 3D worlds — we design, engineer and ship websites that perform at the edge and feel effortless to use.',
    ctaPrimary: { label: 'Start a Project', href: '#contact', scroll: '/' },
    ctaSecondary: { label: 'Explore Our Capabilities', scrollTarget: 1 },
  },
  {
    num: '02',
    type: 'statement',
    title: ["WE DON'T JUST BUILD WEBSITES.", 'WE BUILD DIGITAL EXPERIENCES.'],
    text: 'Every project is engineered as one continuous experience — design, code, content and performance working as a single system.',
  },
  {
    num: '03',
    type: 'capabilities',
    title: ['WHAT WE BUILD'],
    items: [
      'Corporate Websites',
      'High-Converting Landing Pages',
      'Web Applications',
      'E-commerce',
      'React Development',
      'Headless CMS',
      'AI-Powered Websites',
      '3D / Interactive Web Experiences',
    ],
  },
  {
    num: '04',
    type: 'tech',
    title: ['BUILT FOR THE MODERN WEB'],
    items: ['React', 'Vite', 'JavaScript', 'Three.js', 'Node.js', 'Sanity', 'APIs', 'AI', 'Cloudflare', 'SEO', 'Performance'],
    text: 'An interconnected stack, chosen per project — never a one-size-fits-all template.',
  },
  {
    num: '05',
    type: 'statement',
    title: ['DESIGN MEETS ENGINEERING.'],
    items: ['UX', 'UI', 'Development', 'Performance', 'SEO', 'Content', 'AI', 'Analytics'],
    text: 'Creative direction and engineering discipline in one team — the transition you just felt from abstract structures to organized architecture is how we work: ideas made systematic.',
  },
  {
    num: '06',
    type: 'statement',
    title: ['FAST IS A FEATURE.'],
    items: ['Optimized assets', 'Responsive architecture', 'Core Web Vitals', 'Modern frontend architecture', 'Efficient JavaScript', 'CDN / edge delivery', 'Image optimization', 'Scalable CMS', 'Mobile performance'],
    text: 'Speed is designed in from the first commit — every page is measured, not assumed.',
  },
  {
    num: '07',
    type: 'statement',
    title: ['THE NEXT WEB IS INTELLIGENT.'],
    items: ['AI agents', 'Intelligent interfaces', 'AI-assisted workflows', 'Personalization', 'Automation', 'Intelligent search', 'Dynamic content', 'AI-powered business tools'],
    text: 'We integrate AI where it earns its place — realistic, measurable, and built into the product, not bolted on.',
  },
  {
    num: '08',
    type: 'statement',
    title: ['WHY ABSOLUTE GLOBAL'],
    items: ['Business-first thinking', 'Modern development', 'Performance', 'SEO', 'Conversion', 'Scalable architecture', 'Maintainability'],
    text: 'We build websites as business infrastructure — measurable, maintainable, and ready to grow with you.',
  },
  {
    num: '09',
    type: 'final',
    title: ["LET'S BUILD", "WHAT'S NEXT."],
    text: 'Have a website, platform or digital experience in mind?',
    ctaPrimary: { label: 'Start a Project', href: '#contact', scroll: '/' },
    ctaSecondary: { label: 'Contact Us', href: '/#contact', router: true },
  },
];

/* ---------- reusable animated chapter wrapper ---------- */
const ChapterBlock = ({ chapter, index, total, children }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const opacity = useTransform(smooth, [0.05, 0.3, 0.7, 0.95], [0, 1, 1, 0]);
  const y = useTransform(smooth, [0.05, 0.35], [60 * (reduced ? 0.3 : 1), 0]);
  const blur = useTransform(smooth, [0.05, 0.3], [reduced ? 0 : 8, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  const scale = useTransform(smooth, [0.05, 0.5], [reduced ? 1 : 0.96, 1]);

  return (
    <section ref={ref} className="wd-chapter" data-chapter={index + 1}>
      <motion.div style={{ opacity, y, filter, scale }} className="wd-chapter__inner">
        {children}
      </motion.div>
    </section>
  );
};

const Eyebrow = ({ children }) => (
  <p className="wd-eyebrow"><span className="wd-eyebrow__line" />{children}</p>
);

const Title = ({ lines, as = 'h2' }) => {
  const Tag = as;
  return (
    <Tag className="wd-title">
      {lines.map((l, i) => (
        <span key={i} className={i === 1 && lines.length > 1 && as === 'h2' ? 'wd-title__outline' : ''}>{l}</span>
      ))}
    </Tag>
  );
};

const Pill = ({ children }) => <span className="wd-pill">{children}</span>;

const CTA = ({ cta, onNav }) => {
  if (!cta) return null;
  const cls = 'wd-cta';
  if (cta.router) {
    return <a className={cls} href={cta.href} onClick={(e) => { e.preventDefault(); onNav(cta.href); }}>{cta.label}</a>;
  }
  if (cta.href) return <a className={cls} href={cta.href}>{cta.label}</a>;
  return (
    <a className={cls} href="#cap" onClick={(e) => { e.preventDefault(); onNav('#cap', true); }}>{cta.label}</a>
  );
};

/* ---------- page ---------- */
const WebsiteDevelopment = () => {
  const contentRef = useRef(null);
  const reduced = useReducedMotion();
  const mobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
  const [body, setBody] = useState(null);
  const [sanityTitle, setSanityTitle] = useState(null);

  const { scrollYProgress } = useScroll({ target: contentRef });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.5 });
  const progressRef = useMotionValue(0);
  progress.on('change', (v) => { progressRef.current = v; });

  // chapter indicator driven by the same progress
  const [active, setActive] = useState(0);
  progress.on('change', (v) => {
    const idx = Math.min(Math.floor(v * CHAPTERS.length), CHAPTERS.length - 1);
    setActive(idx);
  });

  useEffect(() => {
    document.body.classList.add('wd-page');
    return () => document.body.classList.remove('wd-page');
  }, []);

  useEffect(() => {
    let cancelled = false;
    client
      .fetch(SERVICE_BY_SLUG_QUERY, { slug: 'website-development' })
      .then((data) => {
        if (cancelled || !data) return;
        setSanityTitle(data.title || null);
        // Portable Text -> plain paragraphs for the intro chapter
        if (Array.isArray(data.body)) {
          setBody(data.body.map((b) => (b.children || []).map((c) => c.text).join('')).filter(Boolean));
        }
      })
      .catch(() => { /* static content covers it */ });
    return () => { cancelled = true; };
  }, []);

  const goToSection = (sel) => {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <>
      <SEO
        title={`${sanityTitle || 'Website Development'} | Absolute Global`}
        description="We design, engineer and ship high-performance websites, web applications and immersive 3D experiences — React, Three.js, headless CMS, AI integration and edge delivery."
        path="/website-development"
      />

      {/* persistent 3D world */}
      <div className="wd-canvas" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0.2, 9], fov: mobile ? 55 : 45 }}
          dpr={mobile ? [1, 1.25] : [1, 1.75]}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          style={{ pointerEvents: 'none' }}
        >
          <WebDevScene progressRef={progressRef} mobile={mobile} reducedMotion={!!reduced} />
        </Canvas>
      </div>

      {/* scroll progress rail */}
      <div className="wd-progress" aria-hidden="true">
        <div className="wd-progress__bar" style={{ transform: `scaleY(${1})`, height: '100%' }} ref={(el) => { if (el && progressRef.get()) el.style.height = `${Math.max(2, progressRef.get() * 100)}%`; }} />
      </div>
      <div className="wd-indicator" aria-hidden="true">
        <span className="wd-indicator__num">{CHAPTERS[active].num}</span>
        <span className="wd-indicator__label">/ {CHAPTERS.length}</span>
      </div>

      <main ref={contentRef} className="wd-main">
        {CHAPTERS.map((c, i) => (
          <ChapterBlock key={c.num} chapter={c} index={i} total={CHAPTERS.length}>
            {c.type === 'hero' && (
              <div className="wd-hero">
                <Eyebrow>{c.eyebrow}</Eyebrow>
                <h1 className="wd-title wd-title--h1">
                  {c.title.map((l) => <span key={l}>{l}</span>)}
                </h1>
                <p className="wd-text">{c.text}</p>
                {body && body.length > 0 && (
                  <div className="wd-text wd-text--sanity">
                    {body.slice(0, 2).map((p, j) => <p key={j}>{p}</p>)}
                  </div>
                )}
                <div className="wd-cta-row">
                  <CTA cta={c.ctaPrimary} onNav={goToSection} />
                  <a className="wd-ghost" href="#cap" onClick={(e) => { e.preventDefault(); goToSection(`[data-chapter="4"]`); }}>{c.ctaSecondary.label}</a>
                </div>
              </div>
            )}

            {c.type === 'statement' && (
              <div className="wd-statement">
                <Eyebrow>{c.num}</Eyebrow>
                <Title lines={c.title} />
                {c.items && <div className="wd-pills">{c.items.map((it) => <Pill key={it}>{it}</Pill>)}</div>}
                <p className="wd-text">{c.text}</p>
              </div>
            )}

            {c.type === 'capabilities' && (
              <div className="wd-statement" id="cap">
                <Eyebrow>{c.num}</Eyebrow>
                <Title lines={c.title} />
                <ol className="wd-caps">
                  {c.items.map((it, j) => (
                    <li key={it} className="wd-cap">
                      <span className="wd-cap__num">{String(j + 1).padStart(2, '0')}</span>
                      <span className="wd-cap__name">{it}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {c.type === 'tech' && (
              <div className="wd-statement">
                <Eyebrow>{c.num}</Eyebrow>
                <Title lines={c.title} />
                <div className="wd-pills">{c.items.map((it) => <Pill key={it}>{it}</Pill>)}</div>
                <p className="wd-text">{c.text}</p>
              </div>
            )}

            {c.type === 'final' && (
              <div className="wd-statement">
                <Eyebrow>{c.num}</Eyebrow>
                <Title lines={c.title} as="h2" />
                <p className="wd-text">{c.text}</p>
                <div className="wd-cta-row">
                  <CTA cta={c.ctaPrimary} onNav={goToSection} />
                  <CTA cta={c.ctaSecondary} onNav={goToSection} />
                </div>
              </div>
            )}
          </ChapterBlock>
        ))}
      </main>
    </>
  );
};

export default WebsiteDevelopment;
