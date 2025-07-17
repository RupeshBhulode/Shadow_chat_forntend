import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Chat.css';

function Chat() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const messagesRef = useRef(null);
  const bottomRef = useRef(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const senderId = params.get('sender_id');
  const receiverId = params.get('receiver_id');
  const user = JSON.parse(localStorage.getItem('user'));
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('selectedUser'));
    if (user) setSelectedUser(user);
  }, []);
  useEffect(() => {
  if (bottomRef.current) {
    bottomRef.current.scrollIntoView({ behavior: "smooth" }); 
  }
  }, [conversation]);
  useEffect(() => {
    if (!senderId || !receiverId || !user?.user_id) return;

    const ws = new WebSocket(`wss://shadow-chat-firebase-3.onrender.com/ws/${senderId}`);
setSocket(ws);

    ws.onopen = () => setConversation(prev => [{ system: '✅ Connected to real-time chat' }, ...prev]);
    ws.onmessage = () => loadMessageHistory();
    ws.onclose = () => setConversation(prev => [{ system: '❌ Connection closed' }, ...prev]);

    loadMessageHistory();
    return () => ws.close();
  }, [senderId, receiverId]);

  const loadMessageHistory = () => {
    fetch('https://shadow-chat-firebase-3.onrender.com/messages/conversation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user1_id: senderId, user2_id: receiverId })
    })
      .then(res => res.json())
      .then(data => setConversation(data.conversation || []))
      .catch(() => setConversation([{ system: '❌ Failed to load messages' }]));
  };

  const sendMessage = () => {
    if (!message.trim() || socket?.readyState !== 1) return;

    socket.send(JSON.stringify({
      sender: senderId,
      receiver: receiverId,
      message: message.trim()
    }));

    setMessage('');
    setTimeout(loadMessageHistory, 500);
  };

  const handleDecrypt = async (msg, password, setDecrypted) => {
    if (password.length !== 2) return alert('Password must be exactly 2 digits');

    try {
      const res = await fetch('https://shadow-chat-firebase-3.onrender.com/messages/decrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message_id: msg.message_id, password, user_id: user.user_id })
      });
      if (!res.ok) throw new Error('Failed to decrypt');
      const decoded = await res.json();
      setDecrypted(decoded.original_message);
      setTimeout(() => setDecrypted(null), 10000);
    } catch {
      alert('❌ Incorrect password or failed decryption');
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">💬 Real-time Chat</h2>

      {selectedUser && (
        <div className="chat-user">
          <img src={selectedUser.avatar || 'https://via.placeholder.com/40'} alt="Avatar" />
          <p><strong>Receiver:</strong> {selectedUser.username}</p>
        </div>
      )}

      <div className="chat-messages" ref={messagesRef}>
        {Array.isArray(conversation) ? conversation.map((msg, i) => (
          <MessageCard key={i} msg={msg} user={user} onDecrypt={handleDecrypt} />
        )) : (
          <p>{conversation[0]?.system}</p>
        )}
        <div ref={bottomRef}></div>
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
function MessageCard({ msg, user, onDecrypt }) {
  const [password, setPassword] = useState('');
  const [decrypted, setDecrypted] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const isMe = msg.sender_id === user.user_id;
  const encMessage = isMe ? msg.message_for_sender : msg.message_for_receiver;

  const handleDoubleClick = () => {
  if (showInput) {
    setShowInput(false);  // Hide if already visible
    setPassword('');      // Optional: clear on hide
  } else {
    setPassword('');      // Clear and show fresh input
    setShowInput(true);
  }
};
  const handleToggleDecrypt = () => {
    if (decrypted) {
      setDecrypted(null);
      setShowInput(false);
    } else {
      onDecrypt(msg, password, (text) => {
        setDecrypted(text);
        setShowInput(false);
        setTimeout(() => {
          setDecrypted(null);
        }, 10000);
      });
    }
  };

  return (
    <div className={`message-card ${isMe ? 'right' : 'left'}`}>
      <div className="message-body" onDoubleClick={handleDoubleClick}>
        {decrypted ? (
          <div className="message-decrypted">{decrypted}</div>
        ) : (
          <img
            src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${encMessage}`}
            alt="Encrypted Avatar"
            className="encrypted-avatar"
          />
        )}

        {showInput && !decrypted && (
  <div className="decrypt-row">
    <input
      type="text"
      maxLength={2}
      placeholder="••"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="small-password-input"
    />
    <button className="decrypt-btn" onClick={handleToggleDecrypt}>
      🔓 
    </button>
  </div>
)}


        {decrypted && (
          <button className="decrypt-hide-btn" onClick={handleToggleDecrypt}>
            🔐 
          </button>
        )}
      </div>
    </div>
  );
}



export default Chat;
