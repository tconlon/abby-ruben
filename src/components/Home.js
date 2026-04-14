import React, { useEffect } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import '../styles/Styles.css';

const WavyDivider = () => (
  <div className="divider-container">
    <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="wavy-divider">
      <path
        d="M0,20 C150,40 350,0 500,20 C650,40 850,0 1000,20 C1100,32 1150,20 1200,20"
        fill="none"
        stroke="#d4952a"
        strokeWidth="2.5"
      />
    </svg>
  </div>
);

const DotDivider = () => (
  <div className="dot-divider">
    {[...Array(5)].map((_, i) => (
      <span key={i} className="gold-dot">•</span>
    ))}
  </div>
);

const HeroSection = () => (
  <div className="hero-container">
    <div className="hero-text">
      <div className="names-text">
        <div>Abigail +</div>
        <div>Ruben</div>
      </div>
      <p className="location-text">October 23, 2026 — Chicago, IL</p>
    </div>
    <div className="hero-image">
      <img
        src={"/assets/home/abby-ruben-sketch_transparent.png"}
        alt="Abigail and Ruben"
        className="couple-image"
      />
    </div>
  </div>
);

export const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navigation />
      <div className="main-content">
        <HeroSection />
        <WavyDivider />
        <DotDivider />
        <Footer />
      </div>
    </div>
  );
};
