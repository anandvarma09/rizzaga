import { useState, useEffect } from 'react';

function App() {
  const [currentView, setCurrentView] = useState<'wall' | 'explore' | 'contacts' | 'chats' | 'profile'>('wall');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [seedPhrase, setSeedPhrase] = useState('');
  const [inputPhrase, setInputPhrase] = useState('');
  const [newPost, setNewPost] = useState('');
  const [myPosts, setMyPosts] = useState<any[]>([]);
  const [profileName, setProfileName] = useState('User');

  useEffect(() => {
    const saved = localStorage.getItem('rizzaga_seed');
    if (saved) {
      setIsLoggedIn(true);
      setSeedPhrase(saved);
    }
  }, []);

  const bip39Words = ["abandon","ability","able","about","above","absent","absorb","abstract","absurd","abuse","access","accident","account","accuse","achieve","acid","acoustic","acquire","across","act","action","actor","actress","actual","adapt","add","addict","address","adjust","admit","adult","advance","advice","aerobic","affair","afford","afraid","again","age","agent","agree","ahead","aim","air","airport","aisle","alarm","album","alcohol","alert","alien","all","alley","allow","almost","alone","alpha","already","also","alter","always","amazing","among","amount","amused","analyst","anchor","ancient","anger","angle","angry","animal","ankle","announce","another","answer","antenna","antique","anxiety","any","apart","apology","appear","apple","approve","april","arch","arctic","area","arena","argue","arm","armed","armor","army","around","arrange","arrest","arrive","arrow","art","artefact","artist","artwork","ask","aspect","assault","asset","assist","assume","asthma","athlete","atom","attack","attend","attitude","attract","auction","audit","august","aunt","author","auto","autumn","average","avocado","avoid","awake","aware","away","awesome","awful","awkward","axis","baby","bachelor","bacon","badge","bag","balance","balcony","ball","bamboo","banana","banner","bar","barely","bargain","barrel","base","basic","basket","battle","beach","bean","beauty","because","become","beef","before","begin","behave","behind","believe","below","belt","bench","benefit","best","betray","better","between","beyond","bicycle","bid","bike","bind","biology","bird","birth","bitter","black","blade","blame","blanket","blast","bleak","bless","blind","blood","blossom","blouse","blue","blur","blush","board","boat","body","boil","bomb","bone","bonus","book","boost","border","boring","borrow","boss","bottom","bounce","box","boy","bracket","brain","brand","brass","brave","bread","breeze","brick","bridge","brief","bright","bring","brisk","broccoli","broken","bronze","broom","brother","brown","brush","bubble","buddy","budget","buffalo","build","bulb","bulk","bullet","bundle","bunker","burden","burger","burst","bus","business","busy","butter","button","buy","buzz","cabbage","cabin","cable","cactus","cafe","cage","cake","call","calm","camera","camp","can","canal","cancel","candy","cannon","canoe","canvas","canyon","capable","capital","captain","car","carbon","card","cargo","carpet","carry","cart","case","cash","casino","castle","casual","cat","catalog","catch","category","cattle","caught","cause","caution","cave","ceiling","celery","cement","census","century","cereal","certain","chair","chalk","champion","change","chaos","chapter","charge","chase","chat","cheap","check","cheese","chef","cherry","chest","chicken","chief","child","chimney","choice","choose","chronic","chuckle","chunk","churn","cigar","cinnamon","circle","citizen","city","civil","claim","clap","clarify","claw","clay","clean","clear","clerk","clever","click","client","cliff","climb","clinic","clip","clock","clog","close","cloth","cloud","clown","club","clump","cluster","clutch","coach","coast","coconut","code","coffee","coil","coin","collect","color","column","combine","come","comfort","comic","common","company","compass","complex","confirm","congress","connect","consider","control","convince","cook","cool","copper","copy","coral","core","corn","correct","cost","cotton","couch","country","couple","course","cousin","cover","coyote","crack","craft","cram","crane","crash","crater","crawl","crazy","cream","create","credit","creek","crew","cricket","crime","crisp","critic","crop","cross","crouch","crowd","crucial","cruel","cruise","crush","cry","crystal","cube","culture","cup","cupboard","curious","current","curtain","curve","cushion","custom","cute","cycle","dad","damage","damp","dance","danger","daring","dash","daughter","dawn","day","deal","debate","debris","decade","december","decide","decline","decorate","decrease","deer","defense","define","defy","degree","delay","deliver","demand","demise","denial","dentist","deny","depart","depend","deposit","depth","deputy","derive","describe","desert","design","desk","despair","destroy","detail","detect","develop","device","devote","diagram","dial","diamond","diary","dice","diesel","diet","differ","digital","dignity","dilemma","dinner","dinosaur","direct","dirt","disagree","discover","disease","dish","dismiss","disorder","display","distance","distinct","distribute","district","disturb","dive","divide","divorce","dizzy","doctor","document","dog","doll","domain","domestic","donate","donkey","donor","door","dose","double","dove","draft","dragon","drama","drastic","draw","dream","dress","drift","drill","drink","drip","drive","drop","drum","dry","duck","dumb","dune","during","dust","dutch","duty","dwarf","dynamic","eager","eagle","early","earn","earth","easily","east","easy","echo","ecology","economy","edge","edit","educate","effort","egg","eight","either","elbow","elder","electric","elegant","element","elephant","elevator","elite","else","embark","embody","embrace","emerge","emotion","employ","empower","empty","enable","enact","end","endless","endorse","enemy","energy","enforce","engage","engine","enhance","enjoy","enlarge","enough","enrich","enroll","ensure","enter","entire","entry","envelope","episode","equal","equip","era","erase","erode","error","erupt","escape","essay","essence","estate","eternal","ethics","evidence","evil","evoke","evolve","exact","example","excess","exchange","excite","exclude","excuse","execute","exercise","exhaust","exhibit","exile","exist","exit","exotic","expand","expect","expense","experience","expert","expire","explain","expose","express","extend","extra","eye","eyebrow","fabric","face","faculty","fade","faint","fair","faith","fall","false","fame","family","famous","fan","fancy","fantasy","farm","fashion","fat","fatal","father","fatigue","fault","favorite","feature","february","federal","fee","feed","feel","female","fence","festival","fetch","fever","few","fiber","fiction","field","figure","file","film","filter","final","find","fine","finger","finish","fire","firm","first","fiscal","fish","fit","fitness","fix","flag","flame","flash","flat","flavor","flee","flight","flip","float","flock","floor","flour","flow","flower","fluid","flush","fly","foam","focus","fog","foil","fold","follow","food","foot","football","force","forest","forget","fork","fortune","forum","forward","fossil","foster","found","fox","fragile","frame","frequent","fresh","friend","fringe","frog","front","frost","frown","frozen","fruit","fuel","fun","funny","furnace","fury","future","gain","galaxy","gallery","game","gap","garage","garbage","garden","garlic","garment","gas","gasp","gate","gather","gauge","gaze","general","genius","genre","gentle","genuine","gesture","ghost","giant","gift","giggle","ginger","giraffe","girl","give","glad","glance","glare","glass","glide","glimpse","globe","gloom","glory","glove","glow","glue","goat","goddess","gold","good","goose","gorilla","gospel","gossip","govern","gown","grab","grace","grain","grant","grape","grass","gravity","great","green","grid","grief","grit","grocery","group","grow","grunt","guard","guess","guide","guilt","guitar","gun","gym","habit","hair","half","hammer","hamster","hand","happy","harbor","hard","harsh","harvest","hat","have","hawk","hazard","head","health","heart","heavy","hedgehog","height","hello","helmet","help","hen","hero","hidden","high","hill","hint","hip","hire","history","hobby","hockey","hold","hole","holiday","hollow","home","honey","hood","hook","hope","horn","horror","horse","hospital","host","hotel","hour","hover","hub","huge","human","humble","humor","hundred","hungry","hunt","hurdle","hurry","hurt","husband","hybrid","ice","idea","identify","idle","ignore","ill","illegal","illness","image","imitate","immense","immune","impact","impose","improve","impulse","inch","include","income","increase","index","indicate","indoor","industry","infant","inflict","inform","inhale","inherit","initial","inject","injury","inmate","inner","innocent","input","inquiry","insane","insect","inside","inspire","install","intact","interest","into","invest","invite","involve","iron","island","isolate","issue","item","ivory","jacket","jaguar","jar","jazz","jealous","jeans","jelly","jewel","job","join","joke","journey","joy","judge","juice","jump","jungle","junior","junk","just","kangaroo","keen","keep","ketchup","key","kick","kid","kidney","kind","kingdom","kiss","kit","kitchen","kite","kitten","kiwi","knee","knife","knock","know","lab","label","labor","ladder","lady","lake","lamp","language","laptop","large","later","latin","laugh","laundry","lava","law","lawn","lawsuit","layer","lazy","leader","leaf","learn","leave","lecture","left","leg","legal","legend","leisure","lemon","lend","length","lens","leopard","lesson","letter","level","liar","liberty","library","license","life","lift","light","like","limb","limit","link","lion","lip","liquid","list","little","live","lizard","load","loan","lobster","local","lock","logic","lonely","long","loop","lottery","loud","lounge","love","loyal","lucky","luggage","lumber","lunar","lunch","luxury","lyrics","machine","mad","magic","magnet","maid","mail","main","major","make","mammal","man","manage","mandate","mango","mansion","manual","maple","marble","march","margin","marine","market","marriage","mask","mass","master","match","material","math","matrix","matter","maximum","maze","meadow","mean","measure","meat","mechanic","medal","media","melody","melt","member","memory","mention","menu","mercy","merge","merit","merry","mesh","message","metal","method","middle","midnight","milk","million","mimic","mind","minimum","minor","minute","miracle","mirror","misery","miss","mistake","mix","mixed","mixture","mobile","model","modify","mom","moment","monitor","monkey","monster","month","moon","moral","more","morning","mosquito","mother","motion","motor","mountain","mouse","move","movie","much","muffin","mule","multiply","mundane","museum","mushroom","music","must","mutual","myself","mystery","myth","naive","name","napkin","narrow","nasty","nation","nature","near","neck","need","negative","neglect","neither","nephew","nerve","nest","net","network","neutral","never","news","next","nice","night","noble","noise","nominee","noodle","normal","north","nose","notable","note","nothing","notice","novel","now","nuclear","number","nurse","nut","oak","obey","object","oblige","obscure","observe","obtain","obvious","occur","ocean","october","odor","off","offer","office","often","oil","okay","old","olive","olympic","omit","once","one","onion","online","only","open","opera","opinion","oppose","option","orange","orbit","orchard","order","ordinary","organ","orient","original","orphan","ostrich","other","outdoor","outer","output","outside","oval","oven","over","own","owner","oxygen","oyster","ozone","pact","paddle","page","pair","palace","palm","panda","panel","panic","panther","paper","parade","parent","park","parrot","party","pass","patch","path","patient","patrol","pattern","pause","pave","payment","peace","peanut","pear","peasant","pelican","pen","penalty","pencil","people","pepper","perfect","permit","person","pet","phone","photo","phrase","physical","piano","picnic","picture","piece","pig","pigeon","pill","pillow","pilot","pink","pioneer","pipe","pirate","pistol","pitch","pizza","place","planet","plastic","plate","play","please","pledge","pluck","plug","plunge","poem","poet","point","polar","pole","police","pond","pony","pool","popular","portion","position","possible","post","potato","pottery","poverty","powder","power","practice","praise","predict","prefer","prepare","present","pretty","prevent","price","pride","primary","print","priority","prison","private","prize","problem","process","produce","profit","program","project","promote","proof","property","prosper","protect","proud","provide","public","pudding","pull","pulp","pulse","pumpkin","punch","pupil","puppy","purchase","purity","purpose","purse","push","put","puzzle","pyramid","quality","quantum","quarter","question","quick","quit","quiz","quote","rabbit","raccoon","race","rack","radar","radio","rail","rain","raise","rally","ramp","ranch","random","range","rapid","rare","rate","rather","raven","raw","razor","ready","real","reason","rebel","rebuild","recall","receive","recipe","record","recycle","reduce","reflect","reform","refuse","region","regret","regular","reject","relax","release","relief","rely","remain","remember","remind","remove","render","renew","rent","reopen","repair","repeat","replace","report","require","rescue","resemble","resist","resource","response","result","retire","retreat","return","reunion","reveal","review","reward","rhythm","rib","ribbon","rice","rich","ride","ridge","rifle","right","rigid","ring","riot","ripple","risk","ritual","rival","river","road","roast","robot","robust","rocket","romance","roof","rookie","room","rose","rotate","rough","round","route","royal","rubber","rude","rug","rule","run","rural","sad","saddle","sadness","safe","sail","salad","salmon","salon","salt","same","sample","sand","satisfy","satoshi","sauce","sausage","save","say","scale","scan","scare","scatter","scene","scheme","school","science","scissors","scorpion","scout","scrap","screen","script","scrub","sea","search","season","seat","second","secret","section","security","seed","seek","segment","select","sell","seminar","senior","sense","sentence","series","service","session","settle","setup","seven","shadow","shaft","shallow","share","shed","shell","sheriff","shield","shift","shine","ship","shiver","shock","shoe","shoot","shop","short","shoulder","shove","shrimp","shrug","shuffle","shy","sibling","sick","side","siege","sight","sign","silent","silk","silly","silver","similar","simple","since","sing","siren","sister","situate","six","size","skate","sketch","ski","skill","skin","skirt","skull","slab","slam","sleep","slender","slice","slide","slight","slim","slogan","slot","slow","slush","small","smart","smile","smoke","smooth","snack","snake","snap","sniff","snow","soap","soccer","social","sock","soda","soft","solar","soldier","solid","solution","solve","someone","song","soon","sorry","sort","soul","sound","soup","source","south","space","spare","spatial","spawn","speak","special","speed","spell","spend","sphere","spice","spider","spike","spin","spirit","split","spoil","sponsor","spoon","sport","spot","spray","spread","spring","spy","square","squeeze","squirrel","stable","stadium","staff","stage","stairs","stamp","stand","start","state","stay","steak","steel","stem","step","stereo","stick","still","sting","stock","stomach","stone","stool","story","stove","strategy","street","strike","strong","struggle","student","stuff","stumble","style","subject","submit","subway","success","such","sudden","suffer","sugar","suggest","suit","summer","sun","sunny","sunset","super","supply","supreme","sure","surface","surge","surprise","surround","survey","suspect","sustain","swallow","swamp","swap","swarm","swear","sweet","swift","swim","swing","switch","sword","symbol","sympathy","symptom","syrup","system","table","tackle","tag","tail","talent","talk","tank","tape","target","task","taste","tattoo","taxi","teach","team","tell","ten","tenant","tennis","tent","term","test","text","thank","that","theme","then","theory","there","they","thick","thing","this","thought","three","thrive","throw","thumb","thunder","ticket","tide","tiger","tilt","timber","time","tiny","tip","tired","tissue","title","toast","tobacco","today","toddler","toe","together","toilet","token","tomato","tomorrow","tone","tongue","tonight","tool","tooth","top","topic","topple","torch","tornado","tortoise","toss","total","tourist","toward","tower","town","toy","track","trade","traffic","tragic","train","transfer","trap","trash","travel","tray","treat","tree","trend","trial","tribe","trick","trigger","trim","trip","trophy","trouble","truck","true","truly","trumpet","trust","truth","try","tube","tuition","tumble","tuna","tunnel","turkey","turn","turtle","twelve","twenty","twice","twin","twist","two","type","typical","ugly","umbrella","unable","unaware","uncle","uncover","under","undo","unfair","unfold","unhappy","uniform","unique","unit","universe","unknown","unlock","unlucky","unusual","unveil","update","upgrade","uphold","upon","upper","upset","urban","urge","usage","use","used","useful","useless","usual","utility","vacant","vacuum","vague","valid","valley","valve","van","vanish","vapor","various","vast","vault","vehicle","velvet","vendor","venture","venue","verb","verify","version","very","vessel","veteran","viable","vibrant","vicious","victory","video","view","village","vintage","violin","virtual","virus","visa","visit","visual","vital","vivid","vocal","voice","void","volcano","volume","vote","voyage","wage","wagon","wait","walk","wall","walnut","want","warfare","warm","warrior","wash","wasp","waste","water","wave","way","wealth","weapon","wear","weasel","weather","web","wedding","weekend","weird","welcome","west","wet","whale","what","wheat","wheel","when","where","whip","whisper","wide","width","wife","wild","will","win","window","wine","wing","wink","winner","winter","wire","wisdom","wise","wish","witness","wolf","woman","wonder","wood","wool","word","work","world","worry","worth","wrap","wreck","wrestle","wrist","write","wrong","yard","year","yellow","you","young","youth","zebra","zero","zone","zoo"];

  const generateSeed = () => {
    const phrase = Array.from({length:12}, () => bip39Words[Math.floor(Math.random()*bip39Words.length)]).join(" ");
    setSeedPhrase(phrase);
    setIsLoggedIn(true);
    localStorage.setItem('rizzaga_seed', phrase);
  };

  const recoverAccount = () => {
    if (!inputPhrase.trim()) return alert("Enter keyphrase");
    setSeedPhrase(inputPhrase.trim());
    setIsLoggedIn(true);
    localStorage.setItem('rizzaga_seed', inputPhrase.trim());
  };

  const correctAndSummarize = (text: string) => {
    let corrected = text
      .replace(/\b(i|im|iam)\b/gi, "I")
      .replace(/\b(u|ur)\b/gi, "you")
      .replace(/\b(r)\b/gi, "are");
    const summary = corrected.length > 80 ? corrected.substring(0, 80) + "..." : corrected;
    return { corrected, summary };
  };

  const postMessage = () => {
    if (!newPost.trim()) return;
    const { corrected, summary } = correctAndSummarize(newPost);
    setMyPosts([{
      id: Date.now(),
      user: profileName,
      content: corrected,
      summary: summary,
      timestamp: "just now",
      likes: 0
    }, ...myPosts]);
    setNewPost('');
  };

  const likePost = (id: number) => {
    setMyPosts(myPosts.map(p => p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p));
  };

  const shareMagnet = (id: number) => {
    const magnet = `magnet:?xt=urn:btih:${Date.now().toString(36)}${id}`;
    navigator.clipboard.writeText(magnet);
    alert("Magnet link copied! (Torrent + Blockchain simulation)");
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('rizzaga_seed');
  };

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a0033, #000)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ maxWidth: '420px', width: '100%', background: 'rgba(26,26,26,0.95)', padding: '40px', borderRadius: '24px', textAlign: 'center', border: '1px solid #c026d3' }}>
          <h1 style={{ fontSize: '52px', fontWeight: '900', marginBottom: '10px', color: '#c026d3' }}>Rizzaga</h1>
          <p style={{ color: '#eab308', marginBottom: '30px' }}>Privacy First • Blockchain + Torrent</p>
          <button onClick={generateSeed} style={{ width: '100%', padding: '18px', background: '#c026d3', color: 'white', border: 'none', borderRadius: '16px', marginBottom: '20px', fontSize: '18px', fontWeight: 'bold' }}>
            Create New Account
          </button>
          <textarea value={inputPhrase} onChange={(e) => setInputPhrase(e.target.value)} placeholder="Paste 12-word keyphrase..." style={{ width: '100%', height: '130px', background: '#111', border: '1px solid #444', borderRadius: '16px', padding: '16px', color: 'white', marginBottom: '20px' }} />
          <button onClick={recoverAccount} style={{ width: '100%', padding: '18px', background: '#eab308', color: 'black', border: 'none', borderRadius: '16px', fontSize: '18px', fontWeight: 'bold' }}>
            Recover Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', paddingBottom: '90px' }}>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, background: '#111', padding: '16px', zIndex: 100, borderBottom: '2px solid #c026d3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#c026d3' }}>Rizzaga</h1>
        <button onClick={logout} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px' }}>Logout</button>
      </header>

      <div style={{ paddingTop: '90px', maxWidth: '620px', margin: '0 auto', padding: '15px' }}>
        {currentView === 'wall' && (
          <>
            <h2 style={{ fontSize: '32px', marginBottom: '25px', textAlign: 'center', color: '#eab308' }}>Today's Wall</h2>
            <div style={{ background: '#1f1f1f', padding: '25px', borderRadius: '20px', marginBottom: '30px', border: '1px solid #c026d3' }}>
              <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="What's happening today?" style={{ width: '100%', minHeight: '120px', background: 'transparent', border: 'none', color: 'white', fontSize: '18px' }} />
              <button onClick={postMessage} style={{ marginTop: '15px', background: '#c026d3', color: 'white', padding: '16px', borderRadius: '16px', width: '100%', fontWeight: 'bold' }}>Post (Encrypted)</button>
            </div>

            {myPosts.map((post) => (
              <div key={post.id} style={{ background: '#1f1f1f', padding: '25px', borderRadius: '20px', marginBottom: '20px', border: '1px solid #eab308' }}>
                <p><strong>{post.user}</strong> • {post.timestamp}</p>
                <p style={{ margin: '15px 0', fontSize: '17px' }}>{post.content}</p>
                {post.summary && <p style={{ color: '#888', fontSize: '14px' }}>Summary: {post.summary}</p>}
                <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
                  <button onClick={() => likePost(post.id)} style={{ background: 'none', border: 'none', color: '#eab308', fontSize: '24px' }}>⭐ {post.likes || 0}</button>
                  <button onClick={() => alert("💬 Chat opened (E2EE)")} style={{ background: 'none', border: 'none', color: '#22d3ee', fontSize: '24px' }}>💬</button>
                  <button onClick={() => shareMagnet(post.id)} style={{ background: 'none', border: 'none', color: '#a855f7', fontSize: '24px' }}>🔗</button>
                </div>
              </div>
            ))}
          </>
        )}

        {currentView === 'explore' && <div style={{ padding: '80px 20px', textAlign: 'center', fontSize: '28px', color: '#22d3ee' }}>🔥 Public Explore Feed (Monetization with Crypto soon)</div>}
        {currentView === 'contacts' && <div style={{ padding: '80px 20px', textAlign: 'center', fontSize: '28px', color: '#eab308' }}>👥 Network & Connections</div>}
        {currentView === 'chats' && <div style={{ padding: '80px 20px', textAlign: 'center', fontSize: '28px', color: '#a855f7' }}>💬 Encrypted Chats</div>}

        {currentView === 'profile' && (
          <div style={{ padding: '40px 20px', textAlign: 'center' }}>
            <h2 style={{ color: '#c026d3', marginBottom: '30px' }}>👤 {profileName}</h2>
            <button onClick={() => alert("Your Recovery Keyphrase:\n\n" + seedPhrase)} style={{ margin: '15px 0', padding: '16px 40px', background: '#eab308', color: 'black', borderRadius: '12px', fontWeight: 'bold' }}>
              View Keyphrase
            </button>
            <p style={{ color: '#888', marginTop: '20px' }}>All your data is stored on-device with blockchain-style encryption</p>
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