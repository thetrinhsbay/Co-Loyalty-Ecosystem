
import React, { useState } from 'react';
import { Company, Transaction, UserRole, TreasuryStats, RiskStats, AnalyticsBI } from '../types';
import SmartSuggestions from './SmartSuggestions';
import { getSmartAdvisorResponse } from '../services/gemini';

interface AdminViewProps {
  activeSection: string;
  companies: Company[];
  transactions: Transaction[];
  treasuryStats: TreasuryStats;
  riskStats: RiskStats;
  analyticsStats: AnalyticsBI;
}

const AdminView: React.FC<AdminViewProps> = ({ activeSection, companies, transactions, treasuryStats, riskStats, analyticsStats }) => {
  const [currentModule, setCurrentModule] = useState<string>('tower');
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  const runSystemStressTest = async () => {
    setIsThinking(true);
    setAiReport(null);
    const context = { 
      treasuryStats, 
      riskStats, 
      analyticsStats, 
      merchantCount: companies.length,
      safetyRatio: treasuryStats.safetyRatio,
      gmv: analyticsStats.gmv
    };
    const report = await getSmartAdvisorResponse(
      "Thực hiện Stress-test toàn diện hệ thống: Giả định 30% Merchant rời bỏ và 50% User đổi điểm cùng lúc. Hãy suy nghĩ thật sâu về thanh khoản và đề xuất biện pháp can thiệp (Rule 67).", 
      context
    );
    setAiReport(report || "Lỗi xử lý AI.");
    setIsThinking(false);
  };

  const modules = [
    { id: 'tower', label: 'Tháp Canh', icon: 'fa-tower-observation' },
    { id: 'treasury', label: 'Kho Bạc', icon: 'fa-vault' },
    { id: 'partners', label: 'Đối Tác', icon: 'fa-handshake' },
    { id: 'security', label: 'Bảo Mật', icon: 'fa-shield-halved' },
  ];

  const renderModule = () => {
    switch (currentModule) {
      case 'tower':
        return (
          <div className="space-y-10 animate-in fade-in duration-500 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { label: 'Safety Ratio', val: treasuryStats.safetyRatio.toFixed(2), color: 'green', icon: 'fa-shield-heart', desc: 'Ngưỡng an toàn quỹ' },
                { label: 'Risk Score', val: riskStats.avgFraudScore.toFixed(0), color: 'red', icon: 'fa-triangle-exclamation', desc: 'Chỉ số gian lận' },
                { label: 'Escrow Fund', val: treasuryStats.escrowFund.toLocaleString(), color: 'blue', icon: 'fa-vault', desc: 'Tổng tiền bảo lãnh' },
                { label: 'System GMV', val: analyticsStats.gmv.toLocaleString(), color: 'purple', icon: 'fa-globe', desc: 'Tổng giao dịch liên minh' }
              ].map(stat => (
                <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center space-x-6 hover:shadow-lg transition-all">
                   <div className={`w-16 h-16 rounded-[1.5rem] bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center text-2xl shadow-inner`}><i className={`fas ${stat.icon}`}></i></div>
                   <div>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className={`text-2xl font-black text-${stat.color}-600 leading-none`}>{stat.val}</p>
                      <p className="text-[9px] text-gray-300 font-bold mt-2 uppercase">{stat.desc}</p>
                   </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-900 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
               <div className="relative z-10 space-y-10">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="space-y-2 text-center md:text-left">
                      <h3 className="text-3xl font-black italic tracking-tighter flex items-center justify-center md:justify-start">
                        <i className="fas fa-microchip mr-4 text-indigo-500"></i>
                        AI System Integrity Check
                      </h3>
                      <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">Thinking Engine: Gemini 3 Pro (32K Budget)</p>
                    </div>
                    <button 
                      onClick={runSystemStressTest} 
                      disabled={isThinking} 
                      className="w-full md:w-auto px-12 py-6 bg-indigo-600 text-white rounded-3xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-indigo-900/40 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {isThinking ? (
                        <span className="flex items-center"><i className="fas fa-circle-notch animate-spin mr-3"></i> AI ĐANG SUY LUẬN...</span>
                      ) : "Chạy Stress-Test Toàn Hệ Thống"}
                    </button>
                  </div>
                  
                  {aiReport && (
                    <div className="p-10 bg-white/5 border border-white/10 rounded-[3rem] text-sm leading-relaxed text-indigo-100 font-medium whitespace-pre-wrap max-h-[500px] overflow-y-auto scrollbar-thin relative animate-in zoom-in-95 duration-500">
                       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-indigo-500 to-blue-500"></div>
                       {aiReport}
                    </div>
                  )}
               </div>
            </div>
          </div>
        );
      case 'treasury':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-900 p-10 rounded-[3rem] text-white shadow-xl">
                   <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Total Liability (Nợ Điểm)</p>
                   <p className="text-4xl font-black tracking-tighter">{treasuryStats.totalLiability.toLocaleString()} <span className="text-sm opacity-50 uppercase">vnđ</span></p>
                </div>
                <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                   <p className="text-[11px] text-gray-400 font-black uppercase tracking-widest mb-4">Escrow Fund (Tiền Mặt)</p>
                   <p className="text-4xl font-black text-indigo-600 tracking-tighter">{treasuryStats.escrowFund.toLocaleString()} <span className="text-sm opacity-50 uppercase">vnđ</span></p>
                </div>
                <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-xl">
                   <p className="text-[11px] font-black text-indigo-200 uppercase tracking-widest mb-4">Platform Revenue (Phí Sàn)</p>
                   <p className="text-4xl font-black tracking-tighter">{treasuryStats.platformRevenue.toLocaleString()} <span className="text-sm opacity-50 uppercase">vnđ</span></p>
                </div>
             </div>
             {/* Thêm biểu đồ dòng tiền tại đây nếu cần */}
          </div>
        );
      case 'partners':
        return (
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden animate-in fade-in duration-500">
             <div className="p-10 bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-8 border-b border-gray-50">
                <div>
                   <h3 className="text-2xl font-black italic uppercase tracking-tighter">Đối Tác Liên Minh</h3>
                   <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Quản lý trạng thái ví và hạn mức thấu chi</p>
                </div>
                <button className="w-full md:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100">Duyệt Đối Tác Mới</button>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] bg-gray-50/20">
                      <tr>
                         <th className="px-10 py-8">Đối Tác</th>
                         <th className="px-10 py-8">Phân Loại</th>
                         <th className="px-10 py-8">Ví Bảo Chứng</th>
                         <th className="px-10 py-8">Issued / Redeemed</th>
                         <th className="px-10 py-8 text-right">Hành Động</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50 font-bold text-sm">
                      {companies.map(c => (
                        <tr key={c.id} className="hover:bg-gray-50/50 transition-colors group">
                           <td className="px-10 py-8 flex items-center space-x-5">
                              <img src={c.logo} className="w-12 h-12 rounded-[1.25rem] shadow-sm border border-gray-100" />
                              <div>
                                 <p className="font-black text-gray-900">{c.name}</p>
                                 <p className="text-[9px] text-gray-400 uppercase tracking-widest">ID: {c.id}</p>
                              </div>
                           </td>
                           <td className="px-10 py-8">
                             <span className="px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-black text-gray-500 uppercase">{c.category}</span>
                           </td>
                           <td className={`px-10 py-8 ${c.balance < 1000000 ? 'text-red-500 animate-pulse' : 'text-green-600'}`}>{c.balance.toLocaleString()} đ</td>
                           <td className="px-10 py-8 text-xs text-gray-400 font-black uppercase tracking-widest">{c.totalPointsIssued.toLocaleString()} / {c.totalPointsRedeemed.toLocaleString()} P</td>
                           <td className="px-10 py-8 text-right">
                              <button className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all text-xs font-black uppercase tracking-widest">Chi Tiết</button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        );
      case 'security':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in duration-500 pb-20">
             <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                <div className="flex items-center space-x-3 mb-10">
                   <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center text-xl shadow-inner"><i className="fas fa-user-shield"></i></div>
                   <h3 className="text-xl font-black uppercase italic tracking-tighter">Fraud Detector (Rule 55)</h3>
                </div>
                <div className="space-y-6">
                   {[
                     { id: 'GD-4829', user: 'u123', score: 85, reason: 'Tích điểm liên tục 5 lần/phút' },
                     { id: 'GD-9912', user: 'u456', score: 92, reason: 'Vị trí GPS sai lệch > 5km' }
                   ].map(f => (
                     <div key={f.id} className="p-6 bg-red-50 border border-red-100 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                           <p className="text-xs font-black text-red-700 uppercase tracking-widest">Giao dịch {f.id}</p>
                           <p className="text-[10px] text-red-500 font-bold mt-1">{f.reason}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                           <div className="text-right">
                              <p className="text-sm font-black text-red-700">{f.score}/100</p>
                              <p className="text-[8px] font-black uppercase text-red-400">Risk Score</p>
                           </div>
                           <button className="px-4 py-2 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-red-100 active:scale-95">Khóa</button>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             <div className="bg-gray-900 p-10 rounded-[3rem] text-white shadow-2xl">
                <div className="flex items-center space-x-3 mb-10">
                   <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center text-xl"><i className="fas fa-lock"></i></div>
                   <h3 className="text-xl font-black uppercase italic tracking-tighter">Thiết Bị & An Ninh</h3>
                </div>
                <div className="space-y-8">
                   <div className="flex justify-between items-center pb-4 border-b border-white/5">
                      <span className="text-[11px] text-gray-400 font-black uppercase tracking-widest">Yêu cầu OTP thất bại (24h)</span>
                      <span className="text-xl font-black text-red-400">{riskStats.blockedAttempts24h || 12} Lượt</span>
                   </div>
                   <div className="flex justify-between items-center pb-4 border-b border-white/5">
                      <span className="text-[11px] text-gray-400 font-black uppercase tracking-widest">Thiết bị lạ truy cập (B2B)</span>
                      <span className="text-xl font-black text-yellow-400">05 Trường hợp</span>
                   </div>
                   <div className="flex justify-between items-center pb-4 border-b border-white/5">
                      <span className="text-[11px] text-gray-400 font-black uppercase tracking-widest">Trung bình Fraud Score Hệ thống</span>
                      <div className="flex flex-col items-end">
                        <span className="text-xl font-black text-green-400">{riskStats.avgFraudScore.toFixed(1)}</span>
                        <div className="w-24 h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                           <div className="h-full bg-green-400" style={{ width: `${100 - riskStats.avgFraudScore}%` }}></div>
                        </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-4">
        <div>
           <h2 className="text-5xl font-black text-gray-900 italic tracking-tighter uppercase leading-none">ADMIN <span className="text-indigo-600">COMMAND</span></h2>
           <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.5em] mt-3">The Nexus Protocol • Platform Intelligence</p>
        </div>
        <div className="flex bg-white p-2 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-x-auto scrollbar-hide">
          {modules.map(m => (
            <button 
              key={m.id} 
              onClick={() => setCurrentModule(m.id)} 
              className={`px-8 py-4 rounded-[2rem] text-[11px] font-black transition-all whitespace-nowrap flex items-center ${currentModule === m.id ? 'bg-gray-900 text-white shadow-2xl' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
            >
              <i className={`fas ${m.icon} mr-3 opacity-60`}></i>{m.label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      
      <SmartSuggestions role={UserRole.ADMIN} />
      
      {renderModule()}
    </div>
  );
};

export default AdminView;
