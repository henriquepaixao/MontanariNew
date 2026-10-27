import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  formatCurrencyBRL,
  formatPercent,
  formatDateBRL,
  calculateRequiredMonthlyContribution,
} from '../../utils/calculators';
import { Goal } from '../../types';
import {
  Target,
  Plus,
  Trash2,
  Calendar,
  Sparkles,
  Users,
  User,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

export const GoalsView: React.FC = () => {
  const { goals, addGoal, updateGoal, deleteGoal } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoalForSim, setSelectedGoalForSim] = useState<Goal | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Goal['category']>('reserva');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [targetDate, setTargetDate] = useState('2028-12-31');
  const [monthlyDepositPlanned, setMonthlyDepositPlanned] = useState('');
  const [priority, setPriority] = useState<Goal['priority']>('alta');
  const [isFamily, setIsFamily] = useState(true);

  // Quick Deposit modal state
  const [depositAmount, setDepositAmount] = useState('');
  const [goalToDeposit, setGoalToDeposit] = useState<Goal | null>(null);

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const target = parseFloat(targetAmount.replace(',', '.'));
    const current = parseFloat(currentAmount.replace(',', '.')) || 0;
    const monthly = parseFloat(monthlyDepositPlanned.replace(',', '.')) || 0;

    if (!title || isNaN(target) || target <= 0) return;

    addGoal({
      title,
      description,
      category,
      targetAmount: target,
      currentAmount: current,
      targetDate,
      monthlyDepositPlanned: monthly,
      priority,
      isFamily,
    });

    setTitle('');
    setDescription('');
    setTargetAmount('');
    setCurrentAmount('');
    setMonthlyDepositPlanned('');
    setIsModalOpen(false);
  };

  const handleAddFunds = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalToDeposit) return;
    const funds = parseFloat(depositAmount.replace(',', '.'));
    if (isNaN(funds) || funds <= 0) return;

    updateGoal(goalToDeposit.id, {
      currentAmount: goalToDeposit.currentAmount + funds,
    });

    setGoalToDeposit(null);
    setDepositAmount('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono tracking-wide uppercase">
            <span>Arquitetura de Objetivos</span>
            <span aria-hidden="true">·</span>
            <span>Planejamento de Vida</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Metas Financeiras — Acompanhamento Estrutural
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Transforme aspirações em projetos com aportes mensais calculados e acompanhamento visual.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold tracking-wide transition-colors cursor-pointer shadow-lg shadow-amber-500/10 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Meta</span>
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progressPct = goal.targetAmount > 0 ? Math.min(100, (goal.currentAmount / goal.targetAmount) * 100) : 0;
          const deficit = Math.max(0, goal.targetAmount - goal.currentAmount);
          const isComplete = progressPct >= 100;

          // Estimate completion date based on planned monthly deposit
          const monthsToFinish =
            goal.monthlyDepositPlanned > 0 ? Math.ceil(deficit / goal.monthlyDepositPlanned) : 0;

          return (
            <div
              key={goal.id}
              className={`bg-slate-900/80 border rounded-2xl p-6 space-y-5 transition-all flex flex-col justify-between ${
                isComplete
                  ? 'border-emerald-500/40 bg-gradient-to-br from-slate-900 to-emerald-950/20 shadow-lg shadow-emerald-500/5'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                      {goal.isFamily ? (
                        <span className="flex items-center gap-1 text-blue-400">
                          <Users className="w-3.5 h-3.5" /> Meta Familiar
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-slate-400">
                          <User className="w-3.5 h-3.5" /> Meta Individual
                        </span>
                      )}
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{goal.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize text-amber-400/90 font-medium">Prioridade {goal.priority}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{goal.title}</h3>
                    {goal.description && (
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{goal.description}</p>
                    )}
                  </div>

                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="text-slate-500 hover:text-red-400 p-1 rounded transition-colors cursor-pointer shrink-0"
                    title="Excluir meta"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress bar */}
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Progresso</span>
                    <span className="text-amber-400 font-bold">{formatPercent(progressPct, 1)}</span>
                  </div>

                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isComplete
                          ? 'bg-emerald-400'
                          : 'bg-gradient-to-r from-amber-500 to-amber-300'
                      }`}
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono pt-1">
                    <span className="text-white font-semibold">{formatCurrencyBRL(goal.currentAmount)}</span>
                    <span className="text-slate-500">Alvo: {formatCurrencyBRL(goal.targetAmount)}</span>
                  </div>
                </div>

                {/* Contextual indicators */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-1.5 leading-relaxed">
                  {isComplete ? (
                    <div className="flex items-center gap-2 text-emerald-400 font-medium">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Parabéns! Meta integralmente alcançada.</span>
                    </div>
                  ) : (
                    <>
                      <div className="text-slate-300">
                        Você já alcançou <strong>{progressPct.toFixed(0)}%</strong> da sua meta.
                      </div>
                      <div className="text-slate-400">
                        Mantendo os aportes planejados de <strong>{formatCurrencyBRL(goal.monthlyDepositPlanned)}/mês</strong>, a meta poderá ser alcançada em aproximadamente <strong>{monthsToFinish} meses</strong>.
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedGoalForSim(goal)}
                  className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Simular Cenários
                </button>

                <button
                  onClick={() => setGoalToDeposit(goal)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                >
                  Registrar Aporte
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Scenario Simulator Modal for Goal */}
      {selectedGoalForSim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">Simulação de Cenários: {selectedGoalForSim.title}</h3>
            <p className="text-xs text-slate-400 mb-4">
              Explore como pequenos ajustes nos aportes afetam o prazo para alcançar seu objetivo.
            </p>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Aporte Planejado Atual:</span>
                <span className="text-amber-400 font-bold text-base">
                  {formatCurrencyBRL(selectedGoalForSim.monthlyDepositPlanned)}/mês
                </span>
                <span className="text-slate-500 block text-[11px] mt-0.5">
                  Prazo estimado: {Math.ceil(Math.max(0, selectedGoalForSim.targetAmount - selectedGoalForSim.currentAmount) / (selectedGoalForSim.monthlyDepositPlanned || 1))} meses
                </span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                <span className="text-emerald-300 text-[10px] block font-semibold">Cenário Acelerado (+25% no aporte):</span>
                <span className="text-white font-bold text-base">
                  {formatCurrencyBRL(selectedGoalForSim.monthlyDepositPlanned * 1.25)}/mês
                </span>
                <span className="text-emerald-400 block text-[11px] mt-0.5">
                  Você antecipa a conquista em {Math.round(Math.ceil(Math.max(0, selectedGoalForSim.targetAmount - selectedGoalForSim.currentAmount) / (selectedGoalForSim.monthlyDepositPlanned || 1)) * 0.2)} meses!
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedGoalForSim(null)}
              className="w-full mt-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              Fechar Simulação
            </button>
          </div>
        </div>
      )}

      {/* Quick Deposit Modal */}
      {goalToDeposit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">Registrar Aporte na Meta</h3>
            <p className="text-xs text-slate-400 mb-4">{goalToDeposit.title}</p>
            <form onSubmit={handleAddFunds} className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Valor do Aporte (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  placeholder="0,00"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono text-sm focus:outline-none focus:border-amber-500/50"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setGoalToDeposit(null)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold cursor-pointer"
                >
                  Confirmar Aporte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Nova Meta */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">Cadastrar Novo Marco Financeiro</h3>
            <form onSubmit={handleCreateGoal} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Título da Meta</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Reserva Blindada, Entrada do Imóvel, Viagem em Família"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Descrição / Finalidade</label>
                <textarea
                  rows={2}
                  placeholder="Descreva o propósito da conquista..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Categoria</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 capitalize"
                  >
                    <option value="reserva">Reserva de Emergência</option>
                    <option value="imovel">Imóvel Próprio</option>
                    <option value="veiculo">Veículo</option>
                    <option value="educacao">Educação dos Filhos</option>
                    <option value="viagem">Viagem & Lazer</option>
                    <option value="aposentadoria">Aposentadoria</option>
                    <option value="independencia">Independência Financeira</option>
                    <option value="familia">Família</option>
                    <option value="outro">Outro Objetivo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Prioridade</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 capitalize"
                  >
                    <option value="alta">Alta Prioridade</option>
                    <option value="media">Média Prioridade</option>
                    <option value="baixa">Baixa Prioridade</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Valor Alvo (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0,00"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Valor Já Acumulado (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Data Desejada</label>
                  <input
                    type="date"
                    required
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Aporte Mensal Planejado (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    value={monthlyDepositPlanned}
                    onChange={(e) => setMonthlyDepositPlanned(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={isFamily}
                    onChange={(e) => setIsFamily(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-amber-500"
                  />
                  <span>Esta é uma meta familiar compartilhada</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold cursor-pointer"
                >
                  Criar Meta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
