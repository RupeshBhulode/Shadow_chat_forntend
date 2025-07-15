import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [responseMsg, setResponseMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false); // ✅ for spinner
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // ✅ show spinner

    try {
      const res = await fetch('https://shadow-chat-firebase-3.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const error = await res.json();
        setResponseMsg('Login failed: ' + (error.detail || 'Unknown error'));
        return;
      }

      const data = await res.json();

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
      setIsLoading(false); // ✅ hide spinner
    }
  };

  return (
    <div className="login-form">
      <h2>Shadow Chat</h2>

      {/* ✅ Spinner shown when loading */}
      {isLoading && <div className="spinner"></div>}

      <form onSubmit={handleSubmit}>
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
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p>{responseMsg}</p>
    </div>
  );
}

export default Login;
