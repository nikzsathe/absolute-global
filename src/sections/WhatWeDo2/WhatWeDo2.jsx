import React from 'react';

const firstRow = [
  { img: 'Featured-B2B-Communicat-on-Strategy.webp', label: <>B2B Communication Strategy</>, mb0: true },
  { img: 'Featured-Lead-Generation.webp', label: <>Lead <br className="d-none d-md-block" />Generation</> },
  { img: 'Featured-Content-Creation.webp', label: <>Content Creation</> },
  { img: 'Featured-Sales-Enablement.webp', label: <>Sales <br className="d-none d-md-block" />Enablement</> },
  { img: 'Featured-Lead-Nurturing.webp', label: <>Lead Nurturing </> },
  { img: 'Featured-Thought-Leadership.webp', label: <>Thought <br className="d-none d-md-block" />Leadership</> }
];

const secondRow = [
  { img: 'Featured-Graphics-and-Videos.webp', label: <>Graphics <br className="d-none d-md-block" />and Videos</>, mb0: true },
  { img: 'Featured-Corporate-Branding.webp', label: <>Corporate <br className="d-none d-md-block" />Branding</> },
  { img: 'Featured-B2B-Social-Media.webp', label: <>B2B <br className="d-none d-md-block" />Social Media</> },
  { img: 'Featured-Search-and-Display-Marketing.webp', label: <>Search and Display <br className="d-none d-md-block" />Marketing</> },
  { img: 'Featured-Global-Customer-Acquisition.webp', label: <>Global Customer <br className="d-none d-md-block" />Acquisition </> },
  { img: 'Featured-Strategic-Partnerships.webp', label: <>Strategic <br className="d-none d-md-block" />Partnerships</> }
];

const FeaturedBox = ({ item }) => (
  <div className="col-6 col-md-4 col-lg-2 d-flex align-items-stretch mb-lg-0 featured-col">
    <div className="featured-box w-100 text-center">
      <img className="img-fluid" src={`/assets/img/${item.img}`} alt={item.img.replace('.webp', '')} />
      <p className={item.mb0 ? 'mb-0' : ''}>{item.label}</p>
    </div>
  </div>
);

const WhatWeDo2 = () => {
  return (
    <section id="what-we-do2" className="what-we-do2 bg-3">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-title text-center">
              <h2 className="h1 c-1">What We Do</h2>
              <div className="bottom-border d-block w-100">
                <span className="line-1 bg-1"></span>
                <span className="line-2 bg-2"></span>
                <span className="line-3 bg-1"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="row no-gutters first-row">
          {firstRow.map((item) => <FeaturedBox key={item.img} item={item} />)}
        </div>
        <div className="row no-gutters second-row">
          {secondRow.map((item) => <FeaturedBox key={item.img} item={item} />)}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo2;
