import React, { useEffect, useState } from 'react';

const CookieBanner = () => {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('cookieAgreed')) {
      const timer = setTimeout(() => setHidden(false), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const agree = () => {
    setHidden(true);
    localStorage.setItem('cookieAgreed', 'true');
  };

  return (
    <div className={`cookie-container ${hidden ? 'hide' : ''}`}>
      <p className="cookie-text">
        We use cookies and similar technologies that are necessary to operate the website. Additional cookies are used to perform analysis of website usage. By continuing to use our website, consent to our use of cookies. For more information, please read our <a href="https://absolute-global.com/privacy-policy/"> Privacy Policy.</a>
      </p>
      <div className="agree">
        <button onClick={agree}>Got it</button>
      </div>
    </div>
  );
};

export default CookieBanner;
