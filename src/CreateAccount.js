import React, { useState } from 'react';
import './Auth.css';
import LogoAvatar from './LogoAvatar';
import { useMedplum } from '@medplum/react';
import { useNavigate } from 'react-router-dom';

function CreateAccount({ onSignIn }) {
  const medplum = useMedplum();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await medplum.register({
        firstName,
        lastName,
        email,
        password,
        phone,
      });
      // Optionally, auto-login after registration
      await medplum.signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. ' + (err?.message || ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-container">
        <LogoAvatar />
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join Dedicated Health for personalized care</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-row">
            <div>
              <label>First Name</label>
              <div className="auth-input-wrapper">
                <span className="auth-icon">👤</span>
                <input type="text" placeholder="John" value={firstName} onChange={e => setFirstName(e.target.value)} required />
              </div>
            </div>
            <div>
              <label>Last Name</label>
              <div className="auth-input-wrapper">
                <span className="auth-icon">👤</span>
                <input type="text" placeholder="Doe" value={lastName} onChange={e => setLastName(e.target.value)} required />
              </div>
            </div>
          </div>
          <label>Phone Number</label>
          <div className="auth-input-wrapper">
            <span className="auth-icon">📞</span>
            <input type="tel" placeholder="(555) 123-4567" value={phone} onChange={e => setPhone(e.target.value)} required />
          </div>
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
          <label>Confirm Password</label>
          <div className="auth-input-wrapper">
            <span className="auth-icon">🔒</span>
            <input type="password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
          </div>
          {error && <div style={{color: 'red', marginBottom: 8}}>{error}</div>}
          <button className="auth-btn" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
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
