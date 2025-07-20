useEffect(() => {
  const autoLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, "demouser@gmail.com", "05Aug2003#");
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

  autoLogin(); // ✅ this should only run once
}, []); // ✅ keep empty dependency array

