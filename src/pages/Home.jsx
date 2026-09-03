import {useEffect, useState} from 'react';
import SEO from '../components/SEO/SEO';
import Hero from '../sections/Hero/Hero';
import HeroSanity from '../sections/Hero/HeroSanity';
import About from '../sections/About/About';
import Clients from '../sections/Clients/Clients';
import ClientsSanity from '../sections/Clients/ClientsSanity';
import WhatWeDo from '../sections/WhatWeDo/WhatWeDo';
import WhatWeDoSanity from '../sections/WhatWeDo/WhatWeDoSanity';
import WhatWeDo2 from '../sections/WhatWeDo2/WhatWeDo2';
import WhyPartner from '../sections/WhyPartner/WhyPartner';
import NetworkMap from '../sections/NetworkMap/NetworkMap';
import Analytics from '../sections/Analytics/Analytics';
import Contact from '../sections/Contact/Contact';
import TestimonialsSanity from '../sections/Testimonials/TestimonialsSanity';
import {useSanityQuery} from '../sanity/hooks';
import {HOMEPAGE_QUERY, SERVICES_QUERY, TESTIMONIALS_QUERY} from '../sanity/queries';

const Home = () => {
  const {data: homepage, loading: homepageLoading, error: homepageError} = useSanityQuery(HOMEPAGE_QUERY);
  const {data: services, loading: servicesLoading, error: servicesError} = useSanityQuery(SERVICES_QUERY);
  const {data: testimonials, loading: testimonialsLoading, error: testimonialsError} = useSanityQuery(TESTIMONIALS_QUERY);

  // Fallback SEO values
  const fallbackTitle = "B2B Lead Generation & Outsourcing Solutions";
  const fallbackDescription = "Absolute Global Outsourcing delivers AI-driven B2B lead generation, appointment setting, account-based marketing, digital marketing, and business process consulting and optimization for complex, high-value accounts.";

  return (
    <>
      <SEO
        title={homepage?.seo?.title ?? fallbackTitle}
        description={homepage?.seo?.description ?? fallbackDescription}
        path="/"
        image={homepage?.seo?.image}
      />
      {homepage ? <HeroSanity homepage={homepage} /> : <Hero />}
      <About />
      {homepage ? <ClientsSanity clients={homepage.clients} /> : <Clients />}
      {services ? <WhatWeDoSanity services={services} /> : <WhatWeDo />}
      <WhatWeDo2 />
      <WhyPartner />
      {testimonials && testimonials.length > 0 ? <TestimonialsSanity testimonials={testimonials} /> : null}
      <NetworkMap />
      <Analytics />
      <Contact />
    </>
  );
};

export default Home;