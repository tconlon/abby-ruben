import React, { useEffect } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import '../styles/Styles.css';

const GOOGLE_MAPS_LIST_URL =
  'https://www.google.com/maps/@41.9180302,-87.6961063,7634m/data=!3m1!1e3!4m7!1m3!11m2!2sCXQqdYNvACsEWEI26SArzg!3e3!11m2!2sCXQqdYNvACsEWEI26SArzg!3e3?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D';

export const OurFaves = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navigation />
      <div className="main-content">
        <div className="faves-container">
          <div className="faves-map">
            <img
              src="/assets/favorites/neighborhood.webp"
              alt="Our neighborhood map"
              className="faves-map-image"
            />
          </div>
          <div className="section-title">Local Recommendations</div>
          <p className="faves-intro">
            We&rsquo;ve dropped our favorite places in Chicago &mdash; where to
            stay, eat, drink, and explore &mdash; onto a Google Maps list, with
            comments. Take it with you.
          </p>
          <div className="faves-cta">
            <a
              href={GOOGLE_MAPS_LIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="faves-map-link"
            >
              View our picks on Google Maps
            </a>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
