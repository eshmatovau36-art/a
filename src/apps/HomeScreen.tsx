import { motion } from 'motion/react';
import { 
  MessageSquare, 
  Gamepad2, 
  Video, 
  Clock as ClockIcon, 
  Settings, 
  Image as ImageIcon,
  Chrome,
  Mail,
  Music,
  Map as MapIcon,
  Phone,
  Signal,
  Star,
  Zap,
  Target,
  Users,
  Play,
  Camera as CameraIcon,
  ShoppingBag
} from 'lucide-react';
import { AppId } from '../types';

interface AppIconProps {
  id: AppId;
  name: string;
  icon: React.ReactNode;
  color: string;
  onClick: (id: AppId) => void;
  index: number;
}

const AppIcon = ({ id, name, icon, color, onClick, index }: AppIconProps) => (
  <motion.button
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    onClick={() => onClick(id)}
    className="flex flex-col items-center gap-1.5 focus:outline-none group"
  >
    <div 
      className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center text-white shadow-lg transition-transform active:scale-90 group-hover:brightness-110`}
      style={{ backgroundColor: color }}
    >
      {icon}
    </div>
    <span className="text-[11px] text-white/90 font-medium">{name}</span>
  </motion.button>
);

export default function HomeScreen({ onOpenApp }: { onOpenApp: (id: AppId) => void }) {
  const baseApps = [
    { id: 'chat' as AppId, name: 'AI Chat', icon: <MessageSquare size={32} />, color: '#10a37f' },
    { id: 'games' as AppId, name: 'Games', icon: <Gamepad2 size={32} />, color: '#6366f1' },
    { id: 'video' as AppId, name: 'FaceTime', icon: <Video size={32} />, color: '#22c55e' },
    { id: 'camera' as AppId, name: 'Camera', icon: <CameraIcon size={32} />, color: '#1e293b' },
    { id: 'gallery' as AppId, name: 'Gallery', icon: <ImageIcon size={32} />, color: '#ec4899' },
    { id: 'store' as AppId, name: 'Store', icon: <ShoppingBag size={32} />, color: '#3b82f6' },
    { id: 'youtube' as AppId, name: 'YouTube', icon: <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center"><div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[8px] border-l-white border-b-[4px] border-b-transparent ml-1" /></div>, color: '#ff0000' },
    { id: 'clock' as AppId, name: 'Clock', icon: <ClockIcon size={32} />, color: '#f59e0b' },
    { id: 'settings' as AppId, name: 'Settings', icon: <Settings size={32} />, color: '#94a3b8' },
    { id: 'browser' as AppId, name: 'Browser', icon: <Chrome size={32} />, color: '#3b82f6' },
  ];

  // Specific football games (10 items)
  const footballGames = [
    { id: 'games' as AppId, name: 'DLS 26', icon: <div className="p-1"><img src="https://api.dicebear.com/7.x/shapes/svg?seed=dls" className="w-full h-full" alt="" /></div>, color: '#1e3a8a' },
    { id: 'games' as AppId, name: 'FC Mobile', icon: <div className="p-1"><img src="https://api.dicebear.com/7.x/shapes/svg?seed=soccer" className="w-full h-full" alt="" /></div>, color: '#115e59' },
    { id: 'games' as AppId, name: 'PES 2026', icon: <div className="p-1"><Zap size={28} /></div>, color: '#b91c1c' },
    { id: 'games' as AppId, name: 'FIFA Hub', icon: <div className="p-1 font-black text-xl italic">FIFA</div>, color: '#1e40af' },
    { id: 'games' as AppId, name: 'Street FK', icon: <div className="p-1"><Target size={28} /></div>, color: '#7c3aed' },
    { id: 'games' as AppId, name: 'Top Eleven', icon: <div className="p-1 font-black text-xs">MANAGER</div>, color: '#065f46' },
    { id: 'games' as AppId, name: 'Score Hero', icon: <div className="p-1"><Star size={24} fill="currentColor" /></div>, color: '#ea580c' },
    { id: 'games' as AppId, name: 'Head Ball', icon: <div className="p-1"><Users size={28} /></div>, color: '#4d7c0f' },
    { id: 'games' as AppId, name: 'Kick Off', icon: <div className="p-1 font-serif text-2xl">KO</div>, color: '#1e293b' },
    { id: 'games' as AppId, name: 'Pro Soccer', icon: <div className="p-1"><Play size={24} /></div>, color: '#0ea5e9' },
  ];

  // Other specific games
  const otherSpecificGames = [
    { id: 'games' as AppId, name: 'Racing', icon: <div className="p-1 text-white"><Gamepad2 size={28} /></div>, color: '#b91c1c' },
    { id: 'games' as AppId, name: 'Roblox', icon: <div className="p-2 pt-3"><div className="w-8 h-8 bg-white rotate-45 flex items-center justify-center"><div className="w-3 h-3 bg-neutral-900" /></div></div>, color: '#000000' },
    { id: 'games' as AppId, name: 'Tom', icon: <div className="p-1"><img src="https://api.dicebear.com/7.x/bottts/svg?seed=tom" className="w-full h-full" alt="" /></div>, color: '#fb923c' },
    { id: 'games' as AppId, name: 'CS:GO', icon: <div className="p-1"><Signal size={28} className="rotate-180" /></div>, color: '#1e293b' },
  ];

  // Generate game apps
  const gameApps = [...footballGames, ...otherSpecificGames];

  // Generate remaining apps to reach 100+ total
  const otherApps = Array.from({ length: 75 }).map((_, i) => ({
    id: 'home' as AppId,
    name: `App ${i + 1}`,
    icon: <ImageIcon size={24} className="opacity-50" />,
    color: `hsl(${i * 5}, 40%, 30%)`
  }));

  const allApps = [...baseApps, ...gameApps, ...otherApps];

  return (
    <div className="h-full w-full bg-gradient-to-br from-neutral-900 to-black overflow-y-auto no-scrollbar pb-32">
      <div className="px-6 pt-12 grid grid-cols-4 gap-x-4 gap-y-8">
        {allApps.map((app, i) => (
          <AppIcon 
            key={`${app.id}-${i}`} 
            {...app} 
            index={i % 20} 
            onClick={onOpenApp} 
          />
        ))}
      </div>

      {/* Dock */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] h-24 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] flex items-center justify-around px-2 shadow-2xl border border-white/5 z-50">
        <button 
          onClick={() => onOpenApp('phone')}
          className="p-4 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg active:scale-95 transition-transform"
        >
          <Phone size={28} />
        </button>
        <button 
          onClick={() => onOpenApp('chat')}
          className="p-4 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg active:scale-95 transition-transform"
        >
          <MessageSquare size={28} />
        </button>
        <button 
          onClick={() => onOpenApp('browser')}
          className="p-4 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-300 text-neutral-800 shadow-lg active:scale-95 transition-transform"
        >
          <Chrome size={28} />
        </button>
        <button 
          onClick={() => onOpenApp('camera')}
          className="p-4 rounded-2xl bg-gradient-to-br from-neutral-700 to-neutral-900 text-white shadow-lg active:scale-95 transition-transform"
        >
          <CameraIcon size={28} />
        </button>
      </div>
    </div>
  );
}
