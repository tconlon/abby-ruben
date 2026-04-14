import React, { useEffect } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import '../styles/Styles.css';

const categories = [
  {
    name: "Where To Stay",
    items: ["Recommendation coming soon..."]
  },
  {
    name: "What To Eat",
    items: ["Recommendation coming soon..."]
  },
  {
    name: "What To Do",
    items: ["Recommendation coming soon..."]
  },
  {
    name: "Coffee & Drinks",
    items: ["Recommendation coming soon..."]
  },
];

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
              src="/assets/favorites/neighborhood.png"
              alt="Our neighborhood map"
              className="faves-map-image"
            />
          </div>
          <div className="section-title">Local Recommendations</div>
          <div className="faves-content">
            {categories.map((category, index) => (
              <div key={index} className="faves-category">
                <div className="faves-category-name">{category.name}</div>
                <div className="faves-items">
                  {category.items.map((item, i) => (
                    <div key={i} className="faves-item">{item}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
