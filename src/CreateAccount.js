import React from 'react';
import './Auth.css';
import LogoAvatar from './LogoAvatar';

function CreateAccount({ onSignIn }) {
  return (
    <div className="auth-bg">
      <div className="auth-container">
        <LogoAvatar />
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join Dedicated Health for personalized care</p>
        <form className="auth-form">
          <div className="auth-row">
            <div>
              <label>First Name</label>
              <div className="auth-input-wrapper">
                <span className="auth-icon">👤</span>
                <input type="text" placeholder="John" required />
              </div>
            </div>
            <div>
              <label>Last Name</label>
              <div className="auth-input-wrapper">
                <span className="auth-icon">👤</span>
                <input type="text" placeholder="Doe" required />
              </div>
            </div>
          </div>
          <label>Phone Number</label>
          <div className="auth-input-wrapper">
            <span className="auth-icon">📞</span>
            <input type="tel" placeholder="(555) 123-4567" required />
          </div>
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
          <label>Confirm Password</label>
          <div className="auth-input-wrapper">
            <span className="auth-icon">🔒</span>
            <input type="password" placeholder="••••••••" required />
          </div>
          <button className="auth-btn" type="submit">Create Account</button>
        </form>
        <div className="auth-divider"></div>
        <div className="auth-bottom-text">Already have an account?</div>
        <button className="auth-btn-outline" onClick={e => { e.preventDefault(); onSignIn(); }}>Sign In</button>
        <div className="auth-terms">By creating an account, you agree to our Terms of Service and Privacy Policy.</div>
      </div>
      <div className="auth-help">Need help? Call us at <a href="tel:5551234567">(555) 123-4567</a></div>
    </div>
  );
}

export default CreateAccount;
