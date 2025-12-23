
import React, { useState } from 'react';

interface LoginOverlayProps {
  onLogin: () => void;
}

const LoginOverlay: React.FC<LoginOverlayProps> = ({ onLogin }) => {
  const [loadingType, setLoadingType] = useState<string | null>(null);

  const handleFastLogin = (type: string) => {
    setLoadingType(type);
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -ml-20 -mb-20"></div>

      <div className="max-w-md w-full p-8 md:p-12 relative z-10 space-y-12 animate-in fade-in zoom-in-95 duration-700">
        <div className="text-center space-y-6">
          <div className="relative inline-block">
             <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] flex items-center justify-center text-white shadow-[0_20px_50px_rgba(79,70,229,0.3)] animate-bounce-slow">
                <i className="fas fa-link text-4xl"></i>
             </div>
             <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl shadow-lg flex items-center justify-center text-indigo-600 border border-gray-100">
                <i className="fas fa-bolt text-sm"></i>
             </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-gray-900 tracking-tighter italic">CO-LOYALTY</h1>
            <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px]">Hệ sinh thái liên minh kỷ nguyên mới</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-3 mb-4">
             <div className="h-px w-8 bg-gray-200"></div>
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Đăng nhập 1-Chạm</span>
             <div className="h-px w-8 bg-gray-200"></div>
          </div>
          
          <button 
            disabled={!!loadingType}
            onClick={() => handleFastLogin('zalo')}
            className={`group w-full flex items-center justify-between px-8 py-5 bg-[#0068FF] text-white rounded-[2rem] font-black text-sm transition-all shadow-xl shadow-blue-200/50 hover:scale-[1.02] active:scale-95 disabled:opacity-50`}
          >
            <span className="flex items-center">
              {loadingType === 'zalo' ? <i className="fas fa-circle-notch animate-spin mr-4"></i> : <i className="fas fa-comment text-xl mr-4 group-hover:rotate-12 transition-transform"></i>}
              {loadingType === 'zalo' ? 'Đang xác thực...' : 'Tiếp tục với Zalo'}
            </span>
            <i className="fas fa-chevron-right text-[10px] opacity-40"></i>
          </button>

          <button 
            disabled={!!loadingType}
            onClick={() => handleFastLogin('google')}
            className="group w-full flex items-center justify-between px-8 py-5 bg-white text-gray-700 border border-gray-100 rounded-[2rem] font-black text-sm transition-all shadow-xl shadow-gray-100/50 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            <span className="flex items-center">
              {loadingType === 'google' ? <i className="fas fa-circle-notch animate-spin mr-4 text-indigo-500"></i> : <img src="https://www.google.com/favicon.ico" className="w-5 h-5 mr-4" />}
              {loadingType === 'google' ? 'Đang kết nối...' : 'Tiếp tục với Google'}
            </span>
            <i className="fas fa-chevron-right text-[10px] opacity-40"></i>
          </button>

          <button 
            disabled={!!loadingType}
            onClick={() => handleFastLogin('apple')}
            className="group w-full flex items-center justify-between px-8 py-5 bg-black text-white rounded-[2rem] font-black text-sm transition-all shadow-xl shadow-gray-900/10 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            <span className="flex items-center">
              {loadingType === 'apple' ? <i className="fas fa-circle-notch animate-spin mr-4"></i> : <i className="fab fa-apple text-xl mr-4"></i>}
              {loadingType === 'apple' ? 'Xác thực ID...' : 'Tiếp tục với Apple'}
            </span>
            <i className="fas fa-chevron-right text-[10px] opacity-40"></i>
          </button>
        </div>

        <div className="text-center">
          <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase tracking-widest px-8 opacity-60">
            Hệ thống tự động đồng bộ hồ sơ & ưu đãi cá nhân hóa ngay khi bạn đăng nhập.
          </p>
        </div>
      </div>

      {/* Decorative footer line */}
      <div className="absolute bottom-8 w-1/3 h-1 bg-gray-100 rounded-full"></div>
    </div>
  );
};

export default LoginOverlay;
