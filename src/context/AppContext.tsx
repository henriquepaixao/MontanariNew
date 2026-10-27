import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  User,
  UserProfile,
  Transaction,
  Debt,
  Investment,
  Goal,
  GamificationState,
  Track,
  Badge,
  KnowledgeLevelCode,
  WealthStageCode,
} from '../types';
import {
  DEMO_USER,
  DEMO_PROFILE,
  DEMO_TRANSACTIONS,
  DEMO_DEBTS,
  DEMO_INVESTMENTS,
  DEMO_GOALS,
  DEMO_GAMIFICATION,
} from '../data/demoData';
import { INITIAL_TRACKS } from '../data/academyContent';
import { ALL_BADGES, KNOWLEDGE_LEVELS } from '../data/gamificationData';

interface FinancialSummary {
  totalAssets: number;
  totalInvested: number;
  totalDebts: number;
  netWorth: number;
  monthIncome: number;
  monthExpenses: number;
  monthBalance: number;
  savingsRate: number; // percentage
  emergencyFundCurrent: number;
  emergencyFundTarget: number;
  emergencyFundProgress: number; // percentage
}

interface ToastNotification {
  id: string;
  type: 'xp' | 'badge' | 'success' | 'info';
  title: string;
  message: string;
  icon?: string;
}

