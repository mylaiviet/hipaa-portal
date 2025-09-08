import React from 'react';
import './Auth.css';
import companyLogo from './company-logo.png';

function LogoAvatar() {
  return (
    <div className="auth-avatar auth-avatar-logo">
      <img src={companyLogo} alt="Company Logo" className="auth-logo-img" />
    </div>
  );
}

export default LogoAvatar;
