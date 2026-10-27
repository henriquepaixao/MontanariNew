export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  tier: 'free' | 'plus' | 'exclusive';
  avatar?: string;
  createdAt: string;
}

export type KnowledgeLevelCode = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface KnowledgeLevelInfo {
  level: KnowledgeLevelCode;
  title: string;
  minXp: number;
  maxXp: number;
  description: string;
}

export type WealthStageCode = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface WealthStageInfo {
  stage: WealthStageCode;
  title: string;
  description: string;
  milestoneCriteria: string;
}

export interface UserProfile {
  diagnosisStage: 1 | 2 | 3 | 4 | 5 | 6;
  objectives: string[];
  monthlyIncome: number;
  fixedExpensesEstimate: number;
  variableExpensesEstimate: number;
  emergencyFundMonthsTarget: number;
  emergencyFundCurrentAmount: number;
  knowledgeLevel: 'iniciante' | 'basico' | 'intermediario' | 'avancado';
  riskProfile: 'conservador' | 'moderado' | 'arrojado';
  dependentsCount: number;
  hasDebts: boolean;
  notes?: string;
}

export type TransactionType = 'receita' | 'despesa';

export type ExpenseCategory =
  | 'moradia'
  | 'alimentacao'
  | 'transporte'
  | 'saude'
  | 'educacao'
  | 'lazer'
  | 'dividas'
  | 'investimentos'
  | 'impostos'
  | 'outros';

export type IncomeCategory =
  | 'salario'
  | 'prolabore'
  | 'dividendos'
  | 'aluguel'
  | 'freelance'
  | 'rendimentos'
  | 'outros';

export interface Transaction {
  id: string;
  type: TransactionType;
  category: ExpenseCategory | IncomeCategory;
  description: string;
  amount: number;
  date: string; // YYYY-MM-DD
  status: 'pago' | 'pendente';
  isRecurring: boolean;
  paymentMethod: 'pix' | 'cartao' | 'boleto' | 'transferencia' | 'dinheiro';
  installments?: {
    current: number;
    total: number;
  };
}

export interface Debt {
  id: string;
  title: string;
  creditor: string;
  totalAmount: number;
  remainingAmount: number;
  interestRateMonthly: number; // e.g. 2.5%
  monthlyInstallment: number;
  remainingInstallments: number;
  dueDate: string;
  priority: 'alta' | 'media' | 'baixa';
}

export type AssetClass =
  | 'tesouro_direto'
  | 'cdb'
  | 'lci_lca'
  | 'fii'
  | 'acoes_br'
  | 'etf'
  | 'previdencia'
  | 'cripto'
  | 'outro';

export interface Investment {
  id: string;
  assetClass: AssetClass;
  institution: string;
  name: string;
  investedAmount: number;
  currentBalance: number;
  purchaseDate: string;
  maturityDate?: string;
  liquidity: 'diaria' | 'd30' | 'd60' | 'no_vencimento';
  indexer: 'cdi' | 'ipca' | 'prefixado' | 'dividendos' | 'outro';
  returnRateDescription: string; // e.g. "115% do CDI" or "IPCA + 6,40%"
  annualReturnEstimated: number; // numeric % e.g. 12.8
  targetGoalId?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'reserva' | 'imovel' | 'veiculo' | 'educacao' | 'viagem' | 'aposentadoria' | 'independencia' | 'familia' | 'outro';
  targetAmount: number;
  currentAmount: number;
  targetDate: string; // YYYY-MM-DD
  monthlyDepositPlanned: number;
  priority: 'alta' | 'media' | 'baixa';
  isFamily: boolean;
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  trackId: number;
  order: number;
  title: string;
  learningObjective: string;
  summary: string;
  articleContent: string;
  practicalExample: string;
  readTimeMinutes: number;
  xpReward: number;
  videoPlaceholderUrl?: string;
  quiz: QuizQuestion;
}

export interface Track {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  lessons: Lesson[];
}

export interface Badge {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  category: 'educacao' | 'organizacao' | 'reserva' | 'investimento' | 'patrimonio';
  unlockedAt?: string;
}

export interface GamificationState {
  xp: number;
  knowledgeLevel: KnowledgeLevelCode;
  wealthStage: WealthStageCode;
  unlockedBadges: string[]; // badge ids
  completedLessons: string[]; // lesson ids
  completedQuizzes: { [lessonId: string]: { score: number; passedAt: string } };
  consecutiveDays: number;
  lastActiveDate: string;
}

export interface MarketRates {
  selic: number;
  cdi: number;
  ipca: number;
  poupanca: number;
  lastUpdated: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
}
