/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import { 
  Home, 
  MessageSquare, 
  Gamepad2, 
  Video, 
  Clock as ClockIcon, 
  Wifi, 
  Battery, 
  Signal,
  Phone,
  Search,
  User,
  MoreHorizontal,
  ArrowLeft,
  Play
} from 'lucide-react';
import { AppId } from './types';

// App Components (to be created)
import HomeScreen from './apps/HomeScreen';
import AIChat from './apps/AIChat';
import Games from './apps/Games';
import VideoCall from './apps/VideoCall';
import Clock from './apps/Clock';
import Gallery from './apps/Gallery';
import Camera from './apps/Camera';
import StoreApp from './apps/StoreApp';
import PhoneApp from './apps/PhoneApp';
import BrowserApp from './apps/BrowserApp';

export default function App() {
  const [currentApp, setCurrentApp] = useState<AppId>('home');
  const [isLocked, setIsLocked] = useState(true);
  const [isPowerOff, setIsPowerOff] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const renderApp = () => {
    switch (currentApp) {
      case 'home': return <HomeScreen onOpenApp={setCurrentApp} />;
      case 'chat': return <AIChat />;
      case 'games': return <Games />;
      case 'video': return <VideoCall />;
      case 'clock': return <Clock />;
      case 'gallery': return <Gallery />;
      case 'youtube': return <YouTubeApp />;
      case 'camera': return <Camera onExit={() => setCurrentApp('home')} />;
      case 'store': return <StoreApp />;
      case 'phone': return <PhoneApp />;
      case 'browser': return <BrowserApp />;
      default: return <HomeScreen onOpenApp={setCurrentApp} />;
    }
  };

  if (isPowerOff) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <button 
          onClick={() => setIsPowerOff(false)}
          className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center text-white/50 hover:text-white transition-all active:scale-95"
        >
          Yoqish
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 font-sans selection:bg-neutral-700 selection:text-white">
      {/* Phone Case - Ultra Design (Extreme Glow) */}
      <div className="relative w-full max-w-[420px] h-[860px] bg-black rounded-[40px] border-[10px] border-neutral-800 shadow-[0_0_150px_rgba(59,130,246,0.3)] overflow-hidden flex flex-col outline outline-1 outline-white/20 transition-shadow hover:shadow-[0_0_200px_rgba(59,130,246,0.4)]">
        
        {/* Physical Power Button Mock - Long press for power off */}
        <button 
          onClick={() => isLocked ? setIsLocked(false) : setIsLocked(true)}
          onContextMenu={(e) => { e.preventDefault(); setIsPowerOff(true); }}
          className="absolute right-[-14px] top-40 w-1 h-20 bg-neutral-800 rounded-l-md z-[60] active:translate-x-[-1px] transition-transform" 
        />

        {/* Status Bar */}
        {!isLocked && (
          <div className="h-12 px-8 pt-4 flex justify-between items-center z-40">
            <span className="text-sm font-bold text-white">{format(time, 'HH:mm')}</span>
            <div className="flex items-center gap-2 text-white/90">
              <Signal size={14} />
              <Wifi size={14} />
              <Battery size={14} className="rotate-90" />
            </div>
          </div>
        )}

        {/* Screen Content */}
        <div className="flex-1 relative bg-neutral-950 overflow-hidden">
          <AnimatePresence mode="wait">
            {isLocked ? (
              <LockScreen key="lock" onUnlock={() => setIsLocked(false)} time={time} />
            ) : (
              <motion.div
                key={currentApp}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {renderApp()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Home Indicator */}
        {!isLocked && (
          <div className="h-10 flex items-center justify-center p-2 z-40 bg-transparent">
            <button 
              onClick={() => setCurrentApp('home')}
              className="w-32 h-1.5 bg-white/30 rounded-full hover:bg-white/50 transition-colors"
              aria-label="Home"
            />
          </div>
        )}

        {/* Volume Buttons Mock */}
        <div className="absolute right-[-14px] top-24 w-1 h-12 bg-neutral-800 rounded-l-md" />

        {/* Notch - Punch hole style for Ultra */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-50 border border-white/5" />
      </div>
    </div>
  );
}

function LockScreen({ onUnlock, time }: { onUnlock: () => void, time: Date }) {
  const [passcode, setPasscode] = useState('');
  const [showKeypad, setShowKeypad] = useState(false);
  const correctPasscode = '116677';

  useEffect(() => {
    if (passcode.length === correctPasscode.length) {
      if (passcode === correctPasscode) {
        onUnlock();
      } else {
        setPasscode(''); // Reset on wrong code
      }
    }
  }, [passcode, onUnlock]);

  const addDigit = (digit: string) => {
    if (passcode.length < correctPasscode.length) {
      setPasscode(prev => prev + digit);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: -800, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-black to-black flex flex-col items-center justify-between py-24 z-50 backdrop-blur-xl"
    >
      <div className="text-center z-10">
        <p className="text-white/60 text-lg uppercase tracking-[0.3em] font-light mb-4">Samsung Ultra 26</p>
        <h1 className="text-8xl font-thin text-white tracking-tight leading-none mb-4">
          {format(time, 'HH:mm')}
        </h1>
        <p className="text-white/80 text-xl font-light">
          {format(time, 'EEEE, d MMMM')}
        </p>
      </div>

      <div className="w-full px-12 z-10">
        {!showKeypad ? (
          <button 
            onClick={() => setShowKeypad(true)}
            className="w-full py-4 text-white/50 animate-pulse text-lg font-light tracking-wide flex flex-col items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
              <Signal size={20} className="animate-bounce" />
            </div>
            O'chirish uchun bosing
          </button>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="flex justify-center gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-3 h-3 rounded-full border border-white/50 transition-all ${i < passcode.length ? 'bg-white scale-125' : 'bg-transparent'}`} 
                />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-x-8 gap-y-6">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map((key, i) => (
                <button
                  key={i}
                  disabled={!key}
                  onClick={() => key === '⌫' ? setPasscode(p => p.slice(0, -1)) : addDigit(key)}
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-light transition-all active:scale-90 ${!key ? 'opacity-0' : 'bg-white/10 hover:bg-white/20 text-white border border-white/5 shadow-lg'}`}
                >
                  {key}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setShowKeypad(false)}
              className="w-full text-white/40 text-sm py-2"
            >
              Bekor qilish
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-around w-full px-12 opacity-50">
        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white">
          <Phone size={20} />
        </div>
        <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white">
          <Video size={20} />
        </div>
      </div>
    </motion.div>
  );
}

function YouTubeApp() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const categories = ['Hammasi', 'O\'yinlar', 'Futbol', 'Musiqa', 'Texnologiya', 'Jonli'];

  const videos = [
    { id: 1, title: "Samsung Galaxy S26 Ultra: Dunyodagi eng kuchli smartfon testi!", channel: "TechUz", views: "850K", time: "2 kun oldin", duration: "15:30" },
    { id: 2, title: "DLS 2026 Yangilanishi: Ronaldo 124, Messi 123!", channel: "GamePro", views: "1.2M", time: "5 soat oldin", duration: "10:45" },
    { id: 3, title: "FC Mobile 26: Pack Opening va Gameplay", channel: "FootballKing", views: "500K", time: "1 kun oldin", duration: "12:20" },
    { id: 4, title: "O'zbekistonda Texnologiya yangiliklari", channel: "ITCoz", views: "200K", time: "3 kun oldin", duration: "08:15" },
    { id: 5, title: "Ronaldo vs Messi: Oxirgi o'yin xulosasi", channel: "SportTV", views: "3M", time: "12 soat oldin", duration: "20:00" },
    { id: 6, title: "Roblox: O'g'rilik sarguzashtlari!", channel: "GamerBoy", views: "900K", time: "1 hafta oldin", duration: "45:30" }
  ];

  const filteredVideos = videos.filter(v => 
    v.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    v.channel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (activeVideo) {
    const video = videos.find(v => v.id === activeVideo);
    return (
      <div className="h-full bg-black flex flex-col pt-4 overflow-hidden animate-in fade-in">
        <div className="aspect-video bg-neutral-900 relative">
          <video 
            src="https://assets.mixkit.co/videos/preview/mixkit-soccer-ball-hitting-the-net-during-a-match-4357-large.mp4" 
            autoPlay 
            controls 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={() => setActiveVideo(null)}
            className="absolute top-4 left-4 bg-black/50 p-2 rounded-full text-white"
          >
            <ArrowLeft size={18} />
          </button>
        </div>
        <div className="p-4 flex-1 overflow-y-auto no-scrollbar">
          <h2 className="text-white font-bold text-lg mb-2">{video?.title}</h2>
          <p className="text-neutral-500 text-xs mb-4">{video?.views} ko'rish • {video?.time}</p>
          <div className="flex items-center gap-3 border-y border-white/5 py-4 mb-4">
             <div className="w-10 h-10 rounded-full bg-neutral-800" />
             <div className="flex-1">
               <p className="text-white text-sm font-bold">{video?.channel}</p>
               <p className="text-neutral-500 text-[10px]">1.5M obunachi</p>
             </div>
             <button className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-black">OBUNA BO'LISH</button>
          </div>
          <div className="space-y-4 pt-4">
            <p className="text-white text-xs font-bold uppercase opacity-50 tracking-widest">Tavsiya etiladi</p>
            {videos.filter(v => v.id !== activeVideo).map(v => (
              <div key={v.id} className="flex gap-3" onClick={() => setActiveVideo(v.id)}>
                <div className="w-32 h-20 bg-neutral-800 rounded-lg overflow-hidden shrink-0">
                  <img src={`https://picsum.photos/seed/yt_v_${v.id}/128/80`} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-[11px] font-bold line-clamp-2">{v.title}</h4>
                  <p className="text-neutral-500 text-[9px] mt-1">{v.channel} • {v.views}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-black flex flex-col pt-4">
      <div className="px-4 py-3 flex items-center justify-between border-b border-white/5">
        {!isSearching ? (
          <>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Play size={18} className="text-white fill-current translate-x-0.5" />
              </div>
              <span className="text-white font-black text-xl tracking-tighter">YouTube</span>
            </div>
            <div className="flex gap-4 text-white">
              <button onClick={() => setIsSearching(true)}><Search size={22} /></button>
              <User size={22} />
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3 w-full animate-in slide-in-from-right-4">
            <button onClick={() => { setIsSearching(false); setSearchQuery(''); }}><ArrowLeft size={18} className="text-white" /></button>
            <div className="flex-1 bg-white/10 rounded-full px-4 py-1.5 flex items-center gap-2 border border-white/5 shadow-inner">
               <Search size={14} className="text-neutral-500" />
               <input 
                 autoFocus
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Qidiruv..."
                 className="bg-transparent text-white text-sm outline-none w-full"
               />
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2 p-3 overflow-x-auto no-scrollbar whitespace-nowrap border-b border-white/5">
        {categories.map((cat, i) => (
          <button key={i} className={`px-4 py-1.5 rounded-full text-xs font-black transition-colors ${i === 0 ? 'bg-white text-black' : 'bg-white/10 text-white'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {filteredVideos.map((v) => (
          <div key={v.id} className="mb-6 cursor-pointer active:bg-white/5 transition-colors" onClick={() => setActiveVideo(v.id)}>
            <div className="aspect-video bg-neutral-800 relative group overflow-hidden">
              <img 
                src={`https://picsum.photos/seed/yt_thumb_${v.id}/800/450`} 
                alt="Video thumbnail"
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] text-white font-bold">{v.duration}</div>
            </div>
            <div className="p-3 flex gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-800 shrink-0 overflow-hidden border border-white/5 shadow-lg">
                <img src={`https://picsum.photos/seed/ch_avatar_${v.id}/40/40`} alt="Channel" />
              </div>
              <div className="flex-1">
                <h3 className="text-white text-[13px] font-bold leading-tight line-clamp-2">
                  {v.title}
                </h3>
                <p className="text-neutral-500 text-[10px] mt-1 font-medium">{v.channel} • {v.views} ko'rish • {v.time}</p>
              </div>
              <MoreHorizontal size={16} className="text-neutral-500" />
            </div>
          </div>
        ))}
        {filteredVideos.length === 0 && (
          <div className="text-center py-20 text-neutral-500 italic">Videolar topilmadi.</div>
        )}
      </div>
    </div>
  );
}


