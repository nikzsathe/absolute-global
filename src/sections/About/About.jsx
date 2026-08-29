import React, { useRef, useState } from 'react';

const About = () => {
  const videoRef = useRef(null);
  const [btnLabel, setBtnLabel] = useState(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setBtnLabel('Pause');
    } else {
      video.pause();
      setBtnLabel('Play');
    }
  };

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-title">
          <h2>Grow Your Business With Our Leads</h2>
          <p>We help businesses increase their sales, decrease their acquisition cost, improve their ROI and enhance their marketing strategy.</p>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="about">
              <video id="myVideo" ref={videoRef} playsInline onContextMenu={(e) => e.preventDefault()} autoPlay>
                <source src="/assets/img/PA8HIG4087S7ML4H_1705692697233.mp4" type="video/mp4" />
              </video>
              <button id="playPauseBtn" className="button" onClick={togglePlay}>
                {btnLabel === null ? (
                  <span className="visually-hidden"></span>
                ) : (
                  btnLabel
                )}
                {btnLabel === null && (
                  <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="26px">
                    <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" fill="currentColor"></path>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0">
            <h3 style={{ textAlign: 'center' }}>About Us</h3>
            <p>
              <h3 style={{ textAlign: 'center' }}>At Absolute Global Outsourcing, we specialize in collaborating with Media Agencies, Publishers, and Marketing companies, focusing on the integration of AI-driven lead generation programs through marketing automation and digital strategies.
              Our team comprises seasoned marketing professionals well-versed in the latest trends and industry practices. We harness state-of-the-art AI technology, employ advanced data analysis tools, and apply creative thinking to craft customized marketing strategies tailored to meet the unique needs of our clients.
              Our unwavering commitment is to provide outstanding service, characterized by responsiveness, meticulous attention to detail, and the assurance of delivering high-quality leads that translate into genuine business results.</h3>
            </p>
            <ul>
              <li><i className="bx bx-check-circle"></i>As a comprehensive marketing entity, our primary objective is to empower businesses of all sizes to thrive in the contemporary competitive landscape. Recognizing the paramount importance of intelligent marketing in fostering business expansion, our team is dedicated to deploying innovative solutions that yield tangible outcomes.</li>
              <li><i className="bx bx-check-circle"></i> Our overarching mission is to assist clients in achieving their sales objectives and fostering business growth through the implementation of highly effective AI-enhanced lead generation techniques.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
