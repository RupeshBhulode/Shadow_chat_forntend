import React, { useEffect, useState } from 'react';
import '../css/Password.css';

function Password() {
  const [setPasswordInput, setSetPasswordInput] = useState('');
  const [displayPassword, setDisplayPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordAlreadySet, setPasswordAlreadySet] = useState(false);
  const [showSetPasswordInput, setShowSetPasswordInput] = useState(false);
  const [triggerUpdateFlow, setTriggerUpdateFlow] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.user_id;

  const showMessage = (message, isError = false) => {
    if (isError) {
      setErrorMessage(message);
      setStatusMessage('');
    } else {
      setStatusMessage(message);
      setErrorMessage('');
    }
  };

  const checkIfPasswordSet = async () => {
    try {
      const res = await fetch(`https://shadow-chat-firebase-3.onrender.com/password/get?user_id=${userId}`);
      const data = await res.json();
      setPasswordAlreadySet(!!data?.raw_password);
    } catch (err) {
      showMessage('Error checking password', true);
    }
  };

  useEffect(() => {
    checkIfPasswordSet();
  }, []);

  const setPassword = async () => {
    try {
      const res = await fetch('https://shadow-chat-firebase-3.onrender.com/password/set', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, password: setPasswordInput }),
      });

      const data = await res.json();

      if (!res.ok) {
        showMessage(data?.detail || 'Unexpected server error', true);
        return;
      }

      showMessage("✅ Password has been set successfully!");
      setSetPasswordInput('');
      setShowSetPasswordInput(false);
      setTriggerUpdateFlow(false);
      checkIfPasswordSet();
    } catch (err) {
      showMessage('Error setting password', true);
    }
  };

  const getPassword = async () => {
    try {
      const res = await fetch(`https://shadow-chat-firebase-3.onrender.com/password/get?user_id=${userId}`);
      const data = await res.json();
      if (data.detail) showMessage(data.detail, true);
      else {
        setDisplayPassword(data.raw_password);
        showMessage('Password fetched successfully.');
      }
    } catch (err) {
      showMessage('Error fetching password', true);
    }
  };

  const updatePassword = () => {
    setTriggerUpdateFlow(true);
    setShowSetPasswordInput(true);
    setSetPasswordInput('');
    showMessage('Please enter your new 2-digit password below.');
  };

  return (
    <div className="password-container">
      <h2 className="password-title">Password Management</h2>

      {statusMessage && <div className="success-msg">{statusMessage}</div>}
      {errorMessage && <div className="error-msg">{errorMessage}</div>}

      <div className="password-section">
        <h3>Set Password</h3>
        {!showSetPasswordInput && (
          <button
            className="primary-btn"
            onClick={() => setShowSetPasswordInput(true)}
            disabled={passwordAlreadySet && !triggerUpdateFlow}
          >
            {passwordAlreadySet && !triggerUpdateFlow ? 'Password already set' : 'Set Password'}
          </button>
        )}

        {showSetPasswordInput && (
          <div className="input-group">
            <input
              type="password"
              value={setPasswordInput}
              onChange={(e) => setSetPasswordInput(e.target.value)}
              placeholder="Exactly 2 digits"
            />
            <button className="submit-btn" onClick={setPassword}>Submit</button>
          </div>
        )}
      </div>

      <div className="password-section">
        <h3>Get Password</h3>
        <button className="secondary-btn" onClick={getPassword}>Get Password</button>
        {displayPassword && <p className="raw-password">Raw Password: {displayPassword}</p>}
      </div>

      <div className="password-section">
        <h3>Update Password</h3>
        <button className="update-btn" onClick={updatePassword}>Update Password</button>
      </div>
    </div>
  );
}

export default Password;
