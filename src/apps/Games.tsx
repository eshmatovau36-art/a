import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  RefreshCw, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Gamepad2, 
  Play, 
  ArrowLeft,
  Users,
  Zap,
  Target,
  DollarSign,
  Star,
  ShoppingBag,
  ShieldAlert,
  Timer,
  Crosshair
} from 'lucide-react';

type GameType = 'menu' | 'snake' | 'racing' | 'penalty' | 'football_manager' | 'shooter' | 'coins' | 'monkeytype';

interface Player {
  id: number;
  name: string;
  rating: number;
  price: number;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  photo: string;
  diamondPrice?: number;
}

export default function Games() {
  const [activeGame, setActiveGame] = useState<GameType>('menu');
  const [gameTitle, setGameTitle] = useState('DLS 26');
  const [globalCoins, setGlobalCoins] = useState(5000);
  const [globalDiamonds, setGlobalDiamonds] = useState(100);

  const renderGame = () => {
    switch (activeGame) {
      case 'snake': return <SnakeGame onBack={() => setActiveGame('menu')} />;
      case 'racing': return <RacingGame onBack={() => setActiveGame('menu')} />;
      case 'penalty': return <FootballPenaltyGame onBack={() => setActiveGame('menu')} />;
      case 'football_manager': return (
        <FootballManager 
          onBack={() => setActiveGame('menu')} 
          title={gameTitle} 
          coins={globalCoins} 
          setCoins={setGlobalCoins}
          diamonds={globalDiamonds}
          setDiamonds={setGlobalDiamonds}
        />
      );
      case 'shooter': return <ShooterGame onBack={() => setActiveGame('menu')} />;
      case 'coins': return (
        <CoinCollector 
          onBack={() => setActiveGame('menu')} 
          score={globalCoins} 
          setScore={setGlobalCoins} 
        />
      );
      case 'monkeytype': return <MonkeyType onBack={() => setActiveGame('menu')} />;
      default: return (
        <div className="flex flex-col h-full bg-neutral-900 overflow-y-auto no-scrollbar pb-32">
          <div className="p-8">
            <div className="flex items-center justify-between mb-12 pt-10">
               <div>
                  <h1 className="text-4xl font-black tracking-tighter italic text-white flex items-center gap-3">
                     GAMER <span className="text-blue-500">PRO</span>
                  </h1>
                  <p className="text-neutral-500 text-[10px] font-black uppercase tracking-[0.3em] mt-1">Ultimate Experience</p>
               </div>
               <div className="w-14 h-14 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center text-blue-500 shadow-2xl">
                  <Gamepad2 size={28} />
               </div>
            </div>
            
            <section className="mb-10">
              <div className="flex items-center justify-between mb-6">
                 <h2 className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Football Pro Elite</h2>
                 <span className="bg-emerald-500/10 text-emerald-500 text-[8px] font-black px-2 py-0.5 rounded-full border border-emerald-500/20">10+ GAMES</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <GameCard name="FC Mobile" desc="124 OVER Ronaldo" color="bg-emerald-600" onClick={() => { setActiveGame('football_manager'); setGameTitle('FC Mobile'); }} icon={<Trophy size={18}/>} />
                <GameCard name="DLS 26" desc="Elite Season" color="bg-blue-600" onClick={() => { setActiveGame('football_manager'); setGameTitle('DLS 26'); }} icon={<Star size={18}/>} />
                <GameCard name="Penalty" desc="Pro Shot AI" color="bg-purple-600" onClick={() => setActiveGame('penalty')} icon={<Target size={18}/>} />
                <GameCard name="UCL 2026" desc="European Glory" color="bg-sky-700" onClick={() => { setActiveGame('football_manager'); setGameTitle('UCL 2026'); }} icon={<Trophy size={18}/>} />
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-6">Action & Arcade</h2>
              <div className="grid grid-cols-2 gap-4">
                <GameCard name="MonkeyType" desc="Typing Fast" color="bg-[#e2b714]" onClick={() => setActiveGame('monkeytype')} icon={<Timer size={18} className="text-black"/>} dark />
                <GameCard name="Poyga" desc="Racing Keys" color="bg-red-600" onClick={() => setActiveGame('racing')} icon={<Zap size={18}/>} />
                <GameCard name="Shooter" desc="Combat Mode" color="bg-neutral-800" onClick={() => setActiveGame('shooter')} icon={<Crosshair size={18}/>} />
                <GameCard name="Tanga Terar" desc="Fast Collect" color="bg-yellow-600" onClick={() => setActiveGame('coins')} icon={<DollarSign size={18}/>} />
                <GameCard name="Snake" desc="Retro 2026" color="bg-emerald-600" onClick={() => setActiveGame('snake')} icon={<Gamepad2 size={18}/>} />
                <GameCard name="Roblox" desc="World Connect" color="bg-neutral-700" onClick={() => { setActiveGame('football_manager'); setGameTitle('Roblox'); }} icon={<Gamepad2 size={18}/>} />
              </div>
            </section>
          </div>
        </div>
      );
    }
  };

  return <div className="h-full w-full">{renderGame()}</div>;
}

function GameCard({ name, desc, color, onClick, icon, dark }: { name: string, desc: string, color: string, onClick: () => void, icon?: any, dark?: boolean }) {
  return (
    <motion.button 
      whileTap={{ scale: 0.95 }} 
      onClick={onClick} 
      className={`${color} p-5 rounded-[2.5rem] flex flex-col items-start gap-2 shadow-2xl text-left h-40 relative overflow-hidden group border border-white/10`}
    >
      <div className={`w-12 h-12 ${dark ? 'bg-black/10' : 'bg-white/10'} rounded-2xl flex items-center justify-center z-10 backdrop-blur-md border border-white/10`}>
         {icon}
      </div>
      <div className="z-10 mt-auto">
        <h3 className={`font-black text-xs leading-none tracking-tight uppercase ${dark ? 'text-black' : 'text-white'}`}>{name}</h3>
        <p className={`text-[9px] font-bold opacity-60 mt-1 uppercase tracking-widest ${dark ? 'text-black' : 'text-white'}`}>{desc}</p>
      </div>
      <div className={`absolute -right-6 -bottom-6 opacity-10 group-hover:scale-150 transition-transform duration-1000 ${dark ? 'text-black' : 'text-white'}`}>
         {icon && <div className="scale-[6]">{icon}</div>}
      </div>
    </motion.button>
  );
}

