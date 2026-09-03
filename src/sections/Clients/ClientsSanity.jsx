import React from 'react';

const ClientsSanity = ({ clients }) => {
  if (!clients || clients.length === 0) return null;

  return (
    <section id="clients" className="clients">
      <div className="container">
        <div className="section-title">
          <h2>Trusted by Industry Leaders</h2>
        </div>
        <div className="row">
          {clients.map((client, index) => (
            <div className="col-lg-2 col-md-4 col-6" key={client._key}>
              <img
                src={client.logoUrl}
                alt={client.name}
                className="img-fluid"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSanity;