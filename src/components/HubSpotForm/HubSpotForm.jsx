import React, { useEffect } from 'react';

let scriptLoaded = false;
let scriptLoading = null;

const loadHubSpotScript = () => {
  if (scriptLoaded) return Promise.resolve();
  if (scriptLoading) return scriptLoading;
  scriptLoading = new Promise((resolve) => {
    const script = document.createElement('script');
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.onload = () => {
      scriptLoaded = true;
      resolve();
    };
    document.body.appendChild(script);
  });
  return scriptLoading;
};

const HubSpotForm = ({ formId = 'f3a02ecc-85b0-4441-81a3-857b2919434b' }) => {
  const containerRef = React.useRef(null);
  const targetId = React.useId().replace(/:/g, '');

  useEffect(() => {
    let cancelled = false;
    loadHubSpotScript().then(() => {
      if (cancelled || !window.hbspt || !containerRef.current) return;
      containerRef.current.innerHTML = '';
      window.hbspt.forms.create({
        region: 'na1',
        portalId: '44898170',
        formId,
        target: `#${targetId}`
      });
    });
    return () => {
      cancelled = true;
    };
  }, [formId, targetId]);

  return <div ref={containerRef} id={targetId}></div>;
};

export default HubSpotForm;
