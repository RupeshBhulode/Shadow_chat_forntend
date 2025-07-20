import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseClient';
import "../css/Login.css";

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [responseMsg, setResponseMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const idToken = await userCredential.user.getIdToken();

      const res = await fetch('https://shadow-chat-firebase-3.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_token: idToken }),
      });

      const data = await res.json();
      if (!res.ok) {
        setResponseMsg('Login failed: ' + (data.detail || 'Unknown error'));
        return;
      }

      localStorage.setItem('user', JSON.stringify({
        user_id: data.user.user_id,
        username: data.user.username,
        email: data.user.email,
        token: data.access_token,
        token_type: data.token_type,
        avatar: data.user.avatar,
      }));

      setResponseMsg('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      setResponseMsg('Error: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2>Shadow Chat</h2>
      {isLoading && <div className="spinner"></div>}
      <form onSubmit={handleSubmit} autoComplete="off">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          autoComplete="new-email"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          autoComplete="new-password"
          required
        />
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>{responseMsg}</p>
    </div>
  );
}

export default Login;


