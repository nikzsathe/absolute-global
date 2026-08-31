import {useEffect, useState} from 'react';
import SEO from '../components/SEO/SEO';
import Hero from '../sections/Hero/Hero';
import About from '../sections/About/About';
import Clients from '../sections/Clients/Clients';
import WhatWeDo from '../sections/WhatWeDo/WhatWeDo';
import WhatWeDoSanity from '../sections/WhatWeDo/WhatWeDoSanity';
import WhatWeDo2 from '../sections/WhatWeDo2/WhatWeDo2';
import WhyPartner from '../sections/WhyPartner/WhyPartner';
import NetworkMap from '../sections/NetworkMap/NetworkMap';
import Analytics from '../sections/Analytics/Analytics';
import Contact from '../sections/Contact/Contact';
import {client} from '../sanity/client';
import {SERVICES_QUERY} from '../sanity/queries';

const Home = () => {
  const [services, setServices] = useState(null);

  // CMS-backed Services section: renders Sanity content when available,
  // falls back to the hardcoded WhatWeDo section otherwise.
  useEffect(() => {
    let cancelled = false;
    if (!import.meta.env.VITE_SANITY_PROJECT_ID) return undefined;
    client
      .fetch(SERVICES_QUERY)
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) setServices(data);
      })
      .catch(() => {/* keep fallback */});
    return () => {
      cancelled = true;
    };
  }, []);

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
      {services ? <WhatWeDoSanity services={services} /> : <WhatWeDo />}
      <WhatWeDo2 />
      <WhyPartner />
      <NetworkMap />
      <Analytics />
      <Contact />
    </>
  );
};

export default Home;
