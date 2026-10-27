import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Trophy, CheckCircle2, Info, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast, closeToast } = useApp();

  if (!toast) return null;

  const isXp = toast.type === 'xp';
  const isBadge = toast.type === 'badge';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div
        className={`p-4 rounded-xl border shadow-2xl backdrop-blur-md flex items-start gap-3 ${
          isBadge
            ? 'bg-amber-950/90 border-amber-500/40 text-amber-100 shadow-amber-500/10'
            : isXp
            ? 'bg-blue-950/90 border-blue-500/40 text-blue-100 shadow-blue-500/10'
            : 'bg-slate-900/95 border-slate-700 text-slate-100'
        }`}
      >
        <div className="mt-0.5 p-2 rounded-lg bg-black/30 shrink-0">
          {isBadge ? (
            <Trophy className="w-5 h-5 text-amber-400" />
          ) : isXp ? (
            <Sparkles className="w-5 h-5 text-blue-400" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold tracking-tight text-white">{toast.title}</h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
        </div>

        <button
          onClick={closeToast}
          className="text-slate-400 hover:text-white p-1 rounded transition-colors"
          aria-label="Fechar notificação"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
