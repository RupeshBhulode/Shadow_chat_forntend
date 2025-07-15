import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [responseMsg, setResponseMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false); // ✅ loading state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // ✅ show spinner

    try {
      const res = await fetch('https://shadow-chat-firebase-3.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setResponseMsg('Registration failed: ' + (data.detail || 'Unknown error'));
        return;
      }

      // ✅ Save user data
      localStorage.setItem('user', JSON.stringify({
        user_id: data.user.user_id,
        username: data.user.username,
        email: data.user.email,
        token: data.access_token,
        token_type: data.token_type,
        avatar: data.user.avatar,
      }));

      setResponseMsg('Registration successful!');
      navigate('/dashboard'); // redirect
    } catch (error) {
      setResponseMsg('Error: ' + error.message);
    } finally {
      setIsLoading(false); // ✅ hide spinner
    }
  };

  return (
    <div className="register-form">
      <h2>Shadow Chat</h2>

      {/* ✅ Spinner displayed while loading */}
      {isLoading && <div className="spinner"></div>}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <p>{responseMsg}</p>
    </div>
  );
}

export default Register;
