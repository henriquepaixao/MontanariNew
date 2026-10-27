import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrencyBRL, formatPercent, formatDateBRL } from '../../utils/calculators';
import { Transaction, ExpenseCategory, IncomeCategory, Debt } from '../../types';
import {
  Wallet,
  Plus,
  Download,
  Filter,
  Search,
  CheckCircle,
  Clock,
  Trash2,
  Edit2,
  TrendingUp,
  AlertTriangle,
  CreditCard,
  Calendar,
  Layers,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldAlert,
  Mic,
  MicOff,
} from 'lucide-react';
import { useVoiceInput } from '../../hooks/useVoiceInput';

export const BudgetView: React.FC = () => {
  const {
    transactions,
    debts,
    summary,
    profile,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    addDebt,
    deleteDebt,
    exportTransactionsCSV,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'transacoes' | 'planejamento' | 'dividas' | 'calendario'>('transacoes');
  const [filterType, setFilterType] = useState<'todas' | 'receita' | 'despesa'>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');

  // Voice Search Hook for transactions
  const {
    isListening: isSearchingVoice,
    hasSupport: hasVoiceSearchSupport,
    startListening: startVoiceSearch,
    stopListening: stopVoiceSearch,
  } = useVoiceInput({
    onResult: (text) => setSearchQuery(text),
  });

  // New Transaction Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'receita' | 'despesa'>('despesa');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<string>('alimentacao');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<'pago' | 'pendente'>('pago');
  const [isRecurring, setIsRecurring] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<Transaction['paymentMethod']>('pix');
  const [installmentsTotal, setInstallmentsTotal] = useState('1');

  // New Debt Modal State
  const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);
  const [debtTitle, setDebtTitle] = useState('');
  const [debtCreditor, setDebtCreditor] = useState('');
  const [debtTotal, setDebtTotal] = useState('');
  const [debtRemaining, setDebtRemaining] = useState('');
  const [debtInterestRate, setDebtInterestRate] = useState('');
  const [debtInstallment, setDebtInstallment] = useState('');
  const [debtRemainingInstallments, setDebtRemainingInstallments] = useState('');
  const [debtDueDate, setDebtDueDate] = useState('2026-11-10');

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (filterType !== 'todas' && t.type !== filterType) return false;
      if (selectedCategory !== 'todas' && t.category !== selectedCategory) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
      }
      return true;
    });
  }, [transactions, filterType, selectedCategory, searchQuery]);

  // Expenses by category
  const expenseByCategory = useMemo(() => {
    const acc: Record<string, number> = {};
    transactions
      .filter((t) => t.type === 'despesa')
      .forEach((t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
      });
    return acc;
  }, [transactions]);

  // Top expense category
  const topExpenseCategory = useMemo(() => {
    let topCat = 'Nenhuma';
    let max = 0;
    Object.entries(expenseByCategory).forEach(([cat, val]) => {
      if (val > max) {
        max = val;
        topCat = cat;
      }
    });
    return { category: topCat, amount: max };
  }, [expenseByCategory]);

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount.replace(',', '.'));
    if (!description || isNaN(numAmount) || numAmount <= 0) return;

    const totalInst = parseInt(installmentsTotal, 10);
    addTransaction({
      type: modalType,
      category: category as any,
      description,
      amount: numAmount,
      date,
      status,
      isRecurring,
      paymentMethod,
      installments: totalInst > 1 ? { current: 1, total: totalInst } : undefined,
    });

    // Reset and close
    setDescription('');
    setAmount('');
    setIsModalOpen(false);
  };

  const handleCreateDebt = (e: React.FormEvent) => {
    e.preventDefault();
    const total = parseFloat(debtTotal.replace(',', '.'));
    const remaining = parseFloat(debtRemaining.replace(',', '.'));
    const interest = parseFloat(debtInterestRate.replace(',', '.')) || 0;
    const installment = parseFloat(debtInstallment.replace(',', '.'));
    const remainingInst = parseInt(debtRemainingInstallments, 10) || 1;

    if (!debtTitle || isNaN(remaining)) return;

    addDebt({
      title: debtTitle,
      creditor: debtCreditor || 'Instituição Financeira',
      totalAmount: total || remaining,
      remainingAmount: remaining,
      interestRateMonthly: interest,
      monthlyInstallment: installment || remaining / remainingInst,
      remainingInstallments: remainingInst,
      dueDate: debtDueDate,
      priority: interest > 3.0 ? 'alta' : 'media',
    });

    setDebtTitle('');
    setDebtCreditor('');
    setDebtTotal('');
    setDebtRemaining('');
    setDebtInterestRate('');
    setDebtInstallment('');
    setDebtRemainingInstallments('');
    setIsDebtModalOpen(false);
  };

  // Educational 50/30/20 benchmark reference
  const essentialExpenses = transactions
    .filter((t) => t.type === 'despesa' && ['moradia', 'alimentacao', 'transporte', 'saude', 'impostos'].includes(t.category))
    .reduce((s, t) => s + t.amount, 0);

  const lifestyleExpenses = transactions
    .filter((t) => t.type === 'despesa' && ['lazer', 'educacao', 'outros'].includes(t.category))
    .reduce((s, t) => s + t.amount, 0);

  const futureExpenses = transactions
    .filter((t) => t.type === 'despesa' && ['investimentos', 'dividas'].includes(t.category))
    .reduce((s, t) => s + t.amount, 0) + Math.max(0, summary.monthBalance);

  const incomeBase = summary.monthIncome || 1;
  const pctEssential = (essentialExpenses / incomeBase) * 100;
  const pctLifestyle = (lifestyleExpenses / incomeBase) * 100;
  const pctFuture = (futureExpenses / incomeBase) * 100;

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono tracking-wide uppercase">
            <span>Planejamento Orçamentário</span>
            <span aria-hidden="true">·</span>
            <span>Fluxo de Caixa Mensal</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Organização do Orçamento Pessoal e Familiar
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Controle receitas, despesas fixas e variáveis, dívidas e mantenha seu fluxo no positivo.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={exportTransactionsCSV}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Exportar CSV</span>
          </button>
          <button
            onClick={() => {
              setModalType('despesa');
              setCategory('alimentacao');
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold tracking-wide transition-colors cursor-pointer shadow-lg shadow-amber-500/10"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Transação</span>
          </button>
        </div>
      </div>

      {/* Intelligent Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block">Receitas do Mês</span>
          <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
            +{formatCurrencyBRL(summary.monthIncome)}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Renda líquida registrada</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block">Despesas Realizadas</span>
          <div className="text-xl font-bold text-slate-200 font-mono mt-1">
            -{formatCurrencyBRL(summary.monthExpenses)}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Gastos essenciais e estilo de vida</span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block">Renda Comprometida</span>
          <div className="text-xl font-bold text-white font-mono mt-1">
            {formatPercent((summary.monthExpenses / incomeBase) * 100, 1)}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {pctEssential <= 55 ? 'Equilíbrio saudável' : 'Atenção aos custos fixos'}
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block">Maior Categoria de Custo</span>
          <div className="text-xl font-bold text-amber-400 font-mono mt-1 capitalize truncate">
            {topExpenseCategory.category}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block font-mono">
            {formatCurrencyBRL(topExpenseCategory.amount)}
          </span>
        </div>
      </div>

      {/* Sub-tab Navigation (Functional buttons) */}
      <div className="flex items-center gap-1 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveSubTab('transacoes')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'transacoes'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Extrato & Lançamentos ({transactions.length})
        </button>
        <button
          onClick={() => setActiveSubTab('planejamento')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'planejamento'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Parâmetro Educativo 50/30/20
        </button>
        <button
          onClick={() => setActiveSubTab('dividas')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'dividas'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Gestão de Dívidas ({debts.length})
        </button>
        <button
          onClick={() => setActiveSubTab('calendario')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeSubTab === 'calendario'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Vencimentos do Mês
        </button>
      </div>

      {/* TAB 1: Transações */}
      {activeSubTab === 'transacoes' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-900/60 border border-slate-800 p-3 rounded-xl">
            {/* Search with Voice Recognition */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder={isSearchingVoice ? 'Ouvindo busca por voz...' : 'Buscar lançamentos...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-9 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
              />
              {hasVoiceSearchSupport && (
                <button
                  type="button"
                  onClick={isSearchingVoice ? stopVoiceSearch : startVoiceSearch}
                  className={`absolute right-2 top-1.5 p-1 rounded-md transition-colors cursor-pointer ${
                    isSearchingVoice
                      ? 'text-red-400 bg-red-950/60 animate-pulse'
                      : 'text-slate-500 hover:text-amber-400'
                  }`}
                  title={isSearchingVoice ? 'Parar escuta' : 'Pesquisar lançamentos por voz'}
                  aria-label="Pesquisa por voz"
                >
                  {isSearchingVoice ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-1 p-0.5 bg-slate-950 rounded-lg border border-slate-800">
                {(['todas', 'receita', 'despesa'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors capitalize cursor-pointer ${
                      filterType === type ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Category Select */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500/50 capitalize"
              >
                <option value="todas">Todas Categorias</option>
                <option value="moradia">Moradia</option>
                <option value="alimentacao">Alimentação</option>
                <option value="transporte">Transporte</option>
                <option value="saude">Saúde</option>
                <option value="educacao">Educação</option>
                <option value="lazer">Lazer</option>
                <option value="dividas">Dívidas</option>
                <option value="investimentos">Investimentos</option>
                <option value="salario">Salário</option>
                <option value="dividendos">Dividendos</option>
                <option value="outros">Outros</option>
              </select>
            </div>
          </div>

          {/* Transactions List */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400">
                  <tr>
                    <th className="py-3 px-4 font-medium">Data</th>
                    <th className="py-3 px-4 font-medium">Descrição</th>
                    <th className="py-3 px-4 font-medium">Categoria</th>
                    <th className="py-3 px-4 font-medium">Método</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 font-medium text-right">Valor</th>
                    <th className="py-3 px-4 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredTransactions.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-500">
                        Nenhum lançamento encontrado com os filtros selecionados.
                      </td>
                    </tr>
                  ) : (
                    filteredTransactions.map((tx) => {
                      const isExpense = tx.type === 'despesa';
                      return (
                        <tr key={tx.id} className="hover:bg-slate-850/50 transition-colors">
                          <td className="py-3 px-4 text-slate-400 font-mono whitespace-nowrap">
                            {formatDateBRL(tx.date)}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-white flex items-center gap-2">
                              {tx.description}
                              {tx.installments && (
                                <span className="text-[10px] text-amber-400 font-mono">
                                  ({tx.installments.current}/{tx.installments.total})
                                </span>
                              )}
                              {tx.isRecurring && (
                                <span className="text-[10px] text-blue-400">· Recorrente</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-slate-300 capitalize">{tx.category}</span>
                          </td>
                          <td className="py-3 px-4 text-slate-400 uppercase font-mono text-[11px]">
                            {tx.paymentMethod}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() =>
                                updateTransaction(tx.id, {
                                  status: tx.status === 'pago' ? 'pendente' : 'pago',
                                })
                              }
                              className={`flex items-center gap-1.5 text-xs cursor-pointer ${
                                tx.status === 'pago' ? 'text-emerald-400' : 'text-amber-400'
                              }`}
                            >
                              {tx.status === 'pago' ? (
                                <>
                                  <CheckCircle className="w-3.5 h-3.5" /> Pago
                                </>
                              ) : (
                                <>
                                  <Clock className="w-3.5 h-3.5" /> Pendente
                                </>
                              )}
                            </button>
                          </td>
                          <td
                            className={`py-3 px-4 text-right font-mono font-medium whitespace-nowrap ${
                              isExpense ? 'text-slate-200' : 'text-emerald-400'
                            }`}
                          >
                            {isExpense ? '-' : '+'}
                            {formatCurrencyBRL(tx.amount)}
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => deleteTransaction(tx.id)}
                              className="text-slate-500 hover:text-red-400 p-1 rounded transition-colors cursor-pointer"
                              title="Excluir lançamento"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Parâmetro Educativo 50/30/20 */}
      {activeSubTab === 'planejamento' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-base font-semibold text-white">
              Análise Orçamentária por Dimensões (Referência 50 / 30 / 20)
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              A regra 50/30/20 é uma bússola educativa flexível para apoiar seu discernimento financeiro, sem engessar as particularidades de cada família.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Essenciais */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-slate-300">Necessidades Essenciais</span>
                  <span className="text-slate-400 font-mono">Meta: ~50%</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white">
                  {formatPercent(pctEssential, 1)}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  {formatCurrencyBRL(essentialExpenses)}
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                  <div
                    className={`h-full rounded-full transition-all ${
                      pctEssential <= 55 ? 'bg-blue-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${Math.min(100, pctEssential)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
                  Moradia, condomínio, alimentação básica, farmácia, saúde e transporte essencial.
                </p>
              </div>

              {/* Estilo de Vida */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-slate-300">Estilo de Vida & Conforto</span>
                  <span className="text-slate-400 font-mono">Meta: ~30%</span>
                </div>
                <div className="text-2xl font-bold font-mono text-white">
                  {formatPercent(pctLifestyle, 1)}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  {formatCurrencyBRL(lifestyleExpenses)}
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                  <div
                    className={`h-full rounded-full transition-all ${
                      pctLifestyle <= 35 ? 'bg-amber-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${Math.min(100, pctLifestyle)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
                  Restaurantes, lazer em família, assinaturas de streaming, hobbies e compras conscientes.
                </p>
              </div>

              {/* Futuro */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-slate-300">Construção do Futuro</span>
                  <span className="text-slate-400 font-mono">Meta: ~20%</span>
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  {formatPercent(pctFuture, 1)}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  {formatCurrencyBRL(futureExpenses)}
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, pctFuture)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
                  Aporte para a reserva de emergência, quitação de dívidas onerosas e investimentos estruturados.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Dívidas */}
      {activeSubTab === 'dividas' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-white">Mapeamento de Passivos e Dívidas</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Estratégia de quitação acelerada (Métodos Avalanche e Bola de Neve).
              </p>
            </div>
            <button
              onClick={() => setIsDebtModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-medium hover:bg-amber-500/25 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar Dívida
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {debts.map((debt) => (
              <div
                key={debt.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-white">{debt.title}</h4>
                    <span className="text-xs text-slate-400">{debt.creditor}</span>
                  </div>
                  <button
                    onClick={() => deleteDebt(debt.id)}
                    className="text-slate-500 hover:text-emerald-400 text-xs flex items-center gap-1 p-1 rounded transition-colors cursor-pointer"
                    title="Liquidar / Excluir Dívida"
                  >
                    <CheckCircle className="w-4 h-4" /> Quitar
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 font-mono">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Saldo Devedor:</span>
                    <span className="font-semibold text-red-400">{formatCurrencyBRL(debt.remainingAmount)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Taxa de Juros:</span>
                    <span className="text-slate-300 font-medium">{debt.interestRateMonthly}% a.m.</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Parcela Mensal:</span>
                    <span className="text-slate-200">{formatCurrencyBRL(debt.monthlyInstallment)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Parcelas Restantes:</span>
                    <span className="text-amber-400">{debt.remainingInstallments} parcelas</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 bg-amber-950/30 border border-amber-500/20 p-2.5 rounded-lg flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    {debt.interestRateMonthly > 2.0
                      ? 'Dívida de alta prioridade (Método Avalanche): os juros superam investimentos convencionais. Canalize excedentes para quitá-la primeiro.'
                      : 'Taxa sob controle: mantenha o pagamento pontual das parcelas sem atrasos.'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Calendário de Vencimentos */}
      {activeSubTab === 'calendario' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-400" />
            Contas com Vencimento no Mês
          </h3>

          <div className="space-y-3">
            {transactions
              .filter((t) => t.type === 'despesa')
              .slice(0, 8)
              .map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex flex-col items-center justify-center font-mono">
                      <span className="text-[10px] text-slate-400">Dia</span>
                      <span className="text-xs font-bold text-white">{tx.date.split('-')[2] || '10'}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{tx.description}</h4>
                      <span className="text-[11px] text-slate-400 capitalize">{tx.category} · {tx.paymentMethod}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-mono font-medium text-slate-200">
                      {formatCurrencyBRL(tx.amount)}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                        tx.status === 'pago' ? 'bg-emerald-950/80 text-emerald-300' : 'bg-amber-950/80 text-amber-300'
                      }`}
                    >
                      {tx.status === 'pago' ? 'Pago' : 'A Vencer'}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Modal: Nova Transação */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Novo Lançamento Financeiro</h3>
            <form onSubmit={handleCreateTransaction} className="space-y-4 text-xs">
              {/* Type Switch */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalType('despesa')}
                  className={`py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                    modalType === 'despesa' ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'text-slate-400'
                  }`}
                >
                  Despesa
                </button>
                <button
                  type="button"
                  onClick={() => setModalType('receita')}
                  className={`py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                    modalType === 'receita' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-400'
                  }`}
                >
                  Receita
                </button>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Descrição</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Supermercado Mensal, Salário, etc."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Valor (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0,00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Data</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Categoria</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500/50 capitalize"
                  >
                    {modalType === 'despesa' ? (
                      <>
                        <option value="moradia">Moradia</option>
                        <option value="alimentacao">Alimentação</option>
                        <option value="transporte">Transporte</option>
                        <option value="saude">Saúde</option>
                        <option value="educacao">Educação</option>
                        <option value="lazer">Lazer</option>
                        <option value="dividas">Dívidas</option>
                        <option value="investimentos">Investimentos</option>
                        <option value="impostos">Impostos</option>
                        <option value="outros">Outros</option>
                      </>
                    ) : (
                      <>
                        <option value="salario">Salário</option>
                        <option value="prolabore">Pró-labore</option>
                        <option value="dividendos">Dividendos</option>
                        <option value="aluguel">Aluguel Recebido</option>
                        <option value="freelance">Freelance</option>
                        <option value="rendimentos">Rendimentos</option>
                        <option value="outros">Outros</option>
                      </>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Forma de Pagamento</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500/50 uppercase"
                  >
                    <option value="pix">Pix</option>
                    <option value="cartao">Cartão de Crédito</option>
                    <option value="boleto">Boleto Bancário</option>
                    <option value="transferencia">Transferência / TED</option>
                    <option value="dinheiro">Dinheiro</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-amber-500"
                  />
                  <span>Despesa recorrente mensal</span>
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
                  Salvar Lançamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Nova Dívida */}
      {isDebtModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-4">Cadastrar Nova Dívida / Passivo</h3>
            <form onSubmit={handleCreateDebt} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Título da Dívida</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Financiamento Carro, Empréstimo Pessoal"
                  value={debtTitle}
                  onChange={(e) => setDebtTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Credor / Instituição</label>
                <input
                  type="text"
                  placeholder="Ex: Banco Itaú, Santander, etc."
                  value={debtCreditor}
                  onChange={(e) => setDebtCreditor(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Saldo Devedor Atual (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0,00"
                    value={debtRemaining}
                    onChange={(e) => setDebtRemaining(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Juros (% ao mês)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ex: 1.5"
                    value={debtInterestRate}
                    onChange={(e) => setDebtInterestRate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Valor da Parcela (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    value={debtInstallment}
                    onChange={(e) => setDebtInstallment(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Parcelas Restantes</label>
                  <input
                    type="number"
                    placeholder="Ex: 12"
                    value={debtRemainingInstallments}
                    onChange={(e) => setDebtRemainingInstallments(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono focus:outline-none focus:border-amber-500/50"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsDebtModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold cursor-pointer"
                >
                  Registrar Dívida
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
