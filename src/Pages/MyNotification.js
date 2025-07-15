import React, { useEffect, useState } from 'react';
import '../css/MyNotification.css';
function MyNotification() {
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

 useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  if (!storedUser || !storedUser.user_id) {
    setError('User not logged in');
    return;
  }
  setUser(storedUser);

  const userId = storedUser.user_id;

  // Fetch Sent Requests
  fetch(`https://shadow-chat-firebase-3.onrender.com/connect/sent-requests?user_id=${userId}`)
    .then(res => res.json())
    .then(data => setSentRequests(data.sent_requests || []))
    .catch(() => setError('Error loading sent requests'));

  // Fetch Received Requests
  fetch(`https://shadow-chat-firebase-3.onrender.com/connect/received-requests?user_id=${userId}`)
    .then(res => res.json())
    .then(data => setReceivedRequests(data.received_requests || []))
    .catch(() => setError('Error loading received requests'));

}, []); // ✅ empty array = run once


  const acceptRequest = (senderId) => {
    fetch("https://shadow-chat-firebase-3.onrender.com/connect/accept-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender_id: senderId, receiver_id: user.user_id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Connection accepted") {
          // Update local state to reflect acceptance
          setReceivedRequests(prev =>
            prev.map(req =>
              req.user_id === senderId ? { ...req, status: 2 } : req
            )
          );
        } else {
          alert(data.error || 'Failed to accept');
        }
      })
      .catch(() => alert('❌ Failed to accept request'));
  };

  if (error) return <h3>{error}</h3>;

  return (
    <div className="notif-container">
      <h2 className="notif-title">Notifications</h2>

      <section>
        <h3 className="notif-subtitle">Sent Requests</h3>
        {sentRequests.length > 0 ? (
          sentRequests.map(req => (
            <div key={req.user_id} className="notif-card">
              <img src={req.avatar || defaultAvatar} alt="avatar" className="notif-avatar" />
              <div className="notif-info">
                <strong>{req.username}</strong> ({req.email})<br />
                Status: {req.status === 1 ? '✅ Accepted' : '🕒 Pending'}
              </div>
            </div>
          ))
        ) : (
          <p className="notif-empty">No sent requests.</p>
        )}
      </section>

      <section>
        <h3 className="notif-subtitle">Received Requests</h3>
        {receivedRequests.length > 0 ? (
          receivedRequests.map(req => (
            <div key={req.user_id} className="notif-card">
              <img src={req.avatar || defaultAvatar} alt="avatar" className="notif-avatar" />
              <div className="notif-info">
                <strong>{req.username}</strong> ({req.email})<br />
                {req.status === 2 ? (
                  '✅ Accepted'
                ) : (
                  <>
                    🕒 Pending{' '}
                    <button className="notif-btn" onClick={() => acceptRequest(req.user_id)}>
                      ✅ Accept
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="notif-empty">No received requests.</p>
        )}
      </section>
    </div>
  );
}


const defaultAvatar = "https://via.placeholder.com/100";


export default MyNotification;
