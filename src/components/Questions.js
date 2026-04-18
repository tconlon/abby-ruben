import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import '../styles/Styles.css';

const faqItems = [
  {
    question: "Do you have an RSVP deadline?",
    answer: "Please RSVP by September 20, 2026. After this time we will be unable to accommodate guests but will find another way to celebrate with you!"
  },
  {
    question: "Will you have a registry or are you accepting gifts?",
    answer: "Answer coming soon…"
  },
  {
    question: "Is there a dress code?",
    answer: "We ask all guests to dress in cocktail attire. Dresses knee-length or longer are best and suits with a dress shirt (tie-optional) and nice pants. We kindly ask that there are no jeans or &ldquo;Sunday Best&rdquo;&mdash;save that for Saturday, where there is no dress code!\n\nHere are some examples:\n<a href=\"https://www.brides.com/cocktail-attire-wedding-4844364\" target=\"_blank\" rel=\"noopener noreferrer\">brides.com</a> · <a href=\"https://www.theknot.com/content/cocktail-wedding-attire\" target=\"_blank\" rel=\"noopener noreferrer\">theknot.com</a>"
  },
  {
    question: "Is your wedding indoors or outdoors?",
    answer: "The main portions of the wedding will be indoors, but there&rsquo;s an outdoor area that you can enjoy as well. You know where you&rsquo;ll find Abby, regardless of the weather! Please bring a jacket if you&rsquo;re concerned about being cold."
  },
  {
    question: "Are children allowed at the wedding?",
    answer: "We want to make sure everyone is as present as possible during our wedding and ask that there are no children. We would love to give them extra hugs on Saturday for lunch at Pilot Project&mdash;please include them in your RSVP for that date."
  },
  {
    question: "Can I bring a plus one to the wedding?",
    answer: "We are focusing on making it an intimate weekend with our families and closest friends and kindly ask there are no additional people unless specified on the invite.\n\nWe would love to see all family and friends on Saturday, just include their names in the RSVP for the lunch and we&rsquo;ll do our best to accommodate!"
  },
  {
    question: "Where is the ceremony located? When should I get there?",
    answer: "Everything for our wedding is walking distance to our condo in the Bucktown, Logan Square, and Palmer Square neighborhoods.\n\nThe wedding ceremony starts promptly at 5 PM. Please plan to arrive at least 15 minutes beforehand to take your seats. If you arrive after 5 PM we will ask that you wait outside until the ceremony is over."
  },
  {
    question: "What&rsquo;s the best way to get to the venue? To Saturday&rsquo;s lunch?",
    answer: "<strong>The Joinery</strong> &mdash; 2533 W Homer St, Chicago, IL 60647 &mdash; is where our ceremony and reception will be held.\n• CTA Blue Line &mdash; 1.5 blocks from the Western stop\n• Rideshares &mdash; Uber, Lyft, Curb\n• Walk! This is how Abby will be rolling up to the wedding!\n• Parking &mdash; please don&rsquo;t drive. If you must: the opposite (north) side of Homer St. is free. Read street signs, and a designated driver is mandatory :)\n\n<strong>Pilot Project Brewing</strong> &mdash; 2140 N Milwaukee Ave, Chicago, IL 60647 &mdash; Saturday lunch.\n• CTA Blue Line &mdash; California stop, 7-minute walk\n• CTA 56 bus from downtown drops you right out front\n• Rideshare\n• Parking &mdash; plenty of spots within walking distance; again, only drive if there&rsquo;s a DD! Use the Park Chicago App to pay for parking."
  },
  {
    question: "Are pictures or phones allowed?",
    answer: "We kindly ask no phones be present during the ceremony or wedding. We have an incredible photographer who will make sure all the best moments are captured."
  },
  {
    question: "What if I have dietary restrictions?",
    answer: "Please include them in your RSVP. We will accommodate everyone if given a proper heads up by the deadline of 9/20/26!"
  },
  {
    question: "What should we do in Chicago while we&rsquo;re visiting?",
    answer: "We planned a Friday wedding so all our family and friends can enjoy our fav city the rest of the weekend! Check out <a href=\"/our-faves\">Our Faves</a> for more recs &mdash; we&rsquo;ve linked a Google Maps list with comments on our favorite places and activities!"
  },
  {
    question: "What should we expect the weather to be like in October in Chicago?",
    answer: "Late October is usually cool, crisp days with some wind &mdash; it is the Windy City, after all! We will have a coat check at the venue, so we recommend bringing a coat. Pack layers and check the weather in advance, specifically the &ldquo;feels like&rdquo; temperature."
  },
  {
    question: "Where should we stay? Is there a room block?",
    answer: "We have a limited number of rooms at <strong>The Robey Hotel</strong>, one train stop away on the CTA Blue Line. Please email the reservation team at <a href=\"mailto:reservation@therobey.com\">reservation@therobey.com</a> or call <a href=\"tel:+18723153050\">(872) 315-3050</a> (M&ndash;F, 11 AM&ndash;7 PM) and mention the Kendall-Villarreal Wedding block (must book by September 22, 2026).\n\nAirbnb is a great option in the area for families or groups &mdash; look around Bucktown and Logan Square to be near the venue.\n\nHyatt Place Chicago / Wicker Park is an easy train or Uber ride away. The Hotel at Midtown is a fantastic option nearby with amazing rooftop views. There are tons of options in The Loop, ranging from $ to $$$$ and all accessible via train or rideshare. We&rsquo;re happy to help navigate more options &mdash; just email us!"
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
                  <div
                    className="faq-question"
                    dangerouslySetInnerHTML={{ __html: item.question }}
                  />
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
          <p className="faq-footer">
            Question not answered? Shoot us an email at{' '}
            <a href="mailto:abigailandruben@gmail.com">abigailandruben@gmail.com</a>
            {' '}&mdash; just give us a day or two to respond!
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
};
