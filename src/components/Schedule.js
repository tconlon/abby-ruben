import React, { useEffect } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import '../styles/Styles.css';

const DotChainDivider = () => (
  <div className="dot-chain-divider">
    {[...Array(36)].map((_, i) => (
      <span key={i} className="chain-dot"></span>
    ))}
  </div>
);

const EventCard = ({ title, date, time, venue, address, mapsUrl, attire }) => (
  <div className="schedule-event-card">
    <div className="schedule-event-name">{title}</div>
    <div className="schedule-event-datetime">{date} | {time}</div>
    {venue && (
      <div className="schedule-event-venue">
        {mapsUrl ? (
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer">{venue}</a>
        ) : (
          venue
        )}
      </div>
    )}
    {address && <div className="schedule-event-address">{address}</div>}
    {attire && <div className="schedule-event-attire">Attire: <em>{attire}</em></div>}
  </div>
);

export const Schedule = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navigation />
      <div className="main-content">
        <div className="schedule-container">
          <div className="section-title">Weekend Agenda</div>

          <EventCard
            title="Wedding Day"
            date="Fri Oct 23, 2026"
            time="5–11:30PM"
            venue="The Joinery"
            address="2533 W Homer St, Chicago IL 60647"
            mapsUrl="https://maps.app.goo.gl/placeholder"
            attire="Cocktail"
          />

          <DotChainDivider />

          <EventCard
            title="Late Night"
            date="Fri Oct 23, 2026"
            time="11:30PM–Late"
            venue="TBD"
          />

          <DotChainDivider />

          <EventCard
            title="Brews + Bites"
            date="Sat Oct 24, 2026"
            time="12–2PM"
            venue="Pilot Project"
            address="2140 N Milwaukee Ave, Chicago IL 60647"
            mapsUrl="https://maps.app.goo.gl/placeholder"
            attire="Casual"
          />
        </div>
        <Footer />
      </div>
    </div>
  );
};
