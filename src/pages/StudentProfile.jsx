import React, { useState } from 'react';
import './AuthPage.css'; // Ensure this file exists or use inline styles below

const defaultPic = 'https://www.w3schools.com/howto/img_avatar.png';

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91-9876543210',
    bio: 'Passionate developer with a love for building meaningful tech.',
    skills: 'React, Node.js, Python',
    education: 'B.Tech in Computer Science, XYZ University',
    experience: 'Intern at ABC Corp, 6 months',
    profilePic: defaultPic
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile({ ...profile, profilePic: imageUrl });
    }
  };

  return (
    <div style={{ backgroundColor: '#1a1a2e', minHeight: '100vh', paddingTop: '80px', color: '#fff' }}>
      <div style={{
        backgroundColor: '#16213e',
        maxWidth: 900,
        margin: '0 auto',
        padding: '32px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '32px', color: '#a259e6' }}>Your Profile</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center' }}>
          {/* Profile Picture */}
          <div style={{ textAlign: 'center' }}>
            <img
              src={profile.profilePic}
              alt="Profile"
              style={{
                width: 160,
                height: 160,
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: 12,
                border: '3px solid #a259e6'
              }}
            />
            <label htmlFor="upload-photo" style={{
              display: 'inline-block',
              padding: '6px 16px',
              backgroundColor: '#a259e6',
              color: '#fff',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}>
              Change Photo
            </label>
            <input
              id="upload-photo"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>

          {/* Profile Info */}
          <div style={{ flex: '1 1 300px' }}>
            {['name', 'email', 'phone', 'skills', 'education'].map((field) => (
              <div key={field} style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input
                  type="text"
                  name={field}
                  value={profile[field]}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #444',
                    backgroundColor: '#0f3460',
                    color: '#fff'
                  }}
                />
              </div>
            ))}

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Bio</label>
              <textarea
                name="bio"
                rows="3"
                value={profile.bio}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #444',
                  backgroundColor: '#0f3460',
                  color: '#fff'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 'bold' }}>Experience</label>
              <textarea
                name="experience"
                rows="2"
                value={profile.experience}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #444',
                  backgroundColor: '#0f3460',
                  color: '#fff'
                }}
              />
            </div>

            <button
              style={{
                marginTop: '16px',
                padding: '10px 24px',
                backgroundColor: '#a259e6',
                border: 'none',
                color: '#fff',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
