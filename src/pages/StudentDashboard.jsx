import React, { useRef, useEffect, useState } from 'react';
import './AuthPage.css';
import JobsImg from '../assets/jobapply.webp';
import InternshipsImg from '../assets/Intership.jpeg';
import EventsImg from '../assets/Events.jpg';

const mncLogos = [
  { name: 'Google', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Microsoft', src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  { name: 'Amazon', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Facebook', src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' },
  { name: 'Apple', src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'IBM', src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
];

const sections = [
  {
    id: 'jobs',
    title: 'Jobs',
    description: (
      <>
        Your dream job is just one click away <br />apply to top companies today
      </>
    ),
    image: JobsImg,
    imageFirst: false,
  },
  {
    id: 'internships',
    title: 'Internships',
    description: (
      <>
        Start your journey with internships at the best companies in the industry
      </>
    ),
    image: InternshipsImg,
    imageFirst: true,
  },
  {
    id: 'events',
    title: 'Events',
    description: (
      <>
        Join hackathons, tech talks, and workshops to learn, build, and connect with the tech community
      </>
    ),
    image: EventsImg,
    imageFirst: false,
  },
];

const stats = [
  { label: 'Users Got Jobs', value: '2340' },
  { label: 'Active Users', value: '8900' },
  { label: 'Companies Hiring', value: '120' },
  { label: 'Internships Filled', value: '1500' },
];

const AnimatedStat = ({ value, duration = 1200 }) => {
  const [displayDigits, setDisplayDigits] = useState(() => Array.from(String(value), () => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    const digits = String(value).split('');
    const steps = 30;
    const interval = duration / steps;
    let currentStep = 0;
    const anim = setInterval(() => {
      setDisplayDigits((prev) =>
        prev.map((d, i) => {
          if (isNaN(Number(digits[i]))) return digits[i];
          const target = Number(digits[i]);
          const progress = Math.min(1, currentStep / steps);
          return Math.floor(progress * target);
        })
      );
      currentStep++;
      if (currentStep > steps) {
        setDisplayDigits(digits);
        clearInterval(anim);
      }
    }, interval);
    return () => clearInterval(anim);
  }, [hasAnimated, value, duration]);

  return (
    <span ref={ref} style={{ display: 'inline-block', letterSpacing: '2px' }}>
      {displayDigits.map((d, i) => (
        <span key={i}>{d}</span>
      ))}
      +
    </span>
  );
};

const StudentDashboard = () => {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'));
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, idx * 350);
          }
        });
      },
      { threshold: 0.2 }
    );
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="custom-bg">
      <nav className="dashboard-navbar-fixed">
        <span className="dashboard-navbar-logo">Zidio Connect</span>
        <div className="dashboard-navbar-links">
          <span className="dashboard-navbar-link" onClick={() => handleNavClick('jobs')}>Jobs</span>
          <span className="dashboard-navbar-link" onClick={() => handleNavClick('internships')}>Internships</span>
          <span className="dashboard-navbar-link" onClick={() => handleNavClick('events')}>Events</span>
        </div>
        <button className="dashboard-navbar-profile-btn">Profile</button>
      </nav>
      <div className="hero-section">
        <div className="hero-section-left">
          <div className="hero-section-title">Always Stay<br />Connected</div>
          <button className="hero-section-btn">Get Started</button>
        </div>
        <div className="hero-section-right">
          <div className="hero-section-img-wrapper">
            <img src={JobsImg} alt="Stay Connected" className="hero-section-img" />
          </div>
        </div>
      </div>

      <div className="custom-sections-wrapper">
        {sections.map((section, idx) => (
          <React.Fragment key={section.title}>
            <div
              className="custom-section-card custom-section-card-large"
              ref={el => (cardRefs.current[idx] = el)}
              data-idx={idx}
              id={section.id}
            >
              <div className={`custom-section-inner${section.imageFirst ? ' reverse' : ''}`}>
                {section.imageFirst && (
                  <div className="custom-section-img-wrapper">
                    <img src={section.image} alt={section.title} className="custom-section-img" />
                  </div>
                )}
                <div className="custom-section-text">
                  <h2 className="custom-section-title">{section.title}</h2>
                  <p className="custom-section-desc">{section.description}</p>
                  <button className="explore-btn">Start Exploring</button>
                </div>
                {!section.imageFirst && (
                  <div className="custom-section-img-wrapper">
                    <img src={section.image} alt={section.title} className="custom-section-img" />
                  </div>
                )}
              </div>
            </div>
            {idx < sections.length - 1 && <div className="custom-section-divider" />}
          </React.Fragment>
        ))}

        {/* Stats Section */}
        <div
          className="custom-section-card custom-section-card-large"
          ref={el => (cardRefs.current[sections.length] = el)}
          data-idx={sections.length}
          style={{ margin: '40px 0', textAlign: 'center' }}
        >
          <h2 className="custom-section-title" style={{ marginBottom: 32 }}>Our Impact</h2>
          <div style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            rowGap: '24px',
            columnGap: '24px',
            maxWidth: 900,
            margin: '0 auto'
          }}>
            {stats.map(stat => (
              <div key={stat.label} style={{ minWidth: 180 }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#a259e6', marginBottom: 8 }}>
                  <AnimatedStat value={stat.value} />
                </div>
                <div style={{ color: '#f3f4fa', fontSize: '1.1rem', fontWeight: 500 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MNC Section */}
        <div
          className="custom-section-card custom-section-card-large"
          ref={el => (cardRefs.current[sections.length + 1] = el)}
          data-idx={sections.length + 1}
          style={{ marginBottom: 40, textAlign: 'center' }}
        >
          <h2 className="custom-section-title" style={{ marginBottom: 32 }}>Top MNCs Hiring from Us</h2>
          <div style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            rowGap: '24px',
            columnGap: '24px',
            maxWidth: 900,
            margin: '0 auto'
          }}>
            {mncLogos.map(mnc => (
              <div key={mnc.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 120 }}>
                <img src={mnc.src} alt={mnc.name} style={{ height: 56, objectFit: 'contain', marginBottom: 10, background: '#fff', borderRadius: 12, padding: 8 }} />
                <div style={{ color: '#f3f4fa', fontWeight: 600, fontSize: '1.08rem' }}>{mnc.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer style={{
        padding: '20px 0',
        backgroundColor: '#101820',
        color: '#fff',
        textAlign: 'center',
        marginTop: '40px'
      }}>
        <div>© 2025 Zidio Connect. All rights reserved.</div>
        <div>
          <a href="/privacy-policy" style={{ color: '#fff', textDecoration: 'none', margin: '0 10px' }}>Privacy Policy</a>|
          <a href="/terms" style={{ color: '#fff', textDecoration: 'none', margin: '0 10px' }}>Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default StudentDashboard;
