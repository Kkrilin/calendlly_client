import React from 'react';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, redirectedTo = '/' }) {
  const isAuthenticated = Boolean(localStorage.getItem('token'));

  if (!isAuthenticated) {
    toast.error('please login again');
  }
  return isAuthenticated ? <>{children}</> : <Navigate to={redirectedTo} />;
}
