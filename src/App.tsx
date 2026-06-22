import { useState, useEffect } from 'react';

function App() {
  const [currentView, setCurrentView] = useState('wall');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [inputPhrase, setInputPhrase] = useState('');
  const [newPost, setNewPost] = useState('');
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('rizzaga_seed');
    if (saved) setIsLoggedIn(true);
  }, []);

  const generateSeed = () => {
    const words = ["abandon","ability","able","about","above","absent","absorb","abstract","absurd","abuse","access","accident","account","accuse","achieve","acid","acoustic","acquire","across","act"];
    const phrase = Array.from({length:12}, () => words[Math.floor(Math.random()*words.length)]).join(" ");
    setSeedPhrase(phrase);
    setIsLoggedIn(true);
    localStorage.setItem('rizzaga_seed', phrase);
    alert("✅ Rizzaga Account Created!\n\nSave this 12-word keyphrase safely.");
  };

  const recoverAccount = () => {
    if (inputPhrase.trim()) {
      setSeedPhrase(inputPhrase.trim());
      setIsLoggedIn(true);
      localStorage.setItem('rizzaga_seed', inputPhrase.trim());
      alert("✅ Account recovered!");
    }
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
      <div style={{minHeight: '100vh', background: '#0a0a0a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'}}>
        <div style={{maxWidth: '420px', width: '100%', background: '#1a1a1a', padding: '40px', borderRadius: '20px', textAlign: 'center'}}>
          <h1 style={{fontSize: '52px', fontWeight: '900', marginBottom: '10px', color: '#c026d3'}}>Rizzaga</h1>
          <p style={{color: '#aaa', marginBottom: '30px'}}>Private • Encrypted • P2P</p>
          
          <button onClick={generateSeed} style={{width: '100%', padding: '18px', background: '#c026d3', color: 'white', border: 'none', borderRadius: '16px', marginBottom: '20px', fontWeight: 'bold'}}>
            Create New Account
          </button>
          
          <textarea value={inputPhrase} onChange={(e) => setInputPhrase(e.target.value)} placeholder="Paste your 12-word keyphrase..." style={{width: '100%', height: '130px', background: '#111', border: '1px solid #444', borderRadius: '16px', padding: '16px', color: 'white', marginBottom: '20px'}} />
          
          <button onClick={recoverAccount} style={{width: '100%', padding: '18px', background: '#eab308', color: 'black', border: 'none', borderRadius: '16px', fontWeight: 'bold'}}>
            Recover Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight: '100vh', background: '#0a0a0a', color: 'white', paddingBottom: '90px'}}>
      <header style={{position: 'fixed', top: 0, left: 0, right: 0, background: '#111', padding: '16px', zIndex: 100}}>
        <h1 style={{fontSize: '28px', fontWeight: 'bold', color: '#c026d3'}}>Rizzaga</h1>
      </header>

      <div style={{paddingTop: '90px', maxWidth: '600px', margin: '0 auto', padding: '15px'}}>
        <h2 style={{fontSize: '32px', marginBottom: '25px', textAlign: 'center'}}>Today's Wall</h2>
        <div style={{background: '#1f1f1f', padding: '25px', borderRadius: '20px', marginBottom: '30px'}}>
          <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="What's happening today?" style={{width: '100%', minHeight: '120px', background: 'transparent', border: 'none', color: 'white'}} />
          <button onClick={postMessage} style={{marginTop: '15px', background: '#c026d3', color: 'white', padding: '16px', borderRadius: '16px', width: '100%', fontWeight: 'bold'}}>Post</button>
        </div>
        {myPosts.map(p => (
          <div key={p.id} style={{background: '#1f1f1f', padding: '25px', borderRadius: '20px', marginBottom: '15px'}}>
            <p><strong>You</strong> • {p.timestamp}</p>
            <p>{p.content}</p>
          </div>
        ))}
      </div>

      <nav style={{position: 'fixed', bottom: 0, left: 0, right: 0, background: '#111', display: 'flex', justifyContent: 'space-around', padding: '12px 0', borderTop: '1px solid #333'}}>
        <button onClick={() => setCurrentView('wall')} style={{fontSize: '26px'}}>🏠</button>
        <button style={{fontSize: '26px'}}>🔥</button>
        <button style={{fontSize: '26px'}}>👥</button>
        <button style={{fontSize: '26px'}}>💬</button>
        <button style={{fontSize: '26px'}}>👤</button>
      </nav>
    </div>
  );
}

export default App;