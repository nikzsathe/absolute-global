import React, { useState } from 'react';

// Accordion replicating the original jQuery slideToggle behavior:
// one answer open at a time, clicking a question opens it and closes the others.
const FAQQuestions = ({ items }) => {
  const initialOpen = items.findIndex((it) => it.active);
  const [open, setOpen] = useState(initialOpen);

  const toggle = (index) => {
    setOpen((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="questions">
      {items.map((item, index) => (
        <div className={`single-question ${open === index ? 'active' : ''}`} key={index}>
          <div onClick={() => toggle(index)}>
            <h3>{item.q}</h3>
            <i className="fas fa-angle-down"></i>
          </div>
          <p className="answer" style={open === index ? { display: 'block' } : undefined}>{item.a}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQQuestions;