interface AppContextType {
  user: User | null;
  profile: UserProfile;
  transactions: Transaction[];
  debts: Debt[];
  investments: Investment[];
  goals: Goal[];
  gamification: GamificationState;
  tracks: Track[];
  badges: Badge[];
  isDemoMode: boolean;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  toast: ToastNotification | null;
  summary: FinancialSummary;
  setUser: (user: User | null) => void;
  setIsDemoMode: (val: boolean) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, tx: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  addDebt: (debt: Omit<Debt, 'id'>) => void;
  updateDebt: (id: string, debt: Partial<Debt>) => void;
  deleteDebt: (id: string) => void;
  addInvestment: (inv: Omit<Investment, 'id'>) => void;
  updateInvestment: (id: string, inv: Partial<Investment>) => void;
  deleteInvestment: (id: string) => void;
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt'>) => void;
  updateGoal: (id: string, goal: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  completeLesson: (lessonId: string, trackId: number) => void;
  submitQuiz: (lessonId: string, passed: boolean) => void;
  unlockBadge: (badgeCode: string) => void;
  addXp: (amount: number, reason: string) => void;
  resetToDemo: () => void;
  clearAllUserData: () => void;
  exportUserDataJSON: () => void;
  exportTransactionsCSV: () => void;
  closeToast: () => void;
  // Admin helpers
  addNewLesson: (trackId: number, lesson: any) => void;
  updateLesson: (lessonId: string, updated: any) => void;
  deleteLesson: (lessonId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'montanari_patrimonial_v1';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load initial state from LocalStorage or Demo
  const [isDemoMode, setIsDemoMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_isDemo`);
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_user`);
    return saved ? JSON.parse(saved) : DEMO_USER;
  });

  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_profile`);
    return saved ? JSON.parse(saved) : DEMO_PROFILE;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_transactions`);
    return saved ? JSON.parse(saved) : DEMO_TRANSACTIONS;
  });

  const [debts, setDebts] = useState<Debt[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_debts`);
    return saved ? JSON.parse(saved) : DEMO_DEBTS;
  });

  const [investments, setInvestments] = useState<Investment[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_investments`);
    return saved ? JSON.parse(saved) : DEMO_INVESTMENTS;
  });

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_goals`);
    return saved ? JSON.parse(saved) : DEMO_GOALS;
  });

  const [gamification, setGamification] = useState<GamificationState>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_gamification`);
    return saved ? JSON.parse(saved) : DEMO_GAMIFICATION;
  });

  const [tracks, setTracks] = useState<Track[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_tracks`);
    return saved ? JSON.parse(saved) : INITIAL_TRACKS;
  });
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_theme`);
    return saved === 'light' ? 'light' : 'dark';
  });

  const [toast, setToast] = useState<ToastNotification | null>(null);

  // Sync theme with HTML root and LocalStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_theme`, theme);
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Auto-save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_isDemo`, JSON.stringify(isDemoMode));
      localStorage.setItem(`${STORAGE_KEY}_user`, JSON.stringify(user));
      localStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(profile));
      localStorage.setItem(`${STORAGE_KEY}_transactions`, JSON.stringify(transactions));
      localStorage.setItem(`${STORAGE_KEY}_debts`, JSON.stringify(debts));
      localStorage.setItem(`${STORAGE_KEY}_investments`, JSON.stringify(investments));
      localStorage.setItem(`${STORAGE_KEY}_goals`, JSON.stringify(goals));
      localStorage.setItem(`${STORAGE_KEY}_gamification`, JSON.stringify(gamification));
      localStorage.setItem(`${STORAGE_KEY}_tracks`, JSON.stringify(tracks));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [isDemoMode, user, profile, transactions, debts, investments, goals, gamification, tracks]);

  // Toast auto-close
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (toastData: ToastNotification) => {
    setToast(toastData);
  };

  const closeToast = () => setToast(null);

  // Compute Knowledge Level based on XP
  const updateKnowledgeLevel = (currentXp: number): KnowledgeLevelCode => {
    let lvl: KnowledgeLevelCode = 1;
    for (const info of KNOWLEDGE_LEVELS) {
      if (currentXp >= info.minXp) {
        lvl = info.level;
      }
    }
    return lvl;
  };

  const addXp = (amount: number, reason: string) => {
    setGamification((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = updateKnowledgeLevel(newXp);
      const leveledUp = newLevel > prev.knowledgeLevel;

      if (leveledUp) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#10B981', '#3B82F6', '#FFFFFF'],
          });
        } catch (_) {}
        showToast({
          id: Math.random().toString(),
          type: 'badge',
          title: 'Subiu de Nível Educacional!',
          message: `Parabéns! Você alcançou o Nível ${newLevel}: ${KNOWLEDGE_LEVELS[newLevel - 1].title}`,
        });
      } else {
        showToast({
          id: Math.random().toString(),
          type: 'xp',
          title: `+${amount} XP Conquistados`,
          message: reason,
        });
      }

      return {
        ...prev,
        xp: newXp,
        knowledgeLevel: newLevel,
      };
    });
  };

  const unlockBadge = (badgeId: string) => {
    setGamification((prev) => {
      if (prev.unlockedBadges.includes(badgeId)) return prev;
      const badgeInfo = ALL_BADGES.find((b) => b.id === badgeId);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#D4AF37', '#F59E0B', '#10B981'],
        });
      } catch (_) {}
      showToast({
        id: Math.random().toString(),
        type: 'badge',
        title: 'Nova Conquista Desbloqueada!',
        message: badgeInfo ? badgeInfo.title : 'Conquista Patrimonial',
      });
      return {
        ...prev,
        unlockedBadges: [...prev.unlockedBadges, badgeId],
      };
    });
  };

  // Financial Summary Calculation
  const summary = useMemo<FinancialSummary>(() => {
    // Current month filter (e.g., 2026-10)
    const currentMonthPrefix = '2026-10';

    const monthIncome = transactions
      .filter((t) => t.type === 'receita' && t.date.startsWith(currentMonthPrefix))
      .reduce((sum, t) => sum + t.amount, 0);

    const monthExpenses = transactions
      .filter((t) => t.type === 'despesa' && t.date.startsWith(currentMonthPrefix))
      .reduce((sum, t) => sum + t.amount, 0);

    const monthBalance = monthIncome - monthExpenses;
    const savingsRate = monthIncome > 0 ? Math.max(0, (monthBalance / monthIncome) * 100) : 0;

    const totalInvested = investments.reduce((sum, i) => sum + i.currentBalance, 0);
    const totalDebts = debts.reduce((sum, d) => sum + d.remainingAmount, 0);
    const totalAssets = totalInvested; // plus cash equivalents
    const netWorth = totalAssets - totalDebts;

    const emergencyFundTarget = (profile.fixedExpensesEstimate + profile.variableExpensesEstimate) * (profile.emergencyFundMonthsTarget || 6);
    // Find investments tagged as reserve
    const reserveInvestments = investments
      .filter((i) => i.targetGoalId === 'goal_reserva' || i.name.toLowerCase().includes('reserva') || i.name.toLowerCase().includes('selic'))
      .reduce((sum, i) => sum + i.currentBalance, 0);

    const emergencyFundCurrent = Math.max(profile.emergencyFundCurrentAmount, reserveInvestments);
    const emergencyFundProgress = emergencyFundTarget > 0 ? Math.min(100, (emergencyFundCurrent / emergencyFundTarget) * 100) : 0;

    return {
      totalAssets,
      totalInvested,
      totalDebts,
      netWorth,
      monthIncome,
      monthExpenses,
      monthBalance,
      savingsRate: Math.round(savingsRate * 10) / 10,
      emergencyFundCurrent,
      emergencyFundTarget,
      emergencyFundProgress: Math.round(emergencyFundProgress * 10) / 10,
    };
  }, [transactions, debts, investments, profile]);

  // Actions
  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...data }));
    addXp(30, 'Perfil financeiro atualizado com sucesso.');
    if (data.emergencyFundCurrentAmount && data.emergencyFundCurrentAmount > 0) {
      unlockBadge('badge_emergency_building');
    }
  };

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    };
    setTransactions((prev) => [newTx, ...prev]);
    addXp(15, 'Transação registrada no fluxo de caixa.');
    unlockBadge('badge_organized_mind');
  };

  const updateTransaction = (id: string, updated: Partial<Transaction>) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...updated } : t)));
    showToast({ id: Math.random().toString(), type: 'success', title: 'Atualizado', message: 'Transação modificada com sucesso.' });
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    showToast({ id: Math.random().toString(), type: 'info', title: 'Removido', message: 'Transação excluída.' });
  };

  const addDebt = (debt: Omit<Debt, 'id'>) => {
    const newDebt: Debt = {
      ...debt,
      id: `debt_${Date.now()}`,
    };
    setDebts((prev) => [...prev, newDebt]);
    showToast({ id: Math.random().toString(), type: 'info', title: 'Dívida Registrada', message: 'Mapeamento de passivo adicionado para planejamento.' });
  };

  const updateDebt = (id: string, updated: Partial<Debt>) => {
    setDebts((prev) => prev.map((d) => (d.id === id ? { ...d, ...updated } : d)));
  };

  const deleteDebt = (id: string) => {
    setDebts((prev) => prev.filter((d) => d.id !== id));
    unlockBadge('badge_debt_free');
    addXp(100, 'Dívida liquidada com honra!');
  };

  const addInvestment = (inv: Omit<Investment, 'id'>) => {
    const newInv: Investment = {
      ...inv,
      id: `inv_${Date.now()}`,
    };
    setInvestments((prev) => [...prev, newInv]);
    addXp(50, 'Novo investimento estruturado cadastrado na carteira.');
    unlockBadge('badge_first_investment');
    unlockBadge('badge_deposit_discipline');
  };

  const updateInvestment = (id: string, updated: Partial<Investment>) => {
    setInvestments((prev) => prev.map((i) => (i.id === id ? { ...i, ...updated } : i)));
    showToast({ id: Math.random().toString(), type: 'success', title: 'Investimento Atualizado', message: 'Saldo e rentabilidade sincronizados.' });
  };

  const deleteInvestment = (id: string) => {
    setInvestments((prev) => prev.filter((i) => i.id !== id));
  };

  const addGoal = (goal: Omit<Goal, 'id' | 'createdAt'>) => {
    const newGoal: Goal = {
      ...goal,
      id: `goal_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setGoals((prev) => [...prev, newGoal]);
    addXp(40, 'Novo marco de objetivo financeiro cadastrado.');
  };

  const updateGoal = (id: string, updated: Partial<Goal>) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...updated } : g)));
    showToast({ id: Math.random().toString(), type: 'success', title: 'Meta Atualizada', message: 'Progresso da meta recalculado.' });
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const completeLesson = (lessonId: string, trackId: number) => {
    setGamification((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      };
    });
    addXp(50, 'Aula concluída na Academia Montanari.');

    // Check if entire track completed
    const track = tracks.find((t) => t.id === trackId);
    if (track) {
      const allLessonsDone = track.lessons.every(
        (l) => l.id === lessonId || gamification.completedLessons.includes(l.id)
      );
      if (allLessonsDone) {
        unlockBadge('badge_excellence_student');
        addXp(200, `Trilha ${track.id} totalmente concluída com certificado disponível!`);
      }
    }
  };

  const submitQuiz = (lessonId: string, passed: boolean) => {
    if (passed) {
      setGamification((prev) => ({
        ...prev,
        completedQuizzes: {
          ...prev.completedQuizzes,
          [lessonId]: { score: 100, passedAt: new Date().toISOString() },
        },
      }));
      addXp(35, 'Quiz respondido com sucesso!');
    }
  };

  const resetToDemo = () => {
    setIsDemoMode(true);
    setUser(DEMO_USER);
    setProfile(DEMO_PROFILE);
    setTransactions(DEMO_TRANSACTIONS);
    setDebts(DEMO_DEBTS);
    setInvestments(DEMO_INVESTMENTS);
    setGoals(DEMO_GOALS);
    setGamification(DEMO_GAMIFICATION);
    setTracks(INITIAL_TRACKS);
    showToast({
      id: Math.random().toString(),
      type: 'info',
      title: 'Modo Demonstração Ativado',
      message: 'Dados de exemplo realistas carregados para exploração completa.',
    });
  };

  const clearAllUserData = () => {
    setIsDemoMode(false);
    setTransactions([]);
    setDebts([]);
    setInvestments([]);
    setGoals([]);
    setGamification({
      xp: 100,
      knowledgeLevel: 1,
      wealthStage: 1,
      unlockedBadges: ['badge_first_step'],
      completedLessons: [],
      completedQuizzes: {},
      consecutiveDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
    });
    setProfile({
      diagnosisStage: 1,
      objectives: ['Organizar Finanças'],
      monthlyIncome: 0,
      fixedExpensesEstimate: 0,
      variableExpensesEstimate: 0,
      emergencyFundMonthsTarget: 6,
      emergencyFundCurrentAmount: 0,
      knowledgeLevel: 'iniciante',
      riskProfile: 'conservador',
      dependentsCount: 0,
      hasDebts: false,
      notes: '',
    });
    showToast({
      id: Math.random().toString(),
      type: 'info',
      title: 'Dados Limpos',
      message: 'Plataforma zerada. Agora você pode cadastrar suas informações reais.',
    });
  };

  const exportUserDataJSON = () => {
    const fullData = {
      exportedAt: new Date().toISOString(),
      user,
      profile,
      summary,
      transactions,
      debts,
      investments,
      goals,
      gamification,
    };
    const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `montanari_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast({ id: Math.random().toString(), type: 'success', title: 'Exportação Concluída', message: 'Seu arquivo de backup JSON da LGPD foi baixado.' });
  };

  const exportTransactionsCSV = () => {
    const header = 'Data;Tipo;Categoria;Descricao;Valor;Status;Metodo;Recorrente\n';
    const rows = transactions
      .map(
        (t) =>
          `"${t.date}";"${t.type}";"${t.category}";"${t.description.replace(/"/g, '""')}";"${t.amount.toFixed(2)}";"${t.status}";"${t.paymentMethod}";"${t.isRecurring ? 'Sim' : 'Nao'}"`
      )
      .join('\n');
    const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `montanari_transacoes_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast({ id: Math.random().toString(), type: 'success', title: 'CSV Gerado', message: 'Relatório de transações baixado com sucesso.' });
  };

  // Admin Lesson Management
  const addNewLesson = (trackId: number, lesson: any) => {
    setTracks((prev) =>
      prev.map((t) => {
        if (t.id === trackId) {
          return {
            ...t,
            lessons: [...t.lessons, { ...lesson, id: `l_${Date.now()}`, trackId }],
          };
        }
        return t;
      })
    );
    showToast({ id: Math.random().toString(), type: 'success', title: 'Aula Publicada', message: 'Novo conteúdo educacional adicionado à trilha.' });
  };

  const updateLesson = (lessonId: string, updated: any) => {
    setTracks((prev) =>
      prev.map((t) => ({
        ...t,
        lessons: t.lessons.map((l) => (l.id === lessonId ? { ...l, ...updated } : l)),
      }))
    );
    showToast({ id: Math.random().toString(), type: 'success', title: 'Aula Atualizada', message: 'Alterações salvas com sucesso.' });
  };

  const deleteLesson = (lessonId: string) => {
    setTracks((prev) =>
      prev.map((t) => ({
        ...t,
        lessons: t.lessons.filter((l) => l.id !== lessonId),
      }))
    );
    showToast({ id: Math.random().toString(), type: 'info', title: 'Aula Excluída', message: 'Conteúdo removido da trilha.' });
  };

  const badges = useMemo(() => {
    return ALL_BADGES.map((b) => ({
      ...b,
      unlockedAt: gamification.unlockedBadges.includes(b.id) ? 'Desbloqueado' : undefined,
    }));
  }, [gamification.unlockedBadges]);

  return (
    <AppContext.Provider
      value={{
        user,
        profile,
        transactions,
        debts,
        investments,
        goals,
        gamification,
        tracks,
        badges,
        isDemoMode,
        theme,
        toggleTheme,
        toast,
        summary,
        setUser,
        setIsDemoMode,
        updateProfile,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        addDebt,
        updateDebt,
        deleteDebt,
        addInvestment,
        updateInvestment,
        deleteInvestment,
        addGoal,
        updateGoal,
        deleteGoal,
        completeLesson,
        submitQuiz,
        unlockBadge,
        addXp,
        resetToDemo,
        clearAllUserData,
        exportUserDataJSON,
        exportTransactionsCSV,
        closeToast,
        addNewLesson,
        updateLesson,
        deleteLesson,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
