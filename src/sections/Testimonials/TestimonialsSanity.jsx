import React from 'react';

const TestimonialsSanity = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="testimonials-carousel owl-carousel">
              {testimonials.map((testimonial) => (
                <div className="item" key={testimonial._id}>
                  <div className="testimonial-item">
                    {testimonial.authorImageUrl && (
                      <div className="testimonial-img">
                        <img src={testimonial.authorImageUrl} alt={testimonial.authorName} />
                      </div>
                    )}
                    <h3>{testimonial.authorName}</h3>
                    {testimonial.authorTitle && (
                      <h4>{testimonial.authorTitle}{testimonial.company ? ', ' + testimonial.company : ''}</h4>
                    )}
                    {!testimonial.authorTitle && testimonial.company && (
                      <h4>{testimonial.company}</h4>
                    )}
                    <div className="quote-icon-left">
                      <i className="ri-double-quotes-l"></i>
                    </div>
                    <p>{testimonial.quote}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSanity;