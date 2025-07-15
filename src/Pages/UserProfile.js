import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/UserProfile.css';

function UserProfile() {
  const [connectionStatus, setConnectionStatus] = useState('');
  const [sender, setSender] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [receiver, setReceiver] = useState({
    user_id: '',
    username: '',
    email: '',
    avatar: ''
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedSender = JSON.parse(localStorage.getItem('user'));
    setSender(storedSender);

    const queryParams = new URLSearchParams(location.search);
    const receiverData = {
      user_id: queryParams.get('user_id'),
      username: queryParams.get('username'),
      email: queryParams.get('email'),
      avatar: queryParams.get('avatar') || 'https://via.placeholder.com/150'
    };

    setReceiver(receiverData);

    if (storedSender?.user_id && receiverData.user_id) {
      checkConnectionStatus(storedSender.user_id, receiverData.user_id);
    } else {
      setIsLoading(false);
    }
  }, [location.search]);

  const checkConnectionStatus = async (senderId, receiverId) => {
    try {
      const res = await fetch(`https://shadow-chat-firebase-3.onrender.com/connect/check-status?sender_id=${senderId}&receiver_id=${receiverId}`);
      const data = await res.json();
      setConnectionStatus(data.status);
    } catch (err) {
      setConnectionStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const sendInvitation = async () => {
    try {
      const res = await fetch('https://shadow-chat-firebase-3.onrender.com/connect/send-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender_id: sender.user_id,
          receiver_id: receiver.user_id
        })
      });

      const data = await res.json();
      if (data.status === 'pending') {
        setConnectionStatus('pending');
      } else {
        setConnectionStatus('sent');
      }
    } catch (err) {
      setConnectionStatus('error');
    }
  };

  const handleMessage = async () => {
    try {
      const res = await fetch(`https://shadow-chat-firebase-3.onrender.com/password/get?user_id=${sender.user_id}`);
      const data = await res.json();

      if (data?.raw_password) {
        navigate(`/chat?sender_id=${sender.user_id}&receiver_id=${receiver.user_id}`);
      } else {
        alert('⚠️ Please set your password first before sending messages.');
      }
    } catch (err) {
      alert('⚠️ Unable to verify password. Please try again.');
    }
  };

  if (isLoading) return <p className="loading-text">Loading profile...</p>;
  if (!receiver.user_id || !sender?.user_id) return <p className="error-text">User not found or not logged in.</p>;

  return (
    <div className="user-profile-container">
      <h2 className="profile-title">User Profile</h2>

      <div className="profile-card">
        <img src={receiver.avatar} alt="Avatar" className="profile-avatar" />

        <p><strong>Username:</strong> {receiver.username}</p>
        <p><strong>Email:</strong> {receiver.email}</p>

        <div className="button-group">
          <button
            onClick={sendInvitation}
            className="invite-btn"
            disabled={connectionStatus === 'pending' || connectionStatus === 'accepted'}
          >
            Send Invitation
          </button>

          <button
            onClick={handleMessage}
            className="message-btn"
            disabled={connectionStatus !== 'accepted'}
          >
            Message
          </button>
        </div>

        <p className="status-text">
          {connectionStatus === 'pending' && '🕒 Invitation Pending'}
          {connectionStatus === 'accepted' && '✅ Connected'}
          {connectionStatus === 'sent' && '✅ Invitation Sent'}
          {connectionStatus === 'error' && '❌ Error fetching status'}
        </p>
      </div>
    </div>
  );
}

export default UserProfile;
