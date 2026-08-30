import React from 'react';
import SEO from '../components/SEO/SEO';
import HubSpotForm from '../components/HubSpotForm/HubSpotForm';
import FAQQuestions from '../components/FAQQuestions/FAQQuestions';

import BackToTop from '../components/BackToTop/BackToTop';
import HubSpotChat from '../components/HubSpotChat/HubSpotChat';
import CookieBanner from '../components/CookieBanner/CookieBanner';


const faqItems = [
  { q: `Who can benefit from B2B Lead Generation services?`, a: `B2B Lead Generation services are beneficial for businesses of all sizes that aim to connect with their ideal customers and drive sales growth.` },
  { q: `How does Demand Generation differ from Lead Generation?`, a: `While Lead Generation focuses on acquiring qualified leads, Demand Generation encompasses a broader strategy to create awareness, build relationships, and drive demand for your products or services.` },
  { q: `What industries can benefit from Account-Based Marketing (ABM)?`, a: `Account-Based Marketing (ABM) is effective for various industries, including technology, finance, healthcare, and professional services, among others.`, active: true },
  { q: `How can Appointment Settings help my business?`, a: `Appointment Settings streamline your sales process by ensuring effective scheduling and maximizing valuable sales opportunities with qualified leads.` },
  { q: `Are the services customizable to my business needs?`, a: `Yes, our services are tailored to meet your specific business goals and requirements. We work closely with you to align our strategies with your objectives.` },
  { q: `Can you provide examples of successful lead generation campaigns you have conducted?`, a: `Absolutely! We have a portfolio of successful lead generation campaigns across various industries. We'd be delighted to share relevant case studies during our consultation.` },
  { q: `How long does it take to see results from your services?`, a: `The timeframe for results varies based on factors such as your industry, target audience, and the complexity of your campaigns. We focus on delivering sustainable and long-term results.` },
  { q: `Do you provide ongoing support and optimization?`, a: `Yes, we provide ongoing support and continually optimize our strategies to ensure maximum performance and return on investment (ROI).` },
  { q: `What sets Absolute Global Outsourcing apart from other service providers?`, a: `Our unique combination of industry expertise, advanced technology, and personalized approach sets us apart. We are committed to delivering exceptional results and helping our clients achieve their goals.` },
  { q: `How can I get started with your services?`, a: `Simply reach out to us via the contact form or give us a call, and our team will guide you through the next steps to start utilizing our services for your business growth.` }
];

