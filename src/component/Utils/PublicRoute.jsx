import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children, redirectedTo = '/user/event-type' }) {
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  return isAuthenticated ? <Navigate to={redirectedTo} replace /> : <>{children}</>;
}
