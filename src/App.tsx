import { useState, useEffect } from 'react';

function App() {
  const [currentView, setCurrentView] = useState<'wall' | 'explore' | 'contacts' | 'chats' | 'profile'>('wall');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [inputPhrase, setInputPhrase] = useState('');
  const [newPost, setNewPost] = useState('');
  const [visibility, setVisibility] = useState<'everyone' | '18+'>('everyone');
  const [ageGroup, setAgeGroup] = useState<'under18' | '18plus'>('18plus');
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);
  const [dmMessages, setDmMessages] = useState<any[]>([]);

  useEffect(() => {
    const savedSeed = localStorage.getItem('rizzaga_seed');
    if (savedSeed) {
      setIsLoggedIn(true);
      setSeedPhrase(savedSeed);
      const savedPosts = localStorage.getItem(`posts_${savedSeed}`);
      if (savedPosts) setMyPosts(JSON.parse(savedPosts));
    }
  }, []);

  const savePosts = (posts: any[]) => {
    if (seedPhrase) localStorage.setItem(`posts_${seedPhrase}`, JSON.stringify(posts));
  };

  const generateSeed = () => {
    const words = ["abandon","ability","able","about","above","absent","absorb","abstract","absurd","abuse","access","accident","account","accuse","achieve","acid","acoustic","acquire","across","act"];
    const phrase = Array.from({length:12}, () => words[Math.floor(Math.random()*words.length)]).join(" ");
    setSeedPhrase(phrase);
    setIsLoggedIn(true);
    localStorage.setItem('rizzaga_seed', phrase);
  };

  const recoverAccount = () => {
    if (!inputPhrase.trim()) return alert("Please enter keyphrase");
    setSeedPhrase(inputPhrase.trim());
    setIsLoggedIn(true);
    localStorage.setItem('rizzaga_seed', inputPhrase.trim());
    setInputPhrase('');
  };

  const correctAndSummarize = (text: string) => {
    let corrected = text
      .replace(/\b(i|im|iam)\b/gi, "I")
      .replace(/\b(u|ur)\b/gi, "you")
      .replace(/\b(r)\b/gi, "are");
    const summary = corrected.length > 100 ? corrected.substring(0, 100) + "..." : corrected;
    return { corrected, summary };
  };

  const postMessage = () => {
    if (!newPost.trim()) return;
    const { corrected, summary } = correctAndSummarize(newPost);
    const newEntry = { 
      id: Date.now(), 
      user: "You", 
      content: corrected, 
      summary,
      visibility, 
      timestamp: "just now", 
      likes: 0 
    };
    const updated = [newEntry, ...myPosts];
    setMyPosts(updated);
    savePosts(updated);
    setNewPost('');
  };

  const likePost = (id: number) => {
    const updated = myPosts.map(p => p.id === id ? { ...p, likes: 1 } : p);
    setMyPosts(updated);
    savePosts(updated);
  };

  const shareMagnet = (id: number) => {
    const magnet = `magnet:?xt=urn:btih:${Date.now().toString(36)}${id}`;
    navigator.clipboard.writeText(magnet);
  };

  const directMessage = () => {
    alert("💬 Direct Message opened (E2EE + Blockchain simulation) - Type in Chats tab");
    setCurrentView('chats');
  };

  const sendComment = () => {
    if (!commentInput.trim()) return;
    alert(`💬 Comment sent: ${commentInput}`);
    setCommentInput('');
    setActiveCommentId(null);
  };

  const followUser = (user: string) => {
    if (!followedUsers.includes(user)) {
      setFollowedUsers([...followedUsers, user]);
      alert(`Followed ${user}`);
    }
  };

  const logout = () => {
    if (confirm("Logout?")) {
      setIsLoggedIn(false);
      localStorage.removeItem('rizzaga_seed');
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a0033, #0f172a)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div style={{ maxWidth: '420px', width: '100%', background: 'rgba(15,23,42,0.96)', padding: '50px 40px', borderRadius: '32px', textAlign: 'center', border: '1px solid #f59e0b', boxShadow: '0 0 80px rgba(245,158,11,0.3)' }}>
          <h1 style={{ fontSize: '52px', fontWeight: '900', marginBottom: '30px', color: '#f59e0b' }}>Rizzaga</h1>
          <p style={{ color: '#fcd34d', marginBottom: '35px', fontSize: '18px' }}>Privacy First • Blockchain + Torrent</p>
          
          <div style={{ marginBottom: '30px' }}>
            <p style={{ marginBottom: '12px', color: '#e0e7ff' }}>Your Age Group</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setAgeGroup('under18')} style={{ flex: 1, padding: '14px', background: ageGroup === 'under18' ? '#22c55e' : '#334155', borderRadius: '14px', fontWeight: 'bold' }}>Under 18</button>
              <button onClick={() => setAgeGroup('18plus')} style={{ flex: 1, padding: '14px', background: ageGroup === '18plus' ? '#22c55e' : '#334155', borderRadius: '14px', fontWeight: 'bold' }}>18+</button>
            </div>
          </div>

          <button onClick={generateSeed} style={{ width: '100%', padding: '20px', background: 'linear-gradient(#f59e0b, #d97706)', color: '#1e2937', border: 'none', borderRadius: '18px', marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>
            Create New Account
          </button>
          
          <textarea 
            value={inputPhrase} 
            onChange={(e) => setInputPhrase(e.target.value)} 
            placeholder="Paste your 12-word keyphrase to recover..." 
            style={{ width: '100%', height: '150px', background: '#1e2937', border: '2px solid #475569', borderRadius: '18px', padding: '20px', color: 'white', fontSize: '16px', resize: 'vertical', boxSizing: 'border-box' }} 
          />
          
          <button onClick={recoverAccount} style={{ width: '100%', padding: '20px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '18px', fontSize: '18px', fontWeight: 'bold' }}>
            Recover Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white', paddingBottom: '90px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ paddingTop: '40px', maxWidth: '620px', margin: '0 auto', padding: '15px' }}>
        {currentView === 'wall' && (
          <>
            <h2 style={{ fontSize: '32px', marginBottom: '25px', textAlign: 'center', color: '#f59e0b' }}>Today's Wall</h2>
            <div style={{ background: '#1e2937', padding: '28px', borderRadius: '28px', marginBottom: '30px', border: '1px solid #f59e0b', boxShadow: '0 10px 40px rgba(0,0,0,0.4)' }}>
              <textarea 
                value={newPost} 
                onChange={(e) => setNewPost(e.target.value)} 
                placeholder="What's happening today?" 
                style={{ width: '100%', minHeight: '150px', background: '#0f172a', border: '2px solid #475569', borderRadius: '18px', padding: '20px', color: 'white', fontSize: '18px', resize: 'vertical', boxSizing: 'border-box' }} 
              />
              <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                <button onClick={() => setVisibility('everyone')} style={{ flex: 1, padding: '14px', background: visibility === 'everyone' ? '#22c55e' : '#334155', borderRadius: '14px', fontWeight: 'bold' }}>🌍 Everyone</button>
                <button onClick={() => setVisibility('18+')} style={{ flex: 1, padding: '14px', background: visibility === '18+' ? '#ef4444' : '#334155', borderRadius: '14px', fontWeight: 'bold' }}>🔞 18+</button>
              </div>
              <button onClick={postMessage} style={{ marginTop: '18px', background: 'linear-gradient(#f59e0b, #d97706)', color: '#1e2937', padding: '18px', borderRadius: '18px', width: '100%', fontWeight: 'bold' }}>Post ({visibility})</button>
            </div>

            {myPosts.map((post) => (
              <div key={post.id} style={{ background: '#1e2937', padding: '28px', borderRadius: '28px', marginBottom: '24px', border: '1px solid #f59e0b', boxShadow: '0 10px 40px rgba(0,0,0,0.4)' }}>
                <p><strong>{post.user}</strong> • {post.timestamp} • {post.visibility}</p>
                <p style={{ margin: '16px 0', fontSize: '17px', lineHeight: '1.7' }}>{post.content}</p>
                {post.summary && <p style={{ color: '#94a3b8', fontSize: '14px' }}>Summary: {post.summary}</p>}
                <div style={{ display: 'flex', gap: '28px', marginTop: '16px' }}>
                  <button onClick={() => likePost(post.id)} style={{ background: 'none', border: 'none', color: '#f59e0b', fontSize: '28px' }}>⭐ {post.likes || 0}</button>
                  <button onClick={() => setActiveCommentId(post.id === activeCommentId ? null : post.id)} style={{ background: 'none', border: 'none', color: '#67e8f9', fontSize: '28px' }}>💬</button>
                  <button onClick={directMessage} style={{ background: 'none', border: 'none', color: '#c084fc', fontSize: '28px' }}>✉️</button>
                  <button onClick={() => shareMagnet(post.id)} style={{ background: 'none', border: 'none', color: '#67e8f9', fontSize: '28px' }}>🔗</button>
                </div>
                {activeCommentId === post.id && (
                  <div style={{ marginTop: '16px' }}>
                    <input value={commentInput} onChange={(e) => setCommentInput(e.target.value)} placeholder="Write a comment..." style={{ width: '100%', padding: '14px', background: '#0f172a', border: '1px solid #475569', borderRadius: '14px', color: 'white' }} />
                    <button onClick={sendComment} style={{ marginTop: '10px', background: '#67e8f9', color: '#0f172a', padding: '12px 32px', borderRadius: '14px', fontWeight: 'bold' }}>Send</button>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {currentView === 'profile' && (
          <div style={{ padding: '80px 20px', textAlign: 'center' }}>
            <h2 style={{ color: '#a5b4fc', fontSize: '38px' }}>👤 Profile</h2>
            <button onClick={() => alert("Your Recovery Keyphrase:\n\n" + seedPhrase)} style={{ margin: '40px 0', padding: '18px 60px', background: 'linear-gradient(#f59e0b, #d97706)', color: '#1e2937', borderRadius: '18px', fontWeight: 'bold', fontSize: '18px' }}>
              View Keyphrase
            </button>
            <button onClick={logout} style={{ padding: '16px 50px', background: '#ef4444', color: 'white', borderRadius: '18px' }}>Logout</button>
          </div>
        )}

        {currentView === 'explore' && <div style={{ padding: '140px 20px', textAlign: 'center', fontSize: '34px', color: '#67e8f9' }}>🔥 Explore Public Posts (IPFS simulation)</div>}
        {currentView === 'contacts' && <div style={{ padding: '140px 20px', textAlign: 'center', fontSize: '34px', color: '#fcd34d' }}>👥 Network & Connections</div>}
        {currentView === 'chats' && <div style={{ padding: '140px 20px', textAlign: 'center', fontSize: '34px', color: '#c084fc' }}>💬 Encrypted Chats</div>}
      </div>

      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(15,23,42,0.95)', display: 'flex', justifyContent: 'space-around', padding: '16px 0', borderTop: '1px solid #334155', backdropFilter: 'blur(16px)' }}>
        <button onClick={() => setCurrentView('wall')} style={{ fontSize: '32px' }}>🏠</button>
        <button onClick={() => setCurrentView('explore')} style={{ fontSize: '32px' }}>🔥</button>
        <button onClick={() => setCurrentView('contacts')} style={{ fontSize: '32px' }}>👥</button>
        <button onClick={() => setCurrentView('chats')} style={{ fontSize: '32px' }}>💬</button>
        <button onClick={() => setCurrentView('profile')} style={{ fontSize: '32px' }}>👤</button>
      </nav>
    </div>
  );
}

export default App;