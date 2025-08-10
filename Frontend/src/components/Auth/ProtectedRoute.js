/**
 * @file ProtectedRoute.js
 * @description
 * Higher-order component to protect routes that require authentication.
 * Redirects unauthenticated users to the admin login page.
 * 
 * Usage:
 * <ProtectedRoute>
 *   <YourProtectedComponent />
 * </ProtectedRoute>
 */

import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * 
 * Checks for a JWT token in localStorage.
 * If not present, redirects to the admin login page.
 * Otherwise, renders the child components.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components to render if authenticated
 * @returns {React.ReactNode}
 */
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

export default ProtectedRoute;