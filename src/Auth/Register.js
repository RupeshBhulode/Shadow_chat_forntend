import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseClient';
import "../css/Register.css";
function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
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
      // ✅ Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const idToken = await userCredential.user.getIdToken();

      // ✅ Send profile info + token to backend
      const res = await fetch('https://shadow-chat-firebase-3.onrender.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          avatar: "", // or leave out
          id_token: idToken,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setResponseMsg('Registration failed: ' + (data.detail || 'Unknown error'));
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

      setResponseMsg('Registration successful!');
      navigate('/dashboard');
    } catch (err) {
      setResponseMsg('Error: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-form">
      <h2>Shadow Chat</h2>
      {isLoading && <div className="spinner"></div>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <br />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <br />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <br />
        <button type="submit" disabled={isLoading}>{isLoading ? 'Registering...' : 'Register'}</button>
      </form>
      <p>{responseMsg}</p>
    </div>
  );
}

export default Register;

