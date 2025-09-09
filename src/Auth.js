import { Navigate } from 'react-router-dom';
import './Auth.css';
import LogoAvatar from './LogoAvatar';
import { useMedplum } from '@medplum/react';

function Auth({
  isCreateAccount = false,
}) {
  const medplum = useMedplum();

  if (medplum.isAuthenticated()) {
    return <Navigate to="/dashboard" />;
  }

  const onAuth = () => {
    // Standard MedPlum OAuth flow with optimal parameters for user experience
    medplum.signInWithRedirect({
      scope: 'openid profile email fhirUser',
      // Remove prompt parameter to let MedPlum handle the flow naturally
      // This provides the most consistent experience across all scenarios
      response_type: 'code',
      access_type: 'offline', // Ensures long-term access with refresh tokens
      state: btoa(JSON.stringify({
        source: 'patient-portal',
        timestamp: Date.now(),
        redirectTo: '/dashboard'
      }))
    });
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
        
        {/* Security & Compliance Info */}
        <div style={{ 
          background: '#f0f9ff', 
          border: '1px solid #0ea5e9',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px',
          fontSize: '0.9rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <span style={{ fontSize: '1.1rem', color: '#0ea5e9' }}>🔒</span>
            <div>
              <strong>HIPAA-Compliant Security:</strong> You'll be asked to approve data access permissions. 
              This ensures your medical information stays secure and compliant with healthcare regulations.
              <br />
              <span style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
                Simply click "Allow" to continue to your secure patient dashboard.
              </span>
            </div>
          </div>
        </div>
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
