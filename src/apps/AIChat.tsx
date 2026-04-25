import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Trash2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

export default function AIChat() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: "Salom! Men sizning virtual yordamchingizman. Sizga qanday yordam bera olaman?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
            { role: 'user', parts: [{ text: userMsg }] }
        ],
        config: {
          systemInstruction: "Siz o'zbek tilida gaplashadigan aqlli yordamchisiz. Javoblaringiz qisqa va qiziqarli bo'lsin.",
        }
      });

      const aiText = response.text || "Kechirasiz, javob bera olmadim.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-900">
      <div className="p-4 pt-4 bg-neutral-800 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
            <Bot size={24} />
          </div>
          <div>
            <h1 className="text-white font-bold text-sm">Smart AI</h1>
            <p className="text-xs text-white/50">Online</p>
          </div>
        </div>
        <button 
          onClick={() => setMessages([{ role: 'assistant', content: "Salom! Sizga qanday yordam bera olaman?" }])}
          className="text-white/30 hover:text-white/60 p-2"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar"
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] rounded-2xl p-3 text-sm flex gap-2 ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-br-none' 
                  : 'bg-neutral-800 text-neutral-100 rounded-bl-none'
              }`}
            >
              <div className="mt-1 flex-shrink-0">
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className="prose prose-invert max-w-none">
                <Markdown>{msg.content}</Markdown>
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-neutral-800 text-neutral-100 rounded-2xl rounded-bl-none p-3 px-4 flex gap-1">
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-neutral-900 border-t border-white/5">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Xabar yozing..."
            className="flex-1 bg-neutral-800 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button 
            onClick={handleSend}
            disabled={isTyping}
            className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white disabled:opacity-50 active:scale-95 transition-transform"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
