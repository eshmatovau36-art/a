import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Download, 
  Search, 
  Star, 
  ArrowLeft,
  CheckCircle2,
  Gamepad2,
  Play,
  Music,
  Video
} from 'lucide-react';

interface AppItem {
  id: string;
  name: string;
  category: string;
  rating: number;
  size: string;
  icon: any;
  color: string;
}

export default function StoreApp() {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [installed, setInstalled] = useState<string[]>(['WhatsApp', 'Instagram', 'Telegram']);
  const [activeApp, setActiveApp] = useState<AppItem | null>(null);

  const apps: AppItem[] = [
    { id: '1', name: 'FC Mobile 26', category: 'O\'yinlar', rating: 4.8, size: '1.2 GB', icon: <Gamepad2 size={24}/>, color: 'bg-emerald-600' },
    { id: '2', name: 'DLS 26', category: 'O\'yinlar', rating: 4.7, size: '500 MB', icon: <Play size={24}/>, color: 'bg-blue-600' },
    { id: '3', name: 'Roblox', category: 'O\'yinlar', rating: 4.5, size: '200 MB', icon: <Star size={24}/>, color: 'bg-red-500' },
    { id: '4', name: 'Spotify', category: 'Musiqa', rating: 4.9, size: '80 MB', icon: <Music size={24}/>, color: 'bg-green-500' },
    { id: '5', name: 'TikTok', category: 'Video', rating: 4.4, size: '120 MB', icon: <Video size={24}/>, color: 'bg-neutral-900' },
    { id: '6', name: 'PUBG Mobile', category: 'O\'yinlar', rating: 4.6, size: '2.5 GB', icon: <Gamepad2 size={24}/>, color: 'bg-yellow-700' },
  ];

  const handleDownload = (name: string) => {
    setDownloading(name);
    setTimeout(() => {
      setInstalled(prev => [...prev, name]);
      setDownloading(null);
    }, 3000);
  };

  if (activeApp) {
    return (
      <div className="h-full bg-neutral-950 flex flex-col pt-12 animate-in fade-in slide-in-from-right-4">
        <header className="px-6 flex items-center justify-between mb-8">
           <button onClick={() => setActiveApp(null)} className="p-2 bg-white/5 rounded-full"><ArrowLeft size={20} className="text-white"/></button>
           <CheckCircle2 size={24} className="text-blue-500" />
        </header>

        <div className="px-8 flex items-center gap-6 mb-10">
           <div className={`w-28 h-28 ${activeApp.color} rounded-3xl flex items-center justify-center text-white shadow-2xl`}>
              {activeApp.icon}
           </div>
           <div>
              <h2 className="text-2xl font-black text-white leading-tight">{activeApp.name}</h2>
              <p className="text-blue-500 font-bold text-sm">{activeApp.category}</p>
              <div className="flex items-center gap-1 mt-2">
                 <Star size={14} className="fill-yellow-400 text-yellow-400" />
                 <span className="text-white text-xs font-bold">{activeApp.rating}</span>
              </div>
           </div>
        </div>

        <div className="px-8 flex gap-4 text-center border-y border-white/5 py-4 mb-10">
           <div className="flex-1">
              <p className="text-neutral-500 text-[10px] uppercase font-black mb-1">Hajmi</p>
              <p className="text-white font-bold">{activeApp.size}</p>
           </div>
           <div className="w-px bg-white/5 h-8 mt-2" />
           <div className="flex-1">
              <p className="text-neutral-500 text-[10px] uppercase font-black mb-1">Yosh</p>
              <p className="text-white font-bold">12+</p>
           </div>
        </div>

        <div className="px-8">
          {installed.includes(activeApp.name) ? (
            <button className="w-full bg-neutral-800 h-14 rounded-2xl text-white font-black text-sm tracking-widest shadow-lg">OCHISH</button>
          ) : downloading === activeApp.name ? (
            <div className="w-full h-14 bg-blue-600/20 rounded-2xl relative overflow-hidden flex items-center justify-center">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: '100%' }}
                 transition={{ duration: 3 }}
                 className="absolute inset-0 bg-blue-600"
               />
               <span className="relative z-10 text-white font-black text-xs tracking-widest">YUKLANMOQDA...</span>
            </div>
          ) : (
            <button 
              onClick={() => handleDownload(activeApp.name)}
              className="w-full bg-blue-600 h-14 rounded-2xl text-white font-black text-sm tracking-widest shadow-xl active:scale-95 transition-transform"
            >
              YUKLAB OLISH
            </button>
          )}
        </div>

        <div className="p-8 mt-4">
           <h3 className="text-white font-bold mb-2">Tavsif</h3>
           <p className="text-neutral-500 text-sm leading-relaxed">
             Bu ilova sizga ajoyib tajriba taqdim etadi. Eng so'nggi yangilanishlar va qulay interfeys bilan doimo bir qadam oldinda bo'ling.
           </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-neutral-950 flex flex-col pt-12 text-white">
      <header className="px-6 flex items-center justify-between mb-6">
        <h1 className="text-3xl font-black italic tracking-tighter">GALAXY STORE</h1>
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
           <ShoppingBag size={20} />
        </div>
      </header>

      <div className="px-6 mb-8">
         <div className="bg-white/5 rounded-2xl h-12 flex items-center px-4 gap-3 border border-white/5 shadow-inner">
            <Search size={18} className="text-neutral-500" />
            <input type="text" placeholder="Ilova yoki o'yin qidirish" className="bg-transparent flex-1 text-sm outline-none font-medium" />
         </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 no-scrollbar pb-24">
         <section className="mb-10">
            <h2 className="text-sm font-black text-neutral-500 uppercase tracking-[0.2em] mb-6">Eng mashhur o'yinlar</h2>
            <div className="grid grid-cols-2 gap-4">
               {apps.slice(0, 4).map(app => (
                 <motion.div 
                    whileTap={{ scale: 0.95 }}
                    key={app.id} 
                    onClick={() => setActiveApp(app)}
                    className="flex flex-col gap-3 group"
                 >
                    <div className={`aspect-square ${app.color} rounded-[2.5rem] flex items-center justify-center text-white shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300`}>
                       {app.icon}
                    </div>
                    <div>
                       <p className="text-[13px] font-black leading-none mb-1">{app.name}</p>
                       <p className="text-[10px] text-neutral-500 font-bold uppercase">{app.category}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
         </section>

         <section>
            <h2 className="text-sm font-black text-neutral-500 uppercase tracking-[0.2em] mb-6">Sizga yoqishi mumkin</h2>
            <div className="space-y-6">
               {apps.slice(4).map(app => (
                 <div onClick={() => setActiveApp(app)} key={app.id} className="flex items-center gap-4 active:bg-white/5 p-2 rounded-2xl transition-colors">
                    <div className={`w-16 h-16 ${app.color} rounded-2xl flex items-center justify-center text-white shrink-0`}>
                       {app.icon}
                    </div>
                    <div className="flex-1">
                       <p className="text-sm font-black mb-0.5">{app.name}</p>
                       <div className="flex items-center gap-1">
                          <Star size={10} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-[10px] text-neutral-400 font-bold">{app.rating}</span>
                       </div>
                    </div>
                    <button className="bg-neutral-800 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-500">Olish</button>
                 </div>
               ))}
            </div>
         </section>
      </div>
    </div>
  );
}
