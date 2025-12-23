
import React, { useState, useRef, useEffect } from 'react';
import { getSmartAdvisorResponse, getFastAdvisorResponse } from '../services/gemini';

interface Message {
  role: 'user' | 'assistant' | 'human-expert';
  content: string;
  type?: 'fast' | 'thinking';
}

const ChatSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [supportMode, setSupportMode] = useState<'FAST_AI' | 'DEEP_AI' | 'HUMAN'>('FAST_AI');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Xin chào! Tôi là trợ lý huấn luyện trực tiếp. Bạn cần hỗ trợ gì về vận hành hay chiến lược liên minh không?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingProcess, setThinkingProcess] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, thinkingProcess]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input.trim();
    if (!textToSend || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    setIsLoading(true);
    setThinkingProcess([]);

    try {
      if (supportMode === 'FAST_AI') {
        const response = await getFastAdvisorResponse(textToSend);
        setMessages(prev => [...prev, { role: 'assistant', content: response, type: 'fast' }]);
      } else if (supportMode === 'DEEP_AI') {
        // Mô phỏng các bước suy nghĩ để tăng trải nghiệm người dùng
        setThinkingProcess(["Đang truy xuất dữ liệu liên minh...", "Phân tích rủi ro tài chính...", "Kiểm tra cơ chế đối soát..."]);
        const response = await getSmartAdvisorResponse(textToSend);
        setMessages(prev => [...prev, { role: 'assistant', content: response, type: 'thinking' }]);
        setThinkingProcess([]);
      } else {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'human-expert', 
            content: 'Chào bạn, chuyên gia vận hành đã nhận được yêu cầu. Chúng tôi sẽ phản hồi bạn sớm nhất qua cửa sổ chat này.' 
          }]);
        }, 2000);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Xin lỗi, hệ thống đang bận. Vui lòng thử lại sau.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const trainingSuggestions = [
    { title: "Giải thích Earn/Burn", prompt: "Huấn luyện tôi cách giải thích cơ chế tích và đổi điểm cho khách hàng." },
    { title: "Quy trình Đối soát", prompt: "Bảng ma trận bù trừ công nợ hoạt động như thế nào?" }
  ];

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[150] group"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
        <i className="fas fa-comments-dollar text-2xl group-hover:rotate-12 transition-transform"></i>
      </button>
    );
  }

  return (
    <div className="fixed bottom-8 right-8 w-full max-w-[420px] h-[600px] bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden z-[150] animate-in slide-in-from-bottom-10 duration-300 border border-gray-100">
      {/* Header */}
      <div className="bg-gray-900 p-6 text-white flex justify-between items-center">
        <div className="flex items-center space-x-3">
           <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
             supportMode === 'FAST_AI' ? 'bg-blue-600' : 
             supportMode === 'DEEP_AI' ? 'bg-purple-600' : 'bg-green-600'
           }`}>
             <i className={`fas ${supportMode === 'FAST_AI' ? 'fa-bolt' : supportMode === 'DEEP_AI' ? 'fa-brain' : 'fa-user-tie'}`}></i>
           </div>
           <div>
             <h3 className="text-sm font-black uppercase tracking-tight">Huấn luyện trực tiếp</h3>
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{supportMode.replace('_', ' ')} ACTIVE</p>
           </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
          <i className="fas fa-times text-xs"></i>
        </button>
      </div>

      {/* Mode Switcher */}
      <div className="flex p-2 bg-gray-50 border-b border-gray-100 overflow-x-auto scrollbar-hide">
        {[
          { id: 'FAST_AI', label: 'Lite', icon: 'fa-bolt' },
          { id: 'DEEP_AI', label: 'Thinking', icon: 'fa-brain' },
          { id: 'HUMAN', label: 'Expert', icon: 'fa-headset' }
        ].map(m => (
          <button
            key={m.id}
            onClick={() => setSupportMode(m.id as any)}
            className={`flex-1 py-2 px-3 rounded-xl text-[10px] font-black transition-all flex items-center justify-center space-x-2 ${supportMode === m.id ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <i className={`fas ${m.icon}`}></i>
            <span>{m.label.toUpperCase()}</span>
          </button>
        ))}
      </div>

      {/* Chat Body */}
      <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-6 bg-gray-50/30">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
             <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-medium shadow-sm ${
               msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-gray-100 rounded-tl-none text-gray-800'
             }`}>
               {msg.role === 'assistant' && msg.type === 'thinking' && (
                 <p className="text-[9px] font-black text-purple-500 uppercase mb-2"><i className="fas fa-brain mr-1"></i> Thinking Mode analysis</p>
               )}
               <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
             </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-white border border-gray-100 p-4 rounded-3xl rounded-tl-none space-y-2 w-full">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
              {thinkingProcess.length > 0 && (
                <div className="space-y-1">
                  {thinkingProcess.map((step, i) => (
                    <p key={i} className="text-[10px] text-gray-400 italic">... {step}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer / Input */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex items-center space-x-2">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Nhập nội dung cần hỗ trợ..."
            className="flex-grow bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <button 
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-transform disabled:opacity-50"
          >
            <i className="fas fa-paper-plane text-xs"></i>
          </button>
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
           {trainingSuggestions.map((s, idx) => (
             <button 
               key={idx} 
               onClick={() => handleSend(s.prompt)}
               className="whitespace-nowrap bg-gray-100 hover:bg-gray-200 text-[9px] font-black text-gray-500 px-3 py-1.5 rounded-full transition-colors"
             >
               {s.title.toUpperCase()}
             </button>
           ))}
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;
