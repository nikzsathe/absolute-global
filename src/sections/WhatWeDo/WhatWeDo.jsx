import React from 'react';
import { Link } from 'react-router-dom';

const WhatWeDo = () => {
  const scrollToHash = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const headerEl = document.getElementById('header');
    const scrolltoOffset = (headerEl ? headerEl.offsetHeight : 70) - 1;
    const scrollto = target.getBoundingClientRect().top + window.pageYOffset - scrolltoOffset;
    window.scrollTo({ top: scrollto, behavior: 'smooth' });
  };

  return (
    <section id="what-we-do" className="what-we-do">
      <div className="container">
        <div className="section-title">
          <h2>Services</h2>
          <p>Proficient in providing targeted sales, marketing, and high-intent leads of exceptional quality.</p>
        </div>

        <div className="row">
          <div className="col-lg-5 zoom-container">
            <img src="/assets/img/lead-generation.webp" className="img-fluid" alt="lead-generation" />
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0">
            <div className="eff">
              <h2 style={{ textAlign: 'center' }}><strong> B2B Lead Generation</strong></h2>
              Embark on an exceptional lead generation journey with Absolute Global Outsourcing. Our team carefully selects potential leads using a rigorous MQL and SQL approach, going beyond the standards set by ordinary companies and unreliable data sources. Allow us to revolutionize your lead generation strategy and unveil new opportunities that remain untapped.<br />
              <br /><Link to="/b2b" className="btn-get-started scrollto">learn more</Link>
            </div>
          </div>
        </div>

        <br /><br /><br /><br />

        <div className="row">
          <div className="col-lg-6 pt-4 pt-lg-0">
            <h2 style={{ textAlign: 'center' }}><strong>Demand Generation</strong></h2>
            Our programmatic and display advertisements engage your desired audience, and our carefully crafted whitepapers and email campaigns further solidify their interest in your brand. Experience undeniable growth without any uncertainties.<br />
            <br /><a href="#about" className="btn-get-started scrollto" onClick={(e) => scrollToHash(e, '#about')}>Ignite growth</a>
          </div>
          <div className="col-lg-5 zoom-container">
            <img src="/assets/img/demand-generation.webp" className="img-fluid" alt="demand-generation" />
          </div>
        </div>

        <br /><br /><br /><br />

        <div className="row">
          <div className="col-lg-6 zoom-container">
            <img src="/assets/img/account-based-marketing.webp" className="img-fluid" alt="Account-Based-Marketing" />
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0">
            <h2 style={{ textAlign: 'center' }}><strong>Account-Based Marketing (ABM)</strong></h2>
            Account-Based Marketing (ABM) is a strategic approach in B2B marketing where businesses focus their efforts on targeting and engaging specific high-value accounts rather than broad audiences.<br />
            By utilizing precise targeting and analyzing intent data accurately, ABM aims to deliver high-value prospects. This strategic method guides desired accounts towards your offerings, facilitating a more tailored and effective approach. Elevate your growth strategy by partnering with Absolute Global Outsourcing for ABM services, leveraging customized campaigns to attract and engage the right prospects for your business.
            <br /><br /><Link to="/abm" className="btn-get-started scrollto">Speed up</Link>
          </div>
        </div>

        <br /><br /><br /><br />

        <div className="row">
          <div className="col-lg-6 pt-4 pt-lg-0">
            <h2 style={{ textAlign: 'center' }}><strong>Webinar Leads</strong></h2>
            Elevate your on-demand and live webinars with our promotion services, ensuring a vibrant audience. We'll boost attendance by targeting individuals genuinely interested in your products and services, creating potential prospects for your business.<br />
            <br /><a href="#about" className="btn-get-started scrollto" onClick={(e) => scrollToHash(e, '#about')}>Fill up!</a>
          </div>
          <div className="col-lg-5 zoom-container">
            <img src="/assets/img/webinar.webp" className="img-fluid" alt="Webinar" />
          </div>
        </div>

        <br /><br /><br /><br />

        <div className="row">
          <div className="col-lg-6 zoom-container">
            <img src="/assets/img/appoint.webp" className="img-fluid" alt="appointment-Settings" />
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0">
            <h2 style={{ textAlign: 'center' }}><strong>Appointment Settings</strong></h2>
            At Absolute Global Outsourcing, we streamline appointment scheduling, freeing you to focus on core tasks. Our tailored strategies ensure efficient lead generation and appointment management. With our expertise and technology, we handle every aspect with precision. Trust us for increased efficiency and client satisfaction.<br />
            <br /><br /><Link to="/appointment-setting" className="btn-get-started scrollto">Set now!</Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhatWeDo;