// --- FOOTBALL MANAGER & MATCH SIM ---
function FootballManager({ onBack, title, coins, setCoins, diamonds, setDiamonds }: { 
  onBack: () => void, 
  title: string,
  coins: number,
  setCoins: React.Dispatch<React.SetStateAction<number>>,
  diamonds: number,
  setDiamonds: React.Dispatch<React.SetStateAction<number>>
}) {
  const [tab, setTab] = useState<'team' | 'market'>('team');
  const [isPlayingMatch, setIsPlayingMatch] = useState(false);
  const [isManualControl, setIsManualControl] = useState(false);
  const [matchData, setMatchData] = useState<{ time: number, score: [number, number], events: string[] }>({ time: 0, score: [0, 0], events: [] });
  
  const [team, setTeam] = useState<Player[]>([
    { id: 1, name: 'B. Eshonqulov', rating: 82, price: 5000, position: 'GK', photo: 'https://www.fifarosters.com/assets/players/fifa24/faces/167495.png' },
  ]);

  const marketPlayers: Player[] = [
    { id: 10, name: 'Cristiano Ronaldo', rating: 91, price: 50000, position: 'FWD', photo: 'https://www.fifarosters.com/assets/players/fifa24/faces/20801.png' },
    { id: 11, name: 'Lionel Messi', rating: 90, price: 48000, position: 'FWD', photo: 'https://www.fifarosters.com/assets/players/fifa24/faces/158023.png' },
    { id: 12, name: 'K. Mbappe', rating: 89, price: 35000, position: 'FWD', photo: 'https://www.fifarosters.com/assets/players/fifa24/faces/231747.png' },
    { id: 13, name: 'E. Haaland', rating: 88, price: 32000, position: 'FWD', photo: 'https://www.fifarosters.com/assets/players/fifa24/faces/239085.png' },
    { id: 14, name: 'Vinicius Jr', rating: 88, price: 30000, position: 'FWD', photo: 'https://www.fifarosters.com/assets/players/fifa24/faces/238794.png' },
    { id: 15, name: 'J. Bellingham', rating: 89, price: 34000, position: 'MID', photo: 'https://www.fifarosters.com/assets/players/fifa24/faces/256958.png' },
    { id: 16, name: 'K. De Bruyne', rating: 87, price: 31000, position: 'MID', photo: 'https://www.fifarosters.com/assets/players/fifa24/faces/192985.png' },
    { id: 17, name: 'V. van Dijk', rating: 88, price: 29000, position: 'DEF', photo: 'https://www.fifarosters.com/assets/players/fifa24/faces/203376.png' },
    { id: 18, name: 'Mystery Legend', rating: 99, price: 0, diamondPrice: 5000, position: 'FWD', photo: 'https://api.dicebear.com/7.x/shapes/svg?seed=mystery' },
  ];

  const startMatch = () => {
    setIsPlayingMatch(true);
    setIsManualControl(false);
    setMatchData({ time: 0, score: [0, 0], events: ["Hakam o'yinni boshladi!"] });
  };

  const handleAction = (type: 'attack' | 'defend') => {
    if (Math.random() > (type === 'attack' ? 0.3 : 0.5)) {
      if (type === 'attack') {
        const shooter = team[Math.floor(Math.random() * team.length)]?.name || "O'yinchi";
        setMatchData(prev => ({
          ...prev,
          score: [prev.score[0] + 1, prev.score[1]],
          events: [...prev.events, `${prev.time}' GOL! ${shooter} REAL MADRIDni oldinga olib chiqdi!`]
        }));
      } else {
        setMatchData(prev => ({
          ...prev,
          events: [...prev.events, `${prev.time}' Ajoyib himoya! Barsa Leonaning hujumi qaytarildi.`]
        }));
      }
    } else {
      setMatchData(prev => ({
        ...prev,
        events: [...prev.events, `${prev.time}' ${type === 'attack' ? "Real Madridning hujumi samarasiz yakunlandi." : "Barsa Leona himoyani yorib o'tdi!"}`]
      }));
    }
  };

  useEffect(() => {
    if (!isPlayingMatch) return;
    const interval = setInterval(() => {
      setMatchData(prev => {
        if (prev.time >= 90) {
          clearInterval(interval);
          setTimeout(() => finishMatch(prev.score), 1000);
          return prev;
        }

        let newTime = prev.time + 1;
        let newScore = [...prev.score] as [number, number];
        let newEvents = [...prev.events];

        // Automatic events
        if (newTime % 20 === 0 && Math.random() > 0.8) {
          newScore[1]++;
          newEvents.push(`${newTime}' Gol! Barsa Leona jamoasi kuchli zarba berdi.`);
        }

        return { time: newTime, score: newScore, events: newEvents.slice(-4) };
      });
    }, 500);
    return () => clearInterval(interval);
  }, [isPlayingMatch]);

  const finishMatch = (finalScore: [number, number]) => {
    setIsPlayingMatch(false);
    let reward = 0;
    if (finalScore[0] > finalScore[1]) {
      reward = title === 'FC Mobile' ? 1200 : 1000;
      setCoins(prev => prev + reward);
      setDiamonds(prev => prev + 10);
      alert(`G'ALABA! Jami ${reward} tanga yutdingiz!`);
    } else {
      setCoins(prev => prev + 200);
      alert("O'yin yakunlandi. 200 tanga tasalli mukofoti.");
    }
  };

  const buyPlayer = (player: Player) => {
    if (player.diamondPrice) {
      if (diamonds >= player.diamondPrice) {
        setDiamonds(prev => prev - player.diamondPrice!);
        setTeam(prev => [...prev, player]);
        alert(`${player.name} jamoaga chaqirildi!`);
      } else alert("Olmos etarli emas!");
    } else if (coins >= player.price) {
      setCoins(prev => prev - player.price);
      setTeam(prev => [...prev, player]);
      alert(`${player.name} jamoaga chaqirildi!`);
    } else alert("Tanga etarli emas!");
  };

  const upgradePlayer = (id: number) => {
    if (coins >= 500) {
      setCoins(prev => prev - 500);
      setTeam(prev => prev.map(p => p.id === id ? { ...p, rating: Math.min(100, p.rating + 1) } : p));
      alert("O'yinchi kuchaytirildi! +1 OVER");
    } else alert("Tanga etarli emas (500 kerak)");
  };

  if (isPlayingMatch) {
    return (
      <div className="h-full bg-emerald-900 flex flex-col p-6 text-white overflow-hidden">
        <div className="flex justify-between items-center mb-10 bg-black/40 p-4 rounded-2xl border border-white/10 shadow-2xl">
          <div className="text-center">
            <p className="text-[10px] uppercase opacity-50 font-black tracking-widest">REAL MADRID</p>
            <p className="text-4xl font-black italic">{matchData.score[0]}</p>
          </div>
          <div className="text-center">
             <div className="bg-blue-600 px-3 py-1 rounded text-[10px] font-black mb-1 animate-pulse tracking-tighter">EL CLASSICO</div>
             <p className="text-2xl font-mono text-yellow-400 font-bold">{matchData.time}'</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] uppercase opacity-50 font-black tracking-widest text-red-500">BARSA LEONA</p>
            <p className="text-4xl font-black italic">{matchData.score[1]}</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-end gap-3 pb-6">
          <AnimatePresence mode="popLayout">
            {matchData.events.map((e, i) => (
              <motion.div 
                initial={{ x: -20, opacity: 0, scale: 0.9 }} 
                animate={{ x: 0, opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }}
                key={e + i} 
                className="bg-black/60 p-4 rounded-2xl border-l-[6px] border-yellow-500 text-sm font-medium shadow-lg backdrop-blur-md"
              >
                 <span className="text-yellow-400 font-bold mr-2">HAKAM:</span> {e}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button onClick={() => handleAction('attack')} className="bg-orange-600 h-16 rounded-2xl font-black italic shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 border-b-4 border-orange-800">
             <Zap size={20}/> HUJUM
          </button>
          <button onClick={() => handleAction('defend')} className="bg-blue-600 h-16 rounded-2xl font-black italic shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 border-b-4 border-blue-800">
             <ShieldAlert size={20}/> HIMOYA
          </button>
        </div>

        <div className="h-2 bg-white/10 w-full rounded-full overflow-hidden border border-white/5">
          <motion.div 
            className="h-full bg-gradient-to-r from-yellow-500 to-orange-500" 
            animate={{ width: `${(matchData.time / 90) * 100}%` }} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-neutral-900 flex flex-col text-white">
      <header className="p-4 pt-12 flex items-center justify-between bg-neutral-800/80 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"><ArrowLeft size={18} /></button>
          <span className="font-bold tracking-tight">{title}</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full text-[10px] font-black text-yellow-500 flex items-center gap-1 shadow-inner"><DollarSign size={10}/>{coins.toLocaleString()}</div>
          <div className="bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-[10px] font-black text-blue-400 flex items-center gap-1 shadow-inner"><Zap size={10}/>{diamonds.toLocaleString()}</div>
        </div>
      </header>

      <div className="flex border-b border-white/5 bg-neutral-800/40">
        <button onClick={() => setTab('team')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'team' ? 'text-blue-500 border-b-2 border-blue-500 bg-blue-500/5' : 'text-neutral-500'}`}>My Club</button>
        <button onClick={() => setTab('market')} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${tab === 'market' ? 'text-blue-500 border-b-2 border-blue-500 bg-blue-500/5' : 'text-neutral-500'}`}>Transfer</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24 no-scrollbar">
        {tab === 'team' ? (
          <div className="flex flex-col gap-4">
             <button onClick={startMatch} className="w-full bg-emerald-600 py-5 rounded-2xl font-black italic flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-transform border-b-4 border-emerald-800">
               <Play size={20} className="fill-current"/> MATCH PLAY
             </button>
             <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1 mt-4 ml-1">Real Madrid Tarkibi</div>
             {team.map(p => (
               <div key={p.id} className="bg-neutral-800 p-4 rounded-2xl flex items-center gap-4 border border-white/5 shadow-lg group">
                 <div className="relative">
                   <img src={p.photo} className="w-16 h-16 bg-neutral-700 rounded-2xl object-cover border border-white/10 group-hover:scale-105 transition-transform" alt="" onError={e => (e.target as any).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.name}`}/>
                   <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-[10px] font-black px-2 py-0.5 rounded-lg border-2 border-neutral-900 shadow-lg">{p.rating}</div>
                 </div>
                 <div className="flex-1">
                   <p className="font-bold text-sm tracking-tight">{p.name}</p>
                   <p className="text-[10px] text-neutral-500 italic font-medium uppercase">{p.position}</p>
                   <div className="flex gap-2 mt-3">
                     <button onClick={() => upgradePlayer(p.id)} className="flex-1 bg-blue-600 text-[10px] font-black py-2 rounded-xl flex items-center justify-center gap-1 active:scale-95 transition-transform">
                        <ChevronUp size={12}/> UPGRADE
                     </button>
                     <button className="flex-1 bg-neutral-700 text-[10px] font-black py-2 rounded-xl text-neutral-400">INFO</button>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
             <div className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1 ml-1">Bugungi Takliflar</div>
             {marketPlayers.map(p => {
               const owned = team.some(x => x.id === p.id);
               return (
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={p.id} className="bg-neutral-800 p-4 rounded-2xl flex items-center gap-4 border border-white/5 shadow-lg">
                   <img src={p.photo} className="w-14 h-14 bg-neutral-700 rounded-xl object-cover border border-white/5" alt="" onError={e => (e.target as any).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.id}`}/>
                   <div className="flex-1 text-left">
                     <p className="font-bold text-sm">{p.name}</p>
                     <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-black border border-blue-500/20 rounded-md">OVER {p.rating}</span>
                   </div>
                   <button onClick={() => buyPlayer(p)} disabled={owned} className={`px-4 py-2.5 rounded-xl text-[10px] font-black shadow-lg transition-all active:scale-95 ${owned ? 'bg-neutral-700 text-neutral-500' : p.diamondPrice ? 'bg-blue-600 text-white border-b-4 border-blue-800' : 'bg-yellow-500 text-black border-b-4 border-yellow-700'}`}>
                     {owned ? 'OWNED' : p.diamondPrice ? `DIA ${p.diamondPrice}` : `$ ${p.price}`}
                   </button>
                 </motion.div>
               )
             })}
          </div>
        )}
      </div>
    </div>
  );
}

// --- PENALTY ---
function FootballPenaltyGame({ onBack }: { onBack: () => void }) {
  const [ballX, setBallX] = useState(50);
  const [isShooting, setIsShooting] = useState(false);
  const [gkX, setGkX] = useState(50);
  const [result, setResult] = useState<'idle' | 'GOAL!' | 'SAVED!' | 'BARSA LEONA GOLI!' | 'BARSA QAYTARDI!' | 'SEYV! QOYIL!'>('idle');
  const [turn, setTurn] = useState<'player' | 'opponent'>('player');
  const [score, setScore] = useState<[number, number]>([0, 0]);

  const playerShoot = (targetX: number) => {
    if (isShooting || turn !== 'player') return;
    setIsShooting(true);
    const gkMove = Math.random() * 60 + 20;
    setGkX(gkMove);
    setBallX(targetX);
    
    setTimeout(() => {
      const isGoal = Math.abs(targetX - gkMove) > 15;
      if (isGoal) {
        setScore(prev => [prev[0] + 1, prev[1]]);
        setResult('GOAL!');
      } else {
        setResult('SAVED!');
      }
      
      setTimeout(() => {
        setIsShooting(false);
        setBallX(50);
        setGkX(50);
        setResult('idle');
        setTurn('opponent');
      }, 1500);
    }, 500);
  };

  const manualDefend = (gkChoice: number) => {
    if (isShooting || turn !== 'opponent') return;
    setIsShooting(true);
    const targetX = Math.random() * 60 + 20;
    setBallX(targetX);
    setGkX(gkChoice);

    setTimeout(() => {
      const isGoal = Math.abs(targetX - gkChoice) > 15;
      if (isGoal) {
        setScore(prev => [prev[0], prev[1] + 1]);
        setResult('BARSA LEONA GOLI!');
      } else {
        setResult('SEYV! QOYIL!');
      }

      setTimeout(() => {
        setIsShooting(false);
        setBallX(50);
        setGkX(50);
        setResult('idle');
        setTurn('player');
      }, 1500);
    }, 500);
  };

  return (
    <div className="h-full bg-emerald-700 flex flex-col p-4 text-white overflow-hidden">
      <div className="flex items-center justify-between mb-4 pt-10 px-2">
        <button onClick={onBack} className="p-2 bg-white/10 rounded-full"><ArrowLeft size={20}/></button>
        <div className="bg-black/40 px-6 py-2 rounded-2xl border border-white/10 font-black italic shadow-inner">
           REAL MADRID {score[0]} - {score[1]} BARSA LEONA
        </div>
      </div>

      <div className="flex-1 bg-emerald-600 relative rounded-3xl border-b-[12px] border-white/50 flex flex-col items-center shadow-inner overflow-hidden">
        <div className="w-[90%] h-64 border-[10px] border-white border-b-0 mt-8 relative shadow-[0_0_50px_rgba(255,255,255,0.2)]">
          <motion.div 
            animate={{ x: `${gkX - 50}%` }} 
            className="w-20 h-32 bg-blue-500 absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-2xl shadow-xl flex items-center justify-center border-t-4 border-blue-400"
          >
            <div className="w-8 h-8 rounded-full bg-pink-200 mt-2" />
          </motion.div>
        </div>

        <motion.div 
          animate={isShooting ? { y: -380, x: `${ballX - 50}%`, scale: 0.35, rotate: 360 } : { y: 0, x: 0, scale: 1, rotate: 0 }} 
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-14 h-14 bg-white rounded-full absolute bottom-20 shadow-[0_15px_30px_rgba(0,0,0,0.4)] flex items-center justify-center text-black font-black border-2 border-neutral-300"
        >
          ⚽
        </motion.div>

        {result !== 'idle' && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }} 
            animate={{ scale: 1.5, opacity: 1 }} 
            className={`absolute top-1/2 font-black italic text-4xl drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] ${result.includes('GOAL') || result.includes('GOLI') ? 'text-yellow-400' : 'text-red-500'}`}
          >
            {result}
          </motion.div>
        )}

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase bg-black/30 px-3 py-1 rounded-full whitespace-nowrap">
           {turn === 'player' ? "SIZ TEPASIZ" : "RAQIB TEPYAPTI - SIZ DARVOZABONSIZ!"}
        </div>
      </div>

      <div className="py-8 grid grid-cols-3 gap-3">
        {[
          { label: 'CHAP', val: 30 },
          { label: 'O\'RTA', val: 50 },
          { label: 'O\'NG', val: 70 }
        ].map((d, i) => (
          <button 
            key={i} 
            disabled={isShooting}
            onClick={() => turn === 'player' ? playerShoot(d.val) : manualDefend(d.val)}
            className={`h-16 rounded-2xl font-black text-xs shadow-xl active:scale-90 transition-transform disabled:opacity-50 ${turn === 'player' ? 'bg-neutral-800' : 'bg-blue-600'}`}
          >
            {d.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// --- SNAKE GAME ---
function SnakeGame({ onBack }: { onBack: () => void }) {
  const [snake, setSnake] = useState([[5, 5]]);
  const [food, setFood] = useState([10, 10]);
  const [direction, setDirection] = useState([0, 1]);
  const [gameOver, setGameOver] = useState(false);
  const gridSize = 20;

  useEffect(() => {
    if (gameOver) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w') setDirection([-1, 0]);
      if (e.key === 'ArrowDown' || e.key === 's') setDirection([1, 0]);
      if (e.key === 'ArrowLeft' || e.key === 'a') setDirection([0, -1]);
      if (e.key === 'ArrowRight' || e.key === 'd') setDirection([0, 1]);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      const newHead = [snake[0][0] + direction[0], snake[0][1] + direction[1]];
      if (newHead[0] < 0 || newHead[0] >= gridSize || newHead[1] < 0 || newHead[1] >= gridSize || snake.some(s => s[0] === newHead[0] && s[1] === newHead[1])) {
        setGameOver(true);
        return;
      }
      const newSnake = [newHead, ...snake];
      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        setFood([Math.floor(Math.random() * gridSize), Math.floor(Math.random() * gridSize)]);
      } else {
        newSnake.pop();
      }
      setSnake(newSnake);
    }, 200);
    return () => clearInterval(interval);
  }, [snake, direction, gameOver, food]);

  return (
    <div className="h-full bg-black flex flex-col p-4 text-white">
      <div className="flex items-center justify-between mb-8 pt-10">
        <button onClick={onBack} className="p-2 bg-white/10 rounded-full"><ArrowLeft size={20}/></button>
        <span className="font-bold">SNAKE: {snake.length - 1}</span>
      </div>
      <div className="flex-1 bg-neutral-900 grid grid-cols-20 grid-rows-20 rounded-xl overflow-hidden border border-white/5 relative">
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10">
            <h2 className="text-2xl font-bold mb-4">GAME OVER!</h2>
            <button onClick={() => { setSnake([[5,5]]); setGameOver(false); }} className="bg-green-600 px-6 py-2 rounded-full">YANA BOSHLASH</button>
          </div>
        )}
        {snake.map((s, i) => <div key={i} className="bg-green-500 rounded-sm" style={{ gridColumnStart: s[1] + 1, gridRowStart: s[0] + 1 }} />)}
        <div className="bg-red-500 rounded-full animate-pulse" style={{ gridColumnStart: food[1] + 1, gridRowStart: food[0] + 1 }} />
      </div>
      <div className="h-48 grid grid-cols-3 gap-2 mt-8">
        <div/>
        <button onClick={() => setDirection([-1, 0])} className="bg-neutral-800 rounded-2xl flex items-center justify-center"><ChevronUp/></button>
        <div/>
        <button onClick={() => setDirection([0, -1])} className="bg-neutral-800 rounded-2xl flex items-center justify-center"><ChevronLeft/></button>
        <button onClick={() => setDirection([1, 0])} className="bg-neutral-800 rounded-2xl flex items-center justify-center"><ChevronDown/></button>
        <button onClick={() => setDirection([0, 1])} className="bg-neutral-800 rounded-2xl flex items-center justify-center"><ChevronRight/></button>
      </div>
    </div>
  );
}

