import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    if (!backendUrl) return undefined;
    const controller = new AbortController();
    fetch(`${backendUrl}/api/health`, { cache: 'no-store', signal: controller.signal }).catch(() => {});
    return () => controller.abort();
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault(); setSubmitting(true); setError('');
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('token', data.token); navigate('/admin/dashboard');
    } catch (requestError) { setError(requestError.message || 'Something went wrong'); }
    finally { setSubmitting(false); }
  };
  return <main className="admin-login"><section className="admin-login__panel"><p>Chips & Bytes</p><h1>Admin access</h1><span>Sign in to manage sessions, announcements, archives, and daily news.</span><form onSubmit={handleLogin}><label>Username<input type="text" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required /></label><label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /></label>{error && <p className="error-message" role="alert">{error}</p>}<button type="submit" disabled={submitting}>{submitting ? 'Signing in…' : 'Sign in'}</button></form></section></main>;
};
export default AdminLogin;
