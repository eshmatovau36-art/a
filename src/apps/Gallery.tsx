import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Grid, Heart, Search, ChevronLeft, Share, Trash2 } from 'lucide-react';

const PHOTOS = [
  { id: 1, url: 'https://picsum.photos/seed/tech1/800/1200', title: 'Futuristic Tech' },
  { id: 2, url: 'https://picsum.photos/seed/nature1/800/1200', title: 'Mountain Lake' },
  { id: 3, url: 'https://picsum.photos/seed/city1/800/1200', title: 'Neon City' },
  { id: 4, url: 'https://picsum.photos/seed/space1/800/1200', title: 'Galaxy Dream' },
  { id: 5, url: 'https://picsum.photos/seed/abstract1/800/1200', title: 'Color Burst' },
  { id: 6, url: 'https://picsum.photos/seed/minimal1/800/1200', title: 'Desert Solitude' },
  { id: 7, url: 'https://picsum.photos/seed/code1/800/1200', title: 'Digital World' },
  { id: 8, url: 'https://picsum.photos/seed/sunset1/800/1200', title: 'Golden Hour' },
  { id: 9, url: 'https://picsum.photos/seed/macro1/800/1200', title: 'Lush Green' },
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const photo = PHOTOS.find(p => p.id === selectedPhoto);

  return (
    <div className="h-full bg-black text-white flex flex-col">
      <div className="p-4 pt-12 flex justify-between items-center bg-black/80 backdrop-blur-md sticky top-0 z-10">
        <h1 className="text-2xl font-bold">Library</h1>
        <div className="flex gap-4">
          <Search size={20} className="text-zinc-500" />
          <Grid size={20} className="text-blue-500" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-1 grid grid-cols-3 gap-1 no-scrollbar pb-20">
        {PHOTOS.map((p) => (
          <motion.button
            key={p.id}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedPhoto(p.id)}
            className="aspect-square overflow-hidden bg-zinc-900 group relative"
          >
            <img 
              src={p.url} 
              alt={p.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Heart size={14} className="text-white drop-shadow-md" />
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedPhoto && photo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
          >
            <div className="p-4 pt-12 flex justify-between items-center">
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="flex items-center gap-1 text-blue-500 px-2 py-1 rounded-full bg-white/5 active:scale-95 transition-transform"
              >
                <ChevronLeft size={24} />
                <span>Photos</span>
              </button>
              <div className="flex gap-6">
                <Share size={20} className="text-blue-500" />
                <Heart size={20} className="text-blue-500" />
                <Trash2 size={20} className="text-blue-500" />
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
              <img 
                src={photo.url} 
                alt={photo.title}
                className="max-w-full max-h-full rounded-xl shadow-2xl object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-8 text-center bg-gradient-to-t from-black to-transparent">
              <h2 className="text-xl font-medium mb-1">{photo.title}</h2>
              <p className="text-zinc-500 text-sm">Shot on Smart Phone • 12MP</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-4 pb-8 flex justify-around bg-black/80 backdrop-blur-md border-t border-white/5 sticky bottom-0">
        <button className="flex flex-col items-center gap-1 text-blue-500">
          <Grid size={20} />
          <span className="text-[10px]">Library</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-500">
          <Heart size={20} />
          <span className="text-[10px]">For You</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-500">
          <Grid size={20} className="rotate-45" />
          <span className="text-[10px]">Albums</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-zinc-500">
          <Search size={20} />
          <span className="text-[10px]">Search</span>
        </button>
      </div>
    </div>
  );
}
