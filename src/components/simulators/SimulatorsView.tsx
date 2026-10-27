import React, { useState, useMemo } from 'react';
import {
  calculateCompoundInterest,
  calculateEmergencyFund,
  calculatePassiveIncomeScenarios,
  compareBrazilianInvestments,
  calculateRequiredMonthlyContribution,
  formatCurrencyBRL,
  formatPercent,
} from '../../utils/calculators';
import {
  Calculator,
  TrendingUp,
  ShieldCheck,
  Coins,
  Scale,
  Target,
  Info,
  HelpCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const SimulatorsView: React.FC = () => {
  const [activeSimulator, setActiveSimulator] = useState<
    'juros_compostos' | 'reserva' | 'renda_passiva' | 'comparador' | 'metas'
  >('juros_compostos');

  // 1. State for Compound Interest
  const [ciInitial, setCiInitial] = useState(10000);
  const [ciMonthly, setCiMonthly] = useState(1200);
  const [ciRateAnnual, setCiRateAnnual] = useState(11.5);
  const [ciYears, setCiYears] = useState(15);
  const [ciInflationAdjust, setCiInflationAdjust] = useState(4.0);

  // 2. State for Emergency Fund
  const [efExpenses, setEfExpenses] = useState(6500);
  const [efMonths, setEfMonths] = useState(6);
  const [efCurrent, setEfCurrent] = useState(18000);
  const [efWorkType, setEfWorkType] = useState<'clt' | 'pj' | 'concursado'>('clt');

  // 3. State for Passive Income
  const [piDesiredMonthly, setPiDesiredMonthly] = useState(10000);

  // 4. State for Investment Comparator
  const [cmpInitial, setCmpInitial] = useState(50000);
  const [cmpMonths, setCmpMonths] = useState(24);
  const [cmpSelic, setCmpSelic] = useState(11.25);
  const [cmpCdi, setCmpCdi] = useState(11.15);
  const [cmpIpca, setCmpIpca] = useState(4.15);

  // 5. State for Goal Planner
  const [goalTarget, setGoalTarget] = useState(250000);
  const [goalCurrent, setGoalCurrent] = useState(40000);
  const [goalYears, setGoalYears] = useState(5);
  const [goalRate, setGoalRate] = useState(10.5);

  // Calculations
  const compoundResult = useMemo(() => {
    return calculateCompoundInterest(ciInitial, ciMonthly, ciRateAnnual, ciYears, ciInflationAdjust);
  }, [ciInitial, ciMonthly, ciRateAnnual, ciYears, ciInflationAdjust]);

  const emergencyResult = useMemo(() => {
    return calculateEmergencyFund(efExpenses, efMonths, efCurrent, efWorkType);
  }, [efExpenses, efMonths, efCurrent, efWorkType]);

  const passiveResult = useMemo(() => {
    return calculatePassiveIncomeScenarios(piDesiredMonthly);
  }, [piDesiredMonthly]);

  const comparatorResult = useMemo(() => {
    return compareBrazilianInvestments(cmpInitial, cmpMonths, {
      selic: cmpSelic,
      cdi: cmpCdi,
      ipca: cmpIpca,
      poupanca: 6.17,
    });
  }, [cmpInitial, cmpMonths, cmpSelic, cmpCdi, cmpIpca]);

  const goalRequiredMonthly = useMemo(() => {
    const targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() + goalYears);
    return calculateRequiredMonthlyContribution(
      goalTarget,
      goalCurrent,
      targetDate.toISOString().split('T')[0],
      goalRate
    );
  }, [goalTarget, goalCurrent, goalYears, goalRate]);

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs text-amber-400 font-mono tracking-wide uppercase">
          <span>Engenharia Financeira</span>
          <span aria-hidden="true">·</span>
          <span>Modelos Preditivos</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
          Simuladores Financeiros e de Investimentos
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Projeções matemáticas rigorosas com premissas transparentes baseadas na tributação e nos indexadores brasileiros.
        </p>
      </div>

      {/* Simulator Selector Tabs (Clean segmented buttons) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {[
          { id: 'juros_compostos', label: 'Juros Compostos', icon: TrendingUp },
          { id: 'reserva', label: 'Reserva de Emergência', icon: ShieldCheck },
          { id: 'renda_passiva', label: 'Renda Passiva (SWR)', icon: Coins },
          { id: 'comparador', label: 'Comparador de Investimentos BR', icon: Scale },
          { id: 'metas', label: 'Aporte para Metas', icon: Target },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSimulator === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSimulator(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. SIMULADOR DE JUROS COMPOSTOS */}
      {activeSimulator === 'juros_compostos' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Form */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-400" /> Parâmetros da Simulação
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Aplicação Inicial (R$)</label>
                <input
                  type="number"
                  value={ciInitial}
                  onChange={(e) => setCiInitial(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Aporte Mensal (R$)</label>
                <input
                  type="number"
                  value={ciMonthly}
                  onChange={(e) => setCiMonthly(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Taxa de Rendimento Anual (% a.a.)</label>
                <input
                  type="number"
                  step="0.1"
                  value={ciRateAnnual}
                  onChange={(e) => setCiRateAnnual(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">Ex: 11,25% (Selic) ou 10% conservador</span>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Prazo em Anos: {ciYears} anos</label>
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={ciYears}
                  onChange={(e) => setCiYears(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1 ano</span>
                  <span>20 anos</span>
                  <span>40 anos</span>
                </div>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Reajuste Anual dos Aportes (% a.a.)</label>
                <input
                  type="number"
                  step="0.5"
                  value={ciInflationAdjust}
                  onChange={(e) => setCiInflationAdjust(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">Corrige seus aportes pela inflação anual estimada</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed">
              <span className="font-semibold text-amber-400">Fórmula:</span> M = C × (1 + i)^t com capitalização mensal de aportes e reajustes geométricos anuais.
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <span className="text-xs text-slate-400 block">Total Investido (Aportes)</span>
                <div className="text-xl font-bold text-white font-mono mt-1">
                  {formatCurrencyBRL(compoundResult.totalInvested)}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">Capital do seu próprio esforço</span>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
                <span className="text-xs text-slate-400 block">Total em Juros Acumulados</span>
                <div className="text-xl font-bold text-emerald-400 font-mono mt-1">
                  +{formatCurrencyBRL(compoundResult.totalInterest)}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">Dinheiro que trabalhou por você</span>
              </div>

              <div className="bg-slate-900/80 border border-amber-500/30 rounded-xl p-4 bg-gradient-to-br from-slate-900 to-amber-950/20">
                <span className="text-xs text-amber-300 block font-medium">Patrimônio Projetado</span>
                <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
                  {formatCurrencyBRL(compoundResult.futureValue)}
                </div>
                <span className="text-[10px] text-amber-200/60 mt-1 block font-mono">
                  Juros representam {formatPercent((compoundResult.totalInterest / compoundResult.futureValue) * 100, 0)} do total
                </span>
              </div>
            </div>

            {/* Visual Year-by-Year Stacked SVG Chart */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-white">Evolução: Capital Próprio vs Juros Compostos</h4>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                    <span className="text-slate-300">Total Investido</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="text-slate-300">Juros Acumulados</span>
                  </div>
                </div>
              </div>

              {/* Stacked Bars */}
              <div className="h-56 flex items-end gap-1 sm:gap-2 pt-6">
                {compoundResult.evolutionYearly.map((point) => {
                  const maxVal = compoundResult.futureValue || 1;
                  const investedHeight = (point.totalInvested / maxVal) * 100;
                  const interestHeight = (point.totalInterest / maxVal) * 100;

                  return (
                    <div
                      key={point.year}
                      className="flex-1 flex flex-col items-center justify-end h-full group relative"
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute -top-12 bg-slate-950 border border-slate-700 text-[10px] text-white p-1.5 rounded shadow-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap font-mono">
                        <div>Ano {point.year}: {formatCurrencyBRL(point.balance)}</div>
                        <div className="text-blue-400">Investido: {formatCurrencyBRL(point.totalInvested)}</div>
                        <div className="text-amber-400">Juros: {formatCurrencyBRL(point.totalInterest)}</div>
                      </div>

                      {/* Interest part */}
                      <div
                        style={{ height: `${interestHeight}%` }}
                        className="w-full bg-gradient-to-t from-amber-500 to-amber-300 rounded-t-sm"
                      />
                      {/* Invested part */}
                      <div
                        style={{ height: `${investedHeight}%` }}
                        className="w-full bg-blue-600 rounded-b-sm"
                      />
                      <span className="text-[9px] text-slate-500 font-mono mt-2">A{point.year}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. SIMULADOR DE RESERVA DE EMERGÊNCIA */}
      {activeSimulator === 'reserva' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" /> Parâmetros da Reserva
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Custo de Vida Mensal Essencial (R$)</label>
                <input
                  type="number"
                  value={efExpenses}
                  onChange={(e) => setEfExpenses(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Regime de Atividade Profissional</label>
                <select
                  value={efWorkType}
                  onChange={(e) => {
                    const type = e.target.value as any;
                    setEfWorkType(type);
                    if (type === 'concursado') setEfMonths(3);
                    else if (type === 'clt') setEfMonths(6);
                    else setEfMonths(12);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100"
                >
                  <option value="clt">CLT (Sugerido: 6 meses)</option>
                  <option value="pj">PJ / Autônomo / Empresário (Sugerido: 9 a 12 meses)</option>
                  <option value="concursado">Servidor Público Estável (Sugerido: 3 a 4 meses)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Meses Desejados de Cobertura: {efMonths} meses</label>
                <input
                  type="range"
                  min="3"
                  max="18"
                  value={efMonths}
                  onChange={(e) => setEfMonths(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Valor Já Acumulado Hoje (R$)</label>
                <input
                  type="number"
                  value={efCurrent}
                  onChange={(e) => setEfCurrent(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-white">Dimensão da sua Reserva Ideal</h4>
                  <div className="text-3xl font-bold text-amber-400 font-mono mt-1">
                    {formatCurrencyBRL(emergencyResult.recommendedTotal)}
                  </div>
                  <span className="text-xs text-slate-400">
                    Equivalente a {emergencyResult.monthsTarget} meses de tranquilidade para sua família.
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Progresso Atual</span>
                  <div className="text-2xl font-bold font-mono text-emerald-400">
                    {formatPercent(emergencyResult.progressPercent, 0)}
                  </div>
                  <span className="text-xs text-slate-400">
                    {emergencyResult.monthsCoveredCurrently} meses já cobertos
                  </span>
                </div>
              </div>

              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mt-4">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all"
                  style={{ width: `${emergencyResult.progressPercent}%` }}
                />
              </div>

              <div className="mt-6 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <div className="font-semibold text-amber-400 mb-1">Diagnóstico Montanari:</div>
                {emergencyResult.recommendationText}
              </div>
            </div>

            {/* Savings Plans to close the deficit */}
            {emergencyResult.deficit > 0 && (
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                <h4 className="text-sm font-semibold text-white mb-2">
                  Plano Estruturado para Concluir a Reserva (Déficit: {formatCurrencyBRL(emergencyResult.deficit)})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                    <span className="text-slate-400 block font-medium">Meta em 6 Meses</span>
                    <div className="text-lg font-bold text-white font-mono mt-1">
                      {formatCurrencyBRL(emergencyResult.monthlySavingsPlan.targetIn6Months)}
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-1">por mês (ritmo acelerado)</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                    <span className="text-slate-400 block font-medium">Meta em 12 Meses</span>
                    <div className="text-lg font-bold text-amber-400 font-mono mt-1">
                      {formatCurrencyBRL(emergencyResult.monthlySavingsPlan.targetIn12Months)}
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-1">por mês (ritmo equilibrado)</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                    <span className="text-slate-400 block font-medium">Meta em 24 Meses</span>
                    <div className="text-lg font-bold text-slate-300 font-mono mt-1">
                      {formatCurrencyBRL(emergencyResult.monthlySavingsPlan.targetIn24Months)}
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-1">por mês (ritmo gradual)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. SIMULADOR DE RENDA PASSIVA / LIBERDADE FINANCEIRA */}
      {activeSimulator === 'renda_passiva' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <div className="max-w-md">
              <label className="text-xs text-slate-300 block mb-1">
                Qual renda passiva mensal você deseja receber no futuro? (em poder de compra de hoje)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={piDesiredMonthly}
                  onChange={(e) => setPiDesiredMonthly(Number(e.target.value))}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 font-mono text-lg font-bold flex-1"
                />
                <span className="text-xs text-slate-400">R$/mês</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {passiveResult.scenarios.map((scen, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all ${
                    idx === 1
                      ? 'bg-gradient-to-b from-blue-950/40 via-slate-900 to-slate-900 border-amber-500/40 shadow-lg shadow-amber-500/5'
                      : 'bg-slate-950/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-slate-300">{scen.name}</span>
                    <span className="text-amber-400 font-mono">{scen.safeWithdrawalRateAnnual}% a.a. real</span>
                  </div>

                  <div className="mt-4">
                    <span className="text-[11px] text-slate-400 block">Patrimônio Necessário:</span>
                    <div className="text-2xl font-bold font-mono text-white mt-0.5">
                      {formatCurrencyBRL(scen.requiredCapital)}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mt-4 leading-relaxed">{scen.description}</p>
                  <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
                    <span className="font-medium text-slate-300">Premissas:</span> {scen.assumptions}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong>Aviso Metodológico de Renda Passiva:</strong> As projeções utilizam rendimento real (acima da inflação oficial do IPCA). Rendimentos passados não são garantia de rendimentos futuros. A preservação do poder de compra exige carteiras resilientes e rebalanceamento periódico.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. SIMULADOR COMPARATIVO DE INVESTIMENTOS NO BRASIL */}
      {activeSimulator === 'comparador' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white mb-2">
              Comparação Hipotética de Produtos Financeiros no Brasil
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Aplicação de <strong>{formatCurrencyBRL(cmpInitial)}</strong> pelo prazo de <strong>{cmpMonths} meses</strong> considerando a Tabela Regressiva de IR e a inflação estimada.
            </p>

            {/* Adjustable Parameters */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800 mb-6 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Capital (R$)</label>
                <input
                  type="number"
                  value={cmpInitial}
                  onChange={(e) => setCmpInitial(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Prazo (Meses)</label>
                <input
                  type="number"
                  value={cmpMonths}
                  onChange={(e) => setCmpMonths(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Selic (% a.a.)</label>
                <input
                  type="number"
                  step="0.1"
                  value={cmpSelic}
                  onChange={(e) => setCmpSelic(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">CDI (% a.a.)</label>
                <input
                  type="number"
                  step="0.1"
                  value={cmpCdi}
                  onChange={(e) => setCmpCdi(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">IPCA Estimado (% a.a.)</label>
                <input
                  type="number"
                  step="0.1"
                  value={cmpIpca}
                  onChange={(e) => setCmpIpca(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-white font-mono"
                />
              </div>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400">
                  <tr>
                    <th className="py-3 px-4 font-medium">Produto / Ativo</th>
                    <th className="py-3 px-4 font-medium">Taxa Bruta a.a.</th>
                    <th className="py-3 px-4 font-medium">Alíquota IR</th>
                    <th className="py-3 px-4 font-medium">Taxa Líquida a.a.</th>
                    <th className="py-3 px-4 font-medium">Ganho Real a.a.</th>
                    <th className="py-3 px-4 font-medium text-right">Rendimento Líquido</th>
                    <th className="py-3 px-4 font-medium text-right">Montante Final</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {comparatorResult.map((prod) => (
                    <tr key={prod.id} className="hover:bg-slate-850/50 transition-colors">
                      <td className="py-3 px-4 font-sans font-medium text-white">
                        <div>{prod.name}</div>
                        <span className="text-[10px] text-slate-400 font-sans">{prod.liquidityDescription}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{formatPercent(prod.grossAnnualRate)}</td>
                      <td className="py-3 px-4 text-slate-400">
                        {prod.irRate === 0 ? (
                          <span className="text-emerald-400 font-semibold">Isento</span>
                        ) : (
                          `${(prod.irRate * 100).toFixed(1)}%`
                        )}
                      </td>
                      <td className="py-3 px-4 text-white font-semibold">{formatPercent(prod.netAnnualRate)}</td>
                      <td className="py-3 px-4 text-emerald-400">+{formatPercent(prod.realAnnualRate)}</td>
                      <td className="py-3 px-4 text-right text-slate-200">{formatCurrencyBRL(prod.netInterestEarned)}</td>
                      <td className="py-3 px-4 text-right text-amber-400 font-bold">{formatCurrencyBRL(prod.estimatedFinalAmount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-[11px] text-slate-400 leading-relaxed border-t border-slate-800 pt-4">
              <span className="font-semibold text-slate-300">Nota Legal Tributária:</span> Tabela Regressiva da Renda Fixa aplicada conforme Lei 11.033/2004 (22,5% até 180 dias, 20% até 360 dias, 17,5% até 720 dias e 15% acima de 720 dias). Isenção de IR em LCIs, LCAs e proventos de FIIs garantida por legislação federal para pessoas físicas.
            </div>
          </div>
        </div>
      )}

      {/* 5. SIMULADOR DE METAS FINANCEIRAS */}
      {activeSimulator === 'metas' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" /> Parâmetros do Objetivo
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Valor Alvo da Meta (R$)</label>
                <input
                  type="number"
                  value={goalTarget}
                  onChange={(e) => setGoalTarget(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Valor Atual Guardado (R$)</label>
                <input
                  type="number"
                  value={goalCurrent}
                  onChange={(e) => setGoalCurrent(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Prazo para Conclusão: {goalYears} anos ({goalYears * 12} meses)</label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={goalYears}
                  onChange={(e) => setGoalYears(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Taxa Estimada da Aplicação (% a.a.)</label>
                <input
                  type="number"
                  step="0.5"
                  value={goalRate}
                  onChange={(e) => setGoalRate(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <span className="text-xs text-amber-400 uppercase tracking-wider block font-mono">
                Cálculo de Aporte Necessário
              </span>
              <h4 className="text-lg font-semibold text-white mt-1">
                Para acumular {formatCurrencyBRL(goalTarget)} em {goalYears} anos:
              </h4>

              <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-amber-950/20 border border-amber-500/30">
                <span className="text-xs text-slate-400 block">Aporte Mensal Recomendado:</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono mt-1">
                  {formatCurrencyBRL(goalRequiredMonthly.requiredMonthlyDeposit)}
                </div>
                <span className="text-xs text-slate-300 mt-2 block">
                  durante {goalRequiredMonthly.monthsRemaining} meses a uma taxa de {goalRate}% ao ano.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 text-xs font-mono">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Sem Novos Aportes, seu saldo atual viraria:</span>
                  <span className="text-slate-200 font-semibold">{formatCurrencyBRL(goalRequiredMonthly.projectedWithoutNewDeposits)}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Déficit Nominal Restante:</span>
                  <span className="text-red-400 font-semibold">{formatCurrencyBRL(goalRequiredMonthly.deficit)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">Dica Arquitetural:</span> Se o aporte mensal recomendado estiver acima da sua capacidade de poupança atual, você pode estender o prazo em alguns meses ou realocar despesas variáveis do orçamento.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
