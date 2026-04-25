import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PhoneOff, Mic, MicOff, Video, VideoOff, MoreHorizontal, User } from 'lucide-react';

export default function VideoCall() {
  const [isCalling, setIsCalling] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Kameraga ruxsat berilmadi:", err);
        setIsCalling(false);
      }
    }
    setupCamera();

    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  useEffect(() => {
    if (stream) {
      stream.getAudioTracks().forEach(track => track.enabled = !isMuted);
      stream.getVideoTracks().forEach(track => track.enabled = !videoOff);
    }
  }, [isMuted, videoOff, stream]);

  return (
    <div className="h-full bg-black relative overflow-hidden">
      {/* Remote Video (Mock) */}
      <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center">
        <AnimatePresence>
          {!isCalling && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="w-32 h-32 rounded-full bg-neutral-800 flex items-center justify-center mb-4 mx-auto border-2 border-white/10">
                <User size={64} className="text-white/20" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Dostingiz</h2>
              <p className="text-neutral-500">Video chaqiruv yakunlandi</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {isCalling && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-t from-black/60 to-transparent">
             <motion.div 
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-40 h-40 rounded-full bg-neutral-800 flex items-center justify-center mb-8 border-4 border-emerald-500/30"
            >
              <User size={80} className="text-white/40" />
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Dostingiz</h2>
            <p className="text-emerald-400 text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Chaqirilmoqda...
            </p>
          </div>
        )}
      </div>

      {/* Local Video Preview (Picture in Picture) */}
      <motion.div 
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        className="absolute top-12 right-4 w-32 h-44 bg-neutral-800 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl z-20"
      >
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-full h-full object-cover transform scale-x-[-1]"
        />
        {videoOff && (
          <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center">
            <VideoOff size={24} className="text-white/40" />
          </div>
        )}
      </motion.div>

      {/* Call Controls */}
      <div className="absolute bottom-12 left-0 w-full px-6 z-30">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/10 backdrop-blur-3xl rounded-[2.5rem] p-6 flex items-center justify-around shadow-2xl border border-white/5"
        >
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${isMuted ? 'bg-white text-black' : 'bg-white/10 text-white'}`}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          
          <button 
            onClick={() => setIsCalling(!isCalling)}
            className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 active:scale-90 transition-all shadow-lg"
          >
            <PhoneOff size={28} />
          </button>

          <button 
            onClick={() => setVideoOff(!videoOff)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${videoOff ? 'bg-white text-black' : 'bg-white/10 text-white'}`}
          >
            {videoOff ? <VideoOff size={24} /> : <Video size={24} />}
          </button>

          <button className="w-14 h-14 rounded-full bg-white/10 text-white flex items-center justify-center">
            <MoreHorizontal size={24} />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
