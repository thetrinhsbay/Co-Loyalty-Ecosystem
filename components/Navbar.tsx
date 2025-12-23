
import React from 'react';
import { User, UserRole } from '../types';
import { initialBottlenecks } from '../data/mockData';
import BottleneckRadar from './BottleneckRadar';

interface NavbarProps {
  currentUser: User;
  points: number;
  walletVND: number;
  onSwitchRole: (role: UserRole) => void;
  onTabChange: (tab: string) => void;
  activeTab: string;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, points, walletVND, onSwitchRole, onTabChange, activeTab }) => {
  const getMenuItems = () => {
    let baseMenu = [];
    switch (currentUser.role) {
      case UserRole.MEMBER:
      case UserRole.AFFILIATE:
        baseMenu = [
          { id: 'dashboard', label: 'Trang chủ', icon: 'fa-house', category: 'UX' as const },
          { id: 'marketplace', label: 'Ưu đãi', icon: 'fa-bag-shopping', category: 'UX' as const },
          { id: 'gamification', label: 'Giải trí', icon: 'fa-gamepad', category: 'UX' as const },
          { id: 'affiliate', label: 'Mạng lưới', icon: 'fa-users-viewfinder', category: 'FINANCIAL' as const },
        ];
        break;
      case UserRole.DIRECTOR:
      case UserRole.MANAGER:
      case UserRole.CASHIER:
        baseMenu = [
          { id: 'dashboard', label: 'Tổng quan', icon: 'fa-chart-pie', category: 'FINANCIAL' as const },
          { id: 'inventory', label: 'Sản phẩm', icon: 'fa-boxes-stacked', category: 'OPERATIONAL' as const },
          { id: 'settlement', label: 'Đối soát', icon: 'fa-file-invoice-dollar', category: 'FINANCIAL' as const },
        ];
        break;
      case UserRole.ADMIN:
        baseMenu = [
          { id: 'dashboard', label: 'Điều khiển', icon: 'fa-gauge-high', category: 'TECH' as const },
          { id: 'partners', label: 'Đối tác', icon: 'fa-handshake', category: 'OPERATIONAL' as const },
          { id: 'security', label: 'Bảo mật', icon: 'fa-shield-halved', category: 'LEGAL' as const },
        ];
        break;
      default:
        baseMenu = [];
    }
    return [...baseMenu, { id: 'strategy', label: 'HDSD', icon: 'fa-circle-info', category: 'UX' as const }];
  };

  const menuItems = getMenuItems();

  return (
    <nav className="sticky top-0 z-[100] bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm px-4">
      <div className="container mx-auto flex items-center justify-between h-20">
        <div className="flex items-center space-x-10">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onTabChange('dashboard')}>
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform">
              <i className="fas fa-link text-lg"></i>
            </div>
            <span className="text-xl font-black tracking-tighter text-gray-900 hidden sm:block">CO-LOYALTY</span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map(item => (
              <button 
                key={item.id} 
                onClick={() => onTabChange(item.id)} 
                className={`group relative px-5 py-2.5 rounded-2xl text-[13px] font-black transition-all flex items-center space-x-2.5 ${activeTab === item.id ? 'bg-gray-900 text-white shadow-xl shadow-gray-200' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <i className={`fas ${item.icon} text-xs opacity-60`}></i>
                <span>{item.label.toUpperCase()}</span>
                <div className="absolute top-0 right-0">
                  <BottleneckRadar category={item.category} bottlenecks={initialBottlenecks} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {(currentUser.role === UserRole.MEMBER || currentUser.role === UserRole.AFFILIATE) && (
            <div className="hidden md:flex items-center space-x-2 bg-gray-50 p-1.5 rounded-[1.5rem] border border-gray-100">
               <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center">
                  <i className="fas fa-coins text-orange-500 mr-2.5"></i>
                  <span className="text-gray-900 font-black text-sm">{points.toLocaleString()} <span className="text-[10px] text-gray-400 ml-0.5">P</span></span>
               </div>
               <div className="px-4 py-2 flex items-center">
                  <span className="text-gray-900 font-black text-sm">{walletVND.toLocaleString()} <span className="text-[10px] text-gray-400 ml-0.5">đ</span></span>
               </div>
            </div>
          )}

          <div className="relative group">
            <button className="flex items-center space-x-3 bg-white hover:bg-gray-50 border border-gray-100 p-2 rounded-2xl shadow-sm transition-all active:scale-95">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl flex items-center justify-center text-indigo-600 font-black text-lg border border-indigo-100/50">
                {currentUser.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-left pr-2">
                <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest leading-none mb-1">{currentUser.role}</p>
                <p className="text-sm font-black text-gray-900 leading-none">{currentUser.name}</p>
              </div>
              <i className="fas fa-chevron-down text-[10px] text-gray-300 pr-1"></i>
            </button>
            
            <div className="absolute right-0 mt-3 w-72 bg-white rounded-[2rem] shadow-2xl border border-gray-100 py-4 hidden group-hover:block animate-in fade-in zoom-in-95 duration-200 origin-top-right z-[110]">
              <div className="px-6 py-4 border-b border-gray-50">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Hồ sơ người dùng</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl font-black">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900">{currentUser.name}</p>
                    <p className="text-xs text-gray-400 font-medium">{currentUser.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 space-y-1">
                <p className="px-3 py-2 text-[9px] font-black text-gray-300 uppercase tracking-[0.2em]">Chuyển đổi vai trò</p>
                {[
                  { role: UserRole.MEMBER, label: 'Khách hàng', icon: 'fa-user-tag' },
                  { role: UserRole.DIRECTOR, label: 'Doanh nghiệp', icon: 'fa-store' },
                  { role: UserRole.ADMIN, label: 'Quản trị hệ thống', icon: 'fa-shield-check' }
                ].map(item => (
                  <button 
                    key={item.role}
                    onClick={() => onSwitchRole(item.role)} 
                    className={`w-full text-left px-4 py-3 text-[13px] font-black rounded-xl flex items-center space-x-3 transition-all ${currentUser.role === item.role ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${currentUser.role === item.role ? 'bg-white shadow-sm' : 'bg-gray-100'}`}>
                      <i className={`fas ${item.icon} text-xs`}></i>
                    </div>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="p-3 border-t border-gray-50">
                <button className="w-full px-4 py-3 text-[13px] font-black text-red-500 hover:bg-red-50 rounded-xl flex items-center space-x-3 transition-all">
                  <i className="fas fa-right-from-bracket text-xs"></i>
                  <span>ĐĂNG XUẤT</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
