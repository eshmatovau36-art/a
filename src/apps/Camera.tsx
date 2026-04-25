import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera as CameraIcon, RefreshCw, X, Circle, Image as ImageIcon } from 'lucide-react';

export default function Camera({ onExit }: { onExit: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [lastPhoto, setLastPhoto] = useState<string | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (err) {
        console.error("Camera error:", err);
        setError("Kameraga ruxsat berilmadi.");
      }
    }
    startCamera();
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const takePhoto = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 100);
    
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      setLastPhoto(canvas.toDataURL('image/png'));
    }
  };

  return (
    <div className="h-full bg-black flex flex-col relative overflow-hidden">
      {/* Viewfinder */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {error ? (
          <div className="text-white text-center p-6 bg-red-950/20 rounded-2xl border border-red-500/20">
            <CameraIcon size={48} className="mx-auto mb-4 opacity-50" />
            <p className="font-bold text-lg mb-2">Xatolik</p>
            <p className="text-sm opacity-70">{error}</p>
          </div>
        ) : (
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover scale-x-[-1]"
          />
        )}
        
        <AnimatePresence>
          {isFlashing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white z-50 px-4"
            />
          )}
        </AnimatePresence>

        {/* Framing marks */}
        <div className="absolute inset-0 border-[40px] border-black/20 pointer-events-none" />
      </div>

      {/* Controls */}
      <div className="h-40 bg-black flex items-center justify-around px-8">
        <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center overflow-hidden border border-white/5">
          {lastPhoto ? <img src={lastPhoto} className="w-full h-full object-cover" /> : <ImageIcon className="text-white/20" />}
        </div>
        
        <button 
          onClick={takePhoto}
          disabled={!!error}
          className="w-20 h-20 bg-white rounded-full flex items-center justify-center active:scale-90 transition-transform disabled:opacity-30"
        >
          <div className="w-[72px] h-[72px] border-4 border-black rounded-full" />
        </button>

        <button 
          onClick={onExit}
          className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}
