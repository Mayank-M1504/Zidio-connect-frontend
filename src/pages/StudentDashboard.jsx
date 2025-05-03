import React, { useRef, useEffect, useState } from 'react';
import './AuthPage.css';
import JobsImg from '../assets/jobapply.webp';
import InternshipsImg from '../assets//Intership.jpeg';
import EventsImg from '../assets/Events.jpg';

// Real MNC logos (SVG URLs)
const mncLogos = [
  { name: 'Google', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Microsoft', src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  { name: 'Amazon', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { name: 'Facebook', src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' },
  { name: 'Apple', src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'IBM', src: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
];

const courses = [
  {
    title: 'Full Stack Web Development',
    desc: 'Learn to build modern web applications using React, Node.js, and MongoDB.',
    link: '#',
  },
  {
    title: 'Data Science & Machine Learning',
    desc: 'Master data analysis, visualization, and machine learning with Python.',
    link: '#',
  },
  {
    title: 'Cloud Computing Essentials',
    desc: 'Get hands-on with AWS, Azure, and cloud deployment best practices.',
    link: '#',
  },
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

const socialLinks = [
  { icon: '🔗', label: 'Linkedin', url: '#' },
  { icon: '🐦', label: 'Twitter', url: '#' },
  { icon: '📘', label: 'Facebook', url: '#' },
  { icon: '📸', label: 'Instagram', url: '#' },
  { icon: '▶️', label: 'Youtube', url: '#' },
];

const stats = [
  { label: 'Users Got Jobs', value: '2340' },
  { label: 'Active Users', value: '8900' },
  { label: 'Companies Hiring', value: '120' },
  { label: 'Internships Filled', value: '1500' },
];

// AnimatedStat: animates each digit from 0 to its final value
const AnimatedStat = ({ value, duration = 1200 }) => {
  const [displayDigits, setDisplayDigits] = useState(() => Array.from(String(value), () => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    // Animate only when visible
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
          // Animate each digit independently
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
  // Add two more refs for stats and MNCs sections, and one for courses
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'));
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, idx * 350); // 350ms stagger per card
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

  // Smooth scroll to section
  const handleNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Total number of animated sections (3 main + 3 new)
  const totalSections = sections.length + 3;

  return (
    <div className="custom-bg">
      <nav className="dashboard-navbar-fixed">
        <span className="dashboard-navbar-logo">Zidio Connect</span>
        <div className="dashboard-navbar-links">
          <span className="dashboard-navbar-link" onClick={() => handleNavClick('jobs')}>Jobs</span>
          <span className="dashboard-navbar-link" onClick={() => handleNavClick('internships')}>Internships</span>
          <span className="dashboard-navbar-link" onClick={() => handleNavClick('events')}>Events</span>
          <span className="dashboard-navbar-link" onClick={() => handleNavClick('courses')}>Courses</span>
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
        {/* Courses Section */}
        <div
          className="custom-section-card custom-section-card-large"
          ref={el => (cardRefs.current[sections.length] = el)}
          data-idx={sections.length}
          id="courses"
          style={{marginBottom: 40, textAlign: 'center'}}>
          <h2 className="custom-section-title" style={{marginBottom: 32}}>Courses</h2>
          <div style={{display:'flex',justifyContent:'center',gap:'48px',flexWrap:'wrap',alignItems:'stretch',margin:'0 auto',maxWidth:900}}>
            {courses.map(course => (
              <div key={course.title} style={{background:'#23244a',borderRadius:18,padding:'32px 24px',minWidth:220,maxWidth:300,display:'flex',flexDirection:'column',alignItems:'center',marginBottom:18,boxShadow:'0 2px 12px rgba(60,60,130,0.10)'}}>
                <div style={{color:'#a259e6',fontWeight:700,fontSize:'1.15rem',marginBottom:12}}>{course.title}</div>
                <div style={{color:'#f3f4fa',fontSize:'1rem',marginBottom:18}}>{course.desc}</div>
                <a href={course.link} className="explore-btn" style={{textDecoration:'none'}}>Learn More</a>
              </div>
            ))}
          </div>
        </div>
        {/* Stats Section */}
        <div
          className="custom-section-card custom-section-card-large"
          ref={el => (cardRefs.current[sections.length + 1] = el)}
          data-idx={sections.length + 1}
          style={{marginTop: 40, marginBottom: 40, textAlign: 'center'}}
        >
          <h2 className="custom-section-title" style={{marginBottom: 32}}>Our Impact</h2>
          <div style={{display:'flex',justifyContent:'center',gap: '60px',flexWrap:'wrap',margin:'0 auto',maxWidth:900}}>
            {stats.map(stat => (
              <div key={stat.label} style={{minWidth: 180, marginBottom: 18}}>
                <div style={{fontSize:'2.2rem',fontWeight:800,color:'#a259e6',marginBottom:8}}>
                  <AnimatedStat value={stat.value} />
                </div>
                <div style={{color:'#f3f4fa',fontSize:'1.1rem',fontWeight:500}}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* MNCs Section */}
        <div
          className="custom-section-card custom-section-card-large"
          ref={el => (cardRefs.current[sections.length + 2] = el)}
          data-idx={sections.length + 2}
          style={{marginBottom: 40, textAlign: 'center'}}>
          <h2 className="custom-section-title" style={{marginBottom: 32}}>Top MNCs Hiring from Us</h2>
          <div style={{display:'flex',justifyContent:'center',gap:'48px',flexWrap:'wrap',alignItems:'center',margin:'0 auto',maxWidth:900}}>
            {mncLogos.map(mnc => (
              <div key={mnc.name} style={{display:'flex',flexDirection:'column',alignItems:'center',minWidth:120,marginBottom:18}}>
                <img src={mnc.src} alt={mnc.name} style={{height:56,objectFit:'contain',marginBottom:10,background:'#fff',borderRadius:12,padding:8}} />
                <div style={{color:'#f3f4fa',fontWeight:600,fontSize:'1.08rem'}}>{mnc.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="footer">
        <div className="footer-columns" style={{display:'flex',justifyContent:'center',gap:'60px',flexWrap:'wrap',marginBottom:'1.5rem'}}>
          <div style={{minWidth:220}}>
            <div style={{fontWeight:700,marginBottom:12}}>About Us</div>
            <div style={{color:'#555',marginBottom:16,maxWidth:320,fontSize:'1rem',lineHeight:'1.7'}}>We connects talented professionals with top employers. Built by Zidio Development, we simplify hiring and job searches, empowering success for all.</div>
            <div style={{color:'#555',marginBottom:4,fontSize:'1rem'}}>+91-6362853627</div>
            <div style={{color:'#555',fontSize:'1rem'}}>contact@hirre.io</div>
          </div>
          <div>
            <div style={{fontWeight:700,marginBottom:12}}>Company</div>
            <div style={{color:'#555',marginBottom:6}}>About us</div>
            <div style={{color:'#555',marginBottom:6}}>Career</div>
            <div style={{color:'#555',marginBottom:6}}>Blogs</div>
            <div style={{color:'#555',marginBottom:6}}>FAQ's</div>
            <div style={{color:'#555'}}>Contact</div>
          </div>
          <div>
            <div style={{fontWeight:700,marginBottom:12}}>Services</div>
            <div style={{color:'#555',marginBottom:6}}>Jobs</div>
            <div style={{color:'#555',marginBottom:6}}>Companies</div>
            <div style={{color:'#555',marginBottom:6}}>Candidates</div>
            <div style={{color:'#555'}}>Pricing</div>
          </div>
          <div>
            <div style={{fontWeight:700,marginBottom:12}}>Support</div>
            <div style={{color:'#555',marginBottom:6}}>Privacy Policy</div>
            <div style={{color:'#555',marginBottom:6}}>Terms of Use</div>
            <div style={{color:'#555',marginBottom:6}}>Help center</div>
            <div style={{color:'#555',marginBottom:6}}>Updates</div>
            <div style={{color:'#555'}}>Documentation</div>
          </div>
          <div>
            <div style={{fontWeight:700,marginBottom:12}}>Connect</div>
            {socialLinks.map(link => (
              <div key={link.label} style={{color:'#888',marginBottom:8,display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:'1.2rem'}}>{link.icon}</span> {link.label}
              </div>
            ))}
          </div>
        </div>
        <div style={{marginTop:'1.5rem',color:'#a3a3b3',fontSize:'1rem',letterSpacing:'0.2px'}}>
          &copy; {new Date().getFullYear()} <span style={{color:'#a259e6',fontWeight:700}}>Zidio Connect</span>. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default StudentDashboard; 