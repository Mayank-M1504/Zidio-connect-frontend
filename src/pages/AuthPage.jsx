import React, { useState } from 'react';
import './AuthPage.css';
import InputField from '../components/InputField';
import RoleSelector from '../components/RoleSelector';
import Spinner from '../components/Spinner';

const initialLogin = { name: '', email: '', password: '', role: '' };
const initialSignup = { name: '', email: '', password: '', role: '' };

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

const AuthPage = () => {
  const [mode, setMode] = useState('login');
  const [loginData, setLoginData] = useState(initialLogin);
  const [signupData, setSignupData] = useState(initialSignup);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [transition, setTransition] = useState(false);

  const handleChange = (e, form) => {
    const { name, value } = e.target;
    if (form === 'login') setLoginData((d) => ({ ...d, [name]: value }));
    else setSignupData((d) => ({ ...d, [name]: value }));
  };

  const validate = (data) => {
    const errs = {};
    if (!data.name) errs.name = 'Name is required';
    if (!validateEmail(data.email)) errs.email = 'Invalid email';
    if (!data.password || data.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!data.role) errs.role = 'Role is required';
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

  const handleSignup = async (e) => {
    e.preventDefault();
    const errs = validate(signupData);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);
  };

  const switchMode = () => {
    setTransition(true);
    setTimeout(() => {
      setMode(mode === 'login' ? 'signup' : 'login');
      setErrors({});
      setTransition(false);
    }, 350);
  };

  return (
    <div className="auth-bg">
      <div className={`auth-modal${transition ? ' scale-95 opacity-0' : ''}`}
        style={{ minHeight: 380 }}>
        <h2 className="auth-title">{mode === 'login' ? 'Login' : 'Sign up'}</h2>
        <p className="auth-step">
          {mode === 'login' ? 'Welcome back! Please login.' : 'Step 1 of 3'}
        </p>
        <form className="auth-form" onSubmit={mode === 'login' ? handleLogin : handleSignup}>
          <InputField
            label="Name"
            name="name"
            value={mode === 'login' ? loginData.name : signupData.name}
            onChange={(e) => handleChange(e, mode)}
            error={errors.name}
            className="auth-input"
            labelClassName="auth-label"
            errorClassName="auth-error"
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            value={mode === 'login' ? loginData.email : signupData.email}
            onChange={(e) => handleChange(e, mode)}
            error={errors.email}
            className="auth-input"
            labelClassName="auth-label"
            errorClassName="auth-error"
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={mode === 'login' ? loginData.password : signupData.password}
            onChange={(e) => handleChange(e, mode)}
            error={errors.password}
            className="auth-input"
            labelClassName="auth-label"
            errorClassName="auth-error"
          />
          <RoleSelector
            value={mode === 'login' ? loginData.role : signupData.role}
            onChange={(e) => handleChange(e, mode)}
            error={errors.role}
            className="auth-role"
            labelClassName="auth-label"
            errorClassName="auth-error"
          />
          {mode === 'login' && (
            <button type="button" className="auth-forgot">Forgot Password?</button>
          )}
          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? <Spinner /> : mode === 'login' ? 'Login' : 'Next'}
          </button>
        </form>
        <div className="auth-switch">
          {mode === 'login' ? (
            <span>Don&apos;t have an account?
              <button onClick={switchMode} className="auth-switch-btn">Create Account</button>
            </span>
          ) : (
            <span>Already have an account?
              <button onClick={switchMode} className="auth-switch-btn">Login</button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 