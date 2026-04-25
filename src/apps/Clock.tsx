import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RotateCcw, Clock as ClockIcon, Timer, Globe } from 'lucide-react';
import { format } from 'date-fns';

export default function Clock() {
  const [time, setTime] = useState(new Date());
  const [mode, setMode] = useState<'clock' | 'stopwatch'>('clock');
  
  // Stopwatch state
  const [isRunning, setIsRunning] = useState(false);
  const [stopwatchTime, setStopwatchTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setStopwatchTime(prev => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatStopwatch = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full bg-black flex flex-col p-6 text-white font-sans">
      <div className="flex justify-center gap-8 mb-12 bg-neutral-900/50 p-1 rounded-2xl w-fit mx-auto border border-white/5">
        <button 
          onClick={() => setMode('clock')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${mode === 'clock' ? 'bg-orange-500 text-white' : 'text-zinc-500'}`}
        >
          World Clock
        </button>
        <button 
          onClick={() => setMode('stopwatch')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${mode === 'stopwatch' ? 'bg-orange-500 text-white' : 'text-zinc-500'}`}
        >
          Stopwatch
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {mode === 'clock' ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="relative mb-8">
              {/* Analog Clock Mock */}
              <div className="w-64 h-64 rounded-full border-2 border-white/10 flex items-center justify-center relative">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="absolute w-1 h-3 bg-white/20 rounded-full"
                    style={{ 
                      transform: `rotate(${i * 30}deg) translateY(-115px)` 
                    }}
                  />
                ))}
                {/* Hands */}
                <div 
                  className="absolute w-1 h-20 bg-white rounded-full origin-bottom"
                  style={{ transform: `rotate(${(time.getHours() % 12) * 30 + time.getMinutes() * 0.5}deg) translateY(-40px)` }}
                />
                <div 
                  className="absolute w-1 h-28 bg-white/60 rounded-full origin-bottom"
                  style={{ transform: `rotate(${time.getMinutes() * 6}deg) translateY(-54px)` }}
                />
                <div 
                  className="absolute w-0.5 h-32 bg-orange-500 rounded-full origin-bottom"
                  style={{ transform: `rotate(${time.getSeconds() * 6}deg) translateY(-64px)` }}
                />
                <div className="w-3 h-3 bg-orange-500 rounded-full z-10" />
              </div>
            </div>
            
            <h1 className="text-7xl font-light tracking-tight mb-2">
              {format(time, 'HH:mm')}
            </h1>
            <p className="text-orange-500 font-mono text-xl">
              {format(time, 'ss')}
            </p>
            <p className="text-zinc-500 mt-4 uppercase tracking-[0.2em] text-xs">
              {format(time, 'EEEE, d MMMM')}
            </p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center w-full"
          >
            <div className="text-8xl font-mono tracking-tighter mb-12 tabular-nums">
              {formatStopwatch(stopwatchTime)}
            </div>

            <div className="flex justify-center gap-12">
              <button 
                onClick={() => {
                   setStopwatchTime(0);
                   setIsRunning(false);
                }}
                className="w-20 h-20 rounded-full bg-neutral-800 text-white flex items-center justify-center active:bg-neutral-700 transition-colors shadow-lg"
              >
                <RotateCcw size={32} />
              </button>
              
              <button 
                onClick={() => setIsRunning(!isRunning)}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-xl active:scale-95 ${isRunning ? 'bg-red-500/20 text-red-500 border-2 border-red-500/30' : 'bg-green-500/20 text-green-500 border-2 border-green-500/30'}`}
              >
                {isRunning ? <Pause size={48} /> : <Play size={48} className="ml-1" />}
              </button>

              <div className="w-20 h-20 rounded-full flex items-center justify-center text-zinc-600">
                <Timer size={32} />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Tabs */}
      <div className="mt-auto grid grid-cols-4 gap-4 pt-4 border-t border-white/5">
        <button className="flex flex-col items-center gap-1 text-orange-500">
          <Globe size={20} />
          <span className="text-[10px]">World Clock</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-500">
          <ClockIcon size={20} />
          <span className="text-[10px]">Alarm</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-500">
          <Timer size={20} />
          <span className="text-[10px]">Stopwatch</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-500">
          <Timer size={20} className="rotate-180" />
          <span className="text-[10px]">Timer</span>
        </button>
      </div>
    </div>
  );
}
