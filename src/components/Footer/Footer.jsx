import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-contact">
              <div className="logo mr-auto">
                <a href="https://absolute-global.com"><img src="/assets/img/logo.webp" alt="" className="img-fluid" /></a>
              </div>
              <br />
              <b>Absolute Global Outsourcing is a demand generation company that provides end-to-end sales enablement services from Database Management to Appointment Setting.</b>
            </div>

            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><i className="bx bx-chevron-right"></i> <a href="/">Home</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="#about">About us</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="/mediakit-ago.pdf" target="_blank">Media Kit</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="/faq">FAQ</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="/terms-conditions">Terms of service</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="/privacy-policy">Privacy policy</a></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Our Services</h4>
              <ul>
                <li><i className="bx bx-chevron-right"></i> <a href="/abm">Account Based Marketing (ABM)</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="#what-we-do">Demand Generation</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="/b2b">B2B Lead Generation Services</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="#what-we-do">Sales Qualified leads</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="#what-we-do">Webinar Leads</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="/digital-marketing">Digital Marketing</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="/website-development">Website Development</a></li>
                <li><i className="bx bx-chevron-right"></i> <a href="/robotic-process-automation">Robotic Process Automation</a></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 footer-newsletter">
              <h4>Contact Us</h4>
              <i className="fa-solid fa-map-pin"></i>
              City Centre, Office No: 306,307,308. <br />
              Behind Persistent, Hinjewadi, Pune 57<br />
              India <br />
              <i className="fa-solid fa-flag-usa"></i>
              1603 Capitol Avenue <br />
              Suite 413-A, Cheyenne, WY 82801<br />
              USA.<br />
              <i className="fa-solid fa-phone"></i>
              <strong>Phone:</strong> +91 9503509473<br />
              <i className="fa-solid fa-envelopes-bulk"></i>
              <strong>Email:</strong> contact@absolute-global.com<br />
            </div>
          </div>
        </div>
      </div>

      <div className="container d-md-flex py-4">
        <div className="mr-md-auto text-center text-md-left">
          <div className="copyright">
            Copyright <strong><span>Absolute Global Outsourcing Pvt Ltd</span></strong>. All Rights Reserved <strong><span>&copy; {currentYear}</span></strong>
          </div>
          <div className="credits">
            Designed by <i className='bx bxl-github'></i> <a href="https://github.com/nikzsathe" target="_blank">Nikhil Sathe</a>
          </div>
        </div>
        <div className="social-links text-center text-md-right pt-3 pt-md-0">
          <a href="https://www.facebook.com/A.G.O.pvt.ltd/?ref=py_c" className="facebook" target="_blank"><i className="fa-brands fa-facebook"></i></a>
          <a href="https://www.instagram.com/absoluteglobal20/" className="instagram" target="_blank"><i className="fa-brands fa-instagram"></i></a>
          <a href="https://join.skype.com/invite/lupz49kmRtQA" className="google-plus" target="_blank"><i className="fa-brands fa-skype"></i></a>
          <a href="https://www.linkedin.com/company/absolute-global" className="linkedin" target="_blank"><i className="fa-brands fa-linkedin-in"></i></a>
          <a href="https://twitter.com/absoluteglob" className="twitter" target="_blank"><i className="fa-brands fa-x-twitter"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;