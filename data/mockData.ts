
import { Company, Product, User, UserRole, Bottleneck, Quest } from '../types';

export const companies: Company[] = [
  {
    id: 'c1',
    name: 'Brew & Bloom Coffee',
    category: 'F&B',
    pointRate: 0.1,
    balance: 5000000,
    reserve: 250000,
    logo: 'https://picsum.photos/seed/coffee/100/100',
    totalPointsIssued: 15000,
    totalPointsRedeemed: 8000,
    tier: 'TIGER',
    escrowStatus: 'HEALTHY',
    lastReconDelta: 0,
    rating: 4.8,
    bidPrice: 500,
    ctr: 0.12,
    targetPoints: 50000,
    subscriptionEnd: '2025-12-31',
    location: { lat: 10.762622, lng: 106.660172 } // HCM
  },
  {
    id: 'c2',
    name: 'TechWave Electronics',
    category: 'Electronics',
    pointRate: 0.02,
    balance: 25000000,
    reserve: 1250000,
    logo: 'https://picsum.photos/seed/tech/100/100',
    totalPointsIssued: 45000,
    totalPointsRedeemed: 32000,
    tier: 'SHARK',
    escrowStatus: 'HEALTHY',
    lastReconDelta: 0,
    rating: 4.5,
    bidPrice: 1000,
    ctr: 0.08,
    targetPoints: 200000,
    subscriptionEnd: '2025-06-30',
    location: { lat: 10.772622, lng: 106.670172 }
  }
];

export const initialBottlenecks: Bottleneck[] = [
  { id: 'b1', menuId: 'settlement', category: 'FINANCIAL', title: 'Lệch đối soát Bank vs App', impact: 'Tắc nghẽn rút tiền', status: 'CLOGGED', score: 85, autoDetectLogic: 'Bot so sánh số dư Ngân hàng vs Tổng ví 5s/lần', autoFixLogic: 'Đánh dấu "Pending" & Query lại trạng thái qua API' },
  { id: 'b2', menuId: 'settlement', category: 'FINANCIAL', title: 'Merchant cạn ví bảo chứng', impact: 'Khách không tích được điểm', status: 'CLOGGED', score: 92, autoDetectLogic: 'Balance < 20% ngưỡng an toàn', autoFixLogic: 'Kích hoạt hạn mức thấu chi tạm thời 24h' },
  { id: 'b91', menuId: 'security', category: 'LEGAL', title: 'Vượt trần khuyến mãi (50%)', impact: 'Vi phạm luật thương mại', status: 'CLOGGED', score: 95, autoDetectLogic: 'Shop set discount > 50%', autoFixLogic: 'Compliance Check: Tự động sửa về 50%' },
];

export const products: Product[] = [
  { id: 'p1', merchantId: 'c1', name: 'Premium Arabica Beans', description: 'Freshly roasted coffee.', price: 150000, pointPrice: 150, image: 'https://picsum.photos/seed/beans/400/300', category: 'F&B', stock: 120, isFlashSale: true, flashSaleEnds: '2025-05-20T12:00:00Z' },
  { id: 'p2', merchantId: 'c2', name: 'Smart Watch X', description: 'Ultimate fitness companion.', price: 2500000, pointPrice: 2500, image: 'https://picsum.photos/seed/watch/400/300', category: 'Electronics', stock: 45 }
];

export const quests: Quest[] = [
  { id: 'q1', title: 'Cà phê sáng', description: 'Mua 3 đơn hàng tại tiệm Coffee bất kỳ.', target: 3, reward: 50, type: 'VISIT' },
  { id: 'q2', title: 'Đại gia công nghệ', description: 'Tiêu dùng trên 5.000.000đ tại TechWave.', target: 5000000, reward: 200, type: 'SPEND' },
  { id: 'q3', title: 'Lan tỏa yêu thương', description: 'Chia sẻ ứng dụng cho 5 người bạn.', target: 5, reward: 100, type: 'SHARE' }
];

export const users: User[] = [
  { 
    id: 'u1', 
    name: 'Hieu Guest', 
    email: 'hieu@example.com', 
    points: 5400, 
    exp: 1250, 
    tier: 'GOLD', 
    walletVND: 250000, 
    role: UserRole.MEMBER, 
    gender: 'male', 
    interests: ['F&B', 'Electronics'], 
    birthday: '1995-10-24',
    referralCount: 12,
    totalCommission: 850000,
    taxWithheld: 0,
    networkValue: 45000000,
    referrerId: 'u2',
    streak: 5,
    lastCheckIn: '2024-05-15',
    luckySpins: 3,
    questProgress: { 'q1': 1, 'q2': 1250000 },
    deviceId: 'DEV-999',
    isBlacklisted: false,
    otpFailCount: 0,
    riskScore: 5
  },
  { 
    id: 'u2', 
    name: 'Admin Boss', 
    email: 'admin@co-loyalty.com', 
    points: 0, 
    exp: 0, 
    tier: 'BRONZE', 
    walletVND: 15000000, 
    role: UserRole.ADMIN,
    referralCount: 0,
    totalCommission: 0,
    taxWithheld: 0,
    networkValue: 0,
    streak: 0,
    luckySpins: 0,
    questProgress: {},
    deviceId: 'DEV-ADMIN',
    isBlacklisted: false,
    otpFailCount: 0,
    riskScore: 0
  },
  { 
    id: 'u3', 
    name: 'Director Coffee', 
    email: 'owner@brewbloom.com', 
    points: 0, 
    exp: 5000, 
    tier: 'DIAMOND', 
    walletVND: 50000000, 
    role: UserRole.DIRECTOR, 
    merchantId: 'c1',
    referralCount: 0,
    totalCommission: 0,
    taxWithheld: 0,
    networkValue: 0,
    streak: 0,
    luckySpins: 0,
    questProgress: {},
    deviceId: 'DEV-MERCHANT-1',
    isBlacklisted: false,
    otpFailCount: 0,
    riskScore: 0
  },
  { 
    id: 'u4', 
    name: 'Cashier Lan', 
    email: 'lan@brewbloom.com', 
    points: 0, 
    exp: 200, 
    tier: 'SILVER', 
    walletVND: 120000, 
    role: UserRole.CASHIER, 
    merchantId: 'c1',
    referralCount: 0,
    totalCommission: 0,
    taxWithheld: 0,
    networkValue: 0,
    streak: 0,
    luckySpins: 0,
    questProgress: {},
    deviceId: 'DEV-CASHIER-1',
    isBlacklisted: false,
    otpFailCount: 0,
    riskScore: 0
  },
];
