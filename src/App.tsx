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
  const [searchQuery, setSearchQuery] = useState('');
  const [connectId, setConnectId] = useState('');
  const [showSummaryForPost, setShowSummaryForPost] = useState<Record<number, boolean>>({});
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [showCreate, setShowCreate] = useState(true);

  // Real AES-GCM Encryption using Web Crypto API
  const encryptData = async (data: any): Promise<string> => {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw", encoder.encode(seedPhrase), "PBKDF2", false, ["deriveBits", "deriveKey"]
    );
    const salt = encoder.encode("rizzaga-salt");
    const key = await crypto.subtle.deriveKey(
      { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt"]
    );
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encoder.encode(JSON.stringify(data))
    );
    return btoa(String.fromCharCode(...new Uint8Array(iv)) + String.fromCharCode(...new Uint8Array(encrypted)));
  };

  const decryptData = async (encryptedStr: string): Promise<any> => {
    try {
      const decoder = new TextDecoder();
      const data = atob(encryptedStr);
      const iv = new Uint8Array(data.slice(0, 12).split('').map(c => c.charCodeAt(0)));
      const ciphertext = new Uint8Array(data.slice(12).split('').map(c => c.charCodeAt(0)));
      
      const keyMaterial = await crypto.subtle.importKey(
        "raw", new TextEncoder().encode(seedPhrase), "PBKDF2", false, ["deriveBits", "deriveKey"]
      );
      const salt = new TextEncoder().encode("rizzaga-salt");
      const key = await crypto.subtle.deriveKey(
        { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["decrypt"]
      );
      
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        ciphertext
      );
      return JSON.parse(decoder.decode(decrypted));
    } catch {
      return [];
    }
  };

  useEffect(() => {
    const savedSeed = localStorage.getItem('rizzaga_seed');
    const savedUser = localStorage.getItem('rizzaga_username');
    if (savedSeed && savedUser) {
      setIsLoggedIn(true);
      setSeedPhrase(savedSeed);
      setUsername(savedUser);
      setAccountId(btoa(savedSeed).slice(0, 16));
      
      const encryptedPosts = localStorage.getItem(`posts_${savedSeed}`);
      if (encryptedPosts) {
        decryptData(encryptedPosts).then(posts => setMyPosts(posts));
      }
    }
  }, []);

  const savePosts = async (posts: any[]) => {
    if (seedPhrase) {
      const encrypted = await encryptData(posts);
      localStorage.setItem(`posts_${seedPhrase}`, encrypted);
    }
  };

  // ... (rest of the functions remain the same as previous clean version)

  const checkUsername = (name: string) => {
    const taken = ["admin", "test", "alice", "bob", "cryptoqueen", "shadowbyte"].includes(name.toLowerCase().trim());
    setUsernameAvailable(!taken);
  };

  const generateSeed = () => {
    if (!inputUsername.trim()) return alert("Please choose a username");
    if (!usernameAvailable) return alert("Username taken. Try another.");
    
    const words = ["abandon","ability","able","about","above","absent","absorb","abstract","absurd","abuse","access","accident","account","accuse","achieve","acid","acoustic","acquire","across","act"];
    const phrase = Array.from({length:12}, () => words[Math.floor(Math.random()*words.length)]).join(" ");
    
    setSeedPhrase(phrase);
    setUsername(inputUsername.trim());
    setAccountId(btoa(phrase).slice(0, 16));
    setIsLoggedIn(true);
    localStorage.setItem('rizzaga_seed', phrase);
    localStorage.setItem('rizzaga_username', inputUsername.trim());
  };

  const recoverAccount = () => {
    if (!inputPhrase.trim() || !inputUsername.trim()) return alert("Enter both username and keyphrase");
    setSeedPhrase(inputPhrase.trim());
    setUsername(inputUsername.trim());
    setAccountId(btoa(inputPhrase.trim()).slice(0, 16));
    setIsLoggedIn(true);
    localStorage.setItem('rizzaga_seed', inputPhrase.trim());
    localStorage.setItem('rizzaga_username', inputUsername.trim());
  };

  const connectById = () => {
    if (!connectId.trim()) return alert("Enter Account ID");
    if (followedUsers.includes(connectId)) return alert("Already connected");
    setFollowedUsers([...followedUsers, connectId]);
    alert(`✅ Connected with Account ID: ${connectId}`);
    setConnectId('');
  };

  // ... keep other functions (postMessage, likePost, etc.) from previous clean version

  if (!isLoggedIn) {
    // ... (login screen remains the same with good alignment)
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a0033, #0f172a)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div style={{ maxWidth: '420px', width: '100%', background: 'rgba(15,23,42,0.96)', padding: '50px 40px', borderRadius: '32px', textAlign: 'center', border: '1px solid #f59e0b', boxShadow: '0 0 80px rgba(245,158,11,0.3)' }}>
          <h1 style={{ fontSize: '52px', fontWeight: '900', marginBottom: '30px', color: '#f59e0b' }}>Rizzaga</h1>
          <p style={{ color: '#fcd34d', marginBottom: '35px', fontSize: '18px' }}>Privacy First • Real AES-GCM Encryption</p>

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
              <textarea value={inputPhrase} onChange={(e) => setInputPhrase(e.target.value)} placeholder="12-word keyphrase" style={{ width: '100%', height: '150px', background: '#1e2937', border: '2px solid #475569', borderRadius: '18px', padding: '20px', color: 'white', fontSize: '16px', resize: 'vertical', boxSizing: 'border-box' }} />
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
        {/* Wall, Profile, Explore sections same as before */}

        {currentView === 'contacts' && (
          <div style={{ padding: '40px 20px' }}>
            <h2 style={{ textAlign: 'center', color: '#f59e0b' }}>👥 Network</h2>
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search users..." style={{ width: '100%', padding: '14px', background: '#1e2937', border: '1px solid #475569', borderRadius: '18px', color: 'white', marginBottom: '20px' }} />
            
            <div style={{ marginBottom: '30px' }}>
              <input value={connectId} onChange={(e) => setConnectId(e.target.value)} placeholder="Enter Account ID to connect" style={{ width: '100%', padding: '14px', background: '#1e2937', border: '1px solid #475569', borderRadius: '18px', color: 'white', marginBottom: '10px' }} />
              <button onClick={connectById} style={{ width: '100%', padding: '14px', background: '#22c55e', color: 'white', border: 'none', borderRadius: '18px', fontWeight: 'bold' }}>Connect by Account ID</button>
            </div>

            {["Alice", "Bob", "CryptoQueen", "DecentralizedDev", "PrivacyNomad", "ShadowByte"].filter(u => u.toLowerCase().includes(searchQuery.toLowerCase())).map(user => (
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

        {/* Other sections remain the same */}
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