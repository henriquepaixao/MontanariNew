import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrencyBRL, formatPercent } from '../../utils/calculators';
import { KNOWLEDGE_LEVELS, WEALTH_STAGES } from '../../data/gamificationData';
import {
  TrendingUp,
  Wallet,
  ShieldCheck,
  Target,
  GraduationCap,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Info,
  Calendar,
  Layers,
  HelpCircle,
  Building,
  Lock,
  Gamepad2,
} from 'lucide-react';
import { ActiveTab } from '../common/Header';

interface DashboardViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ setActiveTab }) => {
  const { summary, profile, gamification, goals, investments, transactions, tracks, isDemoMode } = useApp();
  const [periodFilter, setPeriodFilter] = useState<'mes' | 'trimestre' | 'ano' | 'tudo'>('mes');

  // Next educational step logic
  const nextTrack = tracks.find((t) => t.lessons.some((l) => !gamification.completedLessons.includes(l.id))) || tracks[0];
  const nextLesson = nextTrack?.lessons.find((l) => !gamification.completedLessons.includes(l.id)) || nextTrack?.lessons[0];

  // Wealth Stage Info
  const currentStageInfo = WEALTH_STAGES[gamification.wealthStage - 1] || WEALTH_STAGES[0];
  const currentLevelInfo = KNOWLEDGE_LEVELS[gamification.knowledgeLevel - 1] || KNOWLEDGE_LEVELS[0];

  // Mock historical data for net worth chart based on current net worth
  const chartPoints = [
    { label: 'Mai/26', value: Math.max(10000, summary.netWorth * 0.72) },
    { label: 'Jun/26', value: Math.max(15000, summary.netWorth * 0.77) },
    { label: 'Jul/26', value: Math.max(20000, summary.netWorth * 0.83) },
    { label: 'Ago/26', value: Math.max(25000, summary.netWorth * 0.88) },
    { label: 'Set/26', value: Math.max(30000, summary.netWorth * 0.94) },
    { label: 'Out/26', value: summary.netWorth },
  ];

  const maxChartValue = Math.max(...chartPoints.map((p) => p.value), 10000);
  const minChartValue = Math.min(...chartPoints.map((p) => p.value));

  // Asset class breakdown
  const assetBreakdown = investments.reduce((acc, inv) => {
    acc[inv.assetClass] = (acc[inv.assetClass] || 0) + inv.currentBalance;
    return acc;
  }, {} as Record<string, number>);

  const assetNames: Record<string, string> = {
    tesouro_direto: 'Tesouro Direto',
    cdb: 'CDB',
    lci_lca: 'LCI / LCA',
    fii: 'Fundos Imobiliários',
    acoes_br: 'Ações BR',
    etf: 'ETFs Globais',
    previdencia: 'Previdência Privada',
    outro: 'Outros',
  };

  const assetColors: Record<string, string> = {
    tesouro_direto: '#3B82F6',
    cdb: '#60A5FA',
    lci_lca: '#10B981',
    fii: '#D4AF37',
    acoes_br: '#F59E0B',
    etf: '#8B5CF6',
    previdencia: '#EC4899',
    outro: '#94A3B8',
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome & Philosophy Header */}
      <div className="bg-gradient-to-r from-slate-900/90 via-blue-950/40 to-slate-900/90 border border-slate-800/80 rounded-2xl p-6 lg:p-8 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono tracking-wide uppercase">
              <span>Arquitetura Patrimonial</span>
              <span aria-hidden="true">·</span>
              <span>Estrutura Sustentável</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Painel de Evolução Patrimonial
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              "Construa hoje a estrutura do patrimônio que deseja ter amanhã." Acompanhe a saúde do seu fluxo de caixa, a blindagem da sua reserva e o crescimento dos seus ativos reais.
            </p>
          </div>

