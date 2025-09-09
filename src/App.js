import React, { useEffect } from 'react';
import { MedplumProvider } from '@medplum/react';
import { MedplumClient } from '@medplum/core';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import Auth from './Auth';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';

const medplum = new MedplumClient({
  baseUrl: 'https://api.medplum.com/',
  clientId: process.env.REACT_APP_MEDPLUM_CLIENT_ID,
  redirectUri: window.location.origin + '/',
  // Pre-configure the expected scopes to minimize scope selection
  scopes: 'openid profile email fhirUser',
  // Additional configuration for smoother auth flow
  onUnauthenticated: () => {
    // Redirect to signin page when authentication is lost
    if (window.location.pathname !== '/' && window.location.pathname !== '/signin') {
      window.location.href = '/signin';
    }
  }
});

function AuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AuthCallback triggered', { location: location.search });
    
    // Check if this is a callback from MedPlum OAuth
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
      console.log('Processing OAuth callback with code and state');
      // Process the OAuth callback
      medplum.processCode(code, state)
        .then(() => {
          console.log('OAuth processing successful, redirecting to dashboard');
          // Redirect to dashboard after successful authentication
          navigate('/dashboard');
        })
        .catch((error) => {
          console.error('OAuth callback error:', error);
          navigate('/signin');
        });
    } else if (medplum.isAuthenticated()) {
      console.log('Already authenticated, redirecting to dashboard');
      navigate('/dashboard');
    } else {
      console.log('No code/state and not authenticated, showing signin');
      navigate('/signin');
    }
  }, [location, navigate]);

  return (
    <div style={{ padding: '20px', textAlign: 'center', minHeight: '100vh' }}>
      <h1>Welcome to Dedicated Health Portal</h1>
      <div style={{ margin: '20px 0' }}>
        <div>Processing authentication...</div>
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
          Please wait while we verify your credentials.
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <MantineProvider>
      <MedplumProvider medplum={medplum}>
        <Routes>
          <Route path="/signin" element={<Auth />} />
          <Route path="/create-account" element={<Auth isCreateAccount={true} />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/" element={<AuthCallback />} />
        </Routes>
      </MedplumProvider>
    </MantineProvider>
  );
}

export default App;
