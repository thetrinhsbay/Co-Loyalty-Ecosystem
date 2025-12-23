
import React, { useState } from 'react';
import { Company, Product, Transaction, UserRole, MerchantOpsStats } from '../types';
import SmartSuggestions from './SmartSuggestions';
import { getSmartAdvisorResponse } from '../services/gemini';
import { QRCodeSVG } from 'qrcode.react';

interface MerchantViewProps {
  activeSection: string;
  role: UserRole;
  merchant: Company;
  products: Product[];
  transactions: Transaction[];
  opsStats: MerchantOpsStats;
  onScannerAction: (type: string, amount: number, merchantId: string, opts?: any) => void;
  onTabChange: (tab: string) => void;
  onFinanceAction: (type: string, amount: number, merchantId: string) => void;
}

// Fix: Complete the component definition and ensure it returns a ReactNode
const MerchantView: React.FC<MerchantViewProps> = ({ activeSection, role, merchant, products, transactions, opsStats, onScannerAction, onTabChange, onFinanceAction }) => {
  const [showScanner, setShowScanner] = useState(false);
  const [showStoreQR, setShowStoreQR] = useState(false);
  const [scanAction, setScanAction] = useState<'EARN' | 'BURN'>('EARN');
  const [scanValue, setScanValue] = useState('');
  const [showFinance, setShowFinance] = useState<'DEPOSIT' | 'WITHDRAW' | null>(null);
  const [financeValue, setFinanceValue] = useState('');
  
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDeepAnalysis = async () => {
    setIsAnalyzing(true);
    setAiAnalysis(null);
    const context = {
      merchantName: merchant.name,
      balance: merchant.balance,
      issued: merchant.totalPointsIssued,
      redeemed: merchant.totalPointsRedeemed,
      opsStats,
      recentTransactions: transactions.slice(0, 10)
    };
    const report = await getSmartAdvisorResponse("Hãy phân tích hiệu quả vận hành thực tế và đề xuất 3 chiến lược tăng trưởng doanh thu dựa trên dữ liệu này. Hãy suy nghĩ thật kỹ về các Rule kinh doanh.", context);
    setAiAnalysis(report || "Không thể khởi tạo báo cáo.");
    setIsAnalyzing(false);
  };

  const isDirector = role === UserRole.DIRECTOR;
  const isCashier = role === UserRole.CASHIER;

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Rule 32: Retention', val: `${opsStats.retentionRate}%`, color: 'blue', icon: 'fa-user-clock' },
          { label: 'Rule 31: ROI MKT', val: `${opsStats.roi}%`, color: 'green', icon: 'fa-chart-line' },
          { label: 'Rule 33: CLV', val: `${opsStats.clv.toLocaleString()} đ`, color: 'purple', icon: 'fa-id-card' },
          { label: 'Rule 37: Cost Ratio', val: `${opsStats.costRatio}%`, color: 'orange', icon: 'fa-percent' }
        ].map(stat => (
          <div key={stat.label} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
             <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-4`}>
                <i className={`fas ${stat.icon}`}></i>
             </div>
             <div>
                <p className="text-[10px] text-gray-400 font-black uppercase mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900">{stat.val}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 p-8 md:p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-4 max-w-xl">
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center animate-pulse">
                     <i className="fas fa-brain"></i>
                  </div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">AI Strategic Advisor</h3>
               </div>
               <p className="text-sm text-gray-400 font-medium leading-relaxed">
                 Kích hoạt hệ thống suy luận **Gemini 3 Pro** để rà soát toàn bộ lịch sử giao dịch, tính toán điểm gãy và dự báo dòng tiền cho tháng kế tiếp.
               </p>
               <div className="flex items-center space-x-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                  <i className="fas fa-check-circle"></i>
                  <span>Thinking Budget: 32,768 Tokens</span>
               </div>
            </div>
            <button 
              onClick={handleDeepAnalysis}
              disabled={isAnalyzing}
              className="w-full md:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-900/20 disabled:opacity-50 active:scale-95"
            >
              {isAnalyzing ? (
                <span className="flex items-center"><i className="fas fa-circle-notch animate-spin mr-3"></i> AI ĐANG SUY LUẬN...</span>
              ) : "Chạy phân tích sâu"}
            </button>
         </div>

         {aiAnalysis && (
            <div className="mt-10 p-8 bg-white/5 border border-white/10 rounded-[2rem] animate-in slide-in-from-top-4 duration-500 overflow-hidden relative">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
               <div className="text-sm font-medium leading-relaxed whitespace-pre-wrap text-indigo-50 max-h-[500px] overflow-y-auto pr-4 scrollbar-thin">
                  {aiAnalysis}
               </div>
            </div>
         )}
      </div>

      {isDirector && (
        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 flex flex-col md:flex-row items-center justify-between shadow-sm gap-8">
           <div className="text-center md:text-left">
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Ví Đối Ứng Bảo Chứng (RULE 16)</p>
              <div className="flex items-baseline space-x-2">
                 <span className="text-4xl font-black text-gray-900">{merchant.balance.toLocaleString()}</span>
                 <span className="text-sm font-black text-gray-400 uppercase">vnđ</span>
              </div>
           </div>
           <div className="flex space-x-4 w-full md:w-auto">
              <button onClick={() => setShowFinance('DEPOSIT')} className="flex-1 md:flex-none px-10 py-5 bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all">Nạp quỹ</button>
              <button onClick={() => setShowFinance('WITHDRAW')} className="flex-1 md:flex-none px-10 py-5 bg-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">Rút doanh thu</button>
           </div>
        </div>
      )}

      {(isCashier || isDirector) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <button onClick={() => { setScanAction('EARN'); setShowScanner(true); }} className="p-10 bg-indigo-600 text-white rounded-[3.5rem] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all group relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <i className="fas fa-plus-circle text-5xl mb-6 group-hover:rotate-12 transition-transform"></i>
              <p className="text-2xl font-black uppercase tracking-tighter italic">Cộng Điểm</p>
              <p className="text-[9px] text-indigo-200 font-black uppercase tracking-widest mt-2">Dành cho thu ngân (Scan Customer)</p>
           </button>
           <button onClick={() => { setScanAction('BURN'); setShowScanner(true); }} className="p-10 bg-orange-600 text-white rounded-[3.5rem] shadow-2xl hover:scale-[1.02] active:scale-95 transition-all group relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <i className="fas fa-minus-circle text-5xl mb-6 group-hover:scale-110 transition-transform"></i>
              <p className="text-2xl font-black uppercase tracking-tighter italic">Trừ Điểm</p>
              <p className="text-[9px] text-orange-200 font-black uppercase tracking-widest mt-2">Dành cho thu ngân (Scan Customer)</p>
           </button>
           <button onClick={() => setShowStoreQR(true)} className="p-10 bg-white text-gray-900 border border-gray-100 rounded-[3.5rem] shadow-sm hover:scale-[1.02] active:scale-95 transition-all group relative overflow-hidden text-left">
              <i className="fas fa-qrcode text-5xl mb-6 group-hover:rotate-12 transition-transform text-indigo-600"></i>
              <p className="text-2xl font-black uppercase tracking-tighter italic">QR Cửa Hàng</p>
              <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-2">Khách tự quét tại quầy</p>
           </button>
        </div>
      )}
      
      <SmartSuggestions role={role} />
      
      {/* Modals */}
      {showScanner && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
           <div className="bg-white rounded-[3rem] w-full max-w-md p-10 shadow-2xl animate-in zoom-in-95 duration-300">
              <h3 className="text-2xl font-black italic uppercase mb-6">{scanAction === 'EARN' ? 'Cộng điểm' : 'Trừ điểm'} khách</h3>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase">Giá trị hóa đơn / Điểm</label>
                    <input 
                      type="number" 
                      value={scanValue} 
                      onChange={e => setScanValue(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl outline-none font-black text-2xl" 
                      placeholder="0"
                    />
                 </div>
                 <button 
                  onClick={() => { onScannerAction(scanAction, parseInt(scanValue), merchant.id); setShowScanner(false); setScanValue(''); }}
                  className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl"
                 >
                   Xác nhận giao dịch
                 </button>
                 <button onClick={() => setShowScanner(false)} className="w-full py-3 text-gray-400 font-black uppercase text-[10px]">Hủy bỏ</button>
              </div>
           </div>
        </div>
      )}

      {showStoreQR && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
           <div className="bg-white rounded-[3rem] p-12 text-center space-y-8 max-w-sm w-full animate-in zoom-in-95 duration-300">
              <h3 className="text-2xl font-black italic uppercase">QR Cửa Hàng</h3>
              <div className="bg-white p-6 rounded-3xl border-8 border-indigo-600 inline-block">
                 <QRCodeSVG value={merchant.id} size={200} />
              </div>
              <p className="text-sm font-medium text-gray-500">Khách hàng sử dụng ứng dụng quét mã này để bắt đầu tích điểm.</p>
              <button onClick={() => setShowStoreQR(false)} className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-black uppercase">Đóng</button>
           </div>
        </div>
      )}

      {showFinance && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
           <div className="bg-white rounded-[3rem] w-full max-w-md p-10 shadow-2xl animate-in zoom-in-95 duration-300">
              <h3 className="text-2xl font-black italic uppercase mb-6">{showFinance === 'DEPOSIT' ? 'Nạp quỹ bảo chứng' : 'Rút tiền doanh thu'}</h3>
              <div className="space-y-6">
                 <input 
                   type="number" 
                   value={financeValue} 
                   onChange={e => setFinanceValue(e.target.value)}
                   className="w-full bg-gray-50 border border-gray-100 p-5 rounded-2xl outline-none font-black text-2xl" 
                   placeholder="Nhập số tiền VND..."
                 />
                 <button 
                  onClick={() => { onFinanceAction(showFinance, parseInt(financeValue), merchant.id); setShowFinance(null); setFinanceValue(''); }}
                  className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl"
                 >
                   Xác nhận
                 </button>
                 <button onClick={() => setShowFinance(null)} className="w-full py-3 text-gray-400 font-black uppercase text-[10px]">Hủy bỏ</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
       <div className="bg-white p-10 rounded-[3rem] border border-gray-100 flex items-center justify-between shadow-sm">
          <div>
             <h3 className="text-2xl font-black italic uppercase tracking-tighter">Kho Quà Tặng / Ưu Đãi</h3>
             <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Cấu hình sản phẩm cho phép đổi bằng điểm</p>
          </div>
          <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl">Thêm sản phẩm</button>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(p => (
            <div key={p.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center space-x-6">
               <img src={p.image} className="w-24 h-24 rounded-2xl object-cover border border-gray-50" />
               <div className="flex-grow">
                  <p className="font-black text-gray-900">{p.name}</p>
                  <p className="text-indigo-600 font-black text-lg">{p.pointPrice.toLocaleString()} P</p>
                  <p className="text-[10px] text-gray-400 font-black uppercase mt-1">Kho: {p.stock}</p>
               </div>
            </div>
          ))}
       </div>
    </div>
  );

  const renderSettlement = () => (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
       <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-gray-50 flex justify-between items-center">
             <h3 className="text-2xl font-black italic uppercase tracking-tighter">Lịch Sử Đối Soát</h3>
             <div className="flex space-x-2">
                <button className="px-6 py-3 bg-gray-50 rounded-xl text-[10px] font-black uppercase">Xuất Excel</button>
             </div>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead className="text-[10px] font-black text-gray-400 uppercase bg-gray-50/50">
                   <tr>
                      <th className="px-10 py-6">Mã giao dịch</th>
                      <th className="px-10 py-6">Thời gian</th>
                      <th className="px-10 py-6">Loại</th>
                      <th className="px-10 py-6 text-right">Giá trị (P/VND)</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {transactions.map(tx => (
                     <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-10 py-6 font-black text-gray-900 text-xs">{tx.id}</td>
                        <td className="px-10 py-6 text-xs text-gray-400">{new Date(tx.timestamp).toLocaleString()}</td>
                        <td className="px-10 py-6">
                           <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase ${tx.type === 'EARN' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>{tx.type}</span>
                        </td>
                        <td className="px-10 py-6 text-right font-black text-gray-900">
                           {tx.type === 'EARN' ? `+${tx.pointsEarned} P` : `-${tx.pointsSpent} P`}
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );

  // Switch between tabs based on activeSection
  switch (activeSection) {
    case 'dashboard': return renderDashboard();
    case 'inventory': return renderInventory();
    case 'settlement': return renderSettlement();
    default: return renderDashboard();
  }
};

// Fix: Add default export to resolve the error in App.tsx
export default MerchantView;
