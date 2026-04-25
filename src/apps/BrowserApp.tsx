import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Globe, ChevronLeft, ChevronRight, RotateCcw, Share, Plus } from 'lucide-react';

export default function BrowserApp() {
  const [url, setUrl] = useState('google.com');
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSearchResults(['FC Mobile 26 Download', 'PUBG Mobile APK', 'Instagram for Samsung', 'Minecraft Free']);
    }, 800);
  };

  return (
    <div className="h-full bg-[#f2f2f7] flex flex-col pt-12 overflow-hidden text-black font-sans">
      {/* Header / Address Bar */}
      <div className="px-4 pb-3 flex flex-col gap-3">
        <div className="flex items-center justify-between">
           <div className="flex gap-6 text-blue-500">
              <ChevronLeft size={24} className={url === 'google.com' && searchResults.length === 0 ? 'opacity-30' : ''} onClick={() => { setSearchResults([]); setUrl('google.com'); }} />
              <ChevronRight size={24} className="opacity-30" />
           </div>
           <div className="bg-white/90 backdrop-blur-xl rounded-full flex-1 mx-4 h-11 flex items-center px-4 gap-2 shadow-sm border border-black/5">
              <Globe size={14} className="text-neutral-400" />
              <form onSubmit={handleSearch} className="flex-1">
                <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-transparent w-full text-[15px] outline-none"
                />
              </form>
              <RotateCcw size={14} className="text-neutral-400" onClick={() => handleSearch({ preventDefault: () => {} } as any)} />
           </div>
           <Share size={20} className="text-blue-500" />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white mx-2 mt-1 rounded-t-2xl shadow-xl overflow-hidden relative">
        {loading ? (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
             <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="h-full overflow-y-auto p-6">
            {searchResults.length > 0 ? (
              <div className="pt-4 space-y-6">
                {searchResults.map((res, i) => (
                  <div key={i} className="border-b border-black/5 pb-4">
                    <p className="text-[10px] text-neutral-500 mb-1">https://galaxy-store.com/apps/{res.replace(/\s+/g, '-').toLowerCase()}</p>
                    <h3 className="text-blue-600 font-bold text-lg mb-2">{res}</h3>
                    <p className="text-sm text-neutral-600 line-clamp-2 mb-3">Eng so'nggi versiyani yuklab oling va ajoyib o'yin tajribasidan bahramand bo'ling.</p>
                    <button 
                      onClick={() => alert("Store ilovasiga yo'naltirilmoqda...")}
                      className="bg-blue-500 text-white px-4 py-1.5 rounded-full text-xs font-bold"
                    >
                      YUKLAB OLISH
                    </button>
                  </div>
                ))}
              </div>
            ) : url.includes('google') ? (
              <div className="flex flex-col items-center pt-20">
                <h1 className="text-6xl font-black mb-8">
                  <span className="text-blue-500">G</span>
                  <span className="text-red-500">o</span>
                  <span className="text-yellow-500">o</span>
                  <span className="text-blue-500">g</span>
                  <span className="text-green-500">l</span>
                  <span className="text-red-500">e</span>
                </h1>
                <div className="w-full max-w-md bg-white border border-black/10 rounded-full h-12 shadow-lg flex items-center px-4 gap-3 mb-10">
                  <Search size={18} className="text-neutral-400" />
                  <input type="text" placeholder="Search Google or type a URL" className="flex-1 outline-none text-sm" />
                </div>
                <div className="grid grid-cols-4 gap-6 w-full">
                  {['YouTube', 'News', 'Maps', 'Translate'].map(item => (
                    <div key={item} className="flex flex-col items-center gap-2">
                       <div className="w-14 h-14 bg-neutral-100 rounded-2xl flex items-center justify-center text-neutral-500 shadow-sm">
                          <Plus size={24} />
                       </div>
                       <span className="text-[10px] font-bold text-neutral-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="pt-10">
                <h2 className="text-2xl font-bold mb-4">{url}</h2>
                <div className="space-y-4">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="h-32 bg-neutral-100 rounded-xl animate-pulse" />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Tabs Bar */}
      <div className="h-20 bg-[#f2f2f7]/90 backdrop-blur-xl border-t border-black/5 flex items-center justify-between px-10 pb-4">
         <Plus size={24} className="text-blue-500" />
         <div className="w-10 h-10 border-2 border-blue-500 rounded-lg flex items-center justify-center text-blue-500 font-bold text-xs">
           1
         </div>
      </div>
    </div>
  );
}
