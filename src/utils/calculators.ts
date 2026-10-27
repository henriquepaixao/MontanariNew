/**
 * Montanari Arquitetura Patrimonial - Motor de Cálculos Financeiros
 * Cálculos rigorosos baseados na realidade e tributação brasileira.
 */

// Formatação brasileira de moeda
export function formatCurrencyBRL(value: number): string {
  if (isNaN(value)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Formatação de porcentagem
export function formatPercent(value: number, decimals = 2): string {
  if (isNaN(value)) return '0,00%';
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value) + '%';
}

// Formatação de datas em pt-BR
export function formatDateBRL(dateStr: string): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  if (!year || !month || !day) return dateStr;
  return `${day}/${month}/${year}`;
}

// Tabela Regressiva de Imposto de Renda para Renda Fixa no Brasil
export function getBrazilianIRRate(days: number): number {
  if (days <= 180) return 0.225; // 22,5%
  if (days <= 360) return 0.200; // 20,0%
  if (days <= 720) return 0.175; // 17,5%
  return 0.150; // 15,0% para prazo superior a 720 dias
}

// 1. SIMULADOR DE JUROS COMPOSTOS
export interface CompoundInterestResult {
  totalInvested: number;
  totalInterest: number;
  futureValue: number;
  evolutionYearly: {
    year: number;
    month: number;
    totalInvested: number;
    totalInterest: number;
    balance: number;
    monthlyContribution: number;
  }[];
}

