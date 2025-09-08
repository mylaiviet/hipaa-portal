import React, { useState } from 'react';
import SignIn from './SignIn';
import CreateAccount from './CreateAccount';

function App() {
  const [page, setPage] = useState('signIn');

  return (
    page === 'signIn' ? (
      <SignIn onCreateAccount={() => setPage('createAccount')} />
    ) : (
      <CreateAccount onSignIn={() => setPage('signIn')} />
    )
  );
}

export default App;