// --- RACING ---
function RacingGame({ onBack }: { onBack: () => void }) {
  const [carX, setCarX] = useState(1); // 0, 1, 2
  const [obstacles, setObstacles] = useState<{ id: number, x: number, y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') setCarX(x => Math.max(0, x - 1));
      if (e.key === 'ArrowRight' || e.key === 'd') setCarX(x => Math.min(2, x + 1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setObstacles(prev => {
        const next = prev.map(o => ({ ...o, y: o.y + 0.08 })).filter(o => o.y < 1.1);
        if (Math.random() < 0.15 && next.length < 3) {
           next.push({ id: Date.now(), x: Math.floor(Math.random() * 3), y: -0.2 });
        }
        if (next.some(o => o.y > 0.8 && o.y < 1.0 && o.x === carX)) setGameOver(true);
        return next;
      });
      setScore(s => s + 1);
    }, 50);
    return () => clearInterval(interval);
  }, [carX, gameOver]);

  return (
    <div className="h-full bg-neutral-950 flex flex-col p-4 text-white overflow-hidden relative">
      <div className="flex items-center justify-between mb-8 pt-10 z-10">
        <button onClick={onBack} className="p-2 bg-white/10 rounded-full"><ArrowLeft size={20}/></button>
        <span className="font-black font-mono tracking-widest text-red-500">POYGA: {score}</span>
      </div>
      <div className="flex-1 bg-neutral-900 relative rounded-[2.5rem] border-x-4 border-dashed border-white/20 overflow-hidden shadow-2xl">
        <div className="absolute inset-x-0 h-full flex justify-around pointer-events-none">
           <div className="w-px h-full bg-white/5" />
           <div className="w-px h-full bg-white/5" />
        </div>
        <motion.div 
          animate={{ left: `${(carX * 33.3) + 16.6}%` }} 
          className="absolute bottom-10 -translate-x-1/2 w-16 h-28 bg-red-600 rounded-xl border-t-8 border-red-400 shadow-2xl z-20"
        >
          <div className="w-12 h-10 bg-sky-300/40 mx-auto mt-2 rounded-t-lg" />
          <div className="absolute -bottom-2 -left-1 w-3 h-5 bg-neutral-900 rounded-sm" />
          <div className="absolute -bottom-2 -right-1 w-3 h-5 bg-neutral-900 rounded-sm" />
          <div className="absolute -top-1 -left-1 w-3 h-5 bg-neutral-900 rounded-sm" />
          <div className="absolute -top-1 -right-1 w-3 h-5 bg-neutral-900 rounded-sm" />
        </motion.div>
        {obstacles.map(o => (
          <div key={o.id} className="absolute w-1/3 flex justify-center" style={{ left: `${o.x * 33.3}%`, top: `${o.y * 100}%` }}>
            <div className="w-16 h-24 bg-neutral-700 rounded-xl border-2 border-neutral-600 shadow-lg" />
          </div>
        ))}
        {gameOver && (
          <div className="absolute inset-0 bg-black/90 z-30 flex flex-col items-center justify-center backdrop-blur-sm">
             <h2 className="text-4xl font-black italic mb-2 text-red-500 tracking-tighter">AVARIYA!</h2>
             <p className="text-neutral-500 mb-8 font-black">YUQORI BALL: {score}</p>
             <button onClick={() => { setScore(0); setObstacles([]); setGameOver(false); }} className="bg-white text-black px-10 py-4 rounded-3xl font-black tracking-widest active:scale-95 transition-transform">DAVOM ETISH</button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6 h-24">
         <button onTouchStart={() => setCarX(x => Math.max(0, x - 1))} className="bg-white/5 rounded-3xl flex items-center justify-center border border-white/5 active:bg-white/10 shadow-xl"><ChevronLeft size={32}/></button>
         <button onTouchStart={() => setCarX(x => Math.min(2, x + 1))} className="bg-white/5 rounded-3xl flex items-center justify-center border border-white/5 active:bg-white/10 shadow-xl"><ChevronRight size={32}/></button>
      </div>
    </div>
  );
}

// --- MONKEY TYPE ---
function MonkeyType({ onBack }: { onBack: () => void }) {
  const wordsList = "keyboard racing football mobile ronaldo messi dribbling goals victory trophy game play speed typing power energy focus vision talent skills mastery legend champion elite extreme turbo hyper neon digital virtual modern future".split(" ");
  const [currentWords, setCurrentWords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [completedWordsCount, setCompletedWordsCount] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setCurrentWords(Array.from({ length: 150 }, () => wordsList[Math.floor(Math.random() * wordsList.length)]));
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;
    const val = e.target.value;
    if (!startTime) {
      setStartTime(Date.now());
    }

    if (val.endsWith(" ")) {
      const typedWord = val.trim();
      const targetWord = currentWords[0];
      
      if (typedWord === targetWord) {
        setCompletedWordsCount(prev => prev + 1);
        setCurrentWords(prev => prev.slice(1));
      } else {
        setMistakes(prev => prev + 1);
      }
      setInputValue("");
    } else {
      setInputValue(val);
    }
  };

  useEffect(() => {
    if (startTime && !isFinished) {
      const timerInterval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [startTime, isFinished]);

  useEffect(() => {
    if (startTime && completedWordsCount > 0) {
      const timeElapsed = (Date.now() - startTime) / 60000;
      setWpm(Math.round(completedWordsCount / timeElapsed));
      setAccuracy(Math.round((completedWordsCount / (completedWordsCount + mistakes)) * 100));
    }
  }, [completedWordsCount, mistakes, startTime]);

  const activeWord = currentWords[0] || "";

  const restart = () => {
    setCurrentWords(Array.from({ length: 150 }, () => wordsList[Math.floor(Math.random() * wordsList.length)]));
    setInputValue("");
    setWpm(0);
    setAccuracy(100);
    setStartTime(null);
    setTimeLeft(30);
    setCompletedWordsCount(0);
    setMistakes(0);
    setIsFinished(false);
  };

  return (
    <div className="h-full bg-[#1a1a1a] flex flex-col p-8 pt-16 text-[#646669] font-mono selection:bg-emerald-500/30 overflow-hidden">
       <header className="flex items-center justify-between mb-16 px-4">
          <button onClick={onBack} className="p-2 hover:text-white transition-colors"><ArrowLeft size={24}/></button>
          
          <div className="text-4xl text-emerald-500 font-black animate-pulse">
            {timeLeft}s
          </div>

          <div className="flex gap-12">
             <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1">wpm</p>
                <p className="text-4xl text-emerald-500 font-black">{wpm}</p>
             </div>
             <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-1">acc</p>
                <p className="text-4xl text-emerald-500 font-black">{accuracy}%</p>
             </div>
          </div>
       </header>

       <div className="flex-1 relative px-4">
          {isFinished ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center h-full gap-8"
            >
               <h2 className="text-6xl font-black text-white italic tracking-tighter">VAQT TUGADI!</h2>
               <div className="flex gap-16">
                  <div className="text-center">
                    <p className="text-xs uppercase text-neutral-500 font-black mb-2">final wpm</p>
                    <p className="text-6xl text-emerald-500 font-black">{wpm}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs uppercase text-neutral-500 font-black mb-2">accuracy</p>
                    <p className="text-6xl text-emerald-500 font-black">{accuracy}%</p>
                  </div>
               </div>
               <button 
                onClick={restart}
                className="mt-8 bg-emerald-500 text-black px-12 py-4 rounded-full font-black tracking-widest hover:scale-105 active:scale-95 transition-transform"
               >
                 YANA O'YNASH
               </button>
            </motion.div>
          ) : (
            <>
              <input 
                type="text" 
                autoFocus 
                value={inputValue}
                onChange={handleInput}
                onBlur={(e) => e.target.focus()}
                className="absolute inset-0 opacity-0 cursor-default z-0"
              />
              <div className="text-2xl flex flex-wrap gap-x-5 gap-y-4 leading-loose select-none relative z-10 transition-all duration-300">
                 {/* Current word with char-level feedback */}
                 <div className="relative">
                    {activeWord.split("").map((char, i) => {
                      let color = "text-[#646669]";
                      if (i < inputValue.length) {
                        color = inputValue[i] === char ? "text-white" : "text-red-500";
                      }
                      return <span key={i} className={`${color} transition-colors`}>{char}</span>;
                    })}
                    {/* Extra chars if user keeps typing past word length */}
                    {inputValue.length > activeWord.length && (
                      <span className="text-red-700">
                        {inputValue.slice(activeWord.length)}
                      </span>
                    )}
                    {/* Caret */}
                    <motion.div 
                      layoutId="caret"
                      className="absolute bottom-1 w-0.5 h-7 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                      animate={{ 
                        left: `${inputValue.length * 0.61}em`,
                        opacity: [1, 0, 1]
                      }}
                      transition={{ 
                        left: { type: "spring", stiffness: 500, damping: 40 },
                        opacity: { duration: 0.8, repeat: Infinity }
                      }}
                    />
                 </div>

                 {/* Future words */}
                 {currentWords.slice(1, 20).map((w, i) => (
                   <span key={i} className="opacity-40">{w}</span>
                 ))}
              </div>
              
              {!startTime && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-20 text-[10px] text-neutral-600 uppercase tracking-[0.3em] font-black italic flex items-center gap-4"
                >
                   <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                   30 SONIYA ICHIDA YOZISHNI BOSHLANG
                </motion.div>
              )}
            </>
          )}
       </div>

       <div className="mt-auto px-4 pb-8">
         <div className="bg-neutral-800/20 p-6 rounded-3xl border border-white/5 flex items-center justify-between">
            <div className="flex gap-4">
               <button onClick={restart} className="px-2 py-1 bg-neutral-800 rounded text-[9px] font-bold text-neutral-400 hover:text-white transition-colors uppercase">Qayta boshlash</button>
               <div className="px-2 py-1 bg-neutral-800 rounded text-[9px] font-bold text-neutral-400">ESC TO EXIT</div>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-500">
               <Timer size={14} className="text-emerald-500" />
               DLS REATING: 100 MAX
            </div>
         </div>
       </div>
    </div>
  );
}

