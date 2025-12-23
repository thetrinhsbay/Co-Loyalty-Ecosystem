
import React from 'react';
import { UserRole } from '../types';

interface Suggestion {
  icon: string;
  title: string;
  description: string;
  action: () => void;
  color: string;
}

interface SmartSuggestionsProps {
  role: UserRole;
}

const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({ role }) => {
  const getSuggestions = (): Suggestion[] => {
    switch (role) {
      case UserRole.MEMBER:
      case UserRole.AFFILIATE:
        return [
          { icon: 'fa-location-dot', title: 'Shop gần bạn', description: 'Brew & Bloom đang x2 điểm trong 1 giờ.', action: () => {}, color: 'indigo' },
          { icon: 'fa-tag', title: 'Deal hời nhất', description: 'Đổi Voucher 50k chỉ với 400 điểm.', action: () => {}, color: 'orange' },
          { icon: 'fa-user-plus', title: 'Mời bạn bè', description: 'Nhận ngay 1% hoa hồng trọn đời từ F1.', action: () => {}, color: 'green' },
          { icon: 'fa-id-card', title: 'Hoàn thiện hồ sơ', description: 'Nhận 500 điểm khi xác thực eKYC.', action: () => {}, color: 'blue' },
          { icon: 'fa-calendar-check', title: 'Điểm danh ngày', description: 'Tích 10 điểm mỗi ngày khi mở App.', action: () => {}, color: 'purple' },
          { icon: 'fa-chart-line', title: 'Hạng thành viên', description: 'Còn 200 điểm nữa để lên hạng VIP.', action: () => {}, color: 'pink' },
        ];
      case UserRole.CASHIER:
      case UserRole.MANAGER:
      case UserRole.DIRECTOR:
        return [
          { icon: 'fa-bolt', title: 'Kích cầu nhanh', description: 'Tặng x2 điểm cho hóa đơn trên 500k.', action: () => {}, color: 'yellow' },
          { icon: 'fa-comment-dots', title: 'Mời đánh giá', description: 'Nhắc khách rate 5 sao để nhận voucher.', action: () => {}, color: 'blue' },
          { icon: 'fa-wallet', title: 'Nạp quỹ ngay', description: 'Số dư ví sắp hết, khách sẽ không tích được điểm.', action: () => {}, color: 'red' },
          { icon: 'fa-users', title: 'Thi đua thu ngân', description: 'Nhân viên Lan đang dẫn đầu lượt mời khách.', action: () => {}, color: 'green' },
          { icon: 'fa-gift', title: 'Tạo Flash Sale', description: 'Xả hàng tồn bằng cách cho đổi 100% điểm.', action: () => {}, color: 'orange' },
          { icon: 'fa-file-export', title: 'Báo cáo ngày', description: 'Xuất file đối soát gửi kế toán hôm nay.', action: () => {}, color: 'indigo' },
        ];
      case UserRole.ADMIN:
        return [
          { icon: 'fa-money-bill-transfer', title: 'Duyệt rút tiền', description: '15 Merchant đang chờ thanh toán T+1.', action: () => {}, color: 'green' },
          { icon: 'fa-user-shield', title: 'Nghi vấn gian lận', description: 'User U123 có tần suất tích điểm bất thường.', action: () => {}, color: 'red' },
          { icon: 'fa-gauge-high', title: 'Liquidity Alert', description: 'Hệ số an toàn đang ở mức 0.95 (Warning).', action: () => {}, color: 'orange' },
          { icon: 'fa-handshake', title: 'Shop mới chờ duyệt', description: 'Luxe Attire vừa gửi hồ sơ đăng ký GPKD.', action: () => {}, color: 'blue' },
          { icon: 'fa-bullhorn', title: 'Campaign Toàn sàn', description: 'Kích hoạt "Siêu Hội Đổi Điểm" cuối tuần.', action: () => {}, color: 'purple' },
          { icon: 'fa-database', title: 'Dữ liệu báo cáo', description: 'Bán Insight tiêu dùng tháng 5 cho đối tác.', action: () => {}, color: 'indigo' },
        ];
      default:
        return [];
    }
  };

  const suggestions = getSuggestions();

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">6 Gợi ý thông minh (AI Powered)</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {suggestions.map((s, idx) => (
          <button 
            key={idx} 
            onClick={s.action}
            className="group flex flex-col items-center text-center p-4 rounded-3xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
          >
            <div className={`w-12 h-12 rounded-2xl bg-${s.color}-50 text-${s.color}-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <i className={`fas ${s.icon} text-lg`}></i>
            </div>
            <p className="text-[11px] font-black text-gray-900 mb-1 leading-tight">{s.title}</p>
            <p className="text-[9px] text-gray-400 leading-tight line-clamp-2 font-medium">{s.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SmartSuggestions;
