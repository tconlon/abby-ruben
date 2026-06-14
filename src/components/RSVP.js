import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import '../styles/Styles.css';

const SHEETS_API_URL = 'https://script.google.com/macros/s/AKfycbzRek-BZlmm0OEcwtZfud8CioeXGnhnO51Ug9c5U77Z10fZfIwt89T1xy2f98Jy5PEgBg/exec';

export const RSVP = () => {
  const [rsvpData, setRsvpData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [householdOptions, setHouseholdOptions] = useState([]);
  const [selectedGuests, setSelectedGuests] = useState([]);
  const [step, setStep] = useState(1);
  const [guestResponses, setGuestResponses] = useState({});
  const [status, setStatus] = useState({
    loading: false,
    submitting: false,
    submitSuccess: false,
    submitError: null,
    noResults: false,
    loadError: false
  });
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setStatus(prev => ({ ...prev, loading: true, loadError: false }));

      try {
        const response = await fetch(`${SHEETS_API_URL}?action=getGuests`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setRsvpData(data);
        } else {
          console.error('Invalid RSVP data format:', data);
          setRsvpData([]);
          setStatus(prev => ({ ...prev, loadError: true }));
        }
      } catch (error) {
        console.error('Error loading RSVP data:', error);
        setRsvpData([]);
        setStatus(prev => ({ ...prev, loadError: true }));
      } finally {
        setStatus(prev => ({ ...prev, loading: false }));
      }
    };

    loadData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setStatus(prev => ({ ...prev, noResults: false, loading: true }));

    const trimmedSearchTerm = searchTerm.trim();

    if (!trimmedSearchTerm) {
      setSearchResults([]);
      setHouseholdOptions([]);
      setSelectedGuests([]);
      setStatus(prev => ({ ...prev, loading: false }));
      return;
    }

    const matchingHouseholdIds = new Set();
    const normalizedSearch = trimmedSearchTerm.toLowerCase();

    rsvpData.forEach(guest => {
      const firstName = String(guest.first_name || '').toLowerCase();
      const lastName = String(guest.last_name || '').toLowerCase();

      if (firstName === normalizedSearch || lastName === normalizedSearch) {
        matchingHouseholdIds.add(guest.group);
      }
    });

    const matchingHouseholds = Array.from(matchingHouseholdIds).map(group => ({
      group,
      guests: rsvpData.filter(guest => guest.group === group)
    }));

    const results = matchingHouseholds.flatMap(household => household.guests);

    if (results.length === 0) {
      setStatus(prev => ({ ...prev, noResults: true }));
    }

    if (matchingHouseholds.length === 1) {
      setSearchResults(matchingHouseholds[0].guests);
      setHouseholdOptions([]);
    } else {
      setSearchResults([]);
      setHouseholdOptions(matchingHouseholds);
    }

    setSelectedGuests([]);
    setStatus(prev => ({ ...prev, loading: false }));
  };

  const getGuestName = (guest) => `${guest.first_name} ${guest.last_name}`;

  const getHouseholdLabel = (guests) => guests.map(getGuestName).join(', ');

  const handleHouseholdSelection = (household) => {
    setSearchResults(household.guests);
    setHouseholdOptions([]);
    setSelectedGuests([]);
  };

  const handleGuestSelection = (guestId) => {
    if (selectedGuests.includes(guestId)) {
      setSelectedGuests(selectedGuests.filter(id => id !== guestId));
    } else {
      setSelectedGuests([...selectedGuests, guestId]);
    }
  };

  const handleNext = () => {
    if (selectedGuests.length === 0) return;

    const initialResponses = {};

    selectedGuests.forEach(guestId => {
      const guest = searchResults.find(g => g.id === guestId);

      initialResponses[guestId] = {
        name: `${guest.first_name} ${guest.last_name}`,
        events: [],
        notes: guest.notes || '',
        hasResponded: guest.responded === true
      };

      if (guest.responded === true) {
        if (guest.friday === true) initialResponses[guestId].events.push('friday');
        if (guest.saturday === true) initialResponses[guestId].events.push('saturday');
        if (guest.decline === true) initialResponses[guestId].events.push('decline');
      }
    });

    setGuestResponses(initialResponses);
    setStep(2);
  };

  const handleEventSelection = (guestId, event) => {
    setGuestResponses(prev => {
      const guestData = { ...prev[guestId] };

      if (guestData.events.includes(event)) {
        guestData.events = guestData.events.filter(selectedEvent => selectedEvent !== event);
      } else {
        guestData.events = [...guestData.events, event];
      }

      return { ...prev, [guestId]: guestData };
    });
  };

  const handleNotesChange = (guestId, notes) => {
    setGuestResponses(prev => ({
      ...prev,
      [guestId]: { ...prev[guestId], notes }
    }));
  };

  const resetAndGoHome = () => {
    setSearchTerm('');
    setSearchResults([]);
    setHouseholdOptions([]);
    setSelectedGuests([]);
    setGuestResponses({});
    setStep(1);
    setStatus(prev => ({ ...prev, submitSuccess: false }));
    navigate('/');
  };

  const handleSubmit = async () => {
    setStatus(prev => ({ ...prev, submitting: true, submitError: null }));

    try {
      const responses = selectedGuests.map(guestId => {
        const response = guestResponses[guestId];

        return {
          id: guestId,
          responded: true,
          friday: response.events.includes('friday'),
          saturday: response.events.includes('saturday'),
          decline: response.events.includes('decline'),
          notes: response.notes || ''
        };
      });

      const formData = new FormData();
      formData.append('data', JSON.stringify({
        action: 'updateRSVPs',
        responses
      }));

      fetch(SHEETS_API_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      }).catch(error => {
        console.log('Fetch error (can be ignored):', error);
      });

      setStatus(prev => ({ ...prev, submitSuccess: true }));
      setStep(3);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setStatus(prev => ({
        ...prev,
        submitError: 'There was an error submitting your RSVP. Please try again or contact us directly.'
      }));
    } finally {
      setStatus(prev => ({ ...prev, submitting: false }));
    }
  };

  return (
    <div>
      <Navigation />
      <div className="main-content">
        <div className="rsvp-container">
          <div className="section-title">RSVP</div>

          {step === 1 && !status.submitSuccess && (
            <div className="rsvp-search-section">
              <form onSubmit={handleSearch} className="rsvp-search-form">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={status.loading && rsvpData.length === 0 ? 'Loading guest list...' : 'Enter your first or last name'}
                  className="rsvp-input"
                  disabled={rsvpData.length === 0 || status.loadError}
                />
                <button
                  type="submit"
                  className="rsvp-button"
                  disabled={status.loading || rsvpData.length === 0 || status.loadError}
                >
                  {status.loading ? 'Searching...' : 'Search'}
                </button>
              </form>

              {status.loading && rsvpData.length === 0 && (
                <div className="loading-indicator">Loading guest list...</div>
              )}

              {status.loadError && !status.loading && (
                <div className="load-error">
                  We had trouble loading the guest list. Please refresh this page or contact us directly.
                </div>
              )}

              {status.noResults && !status.loading && (
                <div className="no-results-message">
                  We can't pull up any invites for that name!
                  Please try again, or try with the first or last name of someone else in your party.
                </div>
              )}

              {householdOptions.length > 0 && !status.loading && (
                <div className="household-results">
                  <p>We found a few parties for that name. Which one is yours?</p>
                  <div className="household-list">
                    {householdOptions.map(household => (
                      <button
                        key={String(household.group)}
                        type="button"
                        className="household-option"
                        onClick={() => handleHouseholdSelection(household)}
                      >
                        {getHouseholdLabel(household.guests)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.length > 0 && !status.loading && (
                <div className="rsvp-results">
                  <p>Select who you're responding for:</p>
                  <div className="guest-list">
                    {searchResults.map(guest => (
                      <div key={guest.id} className="guest-item">
                        <label>
                          <input
                            type="checkbox"
                            checked={selectedGuests.includes(guest.id)}
                            onChange={() => handleGuestSelection(guest.id)}
                          />
                          <span>{guest.first_name} {guest.last_name}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleNext}
                    className="rsvp-button"
                    disabled={selectedGuests.length === 0}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 2 && !status.submitSuccess && (
            <div className="rsvp-details-section">
              {selectedGuests.map(guestId => {
                const guestData = guestResponses[guestId];

                return (
                  <div key={guestId} className="guest-response">
                    <h3>{guestData.name}</h3>

                    {guestData.hasResponded && (
                      <div className="already-responded-message">
                        We already have your RSVP with the following info!
                        Please edit if you need, but otherwise, you're good to go.
                      </div>
                    )}

                    <div className="event-selection">
                      <p>Which events will you attend?</p>
                      <div className="event-options">
                        <label>
                          <input
                            type="checkbox"
                            checked={guestData.events.includes('friday')}
                            onChange={() => handleEventSelection(guestId, 'friday')}
                          />
                          <span>Wedding Day (Friday, October 23)</span>
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={guestData.events.includes('saturday')}
                            onChange={() => handleEventSelection(guestId, 'saturday')}
                          />
                          <span>Brews + Bites (Saturday, October 24)</span>
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={guestData.events.includes('decline')}
                            onChange={() => handleEventSelection(guestId, 'decline')}
                          />
                          <span>Regretfully Decline (We'll find another time to celebrate!)</span>
                        </label>
                      </div>
                    </div>

                    <div className="notes-section">
                      <p>Any allergies, dietary restrictions, or notes you'd like to share with us?</p>
                      <p>Also, if you intend to bring your kids to Saturday's Brews + Bites, please let us know here!</p>
                      <textarea
                        value={guestData.notes}
                        onChange={(e) => handleNotesChange(guestId, e.target.value)}
                        placeholder="Please list anything you'd like us to know, or leave blank."
                        className="notes-input"
                      />
                    </div>
                  </div>
                );
              })}

              <div className="rsvp-buttons">
                <button
                  onClick={() => setStep(1)}
                  className="rsvp-button secondary"
                  disabled={status.submitting}
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="rsvp-button"
                  disabled={status.submitting}
                >
                  {status.submitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>

              {status.submitError && (
                <div className="submit-error">
                  {status.submitError}
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="submit-success">
              <h2>Thank you!</h2>
              <p>
                Your response has been recorded. You can update your response at any time
                before September 20, 2026 by coming back to this page.
              </p>
              <p>We're looking forward to seeing you!</p>
              <button
                onClick={resetAndGoHome}
                className="rsvp-button"
              >
                Home
              </button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};
