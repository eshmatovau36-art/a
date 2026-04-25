import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, PhoneOff, Mic, Video, Volume2, Grid, User, History, Star, Search, Plus } from 'lucide-react';

export default function PhoneApp() {
  const [dialing, setDialing] = useState<string | null>(null);
  const [digits, setDigits] = useState('');
  const [view, setView] = useState<'keypad' | 'recent' | 'contacts'>('keypad');

  const contacts = [
    { name: 'Onam ❤️', number: '+998 90 123 45 67' },
    { name: 'Dadam', number: '+998 93 987 65 43' },
    { name: 'Uka', number: '+998 94 555 11 22' },
    { name: 'Best Friend', number: '+998 91 000 00 00' },
  ];

  const handleCall = (num: string) => {
    setDialing(num);
  };

  if (dialing) {
    return (
      <div className="h-full bg-neutral-900 flex flex-col items-center pt-24 text-white animate-in fade-in zoom-in-95">
         <div className="w-24 h-24 bg-neutral-800 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-2xl">
            <User size={48} className="text-neutral-500" />
         </div>
         <h2 className="text-3xl font-bold mb-2">{contacts.find(c => c.number === dialing)?.name || dialing}</h2>
         <p className="text-neutral-500 font-medium mb-12 tracking-widest">QO'NG'IROQ QILINMOQDA...</p>

         <div className="grid grid-cols-3 gap-x-8 gap-y-12 mb-20 px-10">
            <div className="flex flex-col items-center gap-2">
               <button className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center active:bg-white/20"><Mic size={24}/></button>
               <span className="text-[10px] font-bold">Mute</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <button className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center active:bg-white/20"><Grid size={24}/></button>
               <span className="text-[10px] font-bold">Keypad</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <button className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center active:bg-white/20"><Volume2 size={24}/></button>
               <span className="text-[10px] font-bold">Speaker</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <button className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center active:bg-white/20"><Plus size={24}/></button>
               <span className="text-[10px] font-bold">Add call</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <button className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center active:bg-white/20"><Video size={24}/></button>
               <span className="text-[10px] font-bold">FaceTime</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <button className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center active:bg-white/20"><User size={24}/></button>
               <span className="text-[10px] font-bold">Contacts</span>
            </div>
         </div>

         <button 
           onClick={() => setDialing(null)}
           className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-red-500/20 shadow-2xl active:scale-95 transition-transform"
         >
           <PhoneOff size={32} />
         </button>
      </div>
    );
  }

  return (
    <div className="h-full bg-black flex flex-col pt-12 text-white">
      <div className="flex-1 overflow-y-auto px-6 h-full flex flex-col">
         {view === 'keypad' && (
           <div className="flex-1 flex flex-col pt-10">
              <div className="h-20 flex items-center justify-center mb-10 overflow-hidden">
                 <span className="text-4xl font-light tracking-widest">{digits}</span>
              </div>
              <div className="grid grid-cols-3 gap-x-10 gap-y-6 px-10">
                 {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map((k) => (
                   <button 
                     key={k.toString()}
                     onClick={() => setDigits(prev => prev + k)}
                     className="w-16 h-16 bg-white/10 rounded-full text-3xl font-medium active:bg-white/20 hover:bg-white/15 transition-colors"
                   >
                     {k}
                   </button>
                 ))}
              </div>
              <div className="mt-16 flex items-center justify-center">
                 <button 
                    onClick={() => handleCall(digits)}
                    className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-emerald-500/20 shadow-2xl active:scale-95 transition-transform"
                 >
                    <Phone size={32} />
                 </button>
                 {digits.length > 0 && (
                   <button onClick={() => setDigits(prev => prev.slice(0, -1))} className="absolute right-10 text-neutral-500 text-sm font-black uppercase tracking-widest">Delete</button>
                 )}
              </div>
           </div>
         )}

         {view === 'contacts' && (
           <div className="pt-4 flex flex-col h-full animate-in fade-in slide-in-from-bottom-2">
              <h1 className="text-3xl font-black mb-6">Kontaktlar</h1>
              <div className="bg-white/10 rounded-2xl h-10 flex items-center px-4 gap-2 mb-8">
                 <Search size={16} className="text-neutral-500"/>
                 <input type="text" placeholder="Qidiruv" className="bg-transparent text-sm outline-none w-full" />
              </div>
              <div className="space-y-6">
                 {contacts.map(c => (
                   <div key={c.number} onClick={() => handleCall(c.number)} className="border-b border-white/5 pb-4 last:border-0 flex items-center justify-between">
                      <div>
                         <p className="text-lg font-bold">{c.name}</p>
                         <p className="text-sm text-neutral-500">{c.number}</p>
                      </div>
                      <Phone size={20} className="text-emerald-500" />
                   </div>
                 ))}
              </div>
           </div>
         )}
      </div>

      <div className="h-24 bg-neutral-900/50 backdrop-blur-xl border-t border-white/5 flex items-center justify-between px-10 pb-6">
         <button onClick={() => setView('recent')} className={`flex flex-col items-center gap-1 ${view === 'recent' ? 'text-blue-500' : 'text-neutral-500'}`}>
            <History size={20} />
            <span className="text-[10px] font-bold">Recent</span>
         </button>
         <button onClick={() => setView('contacts')} className={`flex flex-col items-center gap-1 ${view === 'contacts' ? 'text-blue-500' : 'text-neutral-500'}`}>
            <User size={20} />
            <span className="text-[10px] font-bold">Contacts</span>
         </button>
         <button onClick={() => setView('keypad')} className={`flex flex-col items-center gap-1 ${view === 'keypad' ? 'text-blue-500' : 'text-neutral-500'}`}>
            <Grid size={20} />
            <span className="text-[10px] font-bold">Keypad</span>
         </button>
      </div>
    </div>
  );
}
