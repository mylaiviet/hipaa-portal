import React from 'react';

export default function ScopeInstructions() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: '500px', textAlign: 'center' }}>
        <div style={{
          width: '60px',
          height: '60px',
          background: 'var(--primary-color)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px auto',
          color: 'white',
          fontSize: '1.5rem'
        }}>
          🔐
        </div>
        
        <h2 style={{ 
          margin: '0 0 16px 0', 
          color: 'var(--text-primary)',
          fontSize: '1.5rem'
        }}>
          Authorization Required
        </h2>
        
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          MedPlum is asking for permission to access your health information. 
          This is a security feature to protect your data.
        </p>
        
        <div className="status-badge status-info" style={{ marginBottom: '24px' }}>
          ✅ All requested permissions are safe and necessary for your patient portal
        </div>
        
        <div style={{ 
          background: 'var(--surface-secondary)', 
          padding: '20px', 
          borderRadius: 'var(--radius-sm)',
          marginBottom: '24px',
          textAlign: 'left'
        }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem' }}>
            Required Permissions:
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li><strong>openid</strong> - Basic identity verification</li>
            <li><strong>profile</strong> - Your name and basic profile info</li>
            <li><strong>email</strong> - Email address for notifications</li>
            <li><strong>fhirUser</strong> - Access to your medical records</li>
          </ul>
        </div>
        
        <div style={{ 
          padding: '16px', 
          background: '#fef3c7', 
          border: '1px solid #fbbf24',
          borderRadius: 'var(--radius-sm)',
          color: '#92400e',
          marginBottom: '24px'
        }}>
          <strong>Next Step:</strong> Click "Allow" or "Accept" on the MedPlum authorization page to continue to your dashboard.
        </div>
        
        <button 
          onClick={() => window.location.href = '/signin'}
          className="btn btn-secondary"
          style={{ width: '100%' }}
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
}