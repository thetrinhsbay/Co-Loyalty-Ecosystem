
import React, { useState, useEffect } from 'react';
import { Product, Company, Transaction, User, AffiliateStats, GamificationStats, UserRole } from '../types';
import { QRCodeSVG } from 'qrcode.react';
import SmartSuggestions from './SmartSuggestions';

interface MemberViewProps {
  activeSection: string;
  products: Product[];
  companies: Company[];
  points: number;
  walletVND: number;
  currentUser: User;
  affiliateStats: AffiliateStats;
  gamificationStats: GamificationStats;
  leaderboard: User[];
  transactions: Transaction[];
  onPurchase: (type: string, amount: number, merchantId: string, opts?: any) => void;
  onTabChange: (tab: string) => void;
  onTransfer: (email: string, amount: number) => void;
  onCheckIn: () => void;
  onSpin: () => void;
}

const MemberView: React.FC<MemberViewProps> = ({ activeSection, products, companies, points, walletVND, currentUser, affiliateStats, gamificationStats, leaderboard, transactions, onPurchase, onTabChange, onTransfer, onCheckIn, onSpin }) => {
  const [showQR, setShowQR] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showLuckyDraw, setShowLuckyDraw] = useState(false);
  const [transferData, setTransferData] = useState({ email: '', amount: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferData.email || !transferData.amount) return;
    onTransfer(transferData.email, parseInt(transferData.amount));
    setShowTransfer(false);
    setTransferData({ email: '', amount: '' });
  };

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
          <div className="flex-grow space-y-6 w-full lg:w-auto">
            <div className="flex items-center space-x-3">
               <span className="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase bg-yellow-400 text-yellow-900 shadow-lg shadow-yellow-600/20">HẠNG {currentUser.tier}</span>
               <h2 className="text-indigo-100 text-[11px] font-black uppercase tracking-[0.2em] opacity-80">Chào mừng trở lại, {currentUser.name}</h2>
            </div>
            <div className="flex items-end space-x-4">
              <span className="text-6xl md:text-7xl font-black tracking-tighter leading-none">{points.toLocaleString()}</span>
              <div className="flex flex-col mb-1.5">
                <span className="text-xs font-black text-white/60 tracking-widest uppercase">POINTS</span>
                <span className="text-[11px] text-indigo-200 font-black">≈ {(points * 1000).toLocaleString()} <span className="text-[9px] opacity-60 uppercase">vnđ</span></span>
              </div>
            </div>
            <div className="w-full max-w-sm space-y-3">
               <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-indigo-200">
                  <span>EXP: {currentUser.exp.toLocaleString()}</span>
                  <span>TIẾP THEO: DIAMOND</span>
               </div>
               <div className="h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div className="h-full bg-yellow-400 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(250,204,21,0.5)]" style={{ width: `${Math.min((currentUser.exp / 10000) * 100, 100)}%` }}></div>
               </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full lg:w-auto shrink-0">
            <button onClick={() => onTabChange('gamification')} className="bg-white text-indigo-600 p-6 md:p-8 rounded-[2rem] font-black flex flex-col items-center hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-indigo-900/20 group">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-3 group-hover:rotate-12 transition-transform">
                <i className="fas fa-gamepad text-2xl"></i>
              </div>
              <span className="text-[10px] uppercase tracking-widest">GIẢI TRÍ</span>
            </button>
            <button onClick={() => setShowQR(true)} className="bg-white/10 text-white border border-white/20 p-6 md:p-8 rounded-[2rem] font-black flex flex-col items-center backdrop-blur-md hover:bg-white/20 transition-all active:scale-95 group">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <i className="fas fa-qrcode text-2xl"></i>
              </div>
              <span className="text-[10px] uppercase tracking-widest">MÃ TÍCH ĐIỂM</span>
            </button>
            <button onClick={() => setShowTransfer(true)} className="bg-white/10 text-white border border-white/20 p-6 md:p-8 rounded-[2rem] font-black flex flex-col items-center backdrop-blur-md hover:bg-white/20 transition-all active:scale-95 group">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                <i className="fas fa-paper-plane text-2xl"></i>
              </div>
              <span className="text-[10px] uppercase tracking-widest">CHUYỂN P2P</span>
            </button>
            <button onClick={() => onTabChange('marketplace')} className="bg-orange-500 text-white p-6 md:p-8 rounded-[2rem] font-black flex flex-col items-center shadow-2xl shadow-orange-500/30 hover:scale-[1.03] active:scale-95 transition-all group">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <i className="fas fa-gift text-2xl"></i>
              </div>
              <span className="text-[10px] uppercase tracking-widest">ĐỔI QUÀ</span>
            </button>
          </div>
        </div>
      </section>

      <SmartSuggestions role={currentUser.role} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-6 px-4">
              <h3 className="text-xl font-black text-gray-900 italic uppercase tracking-tighter">Đối tác tiêu biểu</h3>
              <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Xem tất cả</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {companies.map(c => (
                 <div key={c.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center justify-between hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer">
                    <div className="flex items-center space-x-5">
                       <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gray-50 shadow-inner group-hover:scale-110 transition-transform">
                          <img src={c.logo} className="w-full h-full object-cover" />
                       </div>
                       <div>
                          <p className="font-black text-gray-900 text-lg leading-tight mb-1">{c.name}</p>
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{c.category}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-indigo-600 font-black text-xl">+{c.pointRate * 100}%</p>
                       <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">TÍCH ĐIỂM</p>
                    </div>
                 </div>
               ))}
            </div>
          </section>
        </div>
        
        <aside className="space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
             <h3 className="text-lg font-black text-gray-900 italic uppercase mb-6 flex items-center">
               <i className="fas fa-history text-indigo-600 mr-3"></i> Lịch sử điểm
             </h3>
             <div className="space-y-6">
                {transactions.slice(0, 5).map(tx => (
                  <div key={tx.id} className="flex items-center justify-between group">
                     <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${tx.type === 'EARN' ? 'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white' : 'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white'}`}>
                           <i className={`fas ${tx.type === 'EARN' ? 'fa-plus' : 'fa-minus'} text-sm`}></i>
                        </div>
                        <div>
                           <p className="text-sm font-black text-gray-900">{tx.type === 'EARN' ? 'Tích điểm' : 'Tiêu điểm'}</p>
                           <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{new Date(tx.timestamp).toLocaleDateString()}</p>
                        </div>
                     </div>
                     <span className={`text-base font-black ${tx.type === 'EARN' ? 'text-green-600' : 'text-orange-600'}`}>
                        {tx.type === 'EARN' ? `+${tx.pointsEarned}` : `-${tx.pointsSpent}`} P
                     </span>
                  </div>
                ))}
             </div>
             <button className="w-full mt-8 py-4 bg-gray-50 text-gray-400 text-[10px] font-black uppercase rounded-2xl hover:bg-gray-100 transition-all">Xem tất cả giao dịch</button>
          </div>
        </aside>
      </div>

      {showQR && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white rounded-[3rem] p-12 text-center space-y-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="space-y-2">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter">Mã Định Danh</h3>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Dùng để tích điểm tại quầy</p>
              </div>
              <div className="bg-white p-6 rounded-[3rem] border-8 border-indigo-600 inline-block shadow-2xl ring-4 ring-indigo-50">
                 <QRCodeSVG value={currentUser.id} size={200} />
              </div>
              <div className="bg-indigo-50 p-4 rounded-2xl">
                <p className="text-xs font-black text-indigo-900 uppercase tracking-widest">{currentUser.name}</p>
                <p className="text-[10px] text-indigo-400 font-bold">{currentUser.email}</p>
              </div>
              <button onClick={() => setShowQR(false)} className="w-full py-5 bg-gray-900 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">ĐÓNG CỬA SỔ</button>
           </div>
        </div>
      )}

      {showTransfer && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white rounded-[3rem] w-full max-w-md p-10 shadow-2xl animate-in zoom-in-95 duration-300">
              <div className="flex justify-between items-center mb-10">
                 <div>
                   <h3 className="text-3xl font-black italic uppercase tracking-tighter">Chuyển P2P</h3>
                   <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Chuyển điểm tức thì, không mất phí</p>
                 </div>
                 <button onClick={() => setShowTransfer(false)} className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-all"><i className="fas fa-times"></i></button>
              </div>
              <form onSubmit={handleTransferSubmit} className="space-y-8">
                 <div className="space-y-3">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 block">Người nhận (Email)</label>
                    <div className="relative">
                      <i className="fas fa-at absolute left-6 top-1/2 -translate-y-1/2 text-gray-300"></i>
                      <input required type="email" value={transferData.email} onChange={e => setTransferData({...transferData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-100 pl-14 pr-6 py-5 rounded-[1.5rem] outline-none focus:ring-2 focus:ring-indigo-500 font-bold transition-all" placeholder="name@domain.com" />
                    </div>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 block">Số điểm chuyển</label>
                    <div className="relative">
                      <i className="fas fa-coins absolute left-6 top-1/2 -translate-y-1/2 text-gray-300"></i>
                      <input required type="number" value={transferData.amount} onChange={e => setTransferData({...transferData, amount: e.target.value})} className="w-full bg-gray-50 border border-gray-100 pl-14 pr-6 py-5 rounded-[1.5rem] outline-none focus:ring-2 focus:ring-indigo-500 font-black text-2xl" placeholder="0" />
                    </div>
                    <div className="flex justify-between px-1">
                      <span className="text-[10px] text-gray-400 font-bold">Số dư: {points.toLocaleString()} P</span>
                      <button type="button" onClick={() => setTransferData({...transferData, amount: points.toString()})} className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Tất cả</button>
                    </div>
                 </div>
                 <button type="submit" className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] shadow-2xl shadow-indigo-200 active:scale-[0.98] transition-all">XÁC NHẬN CHUYỂN ĐIỂM</button>
              </form>
           </div>
        </div>
      )}
    </div>
  );

  const renderMarketplace = () => (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
       <div className="flex flex-col lg:flex-row items-center justify-between gap-8 bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
          <div>
            <h2 className="text-4xl font-black text-gray-900 italic uppercase tracking-tighter leading-none mb-3">Sàn Ưu Đãi Liên Minh</h2>
            <p className="text-gray-400 font-black uppercase tracking-widest text-[11px]">Dùng điểm đổi lấy hàng ngàn voucher giá trị</p>
          </div>
          <div className="relative w-full lg:w-[450px]">
             <i className="fas fa-search absolute left-8 top-1/2 -translate-y-1/2 text-gray-300 text-lg"></i>
             <input 
               type="text" 
               placeholder="Tìm quà, thương hiệu, danh mục..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-gray-50 border border-gray-100 pl-16 pr-8 py-5 rounded-[2rem] shadow-inner outline-none focus:ring-2 focus:ring-indigo-500 font-bold transition-all text-sm"
             />
          </div>
       </div>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(p => (
            <div key={p.id} className="bg-white p-6 rounded-[3rem] border border-gray-100 shadow-sm group hover:shadow-2xl transition-all flex flex-col">
               <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-6 relative">
                  {p.isFlashSale && (
                    <div className="absolute top-5 left-5 z-10 bg-orange-600 text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg animate-pulse">
                      FLASH SALE
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-[1]"></div>
                  <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               </div>
               <div className="flex-grow space-y-2 px-2">
                 <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest">{companies.find(c => c.id === p.merchantId)?.name}</p>
                 <h4 className="text-xl font-black text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">{p.name}</h4>
                 <p className="text-xs text-gray-400 line-clamp-2">{p.description}</p>
               </div>
               <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between px-2">
                  <div className="flex flex-col">
                    <span className="text-2xl font-black text-orange-600">{p.pointPrice.toLocaleString()} <span className="text-xs opacity-60">P</span></span>
                    <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Tồn kho: {p.stock}</span>
                  </div>
                  <button onClick={() => onPurchase('BURN', p.pointPrice, p.merchantId, { burnPoints: p.pointPrice })} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all">ĐỔI QUÀ</button>
               </div>
            </div>
          ))}
       </div>
       {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
         <div className="py-32 text-center bg-white rounded-[3rem] border border-dashed border-gray-200">
           <i className="fas fa-search text-5xl text-gray-200 mb-6"></i>
           <p className="text-gray-400 font-black uppercase tracking-widest">Không tìm thấy kết quả phù hợp</p>
         </div>
       )}
    </div>
  );

  const renderAffiliate = () => (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-all">
             <div className="w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
               <i className="fas fa-users"></i>
             </div>
             <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] mb-2">Thành viên Cấp 1</p>
             <p className="text-4xl font-black text-gray-900">{affiliateStats.f1Count} <span className="text-sm opacity-30 italic">User</span></p>
          </div>
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-all">
             <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
               <i className="fas fa-network-wired"></i>
             </div>
             <p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.2em] mb-2">Thành viên Cấp 2</p>
             <p className="text-4xl font-black text-gray-900">{affiliateStats.f2Count} <span className="text-sm opacity-30 italic">User</span></p>
          </div>
          <div className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl flex flex-col items-center text-center group hover:-translate-y-2 transition-all">
             <div className="w-20 h-20 rounded-3xl bg-white/10 text-white flex items-center justify-center text-3xl mb-6 group-hover:bg-white/20 transition-all">
               <i className="fas fa-wallet"></i>
             </div>
             <p className="text-[11px] text-indigo-200 font-black uppercase tracking-[0.2em] mb-2">Hoa hồng khả dụng</p>
             <p className="text-4xl font-black">{walletVND.toLocaleString()} <span className="text-sm opacity-50 italic">đ</span></p>
          </div>
       </div>

       <section className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-10 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6 bg-gray-50/30">
             <div>
               <h3 className="text-2xl font-black italic uppercase tracking-tighter">Mạng Lưới Cộng Tác Viên</h3>
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1">Xây dựng cộng đồng, nhận thưởng trọn đời</p>
             </div>
             <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">SAO CHÉP LINK GIỚI THIỆU</button>
          </div>
          <div className="p-8 space-y-4">
             {[1,2,3,4,5].map(i => (
               <div key={i} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-[2rem] hover:bg-white hover:shadow-lg hover:border-gray-100 border border-transparent transition-all group">
                  <div className="flex items-center space-x-5">
                     <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-900 font-black text-xs border border-gray-100 group-hover:bg-indigo-600 group-hover:text-white transition-all">U{i}</div>
                     <div>
                        <p className="text-sm font-black text-gray-900">Thành viên F1 #{100 + i}</p>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Tham gia: 1{i}/05/2024</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-base font-black text-green-600">+{ (i * 25000).toLocaleString() } đ</p>
                     <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">HOA HỒNG TỪ CHI TIÊU</p>
                  </div>
               </div>
             ))}
          </div>
       </section>
    </div>
  );

  const renderGamification = () => (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <button onClick={onCheckIn} className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm hover:scale-[1.03] active:scale-95 transition-all text-left group">
             <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <i className="fas fa-calendar-check"></i>
             </div>
             <p className="text-3xl font-black text-gray-900 italic uppercase tracking-tighter">Điểm danh</p>
             <p className="text-[10px] text-gray-400 font-black mt-3 uppercase tracking-widest">Chuỗi: <span className="text-indigo-600">{currentUser.streak}</span> ngày</p>
          </button>
          
          <button onClick={() => setShowLuckyDraw(true)} className="bg-gray-900 p-12 rounded-[3.5rem] text-white shadow-2xl hover:scale-[1.03] active:scale-95 transition-all text-left group relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-12 -mt-12"></div>
             <div className="w-16 h-16 rounded-3xl bg-white/10 text-yellow-400 flex items-center justify-center text-3xl mb-8 group-hover:bg-yellow-400 group-hover:text-gray-900 transition-all">
                <i className="fas fa-clover"></i>
             </div>
             <p className="text-3xl font-black italic uppercase tracking-tighter">Vòng quay</p>
             <p className="text-[10px] text-gray-400 font-black mt-3 uppercase tracking-widest">Lượt còn: <span className="text-yellow-400">{currentUser.luckySpins}</span></p>
          </button>

          <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-sm text-left group hover:shadow-xl transition-all">
             <div className="w-16 h-16 rounded-3xl bg-purple-50 text-purple-600 flex items-center justify-center text-3xl mb-8 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <i className="fas fa-trophy"></i>
             </div>
             <p className="text-3xl font-black text-gray-900 italic uppercase tracking-tighter">Bảng hạng</p>
             <p className="text-[10px] text-gray-400 font-black mt-3 uppercase tracking-widest">Hạng của bạn: <span className="text-purple-600">#{gamificationStats.leaderboardRank}</span></p>
          </div>

          <div className="bg-indigo-600 p-12 rounded-[3.5rem] text-white shadow-2xl text-left group hover:-translate-y-2 transition-all">
             <div className="w-16 h-16 rounded-3xl bg-white/10 text-indigo-200 flex items-center justify-center text-3xl mb-8 group-hover:bg-white/20 transition-all">
                <i className="fas fa-tasks"></i>
             </div>
             <p className="text-3xl font-black italic uppercase tracking-tighter">Nhiệm vụ</p>
             <p className="text-[10px] text-indigo-200 font-black mt-3 uppercase tracking-widest">Hoàn thành: <span className="text-white">{gamificationStats.activeQuests}</span>/5</p>
          </div>
       </div>

       {showLuckyDraw && (
         <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="bg-white rounded-[4rem] w-full max-w-md p-14 text-center space-y-10 shadow-[0_30px_100px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300">
               <div className="space-y-3">
                 <h3 className="text-4xl font-black italic uppercase text-gray-900 tracking-tighter">Vòng Quay Vận May</h3>
                 <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Cơ hội nhận đến 10,000 P mỗi lượt</p>
               </div>
               
               <div className="w-64 h-64 mx-auto rounded-full border-[12px] border-indigo-600 flex items-center justify-center relative shadow-2xl ring-8 ring-indigo-50">
                  <div className="absolute -top-4 w-4 h-12 bg-red-600 rounded-full z-10 shadow-lg"></div>
                  <div className="w-full h-full rounded-full border-4 border-white animate-spin-slow flex items-center justify-center">
                    <i className="fas fa-star text-7xl text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]"></i>
                  </div>
               </div>
               
               <p className="text-sm text-gray-500 font-medium px-4">Sử dụng <span className="font-black text-indigo-600">50 P</span> cho một lượt quay hoặc nhận lượt miễn phí qua nhiệm vụ.</p>
               
               <div className="flex gap-4">
                  <button onClick={() => setShowLuckyDraw(false)} className="flex-1 py-5 bg-gray-100 text-gray-400 font-black rounded-3xl uppercase text-[11px] tracking-widest hover:bg-gray-200 transition-all">ĐÓNG</button>
                  <button onClick={() => { onSpin(); }} className="flex-[2] py-5 bg-indigo-600 text-white font-black rounded-3xl uppercase text-[11px] tracking-widest shadow-2xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all">BẮT ĐẦU QUAY</button>
               </div>
            </div>
         </div>
       )}
    </div>
  );

  switch (activeSection) {
    case 'dashboard': return renderDashboard();
    case 'marketplace': return renderMarketplace();
    case 'affiliate': return renderAffiliate();
    case 'gamification': return renderGamification();
    default: return renderDashboard();
  }
};

export default MemberView;
