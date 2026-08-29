import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import CookieBanner from '../components/CookieBanner/CookieBanner';
import BackToTop from '../components/BackToTop/BackToTop';
import HubSpotChat from '../components/HubSpotChat/HubSpotChat';

// Scrolls to top on route change like a multi-page site
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const MainLayout = ({ children }) => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="main">{children || <Outlet />}</main>
      <CookieBanner />
      <Footer />
      <BackToTop />
      <HubSpotChat />
    </>
  );
};

export default MainLayout;
