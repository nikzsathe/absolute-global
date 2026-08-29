import React from 'react';
import HubSpotForm from '../components/HubSpotForm/HubSpotForm';
import BackToTop from '../components/BackToTop/BackToTop';
import HubSpotChat from '../components/HubSpotChat/HubSpotChat';


const Careers = () => {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [typeHeader, setTypeHeader] = React.useState('');
  const [typeParagraph, setTypeParagraph] = React.useState('');
  const [typeCursorOnHeader, setTypeCursorOnHeader] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalDisplay, setModalDisplay] = React.useState('block');
  const headerRef = React.useRef('');
  const paraRef = React.useRef('');

  // Typewriter effect (port of the original inline script)
  React.useEffect(() => {
    const textArray = [
      'Innovation Accelerated. | Join our team of forward-thinking professionals and shape the future of demand generation.',
      'Culture of Excellence. | Experience a supportive and collaborative environment where your growth is our priority.',
      'Global Impact. | From database management to high-end sales enablement, we deliver results that matter.'
    ];
    const speedForward = 60, speedWait = 2500, speedBetweenLines = 800, speedBackspace = 30;
    let i = 0, a = 0, isBackspacing = false, isParagraph = false;
    let timer = null;
    let cancelled = false;

    const step = () => {
      if (cancelled) return;
      const aString = textArray[a];
      const headerText = headerRef.current;
      const paraText = paraRef.current;

      if (!isBackspacing) {
        if (i < aString.length) {
          if (aString.charAt(i) === '|') {
            isParagraph = true;
            setTypeCursorOnHeader(false);
            i++;
            timer = setTimeout(step, speedBetweenLines);
          } else {
            if (!isParagraph) {
              headerRef.current = headerText + aString.charAt(i);
              setTypeHeader(headerRef.current);
            } else {
              paraRef.current = paraText + aString.charAt(i);
              setTypeParagraph(paraRef.current);
            }
            i++;
            timer = setTimeout(step, speedForward);
          }
        } else if (i === aString.length) {
          isBackspacing = true;
          timer = setTimeout(step, speedWait);
        }
      } else {
        if (headerText.length > 0 || paraText.length > 0) {
          if (paraText.length > 0) {
            paraRef.current = paraText.substring(0, paraText.length - 1);
            setTypeParagraph(paraRef.current);
          } else if (headerText.length > 0) {
            setTypeCursorOnHeader(true);
            headerRef.current = headerText.substring(0, headerText.length - 1);
            setTypeHeader(headerRef.current);
          }
          timer = setTimeout(step, speedBackspace);
        } else {
          isBackspacing = false;
          i = 0;
          isParagraph = false;
          a = (a + 1) % textArray.length;
          timer = setTimeout(step, 50);
        }
      }
    };

    step();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  // Show announcement modal after 500ms (original behavior)
  React.useEffect(() => {
    const t = setTimeout(() => setModalVisible(true), 500);
    return () => clearTimeout(t);
  }, []);

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setModalDisplay('none'), 400);
  };

  React.useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/pagecss/careers/assets/css/style.css';
    document.head.appendChild(link);
    return () => { link.remove(); };
  }, []);
  return (
    <>
      <HubSpotChat />
      <header id="header" className="fixed-top d-flex align-items-center">
          <div className="container d-flex align-items-center">
      
            <div className="logo mr-auto">
            
              <a href="/"><img src="/assets/img/logo.webp" alt="absolute-global-logo" className="img-fluid" /></a>
            </div>
      
            <nav className="nav-menu d-none d-lg-block">
              <ul>
                <li className="active"><a href="#">Careers</a></li>
             
      
              </ul>
            </nav>
            
            
            
      
            <div className="header-social-links">
              <a href="#" className="twitter"><i className="icofont-twitter"></i></a>
              <a href="#" className="facebook"><i className="icofont-facebook"></i></a>
              <a href="#" className="instagram"><i className="icofont-instagram"></i></a>
              <a href="#" className="linkedin"><i className="icofont-linkedin"></i></a>
            </div>
      
          </div>
        </header>
      
        <main id="main">
      
          
          <section id="hero-careers" className="d-flex align-items-center">
            <div className="container text-center">
              <h1 className="display-4 font-weight-bold mb-4">Build Your <span className="text-accent">Future</span> With Us</h1>
              <p className="lead mb-4" style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>Join Absolute Global Outsourcing and be part of a team that's redefining the digital landscape through innovation and excellence.</p>
              <div className="breadcrumb-custom mt-5">
                  <a href="/">Home</a> <span className="mx-2" style={{ color: 'var(--text-muted)' }}>/</span> <span style={{ color: 'var(--accent-primary)' }}>Careers</span>
              </div>
            </div>
          </section>
      
          
          <section id="application" className="application-section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <div className="glass-card p-5">
                    <div className="output-container mb-5" id="output">
                      <h2 className={`typewriter-h font-weight-bold mb-3 ${typeCursorOnHeader ? 'cursor' : ''}`}>{typeHeader}</h2>
                      <p className={`typewriter-p text-muted lead ${!typeCursorOnHeader ? 'cursor' : ''}`}>{typeParagraph}</p>
                    </div>
                    <div className="form-header text-center mb-5">
                      <h3 className="mb-2">Send Your Application</h3>
                      <p className="text-muted">Fill in your details, our HR team will get in touch with you soon!</p>
                    </div>
      
      
      <HubSpotForm formId="e1d910b0-15e5-48fa-a3b5-654ff1b9d56c" />
      
      
                    <div className="ambition-banner mt-5 text-center p-4">
                      <p className="text-muted small mb-3">Recognized for Excellence</p>
                      <a href='https://www.ambitionbox.com/overview/absolute-global-outsourcing-overview?utm_source=employer-dashboard&utm_campaign=absolute-global-outsourcing&utm_medium=badges' target="_blank">
                        <img src='https://employer.ambitionbox.com/api/badge/842031?badge-type=ratings-detailed' alt="Ambition Box Ratings" className="img-fluid rounded shadow-sm" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
      
        <footer id="footer">
      
          <div className="footer-top">
            <div className="container">
              <div className="row">
      
                <div className="col-lg-3 col-md-6 footer-contact">
                  <div className="logo mr-auto">
                    
                    
                    <a href="/"><img src="/assets/img/logo.webp" alt="absolute-global-logo" className="img-fluid" /></a>
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
                &copy; Copyright <strong><span>Absolute Global Outsourcing Pvt Ltd</span></strong>. All Rights Reserved <strong><span>&copy; {new Date().getFullYear()}</span></strong>
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
      
        
      
        
        
        
        
        
        
        
        
        
        
        
      
        
        
        
        
      
        
        
      
        
      
      
      
      
      
        
        <div id="noticeModal" className={`modal-custom ${modalVisible ? 'show' : ''}`} style={{ display: modalDisplay }} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="modal-content-custom">
            <div className="modal-header-custom">
              <div className="icon-circle">
                <i className="bx bx-info-circle"></i>
              </div>
              <button id="closeNotice" className="btn-close-custom" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body-custom">
              <h3>Join Our Team</h3>
              <p>Thank you for your interest in joining our team. We currently do not have any open positions available. Please stay tuned for future opportunities and updates.</p>
            </div>
            <div className="modal-footer-custom">
              <button id="okBtn" className="btn-primary-custom" onClick={closeModal}>Got it</button>
            </div>
          </div>
        </div>
      
        
      
      

            <button type="button" className="mobile-nav-toggle d-lg-none" onClick={() => setMobileNavOpen((v) => !v)}>
              <i className={mobileNavOpen ? 'icofont-close' : 'icofont-navigation-menu'}></i>
            </button>
            <div className="mobile-nav d-lg-none" style={mobileNavOpen ? { opacity: 1, visibility: 'visible' } : undefined}>
              
              <ul>
                <li className="active"><a href="#">Careers</a></li>
             
      
              </ul>
            
            </div>
            <div className="mobile-nav-overly" style={mobileNavOpen ? { display: 'block' } : undefined} onClick={() => setMobileNavOpen(false)}></div>
      <BackToTop />
    </>
  );
};

export default Careers;
