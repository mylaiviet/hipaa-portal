import React, { useState } from 'react';
import './Auth.css';
import LogoAvatar from './LogoAvatar';
import { useMedplum } from '@medplum/react';
import { useNavigate } from 'react-router-dom';

function SignIn({ onCreateAccount }) {
  const medplum = useMedplum();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await medplum.signIn(email, password);
      navigate('/dashboard'); // redirect after login
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-container">
        <LogoAvatar />
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to access your patient portal</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>Email Address</label>
          <div className="auth-input-wrapper">
            <span className="auth-icon">📧</span>
            <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <label>Password</label>
          <div className="auth-input-wrapper">
            <span className="auth-icon">🔒</span>
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <div style={{color: 'red', marginBottom: 8}}>{error}</div>}
          <button className="auth-btn" type="submit">Sign In</button>
        </form>
        <a href="#" className="auth-link">Forgot your password?</a>
        <div className="auth-divider"></div>
        <div className="auth-bottom-text">Don't have an account?</div>
        <button className="auth-btn-outline" onClick={e => { e.preventDefault(); onCreateAccount(); }}>Create Account</button>
      </div>
      <div className="auth-help">Need help? Call us at <a href="tel:5551234567">(555) 123-4567</a></div>
    </div>
  );
}

export default SignIn;
