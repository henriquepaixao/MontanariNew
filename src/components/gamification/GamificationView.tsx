import React from 'react';
import { useApp } from '../../context/AppContext';
import { KNOWLEDGE_LEVELS, WEALTH_STAGES, ALL_BADGES } from '../../data/gamificationData';
import {
  Trophy,
  Sparkles,
  Award,
  CheckCircle2,
  Lock,
  GraduationCap,
  Building,
  Target,
  Compass,
  Layers,
  Shield,
  Scissors,
  Anchor,
  TrendingUp,
  Landmark,
} from 'lucide-react';

export const GamificationView: React.FC = () => {
  const { gamification, badges } = useApp();

  const currentLevelInfo = KNOWLEDGE_LEVELS[gamification.knowledgeLevel - 1] || KNOWLEDGE_LEVELS[0];
  const nextLevelInfo = KNOWLEDGE_LEVELS[gamification.knowledgeLevel];
  const xpCurrentMin = currentLevelInfo.minXp;
  const xpNextMin = nextLevelInfo ? nextLevelInfo.minXp : 4000;
  const xpProgressPercent = Math.min(
    100,
    Math.max(0, ((gamification.xp - xpCurrentMin) / (xpNextMin - xpCurrentMin)) * 100)
  );

  const iconMap: Record<string, React.ElementType> = {
    Compass,
    Layers,
    Shield,
    Scissors,
    CheckCircle2,
    Anchor,
    Sparkles,
    TrendingUp,
    GraduationCap,
    Landmark,
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs text-amber-400 font-mono tracking-wide uppercase">
          <span>Sistema de Progressão</span>
          <span aria-hidden="true">·</span>
          <span>Evolução Consciente</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
          Níveis, XP e Conquistas Patrimoniais
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Duas dimensões independentes de crescimento: o saber que você acumula e a solidez da sua estrutura patrimonial.
        </p>
      </div>

      {/* Primary XP & Current Level Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-amber-500/30 rounded-2xl p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/10">
              <Trophy className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-300 font-mono">
                <span>Nível {gamification.knowledgeLevel} de 7</span>
                <span aria-hidden="true">·</span>
                <span>{gamification.xp} XP Acumulados</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                {currentLevelInfo.title}
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                {currentLevelInfo.description}
              </p>
            </div>
          </div>

          <div className="w-full md:w-64 space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">Próximo Nível</span>
              <span className="text-amber-400 font-semibold">{nextLevelInfo ? nextLevelInfo.title : 'Nível Máximo'}</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all"
                style={{ width: `${xpProgressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>{gamification.xp} XP</span>
              <span>{xpNextMin} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Dimension Columns: Dimension A vs Dimension B */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* DIMENSION A: Níveis de Conhecimento */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white">Dimensão A: Conhecimento Financeiro</h3>
              <p className="text-xs text-slate-400">Evolução por aulas concluídas, quizzes e reflexões práticas.</p>
            </div>
          </div>

          <div className="space-y-3">
            {KNOWLEDGE_LEVELS.map((info) => {
              const isCurrent = info.level === gamification.knowledgeLevel;
              const isUnlocked = gamification.knowledgeLevel >= info.level;

              return (
                <div
                  key={info.level}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-amber-500/10 border-amber-500/40 text-white'
                      : isUnlocked
                      ? 'bg-slate-950/70 border-slate-800 text-slate-200'
                      : 'bg-slate-950/30 border-slate-850 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold">
                      Nível {info.level} — {info.title}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">
                      {info.minXp} - {info.maxXp} XP
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{info.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* DIMENSION B: Jornada de Evolução Patrimonial */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <Building className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-base font-bold text-white">Dimensão B: Jornada Patrimonial</h3>
              <p className="text-xs text-slate-400">Marcos de solidez pessoal alcançados sem exigir renda fixa mínima.</p>
            </div>
          </div>

          <div className="space-y-3">
            {WEALTH_STAGES.map((stg) => {
              const isCurrent = stg.stage === gamification.wealthStage;
              const isCompleted = gamification.wealthStage > stg.stage;

              return (
                <div
                  key={stg.stage}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                      : isCompleted
                      ? 'bg-slate-950/70 border-slate-800 text-slate-200'
                      : 'bg-slate-950/30 border-slate-850 text-slate-500 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold">
                      Etapa {stg.stage} — {stg.title}
                    </span>
                    {isCompleted ? (
                      <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Concluída
                      </span>
                    ) : isCurrent ? (
                      <span className="text-amber-400 font-mono text-[11px]">Etapa Atual</span>
                    ) : (
                      <span className="text-slate-500 font-mono text-[11px]">Aguardando</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{stg.description}</p>
                  <div className="text-[10px] text-slate-500 mt-2 font-mono">
                    Critério: {stg.milestoneCriteria}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Badges Trophy Room */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white">Galeria de Badges e Conquistas</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Reconhecimento por hábitos consistentes, organização orçamentária e maturidade nos investimentos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {ALL_BADGES.map((badge) => {
            const isUnlocked = gamification.unlockedBadges.includes(badge.id);
            const Icon = iconMap[badge.icon] || Trophy;

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-between transition-all ${
                  isUnlocked
                    ? 'bg-slate-950 border-amber-500/40 shadow-lg shadow-amber-500/5'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-50'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                    isUnlocked
                      ? 'bg-amber-500/15 border border-amber-500/40 text-amber-400'
                      : 'bg-slate-900 border border-slate-800 text-slate-600'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white">{badge.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 w-full text-[10px] font-mono">
                  {isUnlocked ? (
                    <span className="text-emerald-400 font-medium">Desbloqueado</span>
                  ) : (
                    <span className="text-slate-600 flex items-center justify-center gap-1">
                      <Lock className="w-3 h-3" /> Bloqueado
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
