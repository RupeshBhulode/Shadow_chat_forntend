// Auth.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import '../css/Auth.css';


function Auth() {
  const [page, setPage] = useState('login');
  const navigate = useNavigate();

  const handleRecruiterBypass = () => {
    const userData = {
      user_id: "iVHIDXjwyvgvxPSuhojJOlCQfAW2",
      username: "DemoUser",
      email: "demouser@gmail.com",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJpVkhJRFhqd3l2Z3Z4UFN1aG9qSk9sQ1FmQVcyIiwiZXhwIjoxNzUzMDE5ODc4fQ.ZVYc458_ulpaVNck-ayceWQ16SyxqCBN2163byVRAk0",
      token_type: "bearer",
      avatar:
        "https://api.dicebear.com/8.x/adventurer/svg?seed=DemoUser",
    };

    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/dashboard");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-right">
        <div className="auth-box">
          {page === 'login' ? <Login /> : <Register />}
        </div>

        <div className="auth-toggle-message">
          {page === 'login' ? (
            <p>
              Don’t have an account?{' '}
              <span onClick={() => setPage('register')}>Sign up</span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span onClick={() => setPage('login')}>Log in</span>
            </p>
          )}
        </div>

        {/* Recruiters Bypass Button */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            onClick={handleRecruiterBypass}
            style={{
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#4b5563',
              color: 'white',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            Recruiters Auth Bypass
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;

