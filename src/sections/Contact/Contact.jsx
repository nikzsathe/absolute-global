import React from 'react';
import HubSpotForm from '../../components/HubSpotForm/HubSpotForm';

const Contact = () => {
  return (
    <section id="contact" className="contact section-bg">
      <div className="container">
        <div className="section-title">
          <h2>Contact Us</h2>
        </div>
        <div className="row mt-5 justify-content-center">
          <div className="row">
            <div className="col-lg-5">
              <div className="info-wrap">
                <div className="info">
                  <h4>Audience Reach</h4>
                  <p>Contact directly with your audience. Choose your Target audience from our database pool containing more than 150 million companies and 100 million professionals and make your own custom list</p>
                  <br />
                  <br />
                  <h4>Target List Building</h4>
                  <p>Either you pick our own list to whom you want to target or if you feel your in-house CRM data may not be in the best of the stage to run campaigns or you need net new contacts. Use our list building service to build lists that are 100% accurate and relevant</p>
                  <br />
                  <br />
                  <h4>Email Marketing Campaigns</h4>
                  <p>We will enable you to run the entire email campaign targeted at your audience. Either you provide a list of your audience, or you define it. Absolute Global Outsourcing has a reach of more than 100 Million B2B contacts that enable them to execute the complete lifecycle of the email campaigns.</p>
                </div>
              </div>
            </div>
            <div className="hub-form">
              <h3>Let's Discuss More About Your Marketing Needs!</h3>
              <br />
              <HubSpotForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
