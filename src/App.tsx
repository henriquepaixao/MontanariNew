import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Header, ActiveTab } from './components/common/Header';
import { Toast } from './components/common/Toast';
import { DashboardView } from './components/dashboard/DashboardView';
import { BudgetView } from './components/budget/BudgetView';
import { InvestmentsView } from './components/investments/InvestmentsView';
import { SimulatorsView } from './components/simulators/SimulatorsView';
import { GoalsView } from './components/goals/GoalsView';
import { AcademyView } from './components/academy/AcademyView';
import { MentorView } from './components/mentor/MentorView';
import { GamificationView } from './components/gamification/GamificationView';
import { AdminView } from './components/admin/AdminView';
import { ProfileView } from './components/profile/ProfileView';
import { FamilyFinancialGame } from './components/game/FamilyFinancialGame';
import { FloatingChatbotWidget } from './components/common/FloatingChatbotWidget';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  return (
    <div className="min-h-screen app-root bg-[var(--color-bg-base)] text-[var(--color-text-main)] flex flex-col font-sans transition-colors duration-200 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'dashboard' && <DashboardView setActiveTab={setActiveTab} />}
        {activeTab === 'budget' && <BudgetView />}
        {activeTab === 'investments' && <InvestmentsView />}
        {activeTab === 'simulators' && <SimulatorsView />}
        {activeTab === 'goals' && <GoalsView />}
        {activeTab === 'academy' && <AcademyView />}
        {activeTab === 'mentor' && <MentorView />}
        {activeTab === 'game' && <FamilyFinancialGame />}
        {activeTab === 'gamification' && <GamificationView />}
        {activeTab === 'admin' && <AdminView />}
        {activeTab === 'profile' && <ProfileView />}
      </main>

      {/* Floating Gemini Chatbot Action Widget */}
      <FloatingChatbotWidget setActiveTab={setActiveTab} />

      {/* Gamification Notification Toast */}
      <Toast />

      {/* Institutional Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 mt-16 py-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-serif-brand font-bold text-white tracking-wider text-sm">
                  MONTANARI
                </span>
                <span className="text-amber-400 tracking-[0.2em] font-medium text-[10px] uppercase">
                  Arquitetura Patrimonial
                </span>
              </div>
              <p className="text-slate-400 text-xs italic">
                "Construa hoje a estrutura do patrimônio que deseja ter amanhã."
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-slate-400 text-xs">
              <button
                onClick={() => setActiveTab('profile')}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Privacidade & LGPD
              </button>
              <button
                onClick={() => setActiveTab('simulators')}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Simuladores Brasileiros
              </button>
              <button
                onClick={() => setActiveTab('academy')}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Academia de Finanças
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className="hover:text-amber-300 transition-colors cursor-pointer"
              >
                Governança & Admin
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>
              © 2026 Montanari Arquitetura Patrimonial Ltda. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-slate-600" />
              <span>
                Ambiente seguro em conformidade com as diretrizes CVM e a Lei Geral de Proteção de Dados (LGPD).
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
