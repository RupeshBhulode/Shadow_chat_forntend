import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/MyProfile.css';

function MyProfile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return <h2 className="no-user">No user logged in.</h2>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>
      <div className="profile-card">
        <img
          src={user.avatar || 'https://via.placeholder.com/150'}
          alt="Avatar"
          className="profile-avatar"
        />
        <h2 className="profile-username">Username: {user.username}</h2>
        <p className="profile-email">Email: {user.email}</p>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default MyProfile;