const FAQ = () => {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  return (
    <>
      <SEO
        title="Frequently Asked Questions"
        description="Answers to common questions about B2B lead generation, demand generation, ABM, appointment setting, and working with Absolute Global Outsourcing."
        path="/faq"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }}
      />
      <HubSpotChat />
      <header id="header" className="fixed-top d-flex align-items-center">
          <div className="container d-flex align-items-center">
      
            <div className="logo mr-auto">
              
              
              <a href="/"><img src="/assets/img/logo.webp" alt="absolute-global-logo" className="img-fluid" /></a>
            </div>
      
            <nav className="nav-menu d-none d-lg-block">
              <ul>
                <li className="active"><a className="linkh" href="/">Home</a></li>
                <li className="drop-down"><a href="/">About</a>
                  <ul>
                    <li><a className="linkh" href="#about">About Us</a></li>
                    
      
                    
                    <li><a className="linkh" href="https://crm.absolute-global.com">User Login</a></li>
                
                  </ul>
                </li>
                
                <li className="drop-down"><a href="#what-we-do">Services</a>
                  <ul>
                    <li><a className="linkh" href="/b2b">B2B Lead Generation</a></li>
                    <li><a className="linkh" href="/appointment-setting">Appointment Setting</a></li>
                    <li><a className="linkh" href="/abm">Account Based Marketing</a></li>
                    <li><a className="linkh" href="">Webinar Leads</a></li>
      
                  </ul>
                </li>
      <li><a className="linkh" href="/careers">Careers</a></li>
                <li><a className="linkh" href="#contact">Contact Us</a></li>
                
      
              </ul>
            </nav>
      
            <div className="header-social-links">
      
              <a href="https://www.facebook.com/A.G.O.pvt.ltd/?ref=py_c" className="facebook"><i className="icofont-facebook"></i></a>
              <a href="https://www.instagram.com/absoluteglobal20/" className="instagram"><i className="icofont-instagram"></i></a>
              <a href="https://www.linkedin.com/company/absolute-global" className="linkedin"><i className="icofont-linkedin"></i></a>
            </div>
      
          </div>
        </header>
      
        
        
      <br /><br />
        <main id="main">
      
      
           
      
      	<section className="section-faq">
              <div className="container">
                <div className="row justify-content-center text-center">
                  <div className="col-md-8">
                    <div className="header-section">
                      <h2 className="title">Frequently asked questions</h2>
                      <p className="description">Have more questions? Weâd be happy to answer them!</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <FAQQuestions items={faqItems} />
                  </div>
                </div>
              </div>
            </section>
      
      	
      
      
      <section id="clients" className="clients clients">
          <div className="container">
            <div className="section-title">
              <h2>Trusted by Industry Leaders</h2>
            </div>
            <div className="row">
              <div className="col-lg-2 col-md-4 col-6">
                <img src="/assets/img/clients/Google-Cloud.webp" className="img-fluid" alt="Google-Cloud." data-aos="zoom-in" data-aos-delay="10" />
              </div>
      
              <div className="col-lg-2 col-md-4 col-6">
                <img src="/assets/img/clients/Tessolve.webp" className="img-fluid" alt="Tessolve" data-aos="zoom-in" data-aos-delay="100" />
              </div>
      
              <div className="col-lg-2 col-md-4 col-6">
                <img src="/assets/img/clients/Persistent.webp" className="img-fluid" alt="Persistent" data-aos="zoom-in" data-aos-delay="200" />
              </div>
      
              <div className="col-lg-2 col-md-4 col-6">
                <img src="/assets/img/clients/Thermax.webp" className="img-fluid" alt="Thermax" data-aos="zoom-in" data-aos-delay="300" />
              </div>
      
              <div className="col-lg-2 col-md-4 col-6">
                <img src="/assets/img/clients/Datamatics.webp" className="img-fluid" alt="Datamatics" data-aos="zoom-in" data-aos-delay="400" />
              </div>
      
              <div className="col-lg-2 col-md-4 col-6">
                <img src="/assets/img/clients/Dell.webp" className="img-fluid" alt="Dell" data-aos="zoom-in" data-aos-delay="500" />
              </div>
      
              <div className="col-lg-2 col-md-4 col-6">
                <img src="/assets/img/clients/Freshworks.webp" className="img-fluid" alt="Freshworks" data-aos="zoom-in" data-aos-delay="500" />
              </div>
      
              <div className="col-lg-2 col-md-4 col-6">
                <img src="/assets/img/clients/RingCentral.webp" className="img-fluid" alt="RingCentral" data-aos="zoom-in" data-aos-delay="500" />
              </div>
      
              <div className="col-lg-2 col-md-4 col-6">
                <img src="/assets/img/clients/Automation-Anywhere.webp" className="img-fluid" alt="Automation-Anywhere" data-aos="zoom-in" data-aos-delay="500" />
              </div>
      
              <div className="col-lg-2 col-md-4 col-6">
                <img src="/assets/img/clients/Hitachi.webp" className="img-fluid" alt="Hitachi" data-aos="zoom-in" data-aos-delay="500" />
              </div>
      
              <div className="col-lg-2 col-md-4 col-6">
                <img src="/assets/img/clients/Delfhix.webp" className="img-fluid" alt="Delfhix" data-aos="zoom-in" data-aos-delay="500" />
              </div>
      
              <div className="col-lg-2 col-md-4 col-6">
                <img src="/assets/img/clients/AWS.webp" className="img-fluid" alt="AWS" data-aos="zoom-in" data-aos-delay="500" />
              </div>
      
            </div>
      
          </div>
        </section>
      
      
          
          <section id="contact" className="contact section-bg">
            <div className="container">
      
              
              
              
              <br />
      
              <div className="section-title">
                <h2>Contact Us</h2>
              </div>
      
              <div className="row mt-5 justify-content-center">
                <div className="row">
                  <div className="col-lg-5">
      
                    <div className="info-wrap">
                      <div className=" info">
      
                        <h4>Audience Reach</h4>
                        <p>Contact directly with your audience. Choose your Target audience from our database pool containing more than 150 million companies and 100 million professionals and make your own custom list</p>
                        <br />
                        <h4>Target List Building</h4>
                        <p>Either you pick our own list to whom you want to target or if you feel your in-house CRM data may not be in the best of the stage to run campaigns or you need net new contacts. Use our list building service to build lists that are 100% accurate and relevant</p>
                        <br />
                        <h4>Email Marketing Campaigns</h4>
                        <p>We will enable you to run the entire email campaign targeted at your audience. Either you provide a list of your audience, or you define it. Absolute Global Outsourcing has a reach of more than 100 Million B2B contacts that enable them to execute the complete lifecycle of the email campaigns.</p>
      
                      </div>
      
                    </div>
      
                  </div>
      
                  
                    
                    <h3>Let's Discuss More About Your Marketing Needs!</h3><br />
                    
                    
      <HubSpotForm formId="f3a02ecc-85b0-4441-81a3-857b2919434b" />
      
      
                  
      
                  
      
                </div>
      
              </div>
          </div></section>
      
        </main>
        <CookieBanner />
        
        <footer id="footer">
      
          <div className="footer-top">
            <div className="container">
              <div className="row">
      
                <div className="col-lg-3 col-md-6 footer-contact">
                  <div className="logo mr-auto">
                    
                    
                    <a href="/"><img src="/assets/img/logo.webp" alt="" className="img-fluid" /></a>
                  </div>
                  <br />
                  <b>Absolute Global Outsourcing is a demand generation company that provides end-to-end sales enablement services from Database Management to Appointment Setting.</b>
      
                </div>
      
                <div className="col-lg-2 col-md-6 footer-links">
                  <h4>Useful Links</h4>
                  <ul>
                    <li><i className="bx bx-chevron-right"></i> <a href="/">Home</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/">About us</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/mediakit-ago.pdf">Media Kit</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/terms-conditions">Terms of service</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/privacy-policy">Privacy policy</a></li>
                  </ul>
                </div>
      
                <div className="col-lg-3 col-md-6 footer-links">
                  <h4>Our Services</h4>
                  <ul>
                    <li><i className="bx bx-chevron-right"></i> <a href="/abm">Account Based Marketing (ABM)</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">Demand Generation</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="/b2b">B2B Lead Generation Services</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">Sales Qualified leads</a></li>
                    <li><i className="bx bx-chevron-right"></i> <a href="#">Webinar Leads</a></li>
                  </ul>
                </div>
      
                <div className="col-lg-4 col-md-6 footer-newsletter">
                  <h4>Contact Us</h4>
                  <i className="icofont-google-map"></i>
                  City Centre, Office No: 306,307,308. <br />
                  Behind Persistent,Hinjewadi,Pune 57<br />
                  India <br />
                  <i className="icofont-google-map"></i>
                  1603 Capitol Avenue <br />
                  Suite 413-A,Cheyenne, WY 82801<br />
                  USA.<br />
                  <i className="icofont-phone"></i>
                  <strong>Phone:</strong> +91 9503509473<br />
                  <i className="icofont-envelope"></i>
                  <strong>Email:</strong> contact@absolute-global.com<br />
                </div>
      
              </div>
            </div>
          </div>
      
          <div className="container d-md-flex py-4">
      
            <div className="mr-md-auto text-center text-md-left">
              <div className="copyright">
                &copy; Copyright <strong><span>Absolute Global Outsourcing Pvt Ltd</span></strong>. All Rights Reserved <strong><span>&copy; </span></strong>
              </div>
              <div className="credits">
                Designed by <a href="/">Absolute Global Outsourcing</a>
              </div>
            </div>
            <div className="social-links text-center text-md-right pt-3 pt-md-0">
      
              <a href="https://www.facebook.com/A.G.O.pvt.ltd/?ref=py_c" className="facebook"><i className="bx bxl-facebook"></i></a>
              <a href="https://www.instagram.com/absoluteglobal20/" className="instagram"><i className="bx bxl-instagram"></i></a>
              <a href="https://join.skype.com/invite/lupz49kmRtQA" className="google-plus"><i className="bx bxl-skype"></i></a>
              <a href="https://www.linkedin.com/company/absolute-global" className="linkedin"><i className="bx bxl-linkedin"></i></a>
            </div>
          </div>
        </footer>
      
        
      
        
        
        
        
        
        
        
        
        
        
        
      
        
        
        
        
      
        
        
        
      
        
      
      
      
      
      
      

            <button type="button" className="mobile-nav-toggle d-lg-none" onClick={() => setMobileNavOpen((v) => !v)}>
              <i className={mobileNavOpen ? 'icofont-close' : 'icofont-navigation-menu'}></i>
            </button>
            <div className="mobile-nav d-lg-none" style={mobileNavOpen ? { opacity: 1, visibility: 'visible' } : undefined}>
              
              <ul>
                <li className="active"><a className="linkh" href="/">Home</a></li>
                <li className="drop-down"><a href="/">About</a>
                  <ul>
                    <li><a className="linkh" href="#about">About Us</a></li>
                    
      
                    
                    <li><a className="linkh" href="https://crm.absolute-global.com">User Login</a></li>
                
                  </ul>
                </li>
                
                <li className="drop-down"><a href="#what-we-do">Services</a>
                  <ul>
                    <li><a className="linkh" href="/b2b">B2B Lead Generation</a></li>
                    <li><a className="linkh" href="/appointment-setting">Appointment Setting</a></li>
                    <li><a className="linkh" href="/abm">Account Based Marketing</a></li>
                    <li><a className="linkh" href="">Webinar Leads</a></li>
      
                  </ul>
                </li>
      <li><a className="linkh" href="/careers">Careers</a></li>
                <li><a className="linkh" href="#contact">Contact Us</a></li>
                
      
              </ul>
            
            </div>
            <div className="mobile-nav-overly" style={mobileNavOpen ? { display: 'block' } : undefined} onClick={() => setMobileNavOpen(false)}></div>
      <BackToTop />
    </>
  );
};

export default FAQ;
