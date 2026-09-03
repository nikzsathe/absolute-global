import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import B2B from './pages/B2B';
import AppointmentSetting from './pages/AppointmentSetting';
import ABM from './pages/ABM';
import DigitalMarketing from './pages/DigitalMarketing';
import BusinessConsulting from './pages/BusinessConsulting';
import BusinessOptimization from './pages/BusinessOptimization';
import Careers from './pages/Careers';
import RoboticProcessAutomation from './pages/RoboticProcessAutomation';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import WebsiteDevelopment from './pages/WebsiteDevelopment/WebsiteDevelopment';

// Scrolls to top on route change like a multi-page site
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="b2b" element={<B2B />} />
          <Route path="appointment-setting" element={<AppointmentSetting />} />
          <Route path="abm" element={<ABM />} />
          <Route path="digital-marketing" element={<DigitalMarketing />} />
          <Route path="business-consulting" element={<BusinessConsulting />} />
          <Route path="business-optimization" element={<BusinessOptimization />} />
          <Route path="website-development" element={<WebsiteDevelopment />} />
          {/* Redirect legacy .html URLs */}
          <Route path="index.html" element={<Navigate to="/" replace />} />
          <Route path="b2b/index.html" element={<Navigate to="/b2b" replace />} />
          <Route path="appointment-setting/index.html" element={<Navigate to="/appointment-setting" replace />} />
          <Route path="abm/index.html" element={<Navigate to="/abm" replace />} />
          <Route path="digital-marketing/index.html" element={<Navigate to="/digital-marketing" replace />} />
          <Route path="business-consulting/index.html" element={<Navigate to="/business-consulting" replace />} />
          <Route path="business-optimization/index.html" element={<Navigate to="/business-optimization" replace />} />
          <Route path="careers/index.html" element={<Navigate to="/careers" replace />} />
          <Route path="privacy-policy/index.html" element={<Navigate to="/privacy-policy" replace />} />
          <Route path="terms-conditions/index.html" element={<Navigate to="/terms-conditions" replace />} />
        </Route>
        {/* Pages that reproduce their own original header/footer chrome */}
        <Route path="faq" element={<FAQ />} />
        <Route path="faq.html" element={<Navigate to="/faq" replace />} />
        <Route path="robotic-process-automation" element={<RoboticProcessAutomation />} />
        <Route path="robotic-process-automation.html" element={<Navigate to="/robotic-process-automation" replace />} />
        <Route path="careers" element={<Careers />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-conditions" element={<TermsConditions />} />
        {/* Catch all for 404 - redirect to home for now */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;