import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import '../styles/Styles.css';

const faqItems = [
  {
    question: "Question here?",
    answer: "Answer here."
  },
  {
    question: "Question here?",
    answer: "Answer here."
  },
  {
    question: "Question here?",
    answer: "Answer here."
  },
  {
    question: "Question here?",
    answer: "Answer here."
  },
  {
    question: "Question here?",
    answer: "Answer here."
  },
];

export const Questions = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div>
      <Navigation />
      <div className="main-content">
        <div className="faq-container">
          <div className="section-title">Your Questions, Answered</div>
          <div className="faq-expand-list">
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
                <div
                  className="faq-question-container"
                  onClick={() => toggleQuestion(index)}
                >
                  <div className="faq-question">{item.question}</div>
                  <div className="chevron-container">
                    {openQuestion === index ? (
                      <ChevronUp size={28} color="var(--color-navy)" />
                    ) : (
                      <ChevronDown size={28} color="var(--color-navy)" />
                    )}
                  </div>
                </div>
                <div
                  className={`faq-answer ${openQuestion === index ? 'open' : ''}`}
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
                {index < faqItems.length - 1 && <div className="faq-separator" />}
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
