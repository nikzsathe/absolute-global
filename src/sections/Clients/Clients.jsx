import React from 'react';

const clients = [
  { img: 'Google-Cloud.webp', alt: 'Google-Cloud', delay: 10 },
  { img: 'Tessolve.webp', alt: 'Tessolve', delay: 100 },
  { img: 'Persistent.webp', alt: 'Persistent', delay: 200 },
  { img: 'Thermax.webp', alt: 'Thermax', delay: 300 },
  { img: 'Datamatics.webp', alt: 'Datamatics', delay: 400 },
  { img: 'Dell.webp', alt: 'Dell', delay: 500 },
  { img: 'Freshworks.webp', alt: 'Freshworks', delay: 500 },
  { img: 'RingCentral.webp', alt: 'RingCentral', delay: 500 },
  { img: 'Automation-Anywhere.webp', alt: 'Automation-Anywhere', delay: 500 },
  { img: 'Hitachi.webp', alt: 'Hitachi', delay: 500 },
  { img: 'Delfhix.webp', alt: 'Delfhix', delay: 500 },
  { img: 'AWS.webp', alt: 'AWS', delay: 500 }
];

const Clients = () => {
  return (
    <section id="clients" className="clients">
      <div className="container">
        <div className="section-title">
          <h2>Trusted by Industry Leaders</h2>
        </div>
        <div className="row">
          {clients.map((client) => (
            <div className="col-lg-2 col-md-4 col-6" key={client.img}>
              <img src={`/assets/img/clients/${client.img}`} className="img-fluid" alt={client.alt} data-aos="zoom-in" data-aos-delay={client.delay} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
