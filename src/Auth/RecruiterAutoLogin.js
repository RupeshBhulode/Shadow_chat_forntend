// ./Auth/RecruiterAutoLogin.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseClient';

function RecruiterAutoLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, "demo@chat.com", "Demo@123");
        const idToken = await userCredential.user.getIdToken();

        const res = await fetch('https://shadow-chat-firebase-3.onrender.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_token: idToken }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.detail || 'Login failed');

        localStorage.setItem('user', JSON.stringify({
          user_id: data.user.user_id,
          username: data.user.username,
          email: data.user.email,
          token: data.access_token,
          token_type: data.token_type,
          avatar: data.user.avatar,
        }));

        navigate('/dashboard');
      } catch (err) {
        console.error("Auto-login failed:", err.message);
      }
    };

    autoLogin();
  }, [navigate]);

  return <div>Logging in as recruiter...</div>;
}

export default RecruiterAutoLogin;
