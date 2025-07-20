import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Auth/Login';
import Auth from './Auth/auth';
import Register from './Auth/Register';
import Navbar from './Navbar';
import UserProfile from './Pages/UserProfile';
import Chat from './Pages/Chat';
import ChatPartners from './Pages/ChatPartners';
import RecruiterAutoLogin from './Auth/RecruiterAutoLogin'; // ✅ Import the new component

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Navbar />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/chats" element={<ChatPartners />} />
      <Route path="/recruiter-auto-login" element={<RecruiterAutoLogin />} /> {/* ✅ New Route */}
    </Routes>
  );
}

export default App;