export function calculateCompoundInterest(
  initialAmount: number,
  monthlyDeposit: number,
  annualInterestRatePercent: number,
  periodYears: number,
  annualDepositInflationAdjustPercent = 0
): CompoundInterestResult {
  const totalMonths = Math.max(1, Math.round(periodYears * 12));
  // Taxa mensal equivalente: (1 + i_ano)^(1/12) - 1
  const monthlyRate = Math.pow(1 + annualInterestRatePercent / 100, 1 / 12) - 1;
  const annualAdjustRate = annualDepositInflationAdjustPercent / 100;

  let balance = initialAmount;
  let totalInvested = initialAmount;
  let currentMonthlyDeposit = monthlyDeposit;

  const evolutionYearly: CompoundInterestResult['evolutionYearly'] = [
    {
      year: 0,
      month: 0,
      totalInvested: initialAmount,
      totalInterest: 0,
      balance: initialAmount,
      monthlyContribution: currentMonthlyDeposit,
    },
  ];

  for (let m = 1; m <= totalMonths; m++) {
    // Reajuste anual do aporte no início de cada ano
    if (m > 1 && (m - 1) % 12 === 0 && annualAdjustRate > 0) {
      currentMonthlyDeposit *= 1 + annualAdjustRate;
    }

    // Rendimento sobre o saldo
    balance += balance * monthlyRate;
    // Aporte realizado
    balance += currentMonthlyDeposit;
    totalInvested += currentMonthlyDeposit;

    if (m % 12 === 0 || m === totalMonths) {
      const year = Math.ceil(m / 12);
      evolutionYearly.push({
        year,
        month: m,
        totalInvested: Math.round(totalInvested * 100) / 100,
        totalInterest: Math.max(0, Math.round((balance - totalInvested) * 100) / 100),
        balance: Math.round(balance * 100) / 100,
        monthlyContribution: Math.round(currentMonthlyDeposit * 100) / 100,
      });
    }
  }

  const totalInterest = Math.max(0, balance - totalInvested);

  return {
    totalInvested: Math.round(totalInvested * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    futureValue: Math.round(balance * 100) / 100,
    evolutionYearly,
  };
}

// 2. SIMULADOR DE RESERVA DE EMERGÊNCIA
export interface EmergencyFundAnalysis {
  monthlyExpenses: number;
  monthsTarget: number;
  recommendedTotal: number;
  currentAmount: number;
  progressPercent: number;
  deficit: number;
  monthsCoveredCurrently: number;
  monthlySavingsPlan: {
    targetIn6Months: number;
    targetIn12Months: number;
    targetIn24Months: number;
  };
  recommendationText: string;
}

export function calculateEmergencyFund(
  monthlyExpenses: number,
  monthsTarget: number,
  currentAmount: number,
  workType: 'clt' | 'pj' | 'concursado' | 'outro' = 'clt'
): EmergencyFundAnalysis {
  let recommendedMonths = monthsTarget;
  if (!recommendedMonths || recommendedMonths <= 0) {
    if (workType === 'concursado') recommendedMonths = 3;
    else if (workType === 'clt') recommendedMonths = 6;
    else recommendedMonths = 12; // PJ ou autônomo
  }

  const recommendedTotal = monthlyExpenses * recommendedMonths;
  const progressPercent = recommendedTotal > 0 ? Math.min(100, (currentAmount / recommendedTotal) * 100) : 0;
  const deficit = Math.max(0, recommendedTotal - currentAmount);
  const monthsCoveredCurrently = monthlyExpenses > 0 ? currentAmount / monthlyExpenses : 0;

  let recommendationText = '';
  if (progressPercent >= 100) {
    recommendationText = 'Excelente solidez! Sua reserva de emergência está completa e blindada em liquidez diária.';
  } else if (progressPercent >= 50) {
    recommendationText = 'Bom avanço! Você já cobriu metade do trajeto para sua estabilidade financeira.';
  } else {
    recommendationText = 'Prioridade número 1: canalize aportes para Tesouro Selic ou CDB de liquidez diária até formar a base.';
  }

  return {
    monthlyExpenses,
    monthsTarget: recommendedMonths,
    recommendedTotal,
    currentAmount,
    progressPercent: Math.round(progressPercent * 10) / 10,
    deficit,
    monthsCoveredCurrently: Math.round(monthsCoveredCurrently * 10) / 10,
    monthlySavingsPlan: {
      targetIn6Months: deficit > 0 ? deficit / 6 : 0,
      targetIn12Months: deficit > 0 ? deficit / 12 : 0,
      targetIn24Months: deficit > 0 ? deficit / 24 : 0,
    },
    recommendationText,
  };
}

// 3. SIMULADOR DE RENDA PASSIVA / INDEPENDÊNCIA FINANCEIRA
export interface PassiveIncomeAnalysis {
  desiredMonthlyIncome: number;
  desiredAnnualIncome: number;
  scenarios: {
    name: string;
    safeWithdrawalRateAnnual: number;
    requiredCapital: number;
    monthlyPassiveIncomeNominal: number;
    description: string;
    assumptions: string;
  }[];
}

export function calculatePassiveIncomeScenarios(desiredMonthlyIncome: number): PassiveIncomeAnalysis {
  const desiredAnnualIncome = desiredMonthlyIncome * 12;

  const scenarios = [
    {
      name: 'Ultra-Conservador (Preservação Eterna)',
      safeWithdrawalRateAnnual: 3.5, // 3,5% a.a. real
      requiredCapital: desiredAnnualIncome / 0.035,
      monthlyPassiveIncomeNominal: desiredMonthlyIncome,
      description: 'Garante a preservação do poder de compra real mesmo em cenários de juros baixos e alta inflação.',
      assumptions: 'Retirada real de 3,5% ao ano acima do IPCA. Capital praticamente perpétuo para sucessão.',
    },
    {
      name: 'Equilibrado (Regra dos 4% adaptada ao Brasil)',
      safeWithdrawalRateAnnual: 4.5, // 4,5% a.a. real
      requiredCapital: desiredAnnualIncome / 0.045,
      monthlyPassiveIncomeNominal: desiredMonthlyIncome,
      description: 'Equilíbrio recomendado para carteiras diversificadas entre NTN-B (Tesouro IPCA+), FIIs e Ações de dividendos.',
      assumptions: 'Retirada de 4,5% ao ano real. Proporciona fluxo estável com volatilidade controlada.',
    },
    {
      name: 'Otimista (Ciclo favorável de juros reais)',
      safeWithdrawalRateAnnual: 6.0, // 6,0% a.a. real
      requiredCapital: desiredAnnualIncome / 0.06,
      monthlyPassiveIncomeNominal: desiredMonthlyIncome,
      description: 'Aproveita períodos históricos onde títulos públicos indexados à inflação pagam IPCA + 6%.',
      assumptions: 'Retirada de 6,0% ao ano real. Menor margem de segurança contra choques inflacionários futuros.',
    },
  ];

  return {
    desiredMonthlyIncome,
    desiredAnnualIncome,
    scenarios,
  };
}

// 4. SIMULADOR COMPARATIVO DE INVESTIMENTOS NO BRASIL
export interface InvestmentComparisonItem {
  id: string;
  name: string;
  category: 'Renda Fixa Isenta' | 'Renda Fixa Tributada' | 'Títulos Públicos' | 'Renda Variável / FII';
  grossAnnualRate: number; // %
  irRate: number; // 0 para isento, ou 0.15 a 0.225
  netAnnualRate: number; // % líquido
  realAnnualRate: number; // descontando inflação estimada
  estimatedFinalAmount: number;
  netInterestEarned: number;
  liquidityDescription: string;
  riskRating: 'Mínimo' | 'Baixo' | 'Médio' | 'Moderado';
  notes: string;
}

export function compareBrazilianInvestments(
  initialAmount: number,
  periodMonths: number,
  referenceRates = {
    selic: 11.25,
    cdi: 11.15,
    ipca: 4.15,
    poupanca: 6.17, // se Selic > 8.5%, 0.5% ao mês + TR ~ 6.17%
  }
): InvestmentComparisonItem[] {
  const days = periodMonths * 30;
  const irRate = getBrazilianIRRate(days);
  const years = periodMonths / 12;

  // Função auxiliar para calcular montante líquido
  const calcProduct = (
    id: string,
    name: string,
    category: InvestmentComparisonItem['category'],
    grossAnnualRate: number,
    isTaxFree: boolean,
    liquidity: string,
    risk: InvestmentComparisonItem['riskRating'],
    notes: string
  ): InvestmentComparisonItem => {
    const effectiveIr = isTaxFree ? 0 : irRate;
    // Rendimento bruto total no período
    const grossReturnFactor = Math.pow(1 + grossAnnualRate / 100, years);
    const grossInterest = initialAmount * (grossReturnFactor - 1);
    const netInterest = isTaxFree ? grossInterest : grossInterest * (1 - effectiveIr);
    const estimatedFinalAmount = initialAmount + netInterest;
    // Taxa líquida anual equivalente
    const netAnnualRate = (Math.pow(estimatedFinalAmount / initialAmount, 1 / years) - 1) * 100;
    // Retorno real pelo método Fisher: (1 + net) / (1 + inflação) - 1
    const realAnnualRate = ((1 + netAnnualRate / 100) / (1 + referenceRates.ipca / 100) - 1) * 100;

    return {
      id,
      name,
      category,
      grossAnnualRate: Math.round(grossAnnualRate * 100) / 100,
      irRate: effectiveIr,
      netAnnualRate: Math.round(netAnnualRate * 100) / 100,
      realAnnualRate: Math.round(realAnnualRate * 100) / 100,
      estimatedFinalAmount: Math.round(estimatedFinalAmount * 100) / 100,
      netInterestEarned: Math.round(netInterest * 100) / 100,
      liquidityDescription: liquidity,
      riskRating: risk,
      notes,
    };
  };

  return [
    calcProduct(
      'poupanca',
      'Caderneta de Poupança',
      'Renda Fixa Isenta',
      referenceRates.poupanca,
      true,
      'Liquidez no aniversário mensal',
      'Mínimo',
      'Isenta de IR. Rendimento inferior à maioria das opções de renda fixa com mesmo risco de crédito.'
    ),
    calcProduct(
      'tesouro_selic',
      'Tesouro Selic (LFT)',
      'Títulos Públicos',
      referenceRates.selic + 0.05,
      false,
      'Liquidez D+1 pelo Governo Federal',
      'Mínimo',
      'O investimento de menor risco de crédito do Brasil. Indicado para reserva de emergência e caixa.'
    ),
    calcProduct(
      'cdb_110',
      'CDB 110% do CDI (Banco Médio/Grande)',
      'Renda Fixa Tributada',
      referenceRates.cdi * 1.10,
      false,
      'Liquidez no vencimento ou diária',
      'Baixo',
      'Garantia do FGC até R$ 250 mil por CPF e instituição. Rentabilidade superior à Selic.'
    ),
    calcProduct(
      'lci_lca_92',
      'LCI / LCA 92% do CDI',
      'Renda Fixa Isenta',
      referenceRates.cdi * 0.92,
      true,
      'Carência regulatória / Vencimento',
      'Baixo',
      'Isenta de Imposto de Renda para pessoa física com garantia do FGC. Excelente rentabilidade líquida.'
    ),
    calcProduct(
      'tesouro_ipca',
      'Tesouro IPCA+ 6,20% a.a.',
      'Títulos Públicos',
      referenceRates.ipca + 6.20,
      false,
      'Resgate antecipado com marcação a mercado',
      'Baixo',
      'Blindagem definitiva contra inflação no longo prazo. Garante juro real expressivo se mantido ao vencimento.'
    ),
    calcProduct(
      'fii_renda',
      'Fundo Imobiliário (FII) - Carteira Média',
      'Renda Variável / FII',
      referenceRates.cdi * 0.98 + 1.5,
      true,
      'Liquidez D+2 em Bolsa (B3)',
      'Médio',
      'Rendimentos mensais isentos de IR para pessoa física. Sujeito à oscilação da cota no mercado secundário.'
    ),
  ];
}

// 5. CÁLCULO DE APORTE NECESSÁRIO PARA UMA META
export function calculateRequiredMonthlyContribution(
  targetAmount: number,
  currentAmount: number,
  targetDateStr: string,
  annualInterestRatePercent = 10.0
): {
  monthsRemaining: number;
  requiredMonthlyDeposit: number;
  projectedWithoutNewDeposits: number;
  deficit: number;
} {
  const targetDate = new Date(targetDateStr);
  const now = new Date();
  const monthsRemaining = Math.max(
    1,
    (targetDate.getFullYear() - now.getFullYear()) * 12 + (targetDate.getMonth() - now.getMonth())
  );

  const monthlyRate = Math.pow(1 + annualInterestRatePercent / 100, 1 / 12) - 1;

  // Futuro do valor atual
  const projectedWithoutNewDeposits = currentAmount * Math.pow(1 + monthlyRate, monthsRemaining);
  const remainingTarget = Math.max(0, targetAmount - projectedWithoutNewDeposits);

  // Fórmula de anuidade: PMT = FV * i / ((1 + i)^n - 1)
  const factor = (Math.pow(1 + monthlyRate, monthsRemaining) - 1) / monthlyRate;
  const requiredMonthlyDeposit = factor > 0 ? remainingTarget / factor : 0;

  return {
    monthsRemaining,
    requiredMonthlyDeposit: Math.round(requiredMonthlyDeposit * 100) / 100,
    projectedWithoutNewDeposits: Math.round(projectedWithoutNewDeposits * 100) / 100,
    deficit: Math.max(0, targetAmount - currentAmount),
  };
}
