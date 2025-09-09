import { Navigate, useLocation } from 'react-router-dom';
import { useMedplum } from '@medplum/react';

export default function ProtectedRoute({ children }) {
  const medplum = useMedplum();
  const location = useLocation();
  if (!medplum.isAuthenticated()) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return children;
}
