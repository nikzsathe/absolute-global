import React from 'react';
import './Hero.css';
import WindyGlobe from './WindyGlobe';

const scrollToSection = (e, selector) => {
  e.preventDefault();
  const target = document.querySelector(selector);
  if (!target) return;
  const headerEl = document.getElementById('header');
  const offset = (headerEl ? headerEl.offsetHeight : 70) - 1;
  const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
  window.scrollTo({ top, behavior: 'smooth' });
};

const HeroSanity = ({ homepage }) => {
  // Extract hero fields with fallbacks
  const heroEyebrow = homepage.heroEyebrow || 'Absolute Global Outsourcing';
  const heroHeadline = homepage.heroHeadline || 'Illuminating Brands,\nUnveiling Their\nStories Step by Step.';
  const heroTagline = homepage.heroTagline || 'End-to-end sales enablement — from database management to appointment setting.';

  // Split headline into lines for animated effect
  const headlineLines = heroHeadline.split('\n');

  return (
    <section className="ag-hero">
      <div className="ag-hero__overlay" aria-hidden="true"></div>

      <div className="ag-hero__deco" aria-hidden="true">
        <span className="ag-hero__deco-glow"></span>
        <span className="ag-hero__deco-line">
          <span className="ag-hero__deco-dot"></span>
        </span>
      </div>

      <WindyGlobe />

      <div className="ag-hero__content">
        <div className="ag-hero__inner">
          <p className="ag-hero__eyebrow ag-anim" style={{ '--agd': '380ms' }}>
            <span className="ag-hero__eyebrow-line"></span>
            {heroEyebrow}
          </p>

          <h1 className="ag-hero__title">
            {headlineLines.map((line, index) => (
              <span
                key={index}
                className={`ag-hero__line${index === 1 ? ' ag-hero__line--outline' : ''} ag-anim`}
                style={{
                  '--agd': [450, 600, 750][index] || 450,
                }}
              >
                {line}
              </span>
            ))}
          </h1>

          <div className="ag-hero__actions ag-anim" style={{ '--agd': '950ms' }}>
            <a href="#about" className="ag-hero__cta" onClick={(e) => scrollToSection(e, '#about')}>
              <span>Get Started</span>
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
                <path d="M1 6h15M12 1l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#what-we-do" className="ag-hero__ghost" onClick={(e) => scrollToSection(e, '#what-we-do')}>
              What We Do
            </a>
          </div>
        </div>

        <div className="ag-hero__bottom ag-anim" style={{ '--agd': '1100ms' }}>
          <p className="ag-hero__tagline">{heroTagline}</p>
          <a href="#about" className="ag-hero__indicator" onClick={(e) => scrollToSection(e, '#about')}>
            <span className="ag-hero__indicator-num">01</span>
            <span className="ag-hero__indicator-label">/ About Us</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSanity;