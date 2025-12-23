
export enum UserRole {
  ADMIN = 'ADMIN',           // Quản lý chung (Chủ sàn)
  DIRECTOR = 'DIRECTOR',     // Giám đốc (Chủ doanh nghiệp)
  MANAGER = 'MANAGER',       // Quản lý cửa hàng
  CASHIER = 'CASHIER',       // Nhân viên thu ngân
  MEMBER = 'MEMBER',         // Khách hàng
  AFFILIATE = 'AFFILIATE'    // Người giới thiệu/Cộng tác viên
}

export type MerchantTier = 'SHARK' | 'TIGER' | 'CAT' | 'LEECH';
export type MemberTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND';

export interface Company {
  id: string;
  name: string;
  category: string;
  pointRate: number; 
  balance: number;           // Quỹ đối ứng (VND)
  reserve: number;           // Rolling Reserve (5%)
  logo: string;
  totalPointsIssued: number;
  totalPointsRedeemed: number;
  tier: MerchantTier;
  escrowStatus: 'HEALTHY' | 'WARNING' | 'CRITICAL';
  lastReconDelta: number;    // Lệch đối soát gần nhất
  // Module 3: Merchant Ops
  rating: number;
  bidPrice: number;
  ctr: number;
  targetPoints: number;
  subscriptionEnd?: string;
  // Module 6
  location?: { lat: number; lng: number }; 
}

export interface Bottleneck {
  id: string;
  category: 'FINANCIAL' | 'TECH' | 'OPERATIONAL' | 'UX' | 'LEGAL';
  menuId: string;
  title: string;
  impact: string;
  status: 'STABLE' | 'CLOGGED' | 'FIXING' | 'RESOLVED';
  score: number;
  autoDetectLogic: string;
  autoFixLogic: string;
  lastFixedAt?: Date;
}

export interface Product {
  id: string;
  merchantId: string;
  name: string;
  description: string;
  price: number;
  pointPrice: number;
  image: string;
  category: string;
  stock: number;
  isFlashSale?: boolean;
  flashSaleEnds?: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  target: number;
  reward: number;
  type: 'SPEND' | 'VISIT' | 'SHARE';
}

export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  exp: number;
  tier: MemberTier;
  walletVND: number;
  role: UserRole;
  merchantId?: string;
  referrerId?: string;
  gender?: 'male' | 'female' | 'other';
  interests?: string[];
  birthday?: string;
  referralCount: number;
  totalCommission: number;
  taxWithheld: number;
  networkValue: number;
  streak: number;
  lastCheckIn?: string;
  luckySpins: number;
  questProgress: Record<string, number>;
  // Module 6: Security
  deviceId?: string;
  isBlacklisted: boolean;
  lastLocation?: { lat: number; lng: number };
  otpFailCount: number;
  riskScore: number;
  // Module 7: Analytics
  joinDate?: string; // ISO
}

export interface Transaction {
  id: string;
  userId: string;
  merchantId: string;
  cashierId?: string;
  amount: number;
  pointsEarned?: number;
  pointsSpent?: number;
  tierMultiplier?: number;
  eventMultiplier?: number;
  affiliateCommissionF1?: number;
  affiliateCommissionF2?: number;
  cashierBonus?: number;
  platformFee?: number;
  type: 'EARN' | 'BURN' | 'TRANSFER' | 'REFUND' | 'DEPOSIT' | 'WITHDRAW' | 'COMMISSION' | 'BONUS' | 'GAME_WIN';
  timestamp: Date;
  status: 'COMPLETED' | 'PENDING' | 'VOIDED' | 'FLAGGED';
  receiverId?: string;
  isCampaign?: boolean;
  fraudScore?: number;
  geoDistance?: number;
  deviceId?: string;
}

export interface TreasuryStats {
  totalLiability: number;
  escrowFund: number;
  safetyRatio: number;
  platformRevenue: number;
  breakageProfit: number;
  forecastBurn: number;
}

export interface MerchantOpsStats {
  roi: number;
  retentionRate: number;
  clv: number;
  cac: number;
  costRatio: number;
  kpiProgress: number;
  staffPerformance: {name: string, bonus: number, scans: number}[];
}

export interface AffiliateStats {
  f1Count: number;
  f2Count: number;
  totalNetworkValue: number;
  commissionAvailable: number;
  pendingTax: number;
  nextMilestone: string;
}

export interface GamificationStats {
  leaderboardRank: number;
  totalCheckIns: number;
  activeQuests: number;
  winRate: number;
}

export interface RiskStats {
  flaggedTransactions: number;
  blacklistCount: number;
  avgFraudScore: number;
  blockedAttempts24h: number;
}

// Module 7: Analytics BI
export interface RFMUser {
  userId: string;
  userName: string;
  recency: number; // days
  frequency: number; // total orders
  monetary: number; // total spend
  score: number;
  segment: 'CHAMPION' | 'LOYAL' | 'AT_RISK' | 'HIBERNATING';
}

export interface AnalyticsBI {
  gmv: number;               // 76
  arpu: number;              // 77
  churnRate: number;         // 78
  nps: number;               // 79
  purchaseFreq: number;      // 80
  aov: number;               // 81
  repurchaseRate: number;    // 82
  voucherEfficiency: number; // 83
  rfmSegments: RFMUser[];    // 89
  funnelData: {step: string, count: number, conv: number}[]; // 90
}
