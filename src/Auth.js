import React from 'react';
import './Auth.css';
import LogoAvatar from './LogoAvatar';
import { useMedplum } from '@medplum/react';

function Auth({
  isCreateAccount = false,
}) {
  const medplum = useMedplum();

  const onAuth = () => {
    medplum.signInWithRedirect();
  };

  const title = isCreateAccount ? 'Create Account' : 'Welcome Back';
  const subtitle = isCreateAccount ? 'Join Dedicated Health for personalized care' : 'Sign in to access your patient portal';
  const buttonText = isCreateAccount ? 'Continue with Medplum Registration' : 'Continue to secure portal';
  const linkText = isCreateAccount ? 'Already have an account?' : 'Don\'t have an account?';
  const linkTo = isCreateAccount ? '/signin' : '/create-account';
  const linkButtonText = isCreateAccount ? 'Sign In' : 'Create Account';

  return (
    <div className="auth-bg">
      <div className="auth-container">
        <LogoAvatar />
        <h2 className="auth-title">{title}</h2>
        <p className="auth-subtitle">{subtitle}</p>
        <button className="auth-btn" onClick={onAuth} style={{ width: '100%', marginTop: 24 }}>
          {buttonText}
        </button>
        <div className="auth-divider"></div>
        <div className="auth-bottom-text">{linkText}</div>
        <a href={linkTo} className="auth-btn-outline" style={{ display: 'block', textAlign: 'center', marginTop: 12 }}>
          {linkButtonText}
        </a>
        {isCreateAccount && (
          <div className="auth-terms">By creating an account, you agree to our Terms of Service and Privacy Policy.</div>
        )}
      </div>
      <div className="auth-help">Need help? Call us at <a href="tel:5551234567">(555) 123-4567</a></div>
    </div>
  );
}

export default Auth;
