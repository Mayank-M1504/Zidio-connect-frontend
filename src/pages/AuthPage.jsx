import React, { useState } from 'react';
import './AuthPage.css';
import Spinner from '../components/Spinner';
import LoginPageImg from '../assets/LoginPage.png';

const initialLogin = { email: '', password: '' };

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

const AuthPage = () => {
  const [loginData, setLoginData] = useState(initialLogin);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((d) => ({ ...d, [name]: value }));
  };

  const validate = (data) => {
    const errs = {};
    if (!validateEmail(data.email)) errs.email = 'Invalid email';
    if (!data.password || data.password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errs = validate(loginData);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  };

  return (
    <div className="login-bg">
      <div className="login-container small">
        {/* Left: Login Form */}
        <div className="login-form-col">
          <h2 className="login-title">Login</h2>
          <div className="login-subtext">
            Doesn't have an account yet? <a href="#" className="login-link">Sign Up</a>
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <label className="login-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="login-input login-input-margin"
              placeholder="you@example.com"
              value={loginData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="login-error">{errors.email}</div>}
            <div className="login-pw-row">
              <label className="login-label">Password</label>
              <a href="#" className="login-forgot">Forgot Password?</a>
            </div>
            <input
              type="password"
              name="password"
              className="login-input login-input-margin"
              placeholder="Enter 6 character or more"
              value={loginData.password}
              onChange={handleChange}
            />
            {errors.password && <div className="login-error">{errors.password}</div>}
            <div className="login-remember-row">
              <input type="checkbox" id="remember" className="login-checkbox" />
              <label htmlFor="remember" className="login-remember-label">Remember me</label>
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? <Spinner /> : 'LOGIN'}
            </button>
          </form>
        </div>
        {/* Right: Illustration */}
        <div className="login-illustration-col">
          <img src={LoginPageImg} alt="Login Illustration" className="login-illustration-img" />
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 