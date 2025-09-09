import React from 'react';
import { MedplumProvider } from '@medplum/react';
import { MedplumClient } from '@medplum/core';
import { Routes, Route } from 'react-router-dom';
import Auth from './Auth';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute';

const medplum = new MedplumClient({
  baseUrl: 'https://api.medplum.com/',
  clientId: process.env.REACT_APP_MEDPLUM_CLIENT_ID,
});

function App() {
  return (
    <MedplumProvider medplum={medplum}>
      <Routes>
        <Route path="/signin" element={<Auth />} />
        <Route path="/create-account" element={<Auth isCreateAccount={true} />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Auth />} />
      </Routes>
    </MedplumProvider>
  );
}

export default App;