          {/* Period Filter Buttons (Functional Segmented Control) */}
          <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800 self-start md:self-center shrink-0">
            {(['mes', 'trimestre', 'ano', 'tudo'] as const).map((period) => {
              const labelMap = { mes: 'Mês', trimestre: 'Trimestre', ano: 'Ano', tudo: 'Consolidado' };
              const isActive = periodFilter === period;
              return (
                <button
                  key={period}
                  onClick={() => setPeriodFilter(period)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {labelMap[period]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual Dimension Gamification Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          {/* Dimension A: Nível Educacional */}
          <div
            onClick={() => setActiveTab('gamification')}
            className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/70 hover:border-amber-500/30 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Nível Educacional {gamification.knowledgeLevel} de 7</span>
                <span className="font-mono text-amber-400 font-semibold">{gamification.xp} XP</span>
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                {currentLevelInfo.title}
              </h3>
              <p className="text-[11px] text-slate-400 truncate">{currentLevelInfo.description}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors shrink-0" />
          </div>

          {/* Dimension B: Jornada Patrimonial */}
          <div
            onClick={() => setActiveTab('gamification')}
            className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/70 hover:border-emerald-500/30 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Building className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Jornada Patrimonial: Etapa {gamification.wealthStage} de 8</span>
                <span className="text-emerald-400 font-medium">Ativa</span>
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                {currentStageInfo.title}
              </h3>
              <p className="text-[11px] text-slate-400 truncate">{currentStageInfo.description}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0" />
          </div>
        </div>
      </div>

      {/* Primary KPI Metric Cards (Anti-slop clean cards with typographic focus) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Patrimônio Líquido */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Patrimônio Líquido</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight text-white font-mono">
              {formatCurrencyBRL(summary.netWorth)}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
              <span>Ativos: {formatCurrencyBRL(summary.totalAssets)}</span>
              <span aria-hidden="true">·</span>
              <span className="text-red-400/90">Dívidas: {formatCurrencyBRL(summary.totalDebts)}</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Fluxo do Mês & Saldo */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Saldo Livre do Mês</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="mt-3">
            <div className={`text-2xl font-bold tracking-tight font-mono ${summary.monthBalance >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {formatCurrencyBRL(summary.monthBalance)}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
              <span className="text-emerald-400">+{formatCurrencyBRL(summary.monthIncome)}</span>
              <span aria-hidden="true">/</span>
              <span className="text-slate-400">-{formatCurrencyBRL(summary.monthExpenses)}</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Taxa de Poupança */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Capacidade de Poupança</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight text-white font-mono">
              {formatPercent(summary.savingsRate, 1)}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
              <span className={summary.savingsRate >= 20 ? 'text-emerald-400 font-medium' : 'text-amber-400'}>
                {summary.savingsRate >= 20 ? 'Meta de 20%+ atingida' : 'Objetivo ideal: 20% da renda'}
              </span>
            </div>
          </div>
        </div>

        {/* KPI 4: Reserva de Emergência */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Reserva de Emergência</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold tracking-tight text-white font-mono">
              {formatPercent(summary.emergencyFundProgress, 0)}
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-amber-400 h-full rounded-full transition-all"
                style={{ width: `${summary.emergencyFundProgress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5">
              <span>{formatCurrencyBRL(summary.emergencyFundCurrent)}</span>
              <span>Alvo: {formatCurrencyBRL(summary.emergencyFundTarget)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Evolution Chart & Asset Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Net Worth Chart (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-white">Evolução do Patrimônio Líquido</h3>
              <p className="text-xs text-slate-400 mt-0.5">Crescimento real dos ativos descontadas as obrigações</p>
            </div>
            <button
              onClick={() => setActiveTab('investments')}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer"
            >
              Ver Carteira <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* SVG Custom Interactive Line Chart */}
          <div className="h-64 w-full relative flex flex-col justify-end">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-slate-600 w-full" />
              <div className="border-b border-slate-600 w-full" />
              <div className="border-b border-slate-600 w-full" />
              <div className="border-b border-slate-600 w-full" />
            </div>

            <svg className="w-full h-48 overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="networthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area path */}
              <polygon
                fill="url(#networthGradient)"
                points={`
                  ${chartPoints
                    .map((p, idx) => {
                      const x = (idx / (chartPoints.length - 1)) * 500;
                      const y = 150 - ((p.value - minChartValue * 0.9) / (maxChartValue - minChartValue * 0.9 || 1)) * 130;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  500,160 0,160
                `}
              />

              {/* Line path */}
              <polyline
                fill="none"
                stroke="#D4AF37"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={chartPoints
                  .map((p, idx) => {
                    const x = (idx / (chartPoints.length - 1)) * 500;
                    const y = 150 - ((p.value - minChartValue * 0.9) / (maxChartValue - minChartValue * 0.9 || 1)) * 130;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />

              {/* Points */}
              {chartPoints.map((p, idx) => {
                const x = (idx / (chartPoints.length - 1)) * 500;
                const y = 150 - ((p.value - minChartValue * 0.9) / (maxChartValue - minChartValue * 0.9 || 1)) * 130;
                return (
                  <circle
                    key={idx}
                    cx={x}
                    cy={y}
                    r={idx === chartPoints.length - 1 ? 5 : 3.5}
                    className="fill-amber-400 stroke-slate-950 stroke-2"
                  />
                );
              })}
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between items-center text-xs text-slate-400 mt-4 pt-2 border-t border-slate-800">
              {chartPoints.map((p, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-[11px] text-slate-500 font-mono">{p.label}</div>
                  <div className="text-[11px] font-medium text-slate-300 font-mono">{formatCurrencyBRL(p.value)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Asset Class Distribution Breakdown (1 Col) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-white">Alocação de Ativos</h3>
              <span className="text-xs text-slate-400 font-mono">{formatCurrencyBRL(summary.totalInvested)}</span>
            </div>

            {/* Visual stacked bar */}
            <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-800 mb-6">
              {Object.entries(assetBreakdown).map(([assetClass, amount]) => {
                const pct = summary.totalInvested > 0 ? (amount / summary.totalInvested) * 100 : 0;
                return (
                  <div
                    key={assetClass}
                    style={{
                      width: `${pct}%`,
                      backgroundColor: assetColors[assetClass] || '#94A3B8',
                    }}
                    title={`${assetNames[assetClass] || assetClass}: ${pct.toFixed(1)}%`}
                  />
                );
              })}
            </div>

            {/* Asset legend items */}
            <div className="space-y-3">
              {Object.entries(assetBreakdown).map(([assetClass, amount]) => {
                const pct = summary.totalInvested > 0 ? (amount / summary.totalInvested) * 100 : 0;
                return (
                  <div key={assetClass} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: assetColors[assetClass] || '#94A3B8' }}
                      />
                      <span className="text-slate-300">{assetNames[assetClass] || assetClass}</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono">
                      <span className="text-slate-400">{formatPercent(pct, 1)}</span>
                      <span className="text-white font-medium">{formatCurrencyBRL(amount)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('investments')}
            className="w-full mt-6 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-xs font-medium text-slate-200 border border-slate-700/80 hover:border-amber-500/30 transition-all text-center cursor-pointer"
          >
            Gerenciar Aplicações e Vencimentos
          </button>
        </div>
      </div>

      {/* Secondary Grid: Ongoing Goals & Next Educational Step */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ongoing Goals (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-semibold text-white">Metas Financeiras em Andamento</h3>
              <p className="text-xs text-slate-400 mt-0.5">Acompanhamento dos marcos patrimoniais da família</p>
            </div>
            <button
              onClick={() => setActiveTab('goals')}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer"
            >
              Todas as Metas ({goals.length}) <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {goals.slice(0, 4).map((goal) => {
              const progressPct = goal.targetAmount > 0 ? Math.min(100, (goal.currentAmount / goal.targetAmount) * 100) : 0;
              return (
                <div
                  key={goal.id}
                  onClick={() => setActiveTab('goals')}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-amber-500/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400 font-medium truncate max-w-[150px]">{goal.title}</span>
                    <span className="font-mono text-amber-400 font-semibold">{formatPercent(progressPct, 0)}</span>
                  </div>

                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>{formatCurrencyBRL(goal.currentAmount)}</span>
                    <span className="text-slate-500">Alvo: {formatCurrencyBRL(goal.targetAmount)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Educational Recommendation (1 Col) */}
        <div className="bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Próximo Passo Recomendado</span>
            </div>
            <h3 className="text-base font-semibold text-white">Academia Montanari</h3>
            <p className="text-xs text-slate-300 mt-1">
              {nextTrack ? nextTrack.title : 'Fundamentos da Arquitetura Financeira'}
            </p>

            {nextLesson && (
              <div className="mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">
                  Aula Recomendada
                </span>
                <h4 className="text-sm font-semibold text-white mt-1 line-clamp-2">
                  {nextLesson.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {nextLesson.summary}
                </p>
                <div className="flex items-center gap-3 mt-3 text-[11px] text-slate-400">
                  <span>{nextLesson.readTimeMinutes} min de leitura</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-400 font-mono">+{nextLesson.xpReward} XP</span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveTab('academy')}
            className="w-full mt-6 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold tracking-wide transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
          >
            Acessar Aula na Academia <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Family Game Spotlight Banner */}
      <div className="bg-gradient-to-r from-blue-950/70 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/10">
            <Gamepad2 className="w-7 h-7 text-amber-400 animate-pulse" />
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-amber-400 font-mono uppercase tracking-wider">
              Educação Financeira Interativa Pais & Filhos
            </span>
            <h3 className="text-lg font-bold text-white">
              Arquitetos do Futuro: O Jogo do Patrimônio Familiar
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Ensinem seus filhos sobre a importância de poupar, desviar de compras por impulso e construir renda passiva com investimentos em um jogo divertido com dilemas familiares!
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('game')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs tracking-wide shadow-xl shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2 shrink-0 self-stretch md:self-auto justify-center"
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Jogar Agora em Família</span>
        </button>
      </div>
    </div>
  );
};
