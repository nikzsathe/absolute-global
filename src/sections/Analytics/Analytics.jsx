import React from 'react';

const boxes = [
  { img: 'ConstantContact.webp', alt: 'ConstantContact', delay: 10 },
  { img: 'HubSpot.webp', alt: 'HubSpot' },
  { img: 'MailChimp.webp', alt: 'MailChimp' },
  { img: 'mautic.webp', alt: 'mautic' },
  { img: 'sendinblue.webp', alt: 'sendinblue' },
  { img: 'Nutshell.webp', alt: 'Nutshell' },
  { img: 'ZOHO.webp', alt: 'ZOHO' },
  { img: 'salesforce-pardot.webp', alt: 'salesforce-pardot' },
  { img: 'insightly.webp', alt: 'insightly' }
];

const Analytics = () => {
  return (
    <section className="analytics-and-automation">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-md-12">
            <div className="section-title section-title-transparent-text text-center">
              <h2 className="h1 c-1"><br className="d-none d-lg-block" />Analytics and Automation
                <span className="c-2"></span>
              </h2>
              <div className="bottom-border d-block w-100">
                <span className="line-1 bg-1"></span>
                <span className="line-2 bg-2"></span>
                <span className="line-3 bg-1"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h5 style={{ textAlign: 'center' }}><strong>Explore the capabilities of harnessing data, leveraging analytics, and embracing automation to unlock new potentials.</strong></h5>
            <p>Our expertise lies in guiding clients through the integration of advanced analytics, attribution mechanisms, CRM, and automation systems to explore, nurture, and monitor customer behavior.</p>
            <p>Proficient in the latest digital tools, we design marketing funnels, set up email automation, execute drip campaigns, manage leads, and employ analytics to engage with the entire prospect lifecycle seamlessly.</p>
          </div>
          <div className="col-lg-6">
            <div className="row justify-content-center">
              {boxes.map((box, index) => (
                <div className="col-6 col-md-4" key={box.img}>
                  <div className="analytics-and-automation-box">
                    <img className="img-fluid" src={`/assets/img/${box.img}`} alt={box.alt} data-aos={index === 0 ? 'zoom-in' : undefined} data-aos-delay={box.delay} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