// --- SHOOTER ---
function ShooterGame({ onBack }: { onBack: () => void }) {
  const [targets, setTargets] = useState<{ id: number, x: number, y: number, hp: number }[]>([]);
  const [score, setScore] = useState(0);
  const [ammo, setAmmo] = useState(30);
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (targets.length < 5) {
        setTargets(prev => [...prev, { id: Date.now(), x: Math.random() * 80 + 10, y: Math.random() * 60 + 20, hp: 100 }]);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, [targets]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'r' || e.key === 'R') handleReload();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [ammo, reloading]);

  const shoot = (id: number) => {
    if (ammo <= 0 || reloading) return;
    setAmmo(a => a - 1);
    setTargets(prev => {
      const target = prev.find(t => t.id === id);
      if (!target) return prev;
      if (target.hp <= 50) {
        setScore(s => s + 300);
        return prev.filter(t => t.id !== id);
      }
      return prev.map(t => t.id === id ? { ...t, hp: t.hp - 50 } : t);
    });
  };

  const handleReload = () => {
    if (reloading || ammo === 30) return;
    setReloading(true);
    setTimeout(() => {
      setAmmo(30);
      setReloading(false);
    }, 1500);
  };

  return (
    <div className="h-full bg-neutral-950 flex flex-col text-white overflow-hidden font-mono">
       <header className="flex items-center justify-between p-6 pt-12 absolute top-0 w-full z-20">
          <button onClick={onBack} className="p-2 bg-black/50 border border-white/10 rounded-full"><ArrowLeft size={20}/></button>
          <div className="flex gap-6">
             <div className="text-right">
                <p className="text-[10px] text-neutral-500 font-black">SCORE</p>
                <p className="text-xl font-black text-blue-400">{score.toLocaleString()}</p>
             </div>
             <div className="text-right">
                <p className="text-[10px] text-neutral-500 font-black">AMMO</p>
                <p className={`text-xl font-black ${ammo < 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>{ammo}/30</p>
             </div>
          </div>
       </header>

       <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center relative cursor-crosshair group">
          <div className="absolute inset-0 bg-black/40" />
          
          {targets.map(t => (
            <motion.div 
              key={t.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={(e) => { e.stopPropagation(); shoot(t.id); }}
              className="absolute w-20 h-28 flex flex-col items-center justify-center translate-x-[-50%] translate-y-[-50%]"
              style={{ left: `${t.x}%`, top: `${t.y}%` }}
            >
               <div className="w-full bg-black/50 h-1 rounded-full mb-1 overflow-hidden">
                  <div className="h-full bg-red-600 transition-all duration-300" style={{ width: `${t.hp}%` }} />
               </div>
               <div className="w-16 h-24 bg-neutral-800 rounded-xl border-2 border-red-600/50 flex items-center justify-center overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.id}`} alt="" className="w-full h-full object-cover" />
               </div>
            </motion.div>
          ))}

          {/* Crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50">
             <div className="w-8 h-8 border-2 border-green-500 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-green-500 rounded-full" />
             </div>
          </div>

          {/* Weapon */}
          <div className="absolute bottom-[-20px] right-0 translate-x-[20%] w-[80%] pointer-events-none">
             <img 
               src="https://media.rawg.io/media/games/618/618c203a47806f4cf0bd5ad8a5b615cc.jpg" 
               alt="" 
               className={`w-full h-auto object-contain transform -scale-x-100 ${ammo === 0 ? 'opacity-50' : ''} ${reloading ? 'animate-bounce' : ''}`} 
             />
          </div>
       </div>

       <div className="h-28 bg-neutral-900 border-t border-white/5 flex items-center justify-around px-8">
          <button 
             onClick={handleReload}
             className="bg-neutral-800 px-8 py-3 rounded-xl text-xs font-black tracking-widest border border-white/10 active:scale-95"
          >
             {reloading ? 'RELOADING...' : 'RELOAD (R)'}
          </button>
          <div 
             onClick={() => ammo === 0 && handleReload()}
             className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center border-4 border-white/20 active:scale-90 transition-transform shadow-2xl shadow-red-500/20"
          >
             <Crosshair size={32} />
          </div>
       </div>
    </div>
  );
}

