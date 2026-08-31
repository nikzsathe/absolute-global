import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {client} from '../../sanity/client';
import {SERVICES_QUERY} from '../../sanity/queries';

// Per-row class pattern of the original hardcoded layout (image column, text column extras)
const ROW_CLASSES = [
  {imgCol: 'col-lg-5', textCol: 'col-lg-6 pt-4 pt-lg-0', eff: true},
  {imgCol: 'col-lg-5', textCol: 'col-lg-6 pt-4 pt-lg-0'},
  {imgCol: 'col-lg-6', textCol: 'col-lg-6 pt-4 pt-lg-0'},
  {imgCol: 'col-lg-5', textCol: 'col-lg-6 pt-4 pt-lg-0'},
  {imgCol: 'col-lg-6', textCol: 'col-lg-6 pt-4 pt-lg-0'},
];

const scrollToHash = (e, href) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (!target) return;
  const headerEl = document.getElementById('header');
  const offset = (headerEl ? headerEl.offsetHeight : 70) - 1;
  window.scrollTo({top: target.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth'});
};

const bodyText = (body) =>
  !body
    ? ''
    : body
        .map((b) => (b.children ? b.children.map((c) => c.text).join('') : ''))
        .join('\n\n');

const ServiceRow = ({service, index}) => {
  const cls = ROW_CLASSES[index % ROW_CLASSES.length];
  const imgCol = (
    <div className={`${cls.imgCol} zoom-container`}>
      <img
        src={service.imageUrl}
        className="img-fluid"
        alt={service.imageAlt || service.title}
      />
    </div>
  );
  const textContent = (
    <>
      <h2 style={{textAlign: 'center'}}><strong>{service.title}</strong></h2>
      {bodyText(service.body)
        .split('\n\n')
        .map((para, i, arr) => (
          <React.Fragment key={i}>
            {para}
            {i < arr.length - 1 ? <br /> : null}
            {i < arr.length - 1 ? <br /> : null}
          </React.Fragment>
        ))}
      {service.ctaLabel && service.ctaRoute ? (
        <>
          <br />
          <br />
          <Link to={service.ctaRoute} className="btn-get-started scrollto">
            {service.ctaLabel}
          </Link>
        </>
      ) : null}
    </>
  );
  const textCol = (
    <div className={cls.textCol}>
      {cls.eff ? <div className="eff">{textContent}</div> : textContent}
    </div>
  );

  return (
    <>
      <div className="row">
        {index % 2 === 0 ? (
          <>
            {imgCol}
            {textCol}
          </>
        ) : (
          <>
            {textCol}
            {imgCol}
          </>
        )}
      </div>
      <br /><br /><br /><br />
    </>
  );
};

const SanityServices = ({services}) => (
  <section id="what-we-do" className="what-we-do">
    <div className="container">
      <div className="section-title">
        <h2>Services</h2>
        <p>Proficient in providing targeted sales, marketing, and high-intent leads of exceptional quality.</p>
      </div>
      {services.map((service, i) => (
        <ServiceRow key={service._id} service={service} index={i} />
      ))}
    </div>
  </section>
);

export default SanityServices;
