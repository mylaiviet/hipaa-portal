import { Navigate, useLocation } from 'react-router-dom';
import { useMedplum } from '@medplum/react';

export default function ProtectedRoute({ children }) {
  const medplum = useMedplum();
  const location = useLocation();
  
  console.log('ProtectedRoute check:', {
    isAuthenticated: medplum.isAuthenticated(),
    location: location.pathname,
    medplumClient: !!medplum
  });
  
  if (!medplum.isAuthenticated()) {
    console.log('Not authenticated, redirecting to signin');
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  
  console.log('Authenticated, allowing access to protected route');
  return children;
}
