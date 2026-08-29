import React, { useEffect } from 'react';

// HubSpot chat embed (present on every original page)
const HubSpotChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'hs-script-loader';
    script.async = true;
    script.defer = true;
    script.src = '//js-na1.hs-scripts.com/44898170.js';
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);
  return null;
};

export default HubSpotChat;
