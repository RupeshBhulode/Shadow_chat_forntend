import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChatPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // For redirecting

  const fetchChatPartners = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")); // 👈 Replace with your actual storage key
      if (!user || !user.user_id) {
        alert("User not logged in or ID missing.");
        return;
      }

      const response = await axios.post(
        "https://shadow-chat-firebase-3.onrender.com/messages/chat-partners",
        JSON.stringify(user.user_id),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setPartners(response.data.chat_partners || []);
    } catch (error) {
      console.error("Error fetching chat partners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatPartners();
  }, []);

  const handleChat = (user) => {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  if (!loggedInUser || !loggedInUser.user_id) {
    alert("You're not logged in.");
    return;
  }

  localStorage.setItem("selectedUser", JSON.stringify(user));

  // Pass sender_id and receiver_id in query params
  const params = new URLSearchParams({
    sender_id: loggedInUser.user_id,
    receiver_id: user.user_id,
  });

  // Navigate to chat
  navigate(`/chat?${params.toString()}`);
};


  if (loading) return <div>Loading chat partners...</div>;

  return (
    <div>
      <h2>Chat Partners</h2>
      {partners.length === 0 ? (
        <p>No chat partners found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {partners.map((partner) => (
            <li key={partner.user_id} style={styles.card}>
              <img src={partner.avatar} alt="avatar" style={styles.avatar} />
              <div style={{ flexGrow: 1 }}>
                <strong>{partner.username || "Unknown"}</strong>
                <p>Email: {partner.email}</p>
              </div>
              <button onClick={() => handleChat(partner)} style={styles.button}>
                Chat
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "10px",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
  button: {
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default ChatPartners;
