import React from 'react';
import './Auth.css';
import LogoAvatar from './LogoAvatar';

function SignIn({ onCreateAccount }) {
  return (
    <div className="auth-bg">
      <div className="auth-container">
        <LogoAvatar />
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to access your patient portal</p>
        <form className="auth-form">
          <label>Email Address</label>
          <div className="auth-input-wrapper">
            <span className="auth-icon">📧</span>
            <input type="email" placeholder="you@example.com" required />
          </div>
          <label>Password</label>
          <div className="auth-input-wrapper">
            <span className="auth-icon">🔒</span>
            <input type="password" placeholder="••••••••" required />
          </div>
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
