import React, { useEffect } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import '../styles/Styles.css';

export const RSVP = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navigation />
      <div className="main-content">
        <div className="rsvp-container">
          <div className="section-title">RSVP</div>
          <p className="rsvp-coming-soon">Coming soon!</p>
        </div>
        <Footer />
      </div>
    </div>
  );
};
