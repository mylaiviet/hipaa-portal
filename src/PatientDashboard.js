import { useState, useEffect } from 'react';
import { useMedplum, useMedplumProfile } from '@medplum/react-hooks';
import { PatientSummary, Loading } from '@medplum/react';

export default function PatientDashboard() {
  const medplum = useMedplum();
  const profile = useMedplumProfile();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    console.log('PatientDashboard useEffect triggered', { 
      medplum: !!medplum, 
      profile, 
      isAuthenticated: medplum?.isAuthenticated() 
    });

    async function fetchPatientData() {
      try {
        setDebugInfo({
          medplumExists: !!medplum,
          isAuthenticated: medplum?.isAuthenticated(),
          profileExists: !!profile,
          profileType: profile?.resourceType
        });

        // Wait a bit longer for profile to load
        if (!medplum || !medplum.isAuthenticated()) {
          console.log('Not authenticated, setting loading');
          setLoading(true);
          return;
        }

        if (!profile) {
          console.log('No profile yet, waiting...');
          setLoading(true);
          return;
        }

        console.log('Profile loaded:', profile);

        // If the profile IS a Patient resource, use it directly
        if (profile.resourceType === 'Patient') {
          console.log('Profile is Patient type');
          setPatient(profile);
          setLoading(false);
          return;
        }

        // Create a basic patient representation from the profile
        const mockPatient = {
          resourceType: 'Patient',
          id: profile.id || 'mock-patient-id',
          name: profile.name || [{ family: 'Portal', given: ['User'] }],
          identifier: profile.identifier || [],
          telecom: profile.telecom || [],
          gender: profile.gender || 'unknown',
          birthDate: profile.birthDate || '1990-01-01'
        };

        console.log('Created mock patient:', mockPatient);
        setPatient(mockPatient);
        setLoading(false);
        
      } catch (err) {
        console.error('Error in fetchPatientData:', err);
        setError(err.message);
        setLoading(false);
      }
    }

    // Add a small delay to ensure MedPlum is fully initialized
    const timer = setTimeout(fetchPatientData, 1000);
    return () => clearTimeout(timer);
  }, [medplum, profile]);

  // Always render something, even during loading
  console.log('Rendering PatientDashboard', { loading, error, patient: !!patient });

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card" style={{ maxWidth: '400px', textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'var(--primary-color)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            animation: 'pulse 2s infinite'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              background: 'white',
              borderRadius: '50%'
            }} />
          </div>
          
          <h2 style={{ 
            margin: '0 0 16px 0', 
            color: 'var(--text-primary)',
            fontSize: '1.5rem'
          }}>
            Loading Your Dashboard
          </h2>
          
          <div style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            <div style={{ marginBottom: '8px' }}>
              Status: <span className={`status-badge ${debugInfo.isAuthenticated ? 'status-success' : 'status-warning'}`}>
                {debugInfo.isAuthenticated ? 'Authenticated' : 'Authenticating...'}
              </span>
            </div>
            <div>
              Profile: <span className={`status-badge ${debugInfo.profileExists ? 'status-success' : 'status-info'}`}>
                {debugInfo.profileExists ? 'Loaded' : 'Loading...'}
              </span>
            </div>
          </div>
          
          <div style={{
            width: '100%',
            height: '4px',
            background: 'var(--border-light)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '40%',
              height: '100%',
              background: 'var(--primary-color)',
              borderRadius: '2px',
              animation: 'loading-bar 1.5s ease-in-out infinite'
            }} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', minHeight: '100vh' }}>
        <h1>Patient Dashboard - Error</h1>
        <div style={{ color: 'red', marginBottom: '20px' }}>
          Error loading patient data: {error}
        </div>
        <details>
          <summary>Debug Information</summary>
          <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
            {JSON.stringify({ debugInfo, profile }, null, 2)}
          </pre>
        </details>
      </div>
    );
  }

  const handleLogout = () => {
    medplum.signOut();
    window.location.href = '/signin';
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getPatientName = () => {
    if (!patient?.name || !patient.name[0]) return 'Patient';
    const name = patient.name[0];
    return `${name.given?.[0] || ''} ${name.family || ''}`.trim() || 'Patient';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)' }}>
      {/* Header */}
      <header style={{ 
        background: 'var(--surface)', 
        borderBottom: '1px solid var(--border)',
        padding: '16px 24px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'var(--primary-color)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}>
              H
            </div>
            <div>
              <h1 style={{ 
                margin: 0, 
                fontSize: '1.5rem', 
                color: 'var(--text-primary)',
                fontWeight: '600'
              }}>
                Dedicated Health Portal
              </h1>
              <p style={{ 
                margin: 0, 
                color: 'var(--text-secondary)', 
                fontSize: '0.9rem' 
              }}>
                {getCurrentTime()}, {getPatientName()}
              </p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="btn btn-danger"
            style={{ fontSize: '0.9rem' }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '32px 24px' 
      }}>
      
        {patient ? (
          <>
            {/* Dashboard Grid */}
            <div className="grid grid-2" style={{ marginBottom: '32px' }}>
              {/* Quick Stats */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Account Overview</h2>
                  <p className="card-subtitle">Your health portal summary</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Patient ID</span>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>{patient.id}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Profile Type</span>
                    <span className="status-badge status-info">{profile?.resourceType || 'Patient'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Last Login</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Quick Actions</h2>
                  <p className="card-subtitle">Common tasks and features</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button className="btn btn-primary" style={{ justifyContent: 'flex-start' }}>
                    📅 Schedule Appointment
                  </button>
                  <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                    📋 View Medical Records
                  </button>
                  <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                    💊 Prescription Refills
                  </button>
                  <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
                    📞 Contact Provider
                  </button>
                </div>
              </div>
            </div>

            {/* Patient Summary Section */}
            <div className="card" style={{ marginBottom: '32px' }}>
              <div className="card-header">
                <h2 className="card-title">Patient Summary</h2>
                <p className="card-subtitle">Your medical information overview</p>
              </div>
              <div style={{ 
                background: 'var(--surface-secondary)', 
                padding: '20px', 
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)'
              }}>
                <PatientSummary patient={patient} />
              </div>
            </div>

            {/* Additional Features Grid */}
            <div className="grid grid-3">
              <div className="card">
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  color: 'var(--text-primary)',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  📊 Health Metrics
                </h3>
                <p style={{ color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
                  Track your vital signs and health indicators
                </p>
                <button className="btn btn-secondary" style={{ width: '100%' }}>
                  View Metrics
                </button>
              </div>

              <div className="card">
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  color: 'var(--text-primary)',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  🏥 Appointments
                </h3>
                <p style={{ color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
                  Manage your upcoming and past appointments
                </p>
                <button className="btn btn-secondary" style={{ width: '100%' }}>
                  View Calendar
                </button>
              </div>

              <div className="card">
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  color: 'var(--text-primary)',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  💬 Messages
                </h3>
                <p style={{ color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
                  Secure communication with your care team
                </p>
                <button className="btn btn-secondary" style={{ width: '100%' }}>
                  View Messages
                </button>
              </div>
            </div>

            {/* Debug Information */}
            <details style={{ marginTop: '32px' }}>
              <summary style={{ 
                cursor: 'pointer', 
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                padding: '8px 0'
              }}>
                🔧 Developer Information
              </summary>
              <div className="card" style={{ marginTop: '16px' }}>
                <div className="card-header">
                  <h3 className="card-title">Profile Data</h3>
                </div>
                <pre style={{ 
                  background: 'var(--surface-secondary)', 
                  padding: '16px', 
                  overflow: 'auto', 
                  fontSize: '0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)'
                }}>
                  {JSON.stringify(profile, null, 2)}
                </pre>
                
                <div className="card-header" style={{ marginTop: '20px' }}>
                  <h3 className="card-title">Patient Data</h3>
                </div>
                <pre style={{ 
                  background: 'var(--surface-secondary)', 
                  padding: '16px', 
                  overflow: 'auto', 
                  fontSize: '0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-light)'
                }}>
                  {JSON.stringify(patient, null, 2)}
                </pre>
              </div>
            </details>
          </>
        ) : (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Patient Data Unavailable</h2>
              <p className="card-subtitle">Unable to load patient information</p>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>
              We're having trouble loading your patient data. Please try refreshing the page or contact support if the issue persists.
            </p>
            <details style={{ marginTop: '16px' }}>
              <summary style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}>
                Debug Information
              </summary>
              <pre style={{ 
                background: 'var(--surface-secondary)', 
                padding: '16px', 
                overflow: 'auto', 
                marginTop: '8px',
                fontSize: '0.8rem',
                borderRadius: 'var(--radius-sm)'
              }}>
                {JSON.stringify({ debugInfo, profile }, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </main>
    </div>
  );
}
