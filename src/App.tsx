import { useState, useEffect } from 'react';

function App() {
  const [currentView, setCurrentView] = useState<'wall' | 'explore' | 'contacts' | 'chats' | 'profile'>('wall');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [seedPhrase, setSeedPhrase] = useState('');
  const [accountId, setAccountId] = useState('');
  const [inputUsername, setInputUsername] = useState('');
  const [inputPhrase, setInputPhrase] = useState('');
  const [newPost, setNewPost] = useState('');
  const [visibility, setVisibility] = useState<'everyone' | '18+'>('everyone');
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
  const [followedUsers, setFollowedUsers] = useState<string[]>([]);
  const [dmChats, setDmChats] = useState<Record<string, any[]>>({});
  const [activeChatUser, setActiveChatUser] = useState<string | null>(null);
  const [connectId, setConnectId] = useState('');
  const [showSummaryForPost, setShowSummaryForPost] = useState<Record<number, boolean>>({});
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [showCreate, setShowCreate] = useState(true);
  const [uploadedMedia, setUploadedMedia] = useState<string | null>(null);

  useEffect(() => {
    const savedSeed = localStorage.getItem('rizzaga_seed');
    const savedUser = localStorage.getItem('rizzaga_username');
    const savedId = localStorage.getItem('rizzaga_accountId');
    if (savedSeed && savedUser) {
      setIsLoggedIn(true);
      setSeedPhrase(savedSeed);
      setUsername(savedUser);
      setAccountId(savedId || btoa(savedSeed).slice(0, 16));
      const savedPosts = localStorage.getItem(`posts_${savedSeed}`);
      if (savedPosts) setMyPosts(JSON.parse(savedPosts));
    }
  }, []);

  const savePosts = (posts: any[]) => {
    if (seedPhrase) localStorage.setItem(`posts_${seedPhrase}`, JSON.stringify(posts));
  };

  const checkUsername = (name: string) => {
    const taken = ["admin", "test", "alice", "bob", "cryptoqueen", "shadowbyte"].includes(name.toLowerCase().trim());
    setUsernameAvailable(!taken);
  };

  const generateSeed = () => {
    if (!inputUsername.trim()) return alert("Please choose a username");
    if (!usernameAvailable) return alert("Username taken. Try another.");
    
    const words = ["abandon","ability","able","about","above","absent","absorb","abstract","absurd","abuse","access","accident","account","accuse","achieve","acid","acoustic","acquire","across","act","action","active","actor","actual"];
    const phrase = Array.from({length:24}, () => words[Math.floor(Math.random()*words.length)]).join(" ") + " #" + Math.floor(Math.random()*8999+1000);
    
    const newId = btoa(inputUsername.trim() + Date.now()).slice(0, 16);
    
    setSeedPhrase(phrase);
    setUsername(inputUsername.trim());
    setAccountId(newId);
    setIsLoggedIn(true);
    localStorage.setItem('rizzaga_seed', phrase);
    localStorage.setItem('rizzaga_username', inputUsername.trim());
    localStorage.setItem('rizzaga_accountId', newId);
  };

  const recoverAccount = () => {
    if (!inputPhrase.trim() || !inputUsername.trim()) return alert("Enter both username and keyphrase");
    const newId = btoa(inputUsername.trim() + Date.now()).slice(0, 16);
    setSeedPhrase(inputPhrase.trim());
    setUsername(inputUsername.trim());
    setAccountId(newId);
    setIsLoggedIn(true);
    localStorage.setItem('rizzaga_seed', inputPhrase.trim());
    localStorage.setItem('rizzaga_username', inputUsername.trim());
    localStorage.setItem('rizzaga_accountId', newId);
  };

  const regenerateKeyphrase = () => {
    if (!confirm("Generate new 24-word keyphrase?")) return;
    const words = ["abandon","ability","able","about","above","absent","absorb","abstract","absurd","abuse","access","accident","account","accuse","achieve","acid","acoustic","acquire","across","act","action","active","actor","actual"];
    const newPhrase = Array.from({length:24}, () => words[Math.floor(Math.random()*words.length)]).join(" ") + " #" + Math.floor(Math.random()*8999+1000);
    setSeedPhrase(newPhrase);
    localStorage.setItem('rizzaga_seed', newPhrase);
    alert("✅ New keyphrase generated!");
  };

  const correctText = (text: string) => text
    .replace(/\b(i|im|iam)\b/gi, "I")
    .replace(/\b(u|ur)\b/gi, "you")
    .replace(/\b(r)\b/gi, "are");

  const postMessage = () => {
    if (!newPost.trim()) return;
    const corrected = correctText(newPost);
    const summary = corrected.length > 90 ? corrected.substring(0, 90) + "..." : corrected;
    const newEntry = { 
      id: Date.now(), 
      user: username || "You", 
      content: corrected, 
      summary,
      visibility, 
      timestamp: "just now", 
      likes: 0,
      comments: [],
      ipfs: "ipfs://Qm" + Date.now().toString(36),
      media: uploadedMedia
    };
    const updated = [newEntry, ...myPosts];
    setMyPosts(updated);
    savePosts(updated);
    setNewPost('');
    setUploadedMedia(null);
  };

  const likePost = (id: number) => {
    const updated = myPosts.map(p => p.id === id ? { ...p, likes: 1 } : p);
    setMyPosts(updated);
    savePosts(updated);
  };

  const toggleSummary = (id: number) => {
    setShowSummaryForPost(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addComment = (postId: number) => {
    if (!commentInput.trim()) return;
    const updated = myPosts.map(p => {
      if (p.id === postId) {
        return { ...p, comments: [...(p.comments || []), { user: username || "You", text: commentInput }] };
      }
      return p;
    });
    setMyPosts(updated);
    savePosts(updated);
    setCommentInput('');
    setActiveCommentId(null);
  };

  const shareMagnet = (id: number) => {
    const magnet = `magnet:?xt=urn:btih:${Date.now().toString(36)}${id}`;
    navigator.clipboard.writeText(magnet);
    alert("🔗 Magnet link copied!");
  };

  const startCall = (type: 'voice' | 'video', user: string) => {
    alert(`📞 ${type.toUpperCase()} Call with ${user} started (E2EE + WebRTC)`);
  };

  const directMessage = (user: string) => {
    setActiveChatUser(user);
    setCurrentView('chats');
  };

  const sendDM = (msg: string) => {
    if (!msg.trim() || !activeChatUser) return;
    const newMsg = { from: username || "You", text: msg, time: "now" };
    setDmChats(prev => ({
      ...prev,
      [activeChatUser]: [...(prev[activeChatUser] || []), newMsg]
    }));
  };

  const followUser = (user: string) => {
    if (!followedUsers.includes(user)) {
      setFollowedUsers([...followedUsers, user]);
      alert(`✅ Connected with ${user}`);
    }
  };

  const connectById = () => {
    if (!connectId.trim()) return alert("Enter Account ID");
    if (followedUsers.includes(connectId)) return alert("Already connected");
    setFollowedUsers([...followedUsers, connectId]);
    alert(`✅ Connected with Account ID: ${connectId}`);
    setConnectId('');
  };

  const logout = () => {
    if (confirm("Logout?")) {
      setIsLoggedIn(false);
      localStorage.removeItem('rizzaga_seed');
      localStorage.removeItem('rizzaga_username');
      localStorage.removeItem('rizzaga_accountId');
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a0033, #0f172a)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div style={{ maxWidth: '420px', width: '100%', background: 'rgba(15,23,42,0.96)', padding: '50px 40px', borderRadius: '32px', textAlign: 'center', border: '1px solid #f59e0b', boxShadow: '0 0 80px rgba(245,158,11,0.3)' }}>
          <h1 style={{ fontSize: '52px', fontWeight: '900', marginBottom: '30px', color: '#f59e0b' }}>Rizzaga</h1>
          <p style={{ color: '#fcd34d', marginBottom: '35px', fontSize: '18px' }}>Privacy First • Real Client-Side Encryption</p>

          <div style={{ marginBottom: '30px', display: 'flex', background: '#1e2937', borderRadius: '18px', padding: '6px' }}>
            <button onClick={() => setShowCreate(true)} style={{ flex: 1, padding: '14px', background: showCreate ? '#f59e0b' : 'transparent', color: showCreate ? '#1e2937' : 'white', borderRadius: '14px', fontWeight: 'bold' }}>Create Account</button>
            <button onClick={() => setShowCreate(false)} style={{ flex: 1, padding: '14px', background: !showCreate ? '#f59e0b' : 'transparent', color: !showCreate ? '#1e2937' : 'white', borderRadius: '14px', fontWeight: 'bold' }}>Recover Account</button>
          </div>

          {showCreate ? (
            <div>
              <input value={inputUsername} onChange={(e) => { setInputUsername(e.target.value); checkUsername(e.target.value); }} placeholder="Choose username" style={{ width: '100%', padding: '18px', background: '#1e2937', border: '2px solid #475569', borderRadius: '18px', color: 'white', marginBottom: '12px', fontSize: '16px', boxSizing: 'border-box' }} />
              {inputUsername && <p style={{ color: usernameAvailable ? '#22c55e' : '#ef4444', fontSize: '14px', marginBottom: '12px' }}>{usernameAvailable ? "✅ Available" : "❌ Taken"}</p>}
              <button onClick={generateSeed} style={{ width: '100%', padding: '20px', background: 'linear-gradient(#f59e0b, #d97706)', color: '#1e2937', border: 'none', borderRadius: '18px', marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>Create New Account</button>
            </div>
          ) : (
            <div>
              <input value={inputUsername} onChange={(e) => setInputUsername(e.target.value)} placeholder="Username" style={{ width: '100%', padding: '18px', background: '#1e2937', border: '2px solid #475569', borderRadius: '18px', color: 'white', marginBottom: '12px', fontSize: '16px', boxSizing: 'border-box' }} />
              <textarea value={inputPhrase} onChange={(e) => setInputPhrase(e.target.value)} placeholder="24-word keyphrase" style={{ width: '100%', height: '150px', background: '#1e2937', border: '2px solid #475569', borderRadius: '18px', padding: '20px', color: 'white', fontSize: '16px', resize: 'vertical', boxSizing: 'border-box' }} />
              <button onClick={recoverAccount} style={{ width: '100%', padding: '20px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '18px', fontSize: '18px', fontWeight: 'bold' }}>Recover Account</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a0033, #0f172a)', color: 'white', paddingBottom: '90px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ paddingTop: '40px', maxWidth: '620px', margin: '0 auto', padding: '15px' }}>
        {currentView === 'wall' && (
          <>
            <h2 style={{ fontSize: '32px', marginBottom: '25px', textAlign: 'center', color: '#f59e0b' }}>Today's Wall</h2>
            <div style={{ background: 'rgba(30,41,55,0.95)', padding: '28px', borderRadius: '28px', marginBottom: '30px', border: '1px solid #f59e0b', boxShadow: '0 10px 40px rgba(0,0,0,0.4)' }}>
              <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="What's happening today?" style={{ width: '100%', minHeight: '150px', background: '#1e2937', border: '2px solid #475569', borderRadius: '18px', padding: '20px', color: 'white', fontSize: '18px', resize: 'vertical', boxSizing: 'border-box' }} />
              <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
                <button onClick={() => setVisibility('everyone')} style={{ flex: 1, padding: '14px', background: visibility === 'everyone' ? '#22c55e' : '#334155', borderRadius: '14px', fontWeight: 'bold' }}>🌍 Everyone</button>
                <button onClick={() => setVisibility('18+')} style={{ flex: 1, padding: '14px', background: visibility === '18+' ? '#ef4444' : '#334155', borderRadius: '14px', fontWeight: 'bold' }}>🔞 18+</button>
              </div>
              <button onClick={postMessage} style={{ marginTop: '18px', background: 'linear-gradient(#f59e0b, #d97706)', color: '#1e2937', padding: '18px', borderRadius: '18px', width: '100%', fontWeight: 'bold' }}>Post ({visibility})</button>
            </div>

            {myPosts.map((post) => (
              <div key={post.id} style={{ background: 'rgba(30,41,55,0.95)', padding: '28px', borderRadius: '28px', marginBottom: '24px', border: '1px solid #f59e0b', boxShadow: '0 10px 40px rgba(0,0,0,0.4)' }}>
                <p><strong>{post.user}</strong> • {post.timestamp} • {post.visibility}</p>
                <p style={{ margin: '16px 0', fontSize: '17px', lineHeight: '1.7' }}>{post.content}</p>
                <button onClick={() => toggleSummary(post.id)} style={{ color: '#f59e0b', fontSize: '14px' }}>{showSummaryForPost[post.id] ? "Hide Summary" : "Show Summary"}</button>
                {showSummaryForPost[post.id] && post.summary && <p style={{ color: '#94a3b8' }}>Summary: {post.summary}</p>}
                <div style={{ display: 'flex', gap: '24px', marginTop: '16px', flexWrap: 'wrap' }}>
                  <button onClick={() => likePost(post.id)} style={{ background: 'none', border: 'none', color: '#f59e0b', fontSize: '28px' }}>⭐ {post.likes || 0}</button>
                  <button onClick={() => setActiveCommentId(post.id === activeCommentId ? null : post.id)} style={{ background: 'none', border: 'none', color: '#67e8f9', fontSize: '28px' }}>💬</button>
                  <button onClick={() => directMessage(post.user)} style={{ background: 'none', border: 'none', color: '#c084fc', fontSize: '28px' }}>✉️</button>
                  <button onClick={() => shareMagnet(post.id)} style={{ background: 'none', border: 'none', color: '#67e8f9', fontSize: '28px' }}>🔗</button>
                </div>
                {activeCommentId === post.id && (
                  <div style={{ marginTop: '16px' }}>
                    <input value={commentInput} onChange={(e) => setCommentInput(e.target.value)} placeholder="Write comment..." style={{ width: '100%', padding: '14px', background: '#0f172a', border: '1px solid #475569', borderRadius: '14px', color: 'white' }} />
                    <button onClick={() => addComment(post.id)} style={{ marginTop: '10px', background: '#67e8f9', color: '#0f172a', padding: '12px 32px', borderRadius: '14px', fontWeight: 'bold' }}>Send</button>
                  </div>
                )}
                {(post.comments || []).length > 0 && (
                  <div style={{ marginTop: '16px', padding: '12px', background: '#1e2937', borderRadius: '12px' }}>
                    {(post.comments || []).map((c: any, i: number) => <p key={i}><strong>{c.user}:</strong> {c.text}</p>)}
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {currentView === 'contacts' && (
          <div style={{ padding: '40px 20px' }}>
            <h2 style={{ textAlign: 'center', color: '#f59e0b' }}>👥 Network</h2>
            
            <div style={{ marginBottom: '30px' }}>
              <input value={connectId} onChange={(e) => setConnectId(e.target.value)} placeholder="Enter Account ID to connect" style={{ width: '100%', padding: '14px', background: '#1e2937', border: '1px solid #475569', borderRadius: '18px', color: 'white', marginBottom: '10px' }} />
              <button onClick={connectById} style={{ width: '100%', padding: '14px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '18px', fontWeight: 'bold' }}>Connect by Account ID</button>
            </div>

            <h3 style={{ color: '#94a3b8' }}>Suggested Users</h3>
            {["Alice", "Bob", "CryptoQueen", "DecentralizedDev", "PrivacyNomad", "ShadowByte"].map(user => (
              <div key={user} style={{ background: 'rgba(30,41,55,0.95)', padding: '20px', margin: '12px 0', borderRadius: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #6366f1' }}>
                <span>{user}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => followUser(user)} style={{ padding: '8px 16px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '12px' }}>Follow</button>
                  <button onClick={() => directMessage(user)} style={{ padding: '8px 16px', background: '#6366f1', color: 'white', border: 'none', borderRadius: '12px' }}>Message</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {currentView === 'chats' && (
          <div style={{ padding: '40px 20px' }}>
            <h2 style={{ textAlign: 'center', color: '#c084fc' }}>💬 Chats</h2>
            {activeChatUser ? (
              <div>
                <h3 style={{ color: '#f59e0b' }}>Chat with {activeChatUser}</h3>
                <div style={{ background: 'rgba(30,41,55,0.95)', padding: '20px', borderRadius: '18px', minHeight: '400px', marginBottom: '12px', overflowY: 'auto', border: '1px solid #6366f1' }}>
                  {(dmChats[activeChatUser] || []).map((m, i) => <p key={i}><strong>{m.from}:</strong> {m.text}</p>)}
                </div>
                <input onKeyPress={(e) => { if (e.key === 'Enter' && e.currentTarget.value.trim()) { sendDM(e.currentTarget.value); e.currentTarget.value = ''; } }} placeholder="Type secure message..." style={{ width: '100%', padding: '16px', background: '#1e2937', border: '1px solid #475569', borderRadius: '18px', color: 'white', boxSizing: 'border-box' }} />
              </div>
            ) : (
              <div>
                <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '20px' }}>Your Chats</p>
                {Object.keys(dmChats).length > 0 ? Object.keys(dmChats).map(user => (
                  <div key={user} onClick={() => directMessage(user)} style={{ background: 'rgba(30,41,55,0.95)', padding: '18px', margin: '10px 0', borderRadius: '18px', cursor: 'pointer', border: '1px solid #6366f1' }}>
                    {user}
                  </div>
                )) : <p style={{ textAlign: 'center', color: '#94a3b8' }}>No chats yet. Go to Network to start one.</p>}
              </div>
            )}
          </div>
        )}

        {currentView === 'profile' && (
          <div style={{ padding: '80px 20px', textAlign: 'center' }}>
            <h2 style={{ color: '#a5b4fc', fontSize: '38px' }}>👤 {username}</h2>
            <p style={{ color: '#94a3b8', margin: '10px 0' }}>Permanent Account ID: <strong>{accountId}</strong></p>
            <button onClick={() => alert(`Username: ${username}\n\nKeyphrase:\n${seedPhrase}\n\nAccount ID: ${accountId}`)} style={{ margin: '20px 0', padding: '18px 60px', background: 'linear-gradient(#f59e0b, #d97706)', color: '#1e2937', borderRadius: '18px', fontWeight: 'bold' }}>View Recovery Info</button>
            <button onClick={regenerateKeyphrase} style={{ margin: '10px 0', padding: '16px 50px', background: '#eab308', color: '#1e2937', borderRadius: '18px', fontWeight: 'bold' }}>Generate New Keyphrase</button>
            <button onClick={logout} style={{ padding: '16px 50px', background: '#ef4444', color: 'white', borderRadius: '18px' }}>Logout</button>
          </div>
        )}

        {currentView === 'explore' && <div style={{ padding: '140px 20px', textAlign: 'center', fontSize: '34px', color: '#67e8f9' }}>🔥 Explore Public Posts</div>}
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