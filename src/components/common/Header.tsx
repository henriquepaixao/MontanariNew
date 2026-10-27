import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { KNOWLEDGE_LEVELS } from '../../data/gamificationData';
import {
  LayoutDashboard,
  Wallet,
  LineChart,
  Calculator,
  Target,
  GraduationCap,
  Bot,
  Trophy,
  ShieldCheck,
  User as UserIcon,
  Menu,
  X,
  Sparkles,
  RotateCcw,
  ShieldAlert,
  Sun,
  Moon,
  Gamepad2,
} from 'lucide-react';

export type ActiveTab =
  | 'dashboard'
  | 'budget'
  | 'investments'
  | 'simulators'
  | 'goals'
  | 'academy'
  | 'mentor'
  | 'game'
  | 'gamification'
  | 'admin'
  | 'profile';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { user, gamification, isDemoMode, resetToDemo, clearAllUserData, theme, toggleTheme } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLevelInfo = KNOWLEDGE_LEVELS[gamification.knowledgeLevel - 1] || KNOWLEDGE_LEVELS[0];
  const nextLevelInfo = KNOWLEDGE_LEVELS[gamification.knowledgeLevel];
  const xpCurrentMin = currentLevelInfo.minXp;
  const xpNextMin = nextLevelInfo ? nextLevelInfo.minXp : 4000;
  const xpProgressPercent = Math.min(
    100,
    Math.max(0, ((gamification.xp - xpCurrentMin) / (xpNextMin - xpCurrentMin)) * 100)
  );

  const navItems: { id: ActiveTab; label: string; icon: React.ElementType; adminOnly?: boolean }[] = [
    { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'budget', label: 'Orçamento', icon: Wallet },
    { id: 'investments', label: 'Investimentos', icon: LineChart },
    { id: 'simulators', label: 'Simuladores', icon: Calculator },
    { id: 'goals', label: 'Metas', icon: Target },
    { id: 'academy', label: 'Academia', icon: GraduationCap },
    { id: 'mentor', label: 'Mentor IA', icon: Bot },
    { id: 'game', label: 'Jogo Família', icon: Gamepad2 },
    { id: 'gamification', label: 'Conquistas', icon: Trophy },
    { id: 'admin', label: 'Admin', icon: ShieldCheck },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      {/* Top Banner for Demo Mode status */}
      {isDemoMode && (
        <div className="bg-amber-950/60 border-b border-amber-500/20 px-4 py-1.5 text-xs text-amber-200/90 flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-medium">Modo Demonstração Ativo:</span>
            <span className="text-amber-300/80 hidden sm:inline">Exibindo dados fictícios estruturados de exemplo.</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={clearAllUserData}
              className="text-amber-300 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              Usar Meus Dados Reais
            </button>
            <span className="text-amber-500/50">|</span>
            <button
              onClick={resetToDemo}
              className="flex items-center gap-1 text-amber-400 hover:text-white transition-colors cursor-pointer"
              title="Restaurar dados de exemplo"
            >
              <RotateCcw className="w-3 h-3" /> Restaurar Exemplo
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            {/* Geometric architectural monogram */}
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-slate-900 to-blue-950 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/5 group-hover:border-amber-400/60 transition-all">
              <svg className="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21V6L12 14L21 6V21" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 21V12" strokeLinecap="round" opacity="0.6" />
                <path d="M17 21V12" strokeLinecap="round" opacity="0.6" />
                <line x1="2" y1="21" x2="22" y2="21" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-brand text-lg font-bold tracking-wider text-white group-hover:text-amber-300 transition-colors">
                  MONTANARI
                </span>
              </div>
              <span className="block text-[10px] tracking-[0.22em] text-amber-400/90 font-medium uppercase -mt-0.5">
                Arquitetura Patrimonial
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (Zero-pill text navigation with subtle active indicators) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-colors relative cursor-pointer ${
                    isActive
                      ? 'text-amber-400 bg-slate-900/90 border border-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.id === 'mentor' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Controls: Level/XP widget and Profile */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Gamification Level Mini-Widget */}
            <button
              onClick={() => handleNavClick('gamification')}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-amber-500/30 transition-all text-left cursor-pointer group"
              title="Ver detalhes de XP e Conquistas"
            >
              <div className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[11px] leading-tight">
                  <span className="font-semibold text-white">Nv. {gamification.knowledgeLevel}</span>
                  <span className="text-slate-400 font-normal truncate max-w-[90px]">{currentLevelInfo.title}</span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-14 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all"
                      style={{ width: `${xpProgressPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{gamification.xp} XP</span>
                </div>
              </div>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-800 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/30 transition-all cursor-pointer flex items-center justify-center"
              title={theme === 'dark' ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
              aria-label={theme === 'dark' ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-180 duration-300" />
              )}
            </button>

            {/* Profile & Settings Button */}
            <button
              onClick={() => handleNavClick('profile')}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
              title="Meu Perfil Financeiro & Privacidade LGPD"
            >
              <UserIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu trigger and quick theme toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-amber-400"
              title={theme === 'dark' ? 'Alternar para tema claro' : 'Alternar para tema escuro'}
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
            <button
              onClick={() => handleNavClick('gamification')}
              className="flex items-center gap-1 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-amber-400"
            >
              <Sparkles className="w-3 h-3" />
              <span>{gamification.xp} XP</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/98 px-4 pt-3 pb-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleNavClick('profile')}
                className="flex items-center gap-2 text-sm text-slate-300 hover:text-white"
              >
                <UserIcon className="w-4 h-4 text-amber-400" />
                <span>Meu Perfil & Diagnóstico</span>
              </button>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-900 text-xs text-slate-300 hover:text-white"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Tema Claro</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-700" />
                    <span>Tema Escuro</span>
                  </>
                )}
              </button>
            </div>
            {isDemoMode && (
              <div className="text-right">
                <button
                  onClick={clearAllUserData}
                  className="text-xs text-amber-400 hover:underline"
                >
                  Limpar Demonstração
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
