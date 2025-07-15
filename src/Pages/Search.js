import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
function Search() {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const currentUserEmail = JSON.parse(localStorage.getItem('user'))?.email;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://shadow-chat-firebase-3.onrender.com/connect/users/all');
        const data = await res.json();
        const users = data.users.filter(user => user.email !== currentUserEmail);
        setAllUsers(users);
        setFilteredUsers(users);
      } catch (err) {
        setError(`Error fetching users: ${err.message}`);
      }
    };

    fetchUsers();
  }, [currentUserEmail]);

  const handleSearch = () => {
    const filtered = allUsers.filter(user =>
      user.username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleView = (user) => {
    localStorage.setItem('selectedUser', JSON.stringify(user));
    const params = new URLSearchParams({
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      avatar: user.avatar || ""
    });
    navigate(`/profile?${params.toString()}`);
  };

  return (
    <div className="search-container">
      <h2 className="search-title">Search Peoples</h2>

      <div className="search-bar">
        <input
  type="text"
  placeholder="Search by name"
  value={query}
  onChange={(e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    const filtered = allUsers.filter(user =>
      user.username.toLowerCase().includes(newQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }}
/>

        
      </div>

      {error && <p className="search-error">{error}</p>}

      <div className="user-list">
        {filteredUsers.length === 0 ? (
          <p className="no-users">No users found.</p>
        ) : (
          filteredUsers.map(user => (
            <div key={user.user_id} className="user-card">
              <img
                src={user.avatar || 'https://via.placeholder.com/50'}
                alt="Avatar"
                className="user-avatar"
              />
              <div className="user-info">
                <strong>{user.username}</strong>
                <br></br>
                <span>{user.email}</span>
              </div>
              <button className="view-btn" onClick={() => handleView(user)}>View</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Search;
