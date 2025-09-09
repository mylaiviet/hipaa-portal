import React from 'react';
import { MedplumProvider } from '@medplum/react';
import { MedplumClient } from '@medplum/core';
import { Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import CreateAccount from './CreateAccount';
import Dashboard from './Dashboard';

const medplum = new MedplumClient({
  baseUrl: 'https://api.medplum.com/',
  clientId: '5c34520f-fb1d-4d9c-9376-0c92c98396ed',
});

function App() {
  return (
    <MedplumProvider medplum={medplum}>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </MedplumProvider>
  );
}

export default App;
