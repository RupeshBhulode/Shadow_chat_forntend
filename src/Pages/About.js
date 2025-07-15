import React, { useEffect, useState } from "react";
import axios from "axios";
import pagecodeLogo from "../components/pagecode.png";
import photo from "../components/photo.png";
import "../css/About.css";
import { FaYoutube, FaLinkedin, FaGithub } from "react-icons/fa";

const About = () => {
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        // 👉 Change URL to your deployed backend
        const res = await axios.get("https://shadow-chat-firebase-3.onrender.com/messages/user-count");
        setUserCount(res.data.total_users);
      } catch (error) {
        console.error("❌ Error fetching user count:", error);
      }
    };
    fetchUserCount();
  }, []);

  return (
    <div className="about-container">
      {/* 1. Page Title */}
      <header className="about-header">
        <h1>About ShadowChat</h1>
      </header>

      {/* 2. Introduction */}
      <section className="about-section intro-section">
        <p className="intro-text">
          <strong>ShadowChat</strong> is a real‑time chat application designed for seamless conversations. 
          Whether you’re connecting with friends or testing out a new community, 
          ShadowChat makes messaging simple, fast, and secure.
        </p>
      </section>

      {/* 3. Features */}
      <section className="about-section features-section">
        <h2>Features</h2>
        <ul>
          <li>Real‑time messaging powered by Firebase Firestore</li>
          <li>Secure login and authentication using JWT</li>
          <li>Dynamic avatar generation for every user</li>
          <li>Minimal, responsive UI built with React</li>
          <li>Deployed on Render for reliability and scalability</li>
        </ul>
      </section>

      {/* 4. Technologies */}
      <section className="about-section technologies-section">
        <h2>Technologies Used</h2>
        <ul>
          <li><strong>React.js</strong> – frontend UI development</li>
          <li><strong>FastAPI</strong> – backend and authentication services</li>
          <li><strong>Firebase Firestore</strong> – real‑time database and storage</li>
          <li><strong>JWT</strong> – secure access tokens</li>
          <li><strong>Render</strong> – cloud hosting and deployment</li>
        </ul>
      </section>

      {/* 5. Platform Stats */}
      <section className="about-section stats-section">
        <h2>👥 Platform Stats</h2>
        {userCount !== null ? (
          <p>
            <strong>Total Users:</strong> {userCount}
          </p>
        ) : (
          <p>Loading user count...</p>
        )}
      </section>

      {/* 6. Channel Info */}
      <section className="about-section channel-section">
        <h2>Channel Information</h2>
        <div className="channel-details">
          <img src={pagecodeLogo} alt="Channel Logo" className="channel-logo" />
          <div className="channel-meta">
            <p><strong>Channel Name:</strong> Page Code</p>
            <div className="visit-channel">
              <a
                href="https://www.youtube.com/@PageCode"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-button"
              >
                Visit Channel
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Developer Info */}
      <section className="about-section developer-section">
        <h2>About the Developer</h2>
        <div className="developer-details">
          <img src={photo} alt="Developer" className="developer-photo" />
          <div className="developer-meta">
            <p>
              Hi, I'm <strong>Rupesh Bhulode</strong>, a software developer
              passionate about building tools that empower creators. 
              I built ShadowChat as part of my journey to explore modern web technologies 
              and to create something that’s both functional and fun.
            </p>
            <div className="social-icons">
              <a
                href="https://www.youtube.com/@PageCode"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="youtube-icon"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.linkedin.com/in/rupesh-bhulode-a4a269232/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="linkedin-icon"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/RupeshBhulode"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="github-icon"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Contact */}
      <section className="about-section contact-section">
        <h2>Contact</h2>
        <p>Email: <a href="mailto:pagecode58@gmail.com">pagecode58@gmail.com</a></p>
        <p>Follow me on social media for updates and tutorials.</p>
      </section>

      {/* 9. Version and Credits */}
      <section className="about-section credits-section">
        <h2>Version & Credits</h2>
        <p>ShadowChat Version: 1.0.0</p>
        <p>
          Built with ❤️ using React, FastAPI, and Firebase Firestore. 
          Icons from react-icons.
        </p>
      </section>

      <footer className="footer">
        © 2025 Rupesh Bhulode. All rights reserved. ShadowChat v1.0
      </footer>
    </div>
  );
};

export default About;
