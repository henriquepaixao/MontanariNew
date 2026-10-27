import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrencyBRL } from '../../utils/calculators';
import {
  User,
  Shield,
  Download,
  Trash2,
  RotateCcw,
  CheckCircle2,
  FileJson,
  Sparkles,
  Award,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    user,
    profile,
    updateProfile,
    exportUserDataJSON,
    exportTransactionsCSV,
    clearAllUserData,
    resetToDemo,
    isDemoMode,
  } = useApp();

  const [diagnosisStage, setDiagnosisStage] = useState(profile.diagnosisStage);
  const [monthlyIncome, setMonthlyIncome] = useState(profile.monthlyIncome.toString());
  const [fixedExpenses, setFixedExpenses] = useState(profile.fixedExpensesEstimate.toString());
  const [variableExpenses, setVariableExpenses] = useState(profile.variableExpensesEstimate.toString());
  const [emergencyCurrent, setEmergencyCurrent] = useState(profile.emergencyFundCurrentAmount.toString());
  const [emergencyMonths, setEmergencyMonths] = useState(profile.emergencyFundMonthsTarget);
  const [knowledgeLevel, setKnowledgeLevel] = useState(profile.knowledgeLevel);
  const [riskProfile, setRiskProfile] = useState(profile.riskProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      diagnosisStage: diagnosisStage as any,
      monthlyIncome: parseFloat(monthlyIncome.replace(',', '.')) || 0,
      fixedExpensesEstimate: parseFloat(fixedExpenses.replace(',', '.')) || 0,
      variableExpensesEstimate: parseFloat(variableExpenses.replace(',', '.')) || 0,
      emergencyFundCurrentAmount: parseFloat(emergencyCurrent.replace(',', '.')) || 0,
      emergencyFundMonthsTarget: emergencyMonths,
      knowledgeLevel,
      riskProfile,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs text-amber-400 font-mono tracking-wide uppercase">
          <span>Identidade Financeira</span>
          <span aria-hidden="true">·</span>
          <span>Privacidade & LGPD</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
          Perfil Financeiro & Central de Privacidade
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Atualize seu diagnóstico estrutural, configure seus parâmetros orçamentários e exporte seus dados protegidos.
        </p>
      </div>

      {/* Financial Diagnosis & Stage Form */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            Diagnóstico Patrimonial e Estágio Atual
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Selecione em qual momento financeiro você se encontra hoje:
          </p>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-6 text-xs">
          {/* 6 Stages Radio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { stage: 1, title: '1. Organizando minha vida financeira', desc: 'Mapeando entradas e saídas, buscando sair do aperto.' },
              { stage: 2, title: '2. Eliminando dívidas e criando reserva', desc: 'Foco em zerar rotativos e formar o colchão de segurança.' },
              { stage: 3, title: '3. Começando a investir', desc: 'Primeiros passos em Tesouro Selic, CDBs e renda fixa simples.' },
              { stage: 4, title: '4. Construindo patrimônio', desc: 'Aportes mensais consistentes e diversificação da carteira.' },
              { stage: 5, title: '5. Protegendo e diversificando', desc: 'Gestão de riscos familiares, blindagem patrimonial e FIIs/Ações.' },
              { stage: 6, title: '6. Independência e sucessão', desc: 'Viver de renda passiva e preparar a transmissão aos filhos.' },
            ].map((item) => (
              <label
                key={item.stage}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  diagnosisStage === item.stage
                    ? 'bg-amber-500/10 border-amber-500/50 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="diagnosisStage"
                  value={item.stage}
                  checked={diagnosisStage === item.stage}
                  onChange={() => setDiagnosisStage(item.stage as any)}
                  className="mt-1 accent-amber-500"
                />
                <div>
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>

          {/* Core Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div>
              <label className="text-slate-300 block mb-1">Renda Mensal Líquida Média (R$)</label>
              <input
                type="number"
                step="0.01"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1">Estimativa de Custos Fixos Essenciais (R$)</label>
              <input
                type="number"
                step="0.01"
                value={fixedExpenses}
                onChange={(e) => setFixedExpenses(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1">Estimativa de Gastos Variáveis / Estilo de Vida (R$)</label>
              <input
                type="number"
                step="0.01"
                value={variableExpenses}
                onChange={(e) => setVariableExpenses(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1">Saldo Atual na Reserva de Emergência (R$)</label>
              <input
                type="number"
                step="0.01"
                value={emergencyCurrent}
                onChange={(e) => setEmergencyCurrent(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>

          {/* Profile Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div>
              <label className="text-slate-300 block mb-1">Nível de Conhecimento Declarado</label>
              <select
                value={knowledgeLevel}
                onChange={(e) => setKnowledgeLevel(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white capitalize"
              >
                <option value="iniciante">Iniciante (Começando do zero)</option>
                <option value="basico">Básico (Já conheço poupança e CDB)</option>
                <option value="intermediario">Intermediário (Invisto em Tesouro e FIIs)</option>
                <option value="avancado">Avançado (Carteira diversificada com ações/exterior)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-300 block mb-1">Tolerância ao Risco</label>
              <select
                value={riskProfile}
                onChange={(e) => setRiskProfile(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white capitalize"
              >
                <option value="conservador">Conservador (Prioridade para segurança e previsibilidade)</option>
                <option value="moderado">Moderado (Aceita oscilações moderadas por ganho real)</option>
                <option value="arrojado">Arrojado (Foco em multiplicação e longo prazo)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-400">
              {savedSuccess ? 'Perfil atualizado com sucesso!' : 'Suas informações orientam os simuladores.'}
            </span>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold cursor-pointer shadow-lg shadow-amber-500/10 transition-colors"
            >
              Salvar Diagnóstico
            </button>
          </div>
        </form>
      </div>

      {/* LGPD & Data Governance Hub */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            Central de Privacidade e Direitos LGPD (Lei 13.709/2018)
          </h2>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Você é o único proprietário de todos os seus registros financeiros. Concedemos transparência total e ferramentas para portabilidade ou exclusão imediata.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Export JSON */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-2 text-white font-semibold">
                <FileJson className="w-4 h-4 text-amber-400" />
                <span>Portabilidade Completa (JSON)</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Baixe um arquivo seguro contendo seu perfil, balanço, investimentos, histórico de transações e progresso educacional.
              </p>
            </div>
            <button
              onClick={exportUserDataJSON}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Baixar Backup JSON
            </button>
          </div>

          {/* Export CSV */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center gap-2 text-white font-semibold">
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Relatório de Transações (CSV)</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                Planilha no formato Excel / CSV com todas as despesas e receitas registradas para conferência contábil.
              </p>
            </div>
            <button
              onClick={exportTransactionsCSV}
              className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium cursor-pointer transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Exportar Planilha CSV
            </button>
          </div>
        </div>

        {/* Demo Mode / Data Reset Actions */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div>
            <h4 className="text-white font-semibold">Gerenciamento de Amostras e Dados</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Alterne entre o modo de exploração demonstrativa e uma base zerada pronta para seus dados reais.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetToDemo}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-700 text-xs font-medium cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" /> Carregar Amostra
            </button>
            <button
              onClick={clearAllUserData}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-950/50 hover:bg-red-900/60 text-red-200 border border-red-500/30 text-xs font-medium cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-400" /> Limpar Todos os Dados
            </button>
          </div>
        </div>
      </div>

      {/* Business Model & Tiers Comparison */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
        <div>
          <span className="text-xs text-amber-400 font-mono uppercase tracking-wider">
            Arquitetura de Serviços
          </span>
          <h2 className="text-lg font-bold text-white mt-0.5">
            Planos Montanari Arquitetura Patrimonial
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Plataforma desenhada para modelo freemium ético, sem anúncios abusivos ou promessas irreais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Free Tier */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
            <div>
              <span className="text-slate-400 font-semibold block">Plano Gratuito</span>
              <div className="text-xl font-bold text-white mt-1">R$ 0</div>
              <span className="text-[10px] text-slate-500">Acesso fundamental vitalício</span>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Controle financeiro essencial
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Simulador de juros compostos
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Trilha 1 da Academia
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Gamificação inicial e badges
              </li>
            </ul>
          </div>

          {/* Plus Tier (Active) */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-950/40 via-slate-950 to-slate-950 border border-amber-500/40 shadow-xl shadow-amber-500/5 space-y-4 relative">
            <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-mono text-[9px] font-bold uppercase">
              Seu Plano Atual
            </span>
            <div>
              <span className="text-amber-400 font-semibold block">Montanari Plus</span>
              <div className="text-xl font-bold text-white mt-1">R$ 49,90<span className="text-xs font-normal text-slate-400">/mês</span></div>
              <span className="text-[10px] text-slate-400">Para quem leva patrimônio a sério</span>
            </div>
            <ul className="space-y-2 text-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Metas ilimitadas familiares
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Todos os 5 simuladores brasileiros
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> 5 Trilhas completas com Certificado
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Montanari Mentor IA com contexto
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> Relatórios patrimoniais em CSV/JSON
              </li>
            </ul>
          </div>

          {/* Exclusive Services */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
            <div>
              <span className="text-slate-300 font-semibold block">Consultoria Exclusiva</span>
              <div className="text-xl font-bold text-white mt-1">Sob Consulta</div>
              <span className="text-[10px] text-slate-500">Planejamento patrimonial individual</span>
            </div>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Planejador financeiro CFP® dedicado
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Estruturação de holdings e sucessão
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Auditoria tributária de investimentos
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Encontros trimestrais de conselho
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
