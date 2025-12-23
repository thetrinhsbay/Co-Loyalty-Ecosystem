
import React, { useState, useRef, useEffect } from 'react';
import { getSmartAdvisorResponse, getFastAdvisorResponse } from '../services/gemini';

interface Message {
  role: 'user' | 'assistant' | 'human-expert';
  content: string;
  type?: 'fast' | 'thinking';
}

const AIAdvisor: React.FC = () => {
  const [supportMode, setSupportMode] = useState<'FAST_AI' | 'DEEP_AI' | 'HUMAN'>('FAST_AI');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Chào mừng bạn đến với trung tâm "Huấn luyện trực tiếp". Tôi có thể hỗ trợ bạn phản hồi nhanh (Lite), phân tích chiến lược sâu (Thinking Mode) hoặc kết nối bạn với Chuyên gia vận hành. Bạn cần hỗ trợ gì?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input.trim();
    if (!textToSend || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    setIsLoading(true);

    try {
      if (supportMode === 'FAST_AI') {
        const response = await getFastAdvisorResponse(textToSend);
        setMessages(prev => [...prev, { role: 'assistant', content: response, type: 'fast' }]);
      } else if (supportMode === 'DEEP_AI') {
        const response = await getSmartAdvisorResponse(textToSend);
        setMessages(prev => [...prev, { role: 'assistant', content: response, type: 'thinking' }]);
      } else {
        // Giả lập phản hồi từ chuyên gia con người
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'human-expert', 
            content: 'Chào bạn, tôi là chuyên gia vận hành từ Co-Loyalty. Tôi đã nhận được yêu cầu của bạn. Case study này khá phức tạp, tôi đang phối hợp với bộ phận kỹ thuật để xem xét cấu trúc API đối soát của bạn. Tôi sẽ phản hồi chi tiết qua email trong 30 phút tới.' 
          }]);
        }, 2000);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Có lỗi xảy ra trong quá trình xử lý. Vui lòng thử lại.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const trainingSuggestions = [
    { title: "Kịch bản Earn/Burn", prompt: "Huấn luyện tôi cách giải thích cơ chế tích và đổi điểm cho một khách hàng khó tính tại quầy." },
    { title: "Xử lý Fraud", prompt: "Quy trình 5 bước để xử lý khi phát hiện một thu ngân tự cày điểm cho tài khoản cá nhân." },
    { title: "ROI cho Giám đốc", prompt: "Làm sao để thuyết phục Giám đốc chi 100 triệu nạp quỹ đối ứng lần đầu?" },
    { title: "Đối soát mẫu", prompt: "Giải thích cách tính bảng ma trận bù trừ công nợ giữa 2 shop F&B và Fashion." },
    { title: "Cấu hình Tier", prompt: "Tư vấn cấu hình % tích điểm cho một chuỗi cửa hàng tiện lợi mới gia nhập." },
    { title: "Pháp lý & Thuế", prompt: "Hạch toán điểm thưởng là chi phí marketing như thế nào để tối ưu thuế?" }
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-[800px] bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header with Switcher */}
      <div className="bg-gray-900 p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-5">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-2 transition-all ${
              supportMode === 'FAST_AI' ? 'bg-blue-600 border-blue-400' : 
              supportMode === 'DEEP_AI' ? 'bg-purple-600 border-purple-400' : 'bg-green-600 border-green-400'
            }`}>
              <i className={`fas ${
                supportMode === 'FAST_AI' ? 'fa-bolt' : 
                supportMode === 'DEEP_AI' ? 'fa-brain' : 'fa-user-tie'
              } text-2xl`}></i>
            </div>
            <div>
              <h2 className="text-2xl font-black italic tracking-tighter uppercase">Huấn luyện trực tiếp</h2>
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full animate-pulse ${
                  supportMode === 'FAST_AI' ? 'bg-blue-400' : 
                  supportMode === 'DEEP_AI' ? 'bg-purple-400' : 'bg-green-400'
                }`}></span>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Hỗ trợ song song AI & Chuyên gia</p>
              </div>
            </div>
          </div>

          <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 overflow-x-auto">
            <button 
              onClick={() => setSupportMode('FAST_AI')}
              className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all flex items-center space-x-2 whitespace-nowrap ${supportMode === 'FAST_AI' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
            >
              <i className="fas fa-bolt"></i>
              <span>AI NHANH (LITE)</span>
            </button>
            <button 
              onClick={() => setSupportMode('DEEP_AI')}
              className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all flex items-center space-x-2 whitespace-nowrap ${supportMode === 'DEEP_AI' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
            >
              <i className="fas fa-brain"></i>
              <span>PHÂN TÍCH SÂU</span>
            </button>
            <button 
              onClick={() => setSupportMode('HUMAN')}
              className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all flex items-center space-x-2 whitespace-nowrap ${supportMode === 'HUMAN' ? 'bg-green-600 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
            >
              <i className="fas fa-headset"></i>
              <span>CHUYÊN GIA</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Smart Training Suggestions */}
      <div className="bg-gray-50 px-8 py-6 border-b border-gray-100">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center">
          <i className="fas fa-graduation-cap mr-2 text-indigo-600"></i> Chủ đề huấn luyện gợi ý
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
           {trainingSuggestions.map((s, idx) => (
             <button 
              key={idx} 
              onClick={() => handleSend(s.prompt)}
              className="bg-white p-3 rounded-2xl border border-gray-100 hover:border-indigo-300 hover:shadow-md transition-all text-left group"
             >
                <p className="text-[11px] font-black text-gray-900 group-hover:text-indigo-600 leading-tight mb-1">{s.title}</p>
                <i className="fas fa-arrow-right text-[8px] text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all"></i>
             </button>
           ))}
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-grow p-8 overflow-y-auto space-y-8 bg-gray-50/20">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start max-w-[85%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center shadow-sm ${
                msg.role === 'user' ? 'bg-gray-900 text-white' : 
                msg.role === 'assistant' ? (msg.type === 'fast' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600') : 'bg-green-100 text-green-600'
              }`}>
                <i className={`fas ${msg.role === 'user' ? 'fa-user' : msg.role === 'assistant' ? (msg.type === 'fast' ? 'fa-bolt' : 'fa-brain') : 'fa-user-tie'}`}></i>
              </div>
              <div className={`p-6 rounded-[2rem] shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : msg.role === 'assistant' ? 'bg-white border border-gray-100 rounded-tl-none' : 'bg-green-50 border border-green-100 text-green-900 rounded-tl-none'
              }`}>
                <div className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                  {msg.role === 'assistant' && msg.type === 'thinking' && <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-purple-500"><i className="fas fa-brain mr-1"></i> AI Thinking Mode Output</p>}
                  {msg.role === 'assistant' && msg.type === 'fast' && <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-blue-500"><i className="fas fa-bolt mr-1"></i> Fast AI Response</p>}
                  {msg.role === 'human-expert' && <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-green-600">PHẢN HỒI TỪ CHUYÊN GIA</p>}
                  {msg.content}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex items-center space-x-3 bg-white px-6 py-4 rounded-full border border-gray-100 shadow-sm">
                <div className="flex space-x-1">
                  <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${supportMode === 'FAST_AI' ? 'bg-blue-500' : 'bg-indigo-500'}`}></div>
                  <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${supportMode === 'FAST_AI' ? 'bg-blue-500' : 'bg-indigo-500'} [animation-delay:0.2s]`}></div>
                  <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${supportMode === 'FAST_AI' ? 'bg-blue-500' : 'bg-indigo-500'} [animation-delay:0.4s]`}></div>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${supportMode === 'FAST_AI' ? 'text-blue-600' : 'text-indigo-600'}`}>
                  {supportMode === 'FAST_AI' ? 'Flash Lite responding...' : supportMode === 'DEEP_AI' ? 'Deep AI Thinking...' : 'Chờ chuyên gia...'}
                </span>
             </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-8 border-t border-gray-100 bg-white">
        <div className="flex items-center space-x-4">
          <div className="flex-grow relative">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={
                supportMode === 'FAST_AI' ? "Hỏi nhanh chiến lược (Độ trễ thấp)..." : 
                supportMode === 'DEEP_AI' ? "Yêu cầu phân tích sâu (Cần thời gian suy nghĩ)..." : 
                "Chat trực tiếp với đội ngũ Chuyên gia..."
              }
              className="w-full bg-gray-50 border border-gray-200 rounded-[2rem] px-8 py-5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all pr-16"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center space-x-3 text-gray-300">
               <i className={`fas ${
                 supportMode === 'FAST_AI' ? 'fa-bolt text-blue-400' : 
                 supportMode === 'DEEP_AI' ? 'fa-wand-magic-sparkles text-purple-400' : 'fa-headset text-green-400'
               }`}></i>
            </div>
          </div>
          <button 
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className={`w-14 h-14 rounded-full text-white flex items-center justify-center shadow-xl transition-all active:scale-95 disabled:opacity-50 ${
              supportMode === 'FAST_AI' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' : 
              supportMode === 'DEEP_AI' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 
              'bg-green-600 hover:bg-green-700 shadow-green-200'
            }`}
          >
            {isLoading ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-paper-plane"></i>}
          </button>
        </div>
        <p className="text-center text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-4">Huấn luyện trực tiếp • Đồng hành cùng sự thành công của doanh nghiệp bạn</p>
      </div>
    </div>
  );
};

export default AIAdvisor;
