import React, { useState, useRef, useEffect, useCallback } from 'react';
import './AuthPage.css';
import jobImage from '../assets/jobapply.webp';

const allJobs = [
  { id: 1, title: 'Frontend Developer Intern', company: 'TechSoft', location: 'Remote', type: 'Internship' },
  { id: 2, title: 'Backend Developer', company: 'InnovateX', location: 'Bangalore', type: 'Job' },
  { id: 3, title: 'UI/UX Designer Intern', company: 'DesignPro', location: 'Remote', type: 'Internship' },
  { id: 4, title: 'Full Stack Developer', company: 'Stackify', location: 'Delhi', type: 'Job' },
  { id: 5, title: 'Data Analyst', company: 'DataCorp', location: 'Remote', type: 'Job' },
  { id: 6, title: 'Mobile App Developer', company: 'Appify', location: 'Bangalore', type: 'Internship' },
  { id: 7, title: 'QA Tester', company: 'QualityFirst', location: 'Remote', type: 'Job' },
  { id: 8, title: 'Cloud Engineer', company: 'Cloudify', location: 'Delhi', type: 'Job' },
  { id: 9, title: 'DevOps Intern', company: 'OpsPro', location: 'Remote', type: 'Internship' },
  { id: 10, title: 'Product Manager', company: 'Prodify', location: 'Bangalore', type: 'Job' },
];

const PAGE_SIZE = 4;

const StudentDashboard = () => {
  const [jobs, setJobs] = useState(allJobs.slice(0, PAGE_SIZE));
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  // Lazy loading logic
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && jobs.length < allJobs.length) {
      setTimeout(() => {
        setJobs((prev) => [
          ...prev,
          ...allJobs.slice(prev.length, prev.length + PAGE_SIZE),
        ]);
        setPage((p) => p + 1);
      }, 500); // Simulate network delay
    }
  }, [jobs]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };
    const observer = new window.IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <div className="auth-bg" style={{ minHeight: '100vh', background: '#f4f8f6' }}>
      {/* Fixed Navbar */}
      <nav className="dashboard-navbar-fixed">
        <span className="dashboard-navbar-logo">Zidio Connect</span>
        <button className="dashboard-navbar-profile-btn">Profile</button>
      </nav>
      <div className="dashboard-hero">
        {/* Left: Heading, Search, Popular, Jobs */}
        <div className="dashboard-hero-left" style={{ width: '100%' }}>
          <div className="dashboard-hero-heading">
            Find the <span className="dashboard-hero-highlight">perfect</span><br /> job for you
          </div>
          <div className="dashboard-hero-subheading">
            Fill your job in hours, not weeks. Search for free.
          </div>
          <div className="dashboard-search-row">
            <span className="dashboard-search-icon" role="img" aria-label="search">🔍</span>
            <input
              type="text"
              placeholder="Jobs title or keyword"
              className="dashboard-search-input"
            />
            <span className="dashboard-search-icon" role="img" aria-label="location">⚙️</span>
            <select className="dashboard-search-select">
              <option value="">All Cities</option>
              <option value="Remote">Remote</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Delhi">Delhi</option>
            </select>
            <button className="dashboard-search-btn">Search</button>
          </div>
          <div className="dashboard-popular-searches">
            Popular Searches: <b>Content Editor</b>, <b>Finance Manager</b>
          </div>
          {/* Jobs List Below Search */}
          <div className="auth-modal" style={{ maxWidth: 700, width: '100%', minHeight: 320, marginTop: 30 }}>
            <h2 className="auth-title" style={{ fontSize: '1.4rem', marginTop: 0 }}>Available Jobs & Internships</h2>
            <div style={{ width: '100%' }}>
              {jobs.map((job) => (
                <div key={job.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#f9fafb',
                  borderRadius: 12,
                  padding: '1rem 1.2rem',
                  marginBottom: 16,
                  boxShadow: '0 1px 4px rgba(60,60,130,0.06)'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '1.08rem' }}>{job.title}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.97rem' }}>{job.company} &bull; {job.location} &bull; {job.type}</div>
                  </div>
                  <button className="auth-btn" style={{ width: 100, padding: '0.5rem 0', fontSize: '1rem', margin: 0 }}>Apply</button>
                </div>
              ))}
              <div ref={loader} style={{ height: 30, textAlign: 'center', color: '#888' }}>
                {jobs.length < allJobs.length ? 'Loading more jobs...' : 'No more jobs'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 