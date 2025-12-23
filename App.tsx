
import React, { useState, useMemo, useEffect } from 'react';
import { UserRole, User, Company, Product, Transaction, MemberTier, TreasuryStats, MerchantOpsStats, AffiliateStats, GamificationStats, RiskStats, AnalyticsBI, RFMUser } from './types';
import { users as initialUsers, companies as initialCompanies, products as initialProducts, quests as initialQuests } from './data/mockData';
import Navbar from './components/Navbar';
import MemberView from './components/MemberView';
import MerchantView from './components/MerchantView';
import AdminView from './components/AdminView';
import ChatSupport from './components/ChatSupport';
import StrategyGuide from './components/StrategyGuide';
import LoginOverlay from './components/LoginOverlay';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allUsers, setAllUsers] = useState<User[]>(initialUsers);
  const [currentUserId, setCurrentUserId] = useState<string>(initialUsers[0].id);
  const [companies, setCompanies] = useState<Company[]>(initialCompanies.map(c => ({ ...c, reserve: c.balance * 0.05, lastReconDelta: 0 })));
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');

  const currentUser = useMemo(() => 
    allUsers.find(u => u.id === currentUserId) || allUsers[0], 
    [allUsers, currentUserId]
  );

  const handleRoleSwitch = (role: UserRole) => {
    const user = allUsers.find(u => u.role === role) || allUsers[0];
    setCurrentUserId(user.id);
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTransaction = (type: string, amount: number, merchantId: string, options?: any) => {
    if (currentUser.isBlacklisted) { alert("Tài khoản của bạn đang bị treo do vi phạm an ninh."); return; }
    
    const merchant = companies.find(c => c.id === merchantId);
    const POINT_VAL = 1000;
    const PLATFORM_FEE_RATE = 0.015;

    let pointsEarned = 0;
    let pointsSpent = 0;
    let platformFee = 0;

    const newAllUsers = [...allUsers];

    if (type === 'EARN') {
      pointsEarned = Math.floor((amount * (merchant?.pointRate || 0.1) / POINT_VAL));
      const pointCostVND = pointsEarned * POINT_VAL;
      if (merchant && merchant.balance < pointCostVND) { alert("Cửa hàng hiện cạn ví bảo chứng. Vui lòng liên hệ quản trị."); return; }
      setCompanies(prev => prev.map(c => c.id === merchantId ? { ...c, balance: c.balance - pointCostVND, totalPointsIssued: c.totalPointsIssued + pointsEarned } : c));
      const userIdx = newAllUsers.findIndex(u => u.id === currentUser.id);
      newAllUsers[userIdx] = { ...newAllUsers[userIdx], points: newAllUsers[userIdx].points + pointsEarned, exp: newAllUsers[userIdx].exp + Math.floor(amount / 1000) };
    } else if (type === 'BURN') {
      pointsSpent = options?.burnPoints || amount;
      if (currentUser.points < pointsSpent) { alert("Số dư điểm của bạn không đủ để thực hiện giao dịch này."); return; }
      const cashValue = pointsSpent * POINT_VAL;
      platformFee = cashValue * PLATFORM_FEE_RATE;
      const userIdx = newAllUsers.findIndex(u => u.id === currentUser.id);
      newAllUsers[userIdx] = { ...newAllUsers[userIdx], points: newAllUsers[userIdx].points - pointsSpent };
      setCompanies(prev => prev.map(c => c.id === merchantId ? { ...c, balance: c.balance + (cashValue - platformFee), totalPointsRedeemed: c.totalPointsRedeemed + pointsSpent } : c));
    } else if (type === 'DEPOSIT') {
      setCompanies(prev => prev.map(c => c.id === merchantId ? { ...c, balance: c.balance + amount } : c));
    } else if (type === 'WITHDRAW') {
      if ((merchant?.balance || 0) < amount) { alert("Số dư khả dụng không đủ để thực hiện rút tiền."); return; }
      setCompanies(prev => prev.map(c => c.id === merchantId ? { ...c, balance: c.balance - amount } : c));
    }

    setAllUsers(newAllUsers);
    setTransactions(prev => [{
      id: `TX-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      userId: currentUser.id,
      merchantId,
      amount,
      pointsEarned: pointsEarned || undefined,
      pointsSpent: pointsSpent || undefined,
      platformFee: platformFee || undefined,
      type: type as any,
      timestamp: new Date(),
      status: 'COMPLETED'
    }, ...prev]);
  };

  const handleP2PTransfer = (email: string, amount: number) => {
    const target = allUsers.find(u => u.email === email);
    if (!target) { alert("Không tìm thấy người nhận với email này."); return; }
    if (currentUser.points < amount) { alert("Số dư điểm không đủ."); return; }
    if (target.id === currentUser.id) { alert("Không thể tự chuyển điểm cho chính mình."); return; }
    
    setAllUsers(prev => prev.map(u => {
      if (u.id === currentUser.id) return { ...u, points: u.points - amount };
      if (u.id === target.id) return { ...u, points: u.points + amount };
      return u;
    }));
    
    setTransactions(prev => [{
      id: `TX-P2P-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      userId: currentUser.id,
      merchantId: 'SYSTEM',
      amount: 0,
      pointsSpent: amount,
      type: 'TRANSFER',
      timestamp: new Date(),
      status: 'COMPLETED',
      receiverId: target.id
    }, ...prev]);

    alert(`Đã chuyển thành công ${amount.toLocaleString()} P tới ${target.name}.`);
  };

  const handleCheckIn = () => {
    setAllUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, points: u.points + 10, streak: u.streak + 1, luckySpins: u.luckySpins + 1 } : u));
    alert("Điểm danh thành công! Bạn nhận được +10 P và +1 Lượt quay may mắn.");
  };

  const handleSpin = () => {
    if (currentUser.luckySpins <= 0) { alert("Bạn đã hết lượt quay ngày hôm nay."); return; }
    const rewards = [50, 100, 200, 500, 1000];
    const win = rewards[Math.floor(Math.random() * rewards.length)];
    setAllUsers(prev => prev.map(u => u.id === currentUser.id ? { ...u, points: u.points + win, luckySpins: u.luckySpins - 1 } : u));
    alert(`Chúc mừng! Bạn đã quay trúng phần thưởng trị giá ${win.toLocaleString()} P.`);
  };

  const treasuryStats: TreasuryStats = useMemo(() => {
    const totalPointsLiability = allUsers.reduce((acc, u) => acc + u.points, 0) * 1000;
    const escrowFund = companies.reduce((acc, c) => acc + c.balance, 0);
    return {
      totalLiability: totalPointsLiability,
      escrowFund,
      safetyRatio: totalPointsLiability > 0 ? escrowFund / totalPointsLiability : 2.0,
      platformRevenue: transactions.reduce((acc, t) => acc + (t.platformFee || 0), 0),
      breakageProfit: totalPointsLiability * 0.05,
      forecastBurn: totalPointsLiability * 0.1,
    };
  }, [companies, allUsers, transactions]);

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col selection:bg-indigo-100">
      {!isLoggedIn && <LoginOverlay onLogin={() => setIsLoggedIn(true)} />}
      
      <Navbar 
        currentUser={currentUser} 
        points={currentUser.points} 
        walletVND={currentUser.walletVND} 
        onSwitchRole={handleRoleSwitch} 
        onTabChange={setActiveTab} 
        activeTab={activeTab} 
      />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-[1400px]">
        {activeTab === 'strategy' ? (
          <StrategyGuide />
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {(currentUser.role === UserRole.MEMBER || currentUser.role === UserRole.AFFILIATE) && (
              <MemberView 
                activeSection={activeTab} 
                products={products} 
                companies={companies} 
                points={currentUser.points} 
                walletVND={currentUser.walletVND} 
                currentUser={currentUser} 
                affiliateStats={{ 
                  f1Count: 5, 
                  f2Count: 12, 
                  totalNetworkValue: 45000000, 
                  commissionAvailable: currentUser.walletVND, 
                  pendingTax: currentUser.taxWithheld, 
                  nextMilestone: "88 referrals to 1M" 
                }} 
                gamificationStats={{ 
                  leaderboardRank: 5, 
                  totalCheckIns: currentUser.streak, 
                  activeQuests: 2, 
                  winRate: 20 
                }} 
                leaderboard={allUsers.slice(0,5)} 
                transactions={transactions.filter(t => t.userId === currentUser.id)} 
                onPurchase={handleTransaction} 
                onTabChange={setActiveTab} 
                onTransfer={handleP2PTransfer} 
                onCheckIn={handleCheckIn} 
                onSpin={handleSpin} 
              />
            )}
            
            {[UserRole.DIRECTOR, UserRole.MANAGER, UserRole.CASHIER].includes(currentUser.role) && (
              <MerchantView 
                activeSection={activeTab} 
                role={currentUser.role} 
                merchant={companies.find(c => c.id === (currentUser.merchantId || 'c1'))!} 
                products={products.filter(p => p.merchantId === (currentUser.merchantId || 'c1'))} 
                transactions={transactions.filter(t => t.merchantId === (currentUser.merchantId || 'c1'))} 
                opsStats={{ 
                  roi: 150, 
                  retentionRate: 45, 
                  clv: 1200000, 
                  cac: 50000, 
                  costRatio: 8.5, 
                  kpiProgress: 75, 
                  staffPerformance: [] 
                }} 
                onScannerAction={handleTransaction} 
                onTabChange={setActiveTab} 
                onFinanceAction={handleTransaction} 
              />
            )}
            
            {currentUser.role === UserRole.ADMIN && (
              <AdminView 
                activeSection={activeTab} 
                companies={companies} 
                transactions={transactions} 
                treasuryStats={treasuryStats} 
                riskStats={{ 
                  flaggedTransactions: 0, 
                  blacklistCount: 0, 
                  avgFraudScore: 10, 
                  blockedAttempts24h: 0 
                }} 
                analyticsStats={{ 
                  gmv: 450000000, 
                  arpu: 120000, 
                  churnRate: 5, 
                  nps: 85, 
                  purchaseFreq: 3.2, 
                  aov: 350000, 
                  repurchaseRate: 65, 
                  voucherEfficiency: 0.8, 
                  rfmSegments: [], 
                  funnelData: [] 
                }} 
              />
            )}
          </div>
        )}
      </main>
      
      <ChatSupport />
    </div>
  );
};

export default App;
