import React, { useState } from 'react';
import { FaUser, FaBell, FaSearch, FaLock, FaComments, FaInfoCircle } from 'react-icons/fa';

import MyProfile from './Pages/MyProfile';
import MyNotification from './Pages/MyNotification';
import Search from './Pages/Search';
import Password from './Pages/Password';
import ChatPartners from './Pages/ChatPartners';
import About from './Pages/About';

import './Navbar.css'; // 🔥 Import your CSS
import ShadowLogo from './components/Shadow.png'; // ✅ make sure to place Shadow.png in src/assets

function Navbar() {
  const [activePage, setActivePage] = useState('profile');

  return (
    <div className="navbar-container">
      <nav className="sidebar">
        {/* ✅ Logo section */}
        <div className="logo-section">
          <img src={ShadowLogo} alt="ShadowChat Logo" className="logo-image" />
          
        </div>

        {/* ✅ Sidebar Items */}
        <div
          className={`nav-item ${activePage === 'profile' ? 'active' : ''}`}
          onClick={() => setActivePage('profile')}
        >
          <FaUser />
          <span>Profile</span>
        </div>
        <div
          className={`nav-item ${activePage === 'notifications' ? 'active' : ''}`}
          onClick={() => setActivePage('notifications')}
        >
          <FaBell />
          <span>Notifications</span>
        </div>
        <div
          className={`nav-item ${activePage === 'search' ? 'active' : ''}`}
          onClick={() => setActivePage('search')}
        >
          <FaSearch />
          <span>Search</span>
        </div>
        <div
          className={`nav-item ${activePage === 'password' ? 'active' : ''}`}
          onClick={() => setActivePage('password')}
        >
          <FaLock />
          <span>Password</span>
        </div>
        <div
          className={`nav-item ${activePage === 'chats' ? 'active' : ''}`}
          onClick={() => setActivePage('chats')}
        >
          <FaComments />
          <span>Chats</span>
        </div>

        {/* ✅ New About section */}
        <div
          className={`nav-item ${activePage === 'about' ? 'active' : ''}`}
          onClick={() => setActivePage('about')}
        >
          <FaInfoCircle />
          <span>About</span>
        </div>
      </nav>

      {/* ✅ Main page content */}
      <div className="page-content">
        {activePage === 'profile' && <MyProfile />}
        {activePage === 'notifications' && <MyNotification />}
        {activePage === 'search' && <Search />}
        {activePage === 'password' && <Password />}
        {activePage === 'chats' && <ChatPartners />}
        {activePage === 'about' && <About />}
      </div>
    </div>
  );
}

export default Navbar;
