import React from 'react';
import SEO from '../components/SEO/SEO';
import Hero from '../sections/Hero/Hero';
import About from '../sections/About/About';
import Clients from '../sections/Clients/Clients';
import WhatWeDo from '../sections/WhatWeDo/WhatWeDo';
import WhatWeDo2 from '../sections/WhatWeDo2/WhatWeDo2';
import WhyPartner from '../sections/WhyPartner/WhyPartner';
import NetworkMap from '../sections/NetworkMap/NetworkMap';
import Analytics from '../sections/Analytics/Analytics';
import Contact from '../sections/Contact/Contact';

const Home = () => {
  return (
    <>
      <SEO
        title="B2B Lead Generation & Outsourcing Solutions"
        description="Absolute Global Outsourcing delivers AI-driven B2B lead generation, appointment setting, account-based marketing, digital marketing, and business process consulting and optimization for complex, high-value accounts."
        path="/"
      />
      <Hero />
      <About />
      <Clients />
      <WhatWeDo />
      <WhatWeDo2 />
      <WhyPartner />
      <NetworkMap />
      <Analytics />
      <Contact />
    </>
  );
};

export default Home;
