
import React, { useState } from 'react';

type MainTab = 'overview' | 'whitepaper' | 'workflows';
type RoleTab = 'member' | 'merchant' | 'admin';

const StrategyGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MainTab>('overview');
  const [activeRole, setActiveRole] = useState<RoleTab>('member');

  const WorkflowSection = ({ title, icon, color, items }: { title: string; icon: string; color: string; items: { step: string; detail: string; action: string }[] }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all space-y-6">
      <div className="flex items-center space-x-3 mb-2">
        <div className={`w-10 h-10 rounded-xl bg-${color}-50 flex items-center justify-center text-${color}-600`}>
          <i className={`fas ${icon}`}></i>
        </div>
        <h3 className="text-xl font-black text-gray-900 tracking-tight">{title}</h3>
      </div>
      <div className="space-y-6">
        {items.map((item, idx) => (
          <div key={idx} className="relative pl-8 group">
            <div className={`absolute left-0 top-0 bottom-0 w-px bg-gray-100 group-last:bg-transparent`}></div>
            <div className={`absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-${color}-400 ring-4 ring-white`}></div>
            <div className="space-y-1">
              <p className="text-sm font-black text-gray-900">{item.step}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{item.detail}</p>
              <div className="pt-1">
                <span className={`inline-flex items-center text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-${color}-50 text-${color}-600`}>
                  Luồng: {item.action}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section className="bg-gradient-to-br from-gray-900 to-indigo-950 rounded-[3rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-grow space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/20 text-indigo-300 text-xs font-black uppercase tracking-widest">
              Supreme Goal
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight italic tracking-tighter">Mục tiêu tối thượng: Dòng chảy vàng ròng</h2>
            <div className="space-y-4 text-indigo-100/80 text-lg leading-relaxed">
              <p className="italic font-medium">
                "Biến điểm thành tiền và kích thích 'DÒNG CHẢY TIÊU DÙNG'. Điểm nằm im là nợ treo, điểm được tiêu là động lực tăng trưởng."
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 w-48 h-48 bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center backdrop-blur-md">
            <i className="fas fa-chart-line text-7xl text-indigo-400"></i>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { type: 'S', color: 'green', title: 'Strengths', items: ['Hiệu ứng mạng lưới giảm CAC', 'Dữ liệu hành vi đa ngành', 'Thanh khoản cao'] },
          { type: 'W', color: 'red', title: 'Weaknesses', items: ['Mâu thuẫn lợi ích đối tác', 'Phức tạp đối soát dòng tiền', 'Rủi ro thanh khoản chéo'] },
          { type: 'O', color: 'blue', title: 'Opportunities', items: ['Trở thành tiền tệ nội bộ', 'Cá nhân hóa AI Geofencing', 'Mở rộng vay điểm B2B'] },
          { type: 'T', color: 'orange', title: 'Threats', items: ['Gian lận nhân viên shop', 'Lạm phát nợ điểm hệ thống', 'Merchant rời bỏ nền tảng'] },
        ].map((swot) => (
          <div key={swot.type} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
            <div className={`flex items-center space-x-3 text-${swot.color}-600`}>
              <div className={`w-10 h-10 rounded-xl bg-${swot.color}-50 flex items-center justify-center font-black`}>{swot.type}</div>
              <h3 className="text-xl font-black">{swot.title}</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 font-medium">
              {swot.items.map((item, i) => (
                <li key={i} className="flex items-start">
                  <i className={`fas fa-check-circle mt-1 mr-2 text-${swot.color}-400 opacity-50`}></i> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWhitepaper = () => (
    <div className="space-y-16 py-10 animate-in fade-in zoom-in-95 duration-700">
      <div className="text-center space-y-8">
        <div className="inline-block p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl">
           <div className="bg-white rounded-xl px-4 py-1 text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">Tài liệu vận hành</div>
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-gray-900 tracking-tighter leading-none italic">
          THE NEXUS <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">PROTOCOL</span>
        </h1>
        <p className="text-gray-400 font-bold uppercase tracking-[0.5em] text-xs">Kỷ nguyên liên minh số • Chiến lược thanh khoản tuyệt đối</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-12">
          <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed font-medium">
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">01. Triết lý "Hồ nước chung"</h3>
            <p className="text-lg">Chúng ta không xây dựng các "giếng nước" riêng biệt. Đây là một ĐẠI DƯƠNG thanh khoản. Điểm sinh ra ở đâu không quan trọng, quan trọng là nó chảy về đâu.</p>
            
            <h3 className="text-3xl font-black text-gray-900 tracking-tight">02. Cơ chế "Van một chiều" Dòng tiền</h3>
            <p>Sử dụng cơ chế <strong>Pre-paid Wallet</strong>: Merchant nạp VND (Fiat) {"->"} Đúc Token (Points) vào Quỹ Bảo lãnh. Khi User tiêu điểm tại Shop B, tiền VND sẽ được "giải phóng" từ Quỹ chuyển về Shop B sau chu kỳ T+1.</p>

            <h3 className="text-3xl font-black text-gray-900 tracking-tight">03. Thôi miên thị giác & Trải nghiệm Radar</h3>
            <p>Trang chủ phải là một <strong>Sàn giao dịch cảm xúc</strong>. Sử dụng Wealth Mirror để hiện số dư VND thay vì điểm số vô hình. Tích hợp Heatmap tìm shop đang X2 điểm quanh vị trí người dùng.</p>
          </div>
        </div>
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <i className="fas fa-shield-halved text-5xl text-red-500 mb-8"></i>
              <h4 className="font-black mb-4 uppercase text-sm tracking-widest">Mắt Thần AI</h4>
              <p className="text-xs text-gray-400 italic leading-relaxed">Tự động phát hiện gian lận thu ngân (The Greedy Cashier) và farm tài khoản ảo qua GPS & Device Fingerprinting.</p>
           </div>
           <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <i className="fas fa-handshake text-5xl text-yellow-400 mb-8"></i>
              <h4 className="font-black mb-4 uppercase text-sm tracking-widest">Cái bắt tay số</h4>
              <p className="text-xs text-indigo-100 italic leading-relaxed">Chế độ "Không não" (No-Brainer) cho Merchant: Chỉ 2 nút TÍCH & TIÊU. Kick-back trực tiếp cho thu ngân 5k/lượt mời cài app.</p>
           </div>
        </div>
      </div>
    </div>
  );

  const renderWorkflows = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex justify-center bg-gray-100 p-2 rounded-[2.5rem] w-fit mx-auto shadow-inner">
        {[
          { id: 'member', label: 'Khách hàng', icon: 'fa-user' },
          { id: 'merchant', label: 'Đối tác', icon: 'fa-store' },
          { id: 'admin', label: 'Quản trị', icon: 'fa-shield-check' }
        ].map(role => (
          <button
            key={role.id}
            onClick={() => setActiveRole(role.id as RoleTab)}
            className={`px-8 py-4 rounded-[2rem] text-xs font-black transition-all flex items-center ${activeRole === role.id ? 'bg-white text-indigo-600 shadow-xl' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <i className={`fas ${role.icon} mr-2`}></i> {role.label.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {activeRole === 'member' && (
          <>
            <WorkflowSection title="1. Kích hoạt (Onboarding)" icon="fa-rocket" color="indigo" items={[
              { step: 'Liên kết nguồn tiền', detail: 'Liên kết ngân hàng/Ví để mua deal 1.000đ đầu tiên kích hoạt ví.', action: 'Fintech Connect' },
              { step: 'Xác thực định danh eKYC', detail: 'Chụp CCCD -> Quét mặt -> Nhận huy hiệu Công dân số VIP.', action: 'Identity Sync' }
            ]} />
            <WorkflowSection title="2. Săn & Tích lũy (Earn)" icon="fa-coins" color="green" items={[
              { step: 'Tích điểm tại quầy', detail: 'Bật QR Code cá nhân đưa thu ngân quét tích điểm trực tiếp.', action: 'Direct Scanning' },
              { step: 'Quét hóa đơn Bill Scan', detail: 'Chụp hóa đơn giấy, AI tự đọc số tiền và duyệt điểm sau 15p.', action: 'OCR Processing' },
              { step: 'Giới thiệu bạn bè', detail: 'Nhận hoa hồng điểm khi bạn bè phát sinh giao dịch đầu tiên.', action: 'Viral Loop' }
            ]} />
            <WorkflowSection title="3. Tiêu dùng & Đổi quà (Burn)" icon="fa-bag-shopping" color="orange" items={[
              { step: 'Đổi Voucher Marketplace', detail: 'Chọn quà -> Đổi ngay -> Voucher lưu vào Ví của tôi.', action: 'Instant Redeem' },
              { step: 'Trừ điểm thanh toán', detail: 'Bật nút "Dùng điểm" tại quầy để tự động cấn trừ số dư.', action: 'Split Payment' }
            ]} />
            <WorkflowSection title="4. Hỗ trợ (Support)" icon="fa-headset" color="gray" items={[
              { step: 'Báo cáo lỗi giao dịch', detail: 'Chọn giao dịch trong lịch sử -> Bấm Báo lỗi -> AI Chatbot.', action: 'Auto Support' },
              { step: 'Khôi phục tài khoản', detail: 'Quy trình lấy lại SIM/Mật khẩu bằng xác thực khuôn mặt.', action: 'Bio Recovery' }
            ]} />
          </>
        )}

        {activeRole === 'merchant' && (
          <>
            <WorkflowSection title="1. Thiết lập Cửa hàng" icon="fa-gear" color="indigo" items={[
              { step: 'Nạp Năng lượng (Pre-paid)', detail: 'Nạp VND vào ví Merchant để mở khóa tính năng tính điểm.', action: 'Balance Injection' },
              { step: 'Cấu hình tỷ lệ điểm', detail: 'Chọn mức % theo biên lợi nhuận của ngành hàng (5%-10%).', action: 'Rate Config' }
            ]} />
            <WorkflowSection title="2. Nghiệp vụ Thu ngân" icon="fa-cash-register" color="green" items={[
              { step: 'Quét tích điểm', detail: 'Nhập số tiền hóa đơn -> Quét khách -> Xác nhận cộng điểm.', action: 'Point Issuance' },
              { step: 'Thanh toán bằng điểm', detail: 'Quét khách -> Hệ thống báo số dư -> Xác nhận trừ điểm.', action: 'Point Redemption' },
              { step: 'Hoàn tác (Void)', detail: 'Hủy giao dịch tích nhầm trong 15p (Cần quyền quản lý).', action: 'Void Transaction' }
            ]} />
            <WorkflowSection title="3. Tài chính & Đối soát" icon="fa-file-invoice-dollar" color="orange" items={[
              { step: 'Rút tiền (Withdraw)', detail: 'Tiền doanh thu điểm về ngân hàng vào 10:00 sáng hôm sau.', action: 'Payout T+1' },
              { step: 'Báo cáo thuế', detail: 'Xuất file Excel hạch toán điểm là chi phí khuyến mãi.', action: 'Accounting Export' }
            ]} />
            <WorkflowSection title="4. Nhân sự" icon="fa-users-gear" color="gray" items={[
              { step: 'Tạo TK Thu ngân', detail: 'Cấp quyền chỉ được quét, không được rút tiền/đối soát.', action: 'Role Management' },
              { step: 'Thi đua hiệu suất', detail: 'Theo dõi ai mời khách cài app nhiều nhất để thưởng nóng.', action: 'Staff KPI' }
            ]} />
          </>
        )}

        {activeRole === 'admin' && (
          <>
            <WorkflowSection title="1. Kiểm soát Rủi ro" icon="fa-shield-halved" color="red" items={[
              { step: 'Fraud Monitor', detail: 'Giám sát hành vi tích điểm bất thường qua GPS & Tần suất.', action: 'Real-time Freeze' },
              { step: 'Duyệt Bill chụp tay', detail: 'Manual review các yêu cầu tích điểm từ hóa đơn chụp ảnh.', action: 'Manual Review' }
            ]} />
            <WorkflowSection title="2. Vận hành Đối tác" icon="fa-handshake" color="blue" items={[
              { step: 'KYC Doanh nghiệp', detail: 'Duyệt GPKD của Merchant mới và ký hợp đồng điện tử.', action: 'B2B Onboarding' },
              { step: 'Chiến dịch toàn sàn', detail: 'Tạo ngày hội Siêu tích điểm x2 toàn hệ thống liên minh.', action: 'Campaign Push' }
            ]} />
            <WorkflowSection title="3. Quản trị Dòng tiền" icon="fa-vault" color="indigo" items={[
              { step: 'Treasury Recon', detail: 'Đối soát số dư ví ảo và tiền mặt tại ngân hàng bảo lãnh.', action: 'Bank Reconciliation' },
              { step: 'Quản lý Điểm gãy', detail: 'Hạch toán lợi nhuận từ các điểm hết hạn không sử dụng.', action: 'Breakage Revenue' }
            ]} />
            <div className="bg-gray-900 p-10 rounded-[2.5rem] text-white flex flex-col justify-center space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h4 className="font-black text-sm uppercase tracking-widest">God View Active</h4>
              </div>
              <p className="text-xs text-gray-400 italic leading-relaxed">Mọi thay đổi tham số hệ thống yêu cầu xác thực 2-Admin (2-of-2 Signature).</p>
            </div>
          </>
        )}
      </div>

      <div className="bg-orange-50 p-8 rounded-[2.5rem] border border-orange-100 flex items-start space-x-4">
        <i className="fas fa-wand-magic-sparkles text-orange-500 text-2xl mt-1"></i>
        <div>
          <h4 className="font-black text-orange-800 uppercase text-xs tracking-widest mb-1">Mẹo UI/UX: Hướng dẫn ngữ cảnh (Contextual)</h4>
          <p className="text-sm text-orange-700 font-medium">Hệ thống sẽ không hiện toàn bộ Menu ngay lập tức. Merchant mới sẽ được dẫn dắt theo Wizard: Nạp tiền -> Tạo nhân viên -> Thử giao dịch đầu tiên.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-20 px-4">
      <div className="text-center mt-12 mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter italic">
          SIÊU LOGIC <span className="text-indigo-600">VẬN HÀNH</span>
        </h1>
        <div className="flex justify-center space-x-1 bg-gray-50 p-1.5 rounded-3xl w-fit mx-auto border border-gray-100">
          {[
            { id: 'overview', label: 'Tổng quan' },
            { id: 'whitepaper', label: 'Whitepaper' },
            { id: 'workflows', label: 'Quy trình' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as MainTab)}
              className={`px-10 py-4 rounded-2xl text-[11px] font-black transition-all ${activeTab === tab.id ? 'bg-gray-900 text-white shadow-2xl' : 'text-gray-400 hover:text-gray-600 hover:bg-white'}`}
            >
              {tab.label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'whitepaper' && renderWhitepaper()}
      {activeTab === 'workflows' && renderWorkflows()}

      <footer className="text-center mt-20 pt-10 border-t border-gray-100">
         <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.5em]">The Nexus Protocol • 2024 • Secured by Blockchain</p>
      </footer>
    </div>
  );
};

export default StrategyGuide;
