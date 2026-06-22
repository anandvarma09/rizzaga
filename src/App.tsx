import { useState, useEffect } from 'react';

function App() {
  const [currentView, setCurrentView] = useState('wall');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('rizzaga_seed');
    if (saved) setIsLoggedIn(true);
  }, []);

  const generateSeed = () => {
    alert("✅ Rizzaga Account Created!\n\nSave this keyphrase safely (demo).");
    setIsLoggedIn(true);
    localStorage.setItem('rizzaga_seed', 'demo-keyphrase-123');
  };

  const recoverAccount = () => {
    alert("✅ Account recovered!");
    setIsLoggedIn(true);
  };

  const logout = () => {
    if (confirm("Logout?")) {
      setIsLoggedIn(false);
      localStorage.removeItem('rizzaga_seed');
    }
  };

  const postMessage = () => {
    if (newPost.trim()) {
      setMyPosts([{ id: Date.now(), user: "You", content: newPost, timestamp: "just now" }, ...myPosts]);
      setNewPost('');
      alert("Post published!");
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ maxWidth: '420px', width: '100%', background: '#1a1a1a', padding: '40px', borderRadius: '20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>Rizzaga</h1>
          <button onClick={generateSeed} style={{ width: '100%', padding: '18px', background: '#7c3aed', color: 'white', border: 'none', borderRadius: '12px', marginBottom: '20px', fontSize: '18px' }}>
            Create New Account
          </button>
          <button onClick={recoverAccount} style={{ width: '100%', padding: '18px', background: '#eab308', color: 'black', border: 'none', borderRadius: '12px', fontSize: '18px' }}>
            Recover Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', paddingBottom: '90px' }}>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, background: '#111', padding: '16px', zIndex: 100 }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>Rizzaga</h1>
      </header>

      <div style={{ paddingTop: '90px', maxWidth: '620px', margin: '0 auto', padding: '15px' }}>
        {currentView === 'wall' && (
          <>
            <h2 style={{ fontSize: '32px', marginBottom: '25px', textAlign: 'center' }}>Today's Wall</h2>
            <div style={{ background: '#1f1f1f', padding: '25px', borderRadius: '20px', marginBottom: '30px' }}>
              <textarea 
                value={newPost} 
                onChange={(e) => setNewPost(e.target.value)} 
                placeholder="What's happening today?" 
                style={{ width: '100%', minHeight: '120px', background: 'transparent', border: 'none', color: 'white', fontSize: '18px' }} 
              />
              <button onClick={postMessage} style={{ marginTop: '15px', background: '#7c3aed', color: 'white', padding: '16px', borderRadius: '16px', width: '100%', fontWeight: 'bold' }}>
                Post
              </button>
            </div>

            {myPosts.map((post: any) => (
              <div key={post.id} style={{ background: '#1f1f1f', padding: '25px', borderRadius: '20px', marginBottom: '15px' }}>
                <p><strong>You</strong> • {post.timestamp}</p>
                <p>{post.content}</p>
              </div>
            ))}
          </>
        )}

        {currentView === 'explore' && <div style={{ padding: '80px 20px', textAlign: 'center', fontSize: '28px' }}>🔥 Explore Public Posts</div>}
        {currentView === 'contacts' && <div style={{ padding: '80px 20px', textAlign: 'center', fontSize: '28px' }}>👥 Network</div>}
        {currentView === 'chats' && <div style={{ padding: '80px 20px', textAlign: 'center', fontSize: '28px' }}>💬 Chats</div>}
        {currentView === 'profile' && <div style={{ padding: '80px 20px', textAlign: 'center', fontSize: '28px' }}>👤 Profile</div>}
      </div>

      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#111', display: 'flex', justifyContent: 'space-around', padding: '12px 0', borderTop: '1px solid #333' }}>
        <button onClick={() => setCurrentView('wall')} style={{ fontSize: '26px' }}>🏠</button>
        <button onClick={() => setCurrentView('explore')} style={{ fontSize: '26px' }}>🔥</button>
        <button onClick={() => setCurrentView('contacts')} style={{ fontSize: '26px' }}>👥</button>
        <button onClick={() => setCurrentView('chats')} style={{ fontSize: '26px' }}>💬</button>
        <button onClick={() => setCurrentView('profile')} style={{ fontSize: '26px' }}>👤</button>
      </nav>
    </div>
  );
}

export default App;