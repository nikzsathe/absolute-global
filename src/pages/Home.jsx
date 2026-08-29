import React from 'react';
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