// --- COIN COLLECTOR ---
function CoinCollector({ onBack, score, setScore }: { 
  onBack: () => void, 
  score: number, 
  setScore: React.Dispatch<React.SetStateAction<number>> 
}) {
  const [playerX, setPlayerX] = useState(50);
  const [coins, setCoins] = useState<{ id: number, x: number, y: number }[]>([]);
  const [showShop, setShowShop] = useState(false);
  const [selectedSkin, setSelectedSkin] = useState<number>(0);
  const [ownedSkins, setOwnedSkins] = useState<number[]>([0]);

  const skins = [
    { id: 0, name: 'Boshlang\'ich', emoji: '🧑‍💻', price: 0, color: 'bg-blue-500' },
    { id: 1, name: 'Talaba', emoji: '👨‍🎓', price: 1000, color: 'bg-emerald-500' },
    { id: 2, name: 'Sardor', emoji: '👨‍✈️', price: 2000, color: 'bg-indigo-500' },
    { id: 3, name: 'Biznesmen', emoji: '🤵', price: 3000, color: 'bg-purple-500' },
    { id: 4, name: 'Qirol', emoji: '🤴', price: 4000, color: 'bg-yellow-500' },
    { id: 5, name: 'Doktor', emoji: '👨‍⚕️', price: 5000, color: 'bg-red-500' },
    { id: 6, name: 'Rassom', emoji: '👨‍🎨', price: 6000, color: 'bg-pink-500' },
    { id: 7, name: 'Oshpaz', emoji: '👨‍🍳', price: 7000, color: 'bg-orange-500' },
    { id: 8, name: 'Fermer', emoji: '👨‍🌾', price: 8000, color: 'bg-green-600' },
    { id: 9, name: 'Sotuvchi', emoji: '👨‍💼', price: 9000, color: 'bg-slate-500' },
    { id: 10, name: 'Olim', emoji: '👨‍🔬', price: 10000, color: 'bg-cyan-500' },
    { id: 11, name: 'Injinir', emoji: '👨‍🔧', price: 11000, color: 'bg-gray-600' },
    { id: 12, name: 'Uchuvchi', emoji: '👨‍🚀', price: 12000, color: 'bg-sky-600' },
    { id: 13, name: 'Politsiya', emoji: '👮', price: 13000, color: 'bg-blue-800' },
    { id: 14, name: 'Quruvchi', emoji: '👷', price: 14000, color: 'bg-amber-600' },
    { id: 15, name: 'Sherlock', emoji: '🕵️', price: 15000, color: 'bg-neutral-800' },
    { id: 16, name: 'Santa', emoji: '🎅', price: 16000, color: 'bg-red-600' },
    { id: 17, name: 'Ninja', emoji: '🥷', price: 17000, color: 'bg-black' },
    { id: 18, name: 'Supermen', emoji: '🦸', price: 18000, color: 'bg-blue-600' },
    { id: 19, name: 'Vampir', emoji: '🧛', price: 19000, color: 'bg-indigo-900' },
    { id: 20, name: 'Zombi', emoji: '🧟', price: 20000, color: 'bg-green-800' },
    { id: 21, name: 'Sehrgar', emoji: '🧙', price: 21000, color: 'bg-violet-700' },
    { id: 22, name: 'Elf', emoji: '🧝', price: 22000, color: 'bg-emerald-600' },
    { id: 23, name: "G'avvos", emoji: '🤿', price: 23000, color: 'bg-blue-400' },
    { id: 24, name: 'Sportchi', emoji: '🏃', price: 24000, color: 'bg-orange-600' },
    { id: 25, name: 'Velosipedchi', emoji: '🚴', price: 25000, color: 'bg-yellow-600' },
    { id: 26, name: 'Alpinist', emoji: '🧗', price: 26000, color: 'bg-stone-600' },
    { id: 27, name: 'Yoga Ustasi', emoji: '🧘', price: 27000, color: 'bg-teal-500' },
    { id: 28, name: 'Qo\'shiqchi', emoji: '🎤', price: 28000, color: 'bg-fuchsia-500' },
    { id: 29, name: 'Gitarist', emoji: '🎸', price: 29000, color: 'bg-rose-500' },
    { id: 30, name: 'DJ', emoji: '🎧', price: 30000, color: 'bg-blue-500' },
    { id: 31, name: 'Yulduz', emoji: '🌟', price: 31000, color: 'bg-yellow-400' },
    { id: 32, name: 'Robot', emoji: '🤖', price: 32000, color: 'bg-zinc-400' },
    { id: 33, name: 'Ona-er', emoji: '🌍', price: 33000, color: 'bg-blue-500' },
    { id: 34, name: 'Oy', emoji: '🌙', price: 34000, color: 'bg-slate-300' },
    { id: 35, name: 'Marslik', emoji: '👽', price: 35000, color: 'bg-green-500' },
    { id: 36, name: 'Koinot', emoji: '🌌', price: 36000, color: 'bg-black' },
    { id: 37, name: 'Ajdaho', emoji: '🐉', price: 37000, color: 'bg-red-700' },
    { id: 38, name: 'Unicorn', emoji: '🦄', price: 38000, color: 'bg-pink-300' },
    { id: 39, name: 'Sher', emoji: '🦁', price: 39000, color: 'bg-amber-500' },
    { id: 40, name: 'Yo\'lbars', emoji: '🐯', price: 40000, color: 'bg-orange-500' },
    { id: 41, name: 'Ayiq', emoji: '🐻', price: 41000, color: 'bg-stone-500' },
    { id: 42, name: 'Panda', emoji: '🐼', price: 42000, color: 'bg-white' },
    { id: 43, name: 'Koala', emoji: '🐨', price: 43000, color: 'bg-gray-400' },
    { id: 44, name: 'Maymun', emoji: '🐵', price: 44000, color: 'bg-amber-800' },
    { id: 45, name: 'Fil', emoji: '🐘', price: 45000, color: 'bg-slate-400' },
    { id: 46, name: 'Karkidon', emoji: '🦏', price: 46000, color: 'bg-gray-500' },
    { id: 47, name: 'Begemot', emoji: '🦛', price: 47000, color: 'bg-purple-300' },
    { id: 48, name: 'Sigir', emoji: '🐮', price: 48000, color: 'bg-white' },
    { id: 49, name: 'Cho\'chqa', emoji: '🐷', price: 49000, color: 'bg-pink-400' },
    { id: 50, name: 'Qo\'y', emoji: '🐑', price: 50000, color: 'bg-zinc-100' },
    { id: 51, name: 'Tuya', emoji: '🐪', price: 51000, color: 'bg-orange-200' },
    { id: 52, name: 'Zebra', emoji: '🦓', price: 52000, color: 'bg-black' },
    { id: 53, name: 'Jirafa', emoji: '🦒', price: 53000, color: 'bg-yellow-600' },
    { id: 54, name: 'Kangaroo', emoji: '🦘', price: 54000, color: 'bg-amber-600' },
    { id: 55, name: 'Bo\'ri', emoji: '🐺', price: 55000, color: 'bg-slate-500' },
    { id: 56, name: 'Tulki', emoji: '🦊', price: 56000, color: 'bg-orange-600' },
    { id: 57, name: 'Yenot', emoji: '🦝', price: 57000, color: 'bg-gray-600' },
    { id: 58, name: 'Mushuk', emoji: '🐱', price: 58000, color: 'bg-amber-400' },
    { id: 59, name: 'Kuchuk', emoji: '🐶', price: 59000, color: 'bg-stone-300' },
    { id: 60, name: 'Sichqon', emoji: '🐭', price: 60000, color: 'bg-gray-300' },
    { id: 61, name: 'Quyon', emoji: '🐰', price: 61000, color: 'bg-white' },
    { id: 62, name: 'Tipratikan', emoji: '🦔', price: 62000, color: 'bg-stone-600' },
    { id: 63, name: 'Ko\'rshapalak', emoji: '🦇', price: 63000, color: 'bg-neutral-800' },
    { id: 64, name: 'Burgut', emoji: '🦅', price: 64000, color: 'bg-amber-900' },
    { id: 65, name: "O'rdak", emoji: '🦆', price: 65000, color: 'bg-emerald-500' },
    { id: 66, name: "Boyo'g'li", emoji: '🦉', price: 66000, color: 'bg-amber-700' },
    { id: 67, name: 'Pinguin', emoji: '🐧', price: 67000, color: 'bg-sky-500' },
    { id: 68, name: "To'ti", emoji: '🦜', price: 68000, color: 'bg-lime-500' },
    { id: 69, name: 'Baqa', emoji: '🐸', price: 69000, color: 'bg-green-500' },
    { id: 70, name: 'Krokodil', emoji: '🐊', price: 70000, color: 'bg-emerald-700' },
    { id: 71, name: 'Toshbaqa', emoji: '🐢', price: 71000, color: 'bg-green-600' },
    { id: 72, name: 'Ilon', emoji: '🐍', price: 72000, color: 'bg-lime-600' },
    { id: 73, name: 'Kit', emoji: '🐳', price: 73000, color: 'bg-blue-400' },
    { id: 74, name: 'Delfin', emoji: '🐬', price: 74000, color: 'bg-sky-400' },
    { id: 75, name: 'Akulya', emoji: '🦈', price: 75000, color: 'bg-slate-500' },
    { id: 76, name: 'Ahtapot', emoji: '🐙', price: 76000, color: 'bg-pink-600' },
    { id: 77, name: 'Qisqichbaqa', emoji: '🦀', price: 77000, color: 'bg-red-500' },
    { id: 78, name: 'Asalari', emoji: '🐝', price: 78000, color: 'bg-yellow-400' },
    { id: 79, name: 'Xonqizi', emoji: '🐞', price: 79000, color: 'bg-red-600' },
    { id: 80, name: 'Kapalak', emoji: '🦋', price: 80000, color: 'bg-cyan-400' },
    { id: 81, name: "O'rgimchak", emoji: '🕷️', price: 81000, color: 'bg-black' },
    { id: 82, name: 'Chayon', emoji: '🦂', price: 82000, color: 'bg-amber-700' },
    { id: 83, name: 'Gul', emoji: '🌸', price: 83000, color: 'bg-pink-200' },
    { id: 84, name: 'Kaktus', emoji: '🌵', price: 84000, color: 'bg-green-700' },
    { id: 85, name: 'Palma', emoji: '🌴', price: 85000, color: 'bg-sky-300' },
    { id: 86, name: 'Zamburug\'', emoji: '🍄', price: 86000, color: 'bg-red-500' },
    { id: 87, name: 'Olma', emoji: '🍎', price: 87000, color: 'bg-red-600' },
    { id: 88, name: 'Banan', emoji: '🍌', price: 88000, color: 'bg-yellow-300' },
    { id: 89, name: 'Tarvuz', emoji: '🍉', price: 89000, color: 'bg-green-500' },
    { id: 90, name: 'Gilos', emoji: '🍒', price: 90000, color: 'bg-red-400' },
    { id: 91, name: 'Pitsa', emoji: '🍕', price: 91000, color: 'bg-orange-400' },
    { id: 92, name: 'Burger', emoji: '🍔', price: 92000, color: 'bg-amber-700' },
    { id: 93, name: 'Muzqaymoq', emoji: '🍦', price: 93000, color: 'bg-white' },
    { id: 94, name: 'Kofe', emoji: '☕', price: 94000, color: 'bg-stone-600' },
    { id: 95, name: 'Futbol', emoji: '⚽', price: 95000, color: 'bg-white' },
    { id: 96, name: 'Basketbol', emoji: '🏀', price: 96000, color: 'bg-orange-600' },
    { id: 97, name: "G'alaba", emoji: '🏆', price: 97000, color: 'bg-yellow-500' },
    { id: 98, name: 'Olmos', emoji: '💎', price: 98000, color: 'bg-cyan-300' },
    { id: 99, name: 'Afsonaviy', emoji: '👑', price: 100000, color: 'bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600' },
  ];

  const buySkin = (skin: typeof skins[0]) => {
    if (score >= skin.price) {
      setScore(prev => prev - skin.price);
      setOwnedSkins(prev => [...prev, skin.id]);
      setSelectedSkin(skin.id);
      alert(`${skin.name} sotib olindi!`);
    } else {
      alert('Tanga etarli emas!');
    }
  };

  const level = Math.floor(score / 1000) + 1;
  const speed = 10 + Math.min(level * 2, 20);
  const scale = 1 + Math.min(level * 0.1, 1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') setPlayerX(x => Math.max(5, x - speed));
      if (e.key === 'ArrowRight' || e.key === 'd') setPlayerX(x => Math.min(95, x + speed));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [speed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(prev => {
        const next = prev.map(c => ({...c, y: c.y + 4})).filter(c => c.y < 110);
        if (Math.random() > 0.85) {
          next.push({ id: Date.now(), x: Math.random() * 90 + 5, y: -10 });
        }
        
        // Collection logic
        const hitWidth = 15 * scale;
        const hitIndex = next.findIndex(c => c.y > 85 && c.y < 100 && Math.abs(c.x - playerX) < hitWidth);
        if (hitIndex !== -1) {
          setScore(s => s + 100);
          next.splice(hitIndex, 1);
        }
        
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [playerX, scale]);

  return (
    <div className="h-full bg-[#0a0a0a] flex flex-col p-4 text-white overflow-hidden font-black relative">
       {/* Shop Overlay */}
       <AnimatePresence>
          {showShop && (
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="absolute inset-0 bg-black/95 z-50 p-6 flex flex-col overflow-y-auto pt-16"
            >
               <header className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl italic">MAGAZIN</h2>
                  <button onClick={() => setShowShop(false)} className="p-2 bg-white/10 rounded-full"><ArrowLeft className="rotate-90"/></button>
               </header>
               <div className="flex flex-col gap-4">
                  {skins.map(skin => {
                    const isOwned = ownedSkins.includes(skin.id);
                    const isSelected = selectedSkin === skin.id;
                    return (
                      <div key={skin.id} className="bg-white/5 p-4 rounded-3xl border border-white/10 flex items-center gap-4">
                        <div className={`w-16 h-16 ${skin.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                           {skin.emoji}
                        </div>
                        <div className="flex-1">
                           <p className="text-sm font-bold">{skin.name}</p>
                           <p className="text-[10px] text-neutral-500">{isOwned ? 'SOTIB OLINGAN' : `${skin.price.toLocaleString()} $`}</p>
                        </div>
                        {isOwned ? (
                          <button 
                            onClick={() => setSelectedSkin(skin.id)} 
                            className={`px-4 py-2 rounded-xl text-[10px] ${isSelected ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white'}`}
                          >
                            {isSelected ? 'TANLANGAN' : 'TANLASH'}
                          </button>
                        ) : (
                          <button 
                            onClick={() => buySkin(skin)} 
                            className="px-6 py-2 bg-yellow-500 text-black rounded-xl text-[10px] shadow-lg"
                          >
                            OLISH
                          </button>
                        )}
                      </div>
                    );
                  })}
               </div>
            </motion.div>
          )}
       </AnimatePresence>

       <div className="flex items-center justify-between pt-10 pb-6 px-2">
          <div className="flex gap-2">
             <button onClick={onBack} className="p-2 bg-white/5 rounded-full border border-white/5"><ArrowLeft size={20}/></button>
             <button onClick={() => setShowShop(true)} className="p-2 bg-yellow-500/20 text-yellow-500 rounded-full border border-yellow-500/20"><ShoppingBag size={20}/></button>
          </div>
          <div className="flex flex-col items-end">
             <div className="bg-emerald-500/20 text-emerald-500 px-3 py-1 rounded-full text-[8px] font-black border border-emerald-500/20 mb-1">
                LVL {level}
             </div>
             <div className="bg-yellow-500 text-black px-6 py-2 rounded-2xl text-lg flex items-center gap-2 shadow-2xl shadow-yellow-500/20 italic">
                <DollarSign size={20}/> {score.toLocaleString()}
             </div>
          </div>
       </div>
       <div className="flex-1 bg-gradient-to-b from-yellow-500/5 to-transparent rounded-[3.5rem] relative overflow-hidden border border-white/5 shadow-inner">
          <AnimatePresence>
            {coins.map(c => (
              <motion.div 
                key={c.id} 
                className="absolute w-12 h-12 bg-yellow-400 rounded-full border-4 border-yellow-200 shadow-[0_0_20px_rgba(250,204,21,0.5)] flex items-center justify-center text-yellow-900 text-2xl"
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 2, opacity: 0 }}
              >
                $
              </motion.div>
            ))}
          </AnimatePresence>
          
          <motion.div 
            animate={{ 
              left: `${playerX}%`,
              scale: scale
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`absolute bottom-6 w-16 h-20 ${skins[selectedSkin].color} rounded-2xl -translate-x-1/2 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-2 border-white/20 z-20`}
          >
             <span className="text-4xl">{skins[selectedSkin].emoji}</span>
             <div className="absolute -bottom-2 w-12 h-2 bg-black/40 blur-sm rounded-full" />
          </motion.div>
       </div>
       <div className="mt-8 grid grid-cols-2 gap-4 h-24 px-2">
          <button onTouchStart={() => setPlayerX(x => Math.max(5, x - speed))} className="bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/5 active:bg-white/10 transition-colors"><ChevronLeft size={36}/></button>
          <button onTouchStart={() => setPlayerX(x => Math.min(95, x + speed))} className="bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/5 active:bg-white/10 transition-colors"><ChevronRight size={36}/></button>
       </div>
    </div>
  );
}
