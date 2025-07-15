// Auth.js
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import '../css/Auth.css';

function Auth() {
  const [page, setPage] = useState('login');

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
      </div>
    </div>
  );
}

export default Auth;
