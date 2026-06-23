import { useState, useEffect } from 'react';

function App() {
  const [currentView, setCurrentView] = useState<'wall' | 'explore' | 'contacts' | 'chats' | 'profile'>('wall');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [inputPhrase, setInputPhrase] = useState('');
  const [newPost, setNewPost] = useState('');
  const [myPosts, setMyPosts] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('rizzaga_seed');
    if (saved) {
      setIsLoggedIn(true);
      setSeedPhrase(saved);
    }
  }, []);

  const generateSeed = () => {
    const words = ["apple","banana","cat","dragon","eagle","flame","gold","honey","ice","jewel","kiwi","lion","magic","night","ocean","pearl","queen","river","star","tiger","ultra","violet","wave","xenon","yellow","zebra"];
    const phrase = Array.from({length:12}, () => words[Math.floor(Math.random()*words.length)]).join(" ");
    setSeedPhrase(phrase);
    setIsLoggedIn(true);
    localStorage.setItem('rizzaga_seed', phrase);
    alert("✅ Account Created!\n\nCopy and save this 12-word keyphrase safely:\n\n" + phrase);
  };

  const recoverAccount = () => {
    if (!inputPhrase.trim()) {
      alert("Please enter your keyphrase");
      return;
    }
    setSeedPhrase(inputPhrase.trim());
    setIsLoggedIn(true);
    localStorage.setItem('rizzaga_seed', inputPhrase.trim());
    alert("✅ Account recovered successfully!");
    setInputPhrase('');
  };

  const correctText = (text: string) => {
    return text
      .replace(/\b(i|im|iam)\b/gi, "I")
      .replace(/\b(u|ur)\b/gi, "you")
      .replace(/\b(r)\b/gi, "are");
  };

  const postMessage = () => {
    if (newPost.trim()) {
      const corrected = correctText(newPost);
      setMyPosts([{ 
        id: Date.now(), 
        user: "You", 
        content: corrected, 
        timestamp: "just now",
        likes: 0 
      }, ...myPosts]);
      setNewPost('');
      alert("Post published!");
    }
  };

  const likePost = (id: number) => {
    setMyPosts(myPosts.map(p => p.id === id ? {...p, likes: p.likes + 1} : p));
    alert("⭐ Liked!");
  };

  const messageUser = () => {
    alert("💬 Direct message feature coming soon!");
  };

  const shareMagnet = (id: number) => {
    const magnet = `magnet:?xt=urn:btih:${id}&dn=Rizzaga_Post_${id}`;
    alert(`Magnet Link Ready!\n\n${magnet}\n\nShare this with friends for P2P transfer.`);
  };

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a0033, #000)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ maxWidth: '420px', width: '100%', background: 'rgba(26,26,26,0.95)', padding: '40px', borderRadius: '24px', textAlign: 'center', border: '1px solid #c026d3' }}>
          <h1 style={{ fontSize: '52px', fontWeight: '900', marginBottom: '10px', color: '#c026d3' }}>Rizzaga</h1>
          <p style={{ color: '#eab308', marginBottom: '30px' }}>Privacy First • Encrypted • P2P</p>
          
          <button onClick={generateSeed} style={{ width: '100%', padding: '18px', background: '#c026d3', color: 'white', border: 'none', borderRadius: '16px', marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>
            Create New Account
          </button>
          
          <textarea value={inputPhrase} onChange={(e) => setInputPhrase(e.target.value)} placeholder="Paste your 12-word keyphrase..." style={{ width: '100%', height: '130px', background: '#111', border: '1px solid #444', borderRadius: '16px', padding: '16px', color: 'white', marginBottom: '20px' }} />
          
          <button onClick={recoverAccount} style={{ width: '100%', padding: '18px', background: '#eab308', color: 'black', border: 'none', borderRadius: '16px', fontSize: '18px', fontWeight: 'bold' }}>
            Recover Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', paddingBottom: '90px' }}>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, background: '#111', padding: '16px', zIndex: 100, borderBottom: '2px solid #c026d3' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#c026d3' }}>Rizzaga</h1>
      </header>

      <div style={{ paddingTop: '90px', maxWidth: '620px', margin: '0 auto', padding: '15px' }}>
        {currentView === 'wall' && (
          <>
            <h2 style={{ fontSize: '32px', marginBottom: '25px', textAlign: 'center', color: '#eab308' }}>Today's Wall</h2>
            <div style={{ background: '#1f1f1f', padding: '25px', borderRadius: '20px', marginBottom: '30px', border: '1px solid #c026d3' }}>
              <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="What's happening today?" style={{ width: '100%', minHeight: '120px', background: 'transparent', border: 'none', color: 'white', fontSize: '18px' }} />
              <button onClick={postMessage} style={{ marginTop: '15px', background: '#c026d3', color: 'white', padding: '16px', borderRadius: '16px', width: '100%', fontWeight: 'bold' }}>Post</button>
            </div>

            {myPosts.map((post) => (
              <div key={post.id} style={{ background: '#1f1f1f', padding: '25px', borderRadius: '20px', marginBottom: '20px', border: '1px solid #eab308' }}>
                <p><strong>{post.user}</strong> • {post.timestamp}</p>
                <p style={{ margin: '15px 0', fontSize: '17px' }}>{post.content}</p>
                <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
                  <button onClick={() => likePost(post.id)} style={{ background: 'none', border: 'none', color: '#eab308', fontSize: '20px' }}>⭐ {post.likes}</button>
                  <button onClick={messageUser} style={{ background: 'none', border: 'none', color: '#22d3ee', fontSize: '20px' }}>💬</button>
                  <button onClick={() => shareMagnet(post.id)} style={{ background: 'none', border: 'none', color: '#a855f7', fontSize: '20px' }}>🔗</button>
                </div>
              </div>
            ))}
          </>
        )}

        {currentView === 'explore' && <div style={{ padding: '80px 20px', textAlign: 'center', fontSize: '28px', color: '#22d3ee' }}>🔥 Explore Public Posts (TikTok style)</div>}
        {currentView === 'contacts' && <div style={{ padding: '80px 20px', textAlign: 'center', fontSize: '28px', color: '#eab308' }}>👥 Network & Connections</div>}
        {currentView === 'chats' && <div style={{ padding: '80px 20px', textAlign: 'center', fontSize: '28px', color: '#a855f7' }}>💬 Chats</div>}
        {currentView === 'profile' && (
          <div style={{ padding: '40px 20px', textAlign: 'center' }}>
            <h2 style={{ color: '#c026d3' }}>Profile</h2>
            <button onClick={() => alert("Your Keyphrase:\n\n" + seedPhrase)} style={{ marginTop: '30px', padding: '16px 40px', background: '#eab308', color: 'black', borderRadius: '12px', fontWeight: 'bold' }}>
              View Keyphrase
            </button>
            <button onClick={logout} style={{ marginTop: '20px', padding: '12px 30px', background: '#ef4444', color: 'white', borderRadius: '12px' }}>Logout</button>
          </div>
        )}
      </div>

      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#111', display: 'flex', justifyContent: 'space-around', padding: '12px 0', borderTop: '2px solid #c026d3' }}>
        <button onClick={() => setCurrentView('wall')} style={{ fontSize: '28px' }}>🏠</button>
        <button onClick={() => setCurrentView('explore')} style={{ fontSize: '28px' }}>🔥</button>
        <button onClick={() => setCurrentView('contacts')} style={{ fontSize: '28px' }}>👥</button>
        <button onClick={() => setCurrentView('chats')} style={{ fontSize: '28px' }}>💬</button>
        <button onClick={() => setCurrentView('profile')} style={{ fontSize: '28px' }}>👤</button>
      </nav>
    </div>
  );
}

export default App;