import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './HeaderHero.css';

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [openDropDowns, setOpenDropDowns] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const heroMode = isHome && !scrolled && !mobileNavOpen;

  // Activate scrollspy the same way the original main.js did
  useEffect(() => {
    const handleScroll = () => {
      const curPos = window.scrollY + 200;
      const sections = document.querySelectorAll('section');
      let current = '';
      sections.forEach((section) => {
        const top = section.offsetTop;
        if (curPos >= top && curPos <= top + section.clientHeight) {
          current = section.getAttribute('id');
        }
      });

      document.querySelectorAll('.nav-menu ul li a, .mobile-nav ul li a').forEach((link) => {
        link.parentElement.classList.remove('active');
        const href = link.getAttribute('href');
        if (current && (href === `#${current}` || href === `/#${current}`)) {
          link.parentElement.classList.add('active');
        } else if (current === '' && (href === '/' || href === '/#')) {
          link.parentElement.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Floating overlay presentation only while at the very top of the homepage
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
    setOpenDropDowns({});
  }, [location.pathname]);

  // Toggle body class like the original template (controls mobile-nav visibility + scroll lock)
  useEffect(() => {
    document.body.classList.toggle('mobile-nav-active', mobileNavOpen);
    return () => document.body.classList.remove('mobile-nav-active');
  }, [mobileNavOpen]);

  const toggleDropDown = (key) => {
    setOpenDropDowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Smooth scroll with header offset (equivalent of original scrollto)
  const scrollToHash = (e, href) => {
    e.preventDefault();
    const doScroll = () => {
      const target = document.querySelector(href);
      if (!target) return;
      const headerEl = document.getElementById('header');
      const scrolltoOffset = (headerEl ? headerEl.offsetHeight : 70) - 1;
      const scrollto = target.getBoundingClientRect().top + window.pageYOffset - scrolltoOffset;
      if (document.body.classList.contains('mobile-nav-active')) {
        setMobileNavOpen(false);
      }
      window.scrollTo({ top: scrollto, behavior: 'smooth' });
    };
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for the home page sections to render before scrolling
      setTimeout(doScroll, 50);
    } else {
      doScroll();
    }
  };

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      scrollToHash(e, href);
    }
  };

  const dropDown = (key, label, items, to = '') => (
    <li className={`drop-down ${openDropDowns[key] ? 'active' : ''}`}>
      <a href={to} onClick={(e) => { e.preventDefault(); toggleDropDown(key); }}>{label}</a>
      <ul style={openDropDowns[key] ? { display: 'block' } : undefined}>
        {items.map((item) =>
          item.children ? (
            <li key={item.key} className={`drop-down ${openDropDowns[item.key] ? 'active' : ''}`}>
              <a href="" onClick={(e) => { e.preventDefault(); toggleDropDown(item.key); }}>{item.label}</a>
              <ul style={openDropDowns[item.key] ? { display: 'block' } : undefined}>
                {item.children.map((child) => (
                  <li key={child.href}>
                    {child.href.startsWith('#') ? (
                      <a className="linkh" href={child.href} onClick={(e) => handleNavClick(e, child.href)}>{child.label}</a>
                    ) : (
                      <Link className="linkh" to={child.href}>{child.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li key={item.href}>
              {item.href.startsWith('#') ? (
                <a className="linkh" href={item.href} onClick={(e) => handleNavClick(e, item.href)}>{item.label}</a>
              ) : (
                <Link className="linkh" to={item.href}>{item.label}</Link>
              )}
            </li>
          )
        )}
      </ul>
    </li>
  );

  const aboutItems = [
    { href: '#about', label: 'About Us' },
    { href: '#what-we-do2', label: 'What we do?' },
    { href: '#why-partner', label: 'Why Partner With Us?' }
  ];

  const serviceItems = [
    { href: '/b2b', label: 'B2B Lead Generation' },
    { href: '/appointment-setting', label: 'Appointment Setting' },
    { href: '/abm', label: 'Account Based Marketing' },
    { href: '/digital-marketing', label: 'Digital Marketing' },
    { href: '/website-development', label: 'Web Development' },
    {
      key: 'consulting',
      label: 'Consulting',
      children: [
        { href: '/business-consulting', label: 'Business Process Consulting' },
        { href: '/business-optimization', label: 'Business Process Optimization' }
      ]
    }
  ];

  const solutionItems = [

    { href: '/website-development', label: 'Web Development' },
    { href: '/robotic-process-automation', label: 'Robotic Process Automation' },

  ];

  const navList = () => (
    <ul>
      <li className={isHome ? 'active' : ''}>
        <Link to="/">Home</Link>
      </li>
      {dropDown('about', 'About', aboutItems)}
      {dropDown('services', 'Services', serviceItems, '#what-we-do')}
      {dropDown('solutions', 'Solutions', solutionItems)}
      <li><Link to="/careers">Careers</Link></li>
    </ul>
  );

  return (
    <>
      <header id="header" className={`fixed-top d-flex align-items-center${heroMode ? ' header-hero-mode' : ''}${scrolled ? ' header-scrolled' : ''}`}>
        <div className="container d-flex align-items-center">
          <div className="logo mr-auto">
            <Link to="/"><img src="/assets/img/logo.webp" alt="absolute-logo" className="img-fluid" /></Link>
          </div>
          <nav className="nav-menu d-none d-lg-block">
            {navList()}
          </nav>
          <button className="cta" onClick={(e) => scrollToHash(e, '#contact')}>
            <a href="#contact" onClick={(e) => scrollToHash(e, '#contact')}><span>Contact Us</span></a>
            <svg width="15px" height="10px" viewBox="0 0 13 10">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
          <div className="header-social-links">
            <a href="https://www.facebook.com/A.G.O.pvt.ltd/?ref=py_c" className="facebook"><i className="icofont-facebook"></i></a>
            <a href="https://www.instagram.com/absoluteglobal20/" className="instagram"><i className="icofont-instagram"></i></a>
            <a href="https://www.linkedin.com/company/absolute-global" className="linkedin"><i className="icofont-linkedin"></i></a>
          </div>
        </div>
      </header>

      <button type="button" className="mobile-nav-toggle d-lg-none" onClick={() => setMobileNavOpen((v) => !v)}>
        <i className={mobileNavOpen ? 'icofont-close' : 'icofont-navigation-menu'}></i>
      </button>
      <div className="mobile-nav d-lg-none">
        {navList()}
        <ul className="mobile-nav-extra">
          <li>
            <a href="#contact" onClick={(e) => scrollToHash(e, '#contact')}>
              <i className="icofont-ui-contact-list"></i> Contact Us
            </a>
          </li>
        </ul>
        <div className="mobile-nav-social">
          <a href="https://www.facebook.com/A.G.O.pvt.ltd/?ref=py_c" className="facebook" target="_blank" rel="noreferrer" aria-label="Facebook"><i className="icofont-facebook"></i></a>
          <a href="https://www.instagram.com/absoluteglobal20/" className="instagram" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="icofont-instagram"></i></a>
          <a href="https://www.linkedin.com/company/absolute-global" className="linkedin" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="icofont-linkedin"></i></a>
        </div>
      </div>
      <div className="mobile-nav-overly" style={mobileNavOpen ? { display: 'block' } : undefined} onClick={() => setMobileNavOpen(false)}></div>
    </>
  );
};

export default Header;
