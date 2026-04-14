import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Styles.css';

export const Navigation = () => {
  const location = useLocation();

  const links = [
    { to: '/', label: 'home' },
    { to: '/schedule', label: 'schedule' },
    { to: '/questions', label: 'questions' },
    { to: '/our-faves', label: 'our faves' },
    { to: '/photos', label: 'photos' },
    { to: '/rsvp', label: 'rsvp' },
  ];

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <Link to="/" className="nav-title">abby + ruben</Link>
        <div className="nav-links">
          {links.map((link, index) => (
            <React.Fragment key={link.to}>
              <Link
                to={link.to}
                className={location.pathname === link.to ? 'active' : ''}
              >
                {link.label}
              </Link>
              {index < links.length - 1 && <span className="nav-dot">•</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};
