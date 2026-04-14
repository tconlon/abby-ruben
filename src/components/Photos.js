import React, { useEffect } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import '../styles/Styles.css';

const timelineEntries = [
  { date: "march 12, 2022", side: "left", photo: "/assets/photos/ar_1.png" },
  { date: "june 22, 2022", side: "right", photo: "/assets/photos/ar_2.png" },
  { date: "august 9, 2023", side: "left", photo: "/assets/photos/ar_3.png" },
  { date: "september 20, 2023", side: "right", photo: "/assets/photos/ar_4.png" },
  { date: "october 4, 2024", side: "left", photo: "/assets/photos/ar_5.png" },
  { date: "may 14, 2024", side: "right", photo: "/assets/photos/ar_6.png" },
  { date: "september 18, 2024", side: "left", photo: "/assets/photos/ar_7.png" },
  { date: "june 13, 2025", side: "right", photo: "/assets/photos/ar_8.png" },
  { date: "december 13, 2025", side: "left", photo: "/assets/photos/ar_9.png" },
];

export const Photos = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navigation />
      <div className="main-content">
        <div className="photos-container">
          <div className="timeline">
            {timelineEntries.map((entry, index) => (
              <div key={index} className={`timeline-entry timeline-${entry.side}`}>
                <div className="timeline-date">{entry.date}</div>
                <div className="timeline-dot"></div>
                <div className="timeline-photo">
                  <img
                    src={entry.photo}
                    alt={entry.date}
                    className="timeline-image"
                  />
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
