import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { formatCurrencyBRL, formatPercent, formatDateBRL } from '../../utils/calculators';
import { Investment, AssetClass } from '../../types';
import {
  LineChart,
  Plus,
  Trash2,
  Edit2,
  Building2,
  Calendar,
  Layers,
  Shield,
  Info,
  Clock,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export const InvestmentsView: React.FC = () => {
  const { investments, goals, summary, addInvestment, updateInvestment, deleteInvestment } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [assetClass, setAssetClass] = useState<AssetClass>('tesouro_direto');
  const [institution, setInstitution] = useState('');
  const [name, setName] = useState('');
  const [investedAmount, setInvestedAmount] = useState('');
  const [currentBalance, setCurrentBalance] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [maturityDate, setMaturityDate] = useState('');
  const [liquidity, setLiquidity] = useState<Investment['liquidity']>('diaria');
  const [indexer, setIndexer] = useState<Investment['indexer']>('cdi');
  const [returnRateDescription, setReturnRateDescription] = useState('110% do CDI');
  const [annualReturnEstimated, setAnnualReturnEstimated] = useState('12.0');
  const [targetGoalId, setTargetGoalId] = useState('');

  // Institution distribution
  const institutionDistribution = useMemo(() => {
    const acc: Record<string, number> = {};
    investments.forEach((inv) => {
      acc[inv.institution] = (acc[inv.institution] || 0) + inv.currentBalance;
    });
    return acc;
  }, [investments]);

  // Asset class distribution
  const classDistribution = useMemo(() => {
    const acc: Record<string, number> = {};
    investments.forEach((inv) => {
      acc[inv.assetClass] = (acc[inv.assetClass] || 0) + inv.currentBalance;
    });
    return acc;
  }, [investments]);

  const assetNames: Record<string, string> = {
    tesouro_direto: 'Tesouro Direto',
    cdb: 'CDB',
    lci_lca: 'LCI / LCA',
    fii: 'Fundos Imobiliários',
    acoes_br: 'Ações BR',
    etf: 'ETFs Globais',
    previdencia: 'Previdência Privada',
    outro: 'Outros Ativos',
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setAssetClass('tesouro_direto');
    setInstitution('');
    setName('');
    setInvestedAmount('');
    setCurrentBalance('');
    setPurchaseDate(new Date().toISOString().split('T')[0]);
    setMaturityDate('');
    setLiquidity('diaria');
    setIndexer('cdi');
    setReturnRateDescription('110% do CDI');
    setAnnualReturnEstimated('12.0');
    setTargetGoalId('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (inv: Investment) => {
    setEditingId(inv.id);
    setAssetClass(inv.assetClass);
    setInstitution(inv.institution);
    setName(inv.name);
    setInvestedAmount(inv.investedAmount.toString());
    setCurrentBalance(inv.currentBalance.toString());
    setPurchaseDate(inv.purchaseDate);
    setMaturityDate(inv.maturityDate || '');
    setLiquidity(inv.liquidity);
    setIndexer(inv.indexer);
    setReturnRateDescription(inv.returnRateDescription);
    setAnnualReturnEstimated(inv.annualReturnEstimated.toString());
    setTargetGoalId(inv.targetGoalId || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const applied = parseFloat(investedAmount.replace(',', '.'));
    const current = parseFloat(currentBalance.replace(',', '.'));
    const estReturn = parseFloat(annualReturnEstimated.replace(',', '.')) || 0;

    if (!name || !institution || isNaN(current)) return;

    if (editingId) {
      updateInvestment(editingId, {
        assetClass,
        institution,
        name,
        investedAmount: applied || current,
        currentBalance: current,
        purchaseDate,
        maturityDate: maturityDate || undefined,
        liquidity,
        indexer,
        returnRateDescription,
        annualReturnEstimated: estReturn,
        targetGoalId: targetGoalId || undefined,
      });
    } else {
      addInvestment({
        assetClass,
        institution,
        name,
        investedAmount: applied || current,
        currentBalance: current,
        purchaseDate,
        maturityDate: maturityDate || undefined,
        liquidity,
        indexer,
        returnRateDescription,
        annualReturnEstimated: estReturn,
        targetGoalId: targetGoalId || undefined,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono tracking-wide uppercase">
            <span>Gestão Patrimonial</span>
            <span aria-hidden="true">·</span>
            <span>Carteira de Investimentos</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Gestão e Acompanhamento de Investimentos
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Mapeamento consolidado de ativos por classe, custodiante, indexador e horizonte de liquidez.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold tracking-wide transition-colors cursor-pointer shadow-lg shadow-amber-500/10 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Ativo</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400 block">Patrimônio Investido Total</span>
          <div className="text-2xl font-bold text-white font-mono mt-1">
            {formatCurrencyBRL(summary.totalInvested)}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Distribuído em {investments.length} posições cadastradas
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400 block">Rentabilidade Média Ponderada Estimada</span>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
            11,2% a.a.
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Cerca de +7,0% acima do IPCA
          </span>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400 block">Instituições Custodiantes</span>
          <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
            {Object.keys(institutionDistribution).length} corretoras/bancos
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Diversificação de risco institucional
          </span>
        </div>
      </div>

      {/* Portfolio Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Classes Breakdown */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Distribuição por Classe de Ativos</h3>
          <div className="space-y-3">
            {Object.entries(classDistribution).map(([cls, amount]) => {
              const pct = summary.totalInvested > 0 ? (amount / summary.totalInvested) * 100 : 0;
              return (
                <div key={cls}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">{assetNames[cls] || cls}</span>
                    <span className="font-mono text-slate-400">
                      {formatCurrencyBRL(amount)} ({formatPercent(pct, 1)})
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Institution Concentration */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
          <h3 className="text-sm font-semibold text-white mb-4">Concentração por Instituição Financeira</h3>
          <div className="space-y-3">
            {Object.entries(institutionDistribution).map(([inst, amount]) => {
              const pct = summary.totalInvested > 0 ? (amount / summary.totalInvested) * 100 : 0;
              return (
                <div key={inst} className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-200 font-medium">{inst}</span>
                  </div>
                  <div className="font-mono text-right">
                    <div className="text-white font-medium">{formatCurrencyBRL(amount)}</div>
                    <div className="text-[10px] text-slate-500">{formatPercent(pct, 1)} do total</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Investments Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Posições Atuais Cadastradas</h3>
          <span className="text-xs text-slate-400 font-mono">{investments.length} ativos</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400">
              <tr>
                <th className="py-3 px-4 font-medium">Nome do Ativo</th>
                <th className="py-3 px-4 font-medium">Instituição</th>
                <th className="py-3 px-4 font-medium">Classe</th>
                <th className="py-3 px-4 font-medium">Rentabilidade Informada</th>
                <th className="py-3 px-4 font-medium">Liquidez</th>
                <th className="py-3 px-4 font-medium">Vencimento</th>
                <th className="py-3 px-4 font-medium text-right">Saldo Atual</th>
                <th className="py-3 px-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {investments.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-white">{inv.name}</div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      Aplicado em: {formatDateBRL(inv.purchaseDate)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{inv.institution}</td>
                  <td className="py-3 px-4 text-slate-400">{assetNames[inv.assetClass] || inv.assetClass}</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-medium">
                    {inv.returnRateDescription}
                  </td>
                  <td className="py-3 px-4 text-slate-400 capitalize">{inv.liquidity.replace('_', ' ')}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">
                    {inv.maturityDate ? formatDateBRL(inv.maturityDate) : 'Indeterminado'}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-amber-400 whitespace-nowrap">
                    {formatCurrencyBRL(inv.currentBalance)}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap space-x-1">
                    <button
                      onClick={() => handleOpenEdit(inv)}
                      className="text-slate-500 hover:text-amber-400 p-1 rounded transition-colors cursor-pointer"
                      title="Editar ativo"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteInvestment(inv.id)}
                      className="text-slate-500 hover:text-red-400 p-1 rounded transition-colors cursor-pointer"
                      title="Excluir ativo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regulatory & Methodology Disclaimer */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-start gap-3">
        <Shield className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <div>
          <strong>Transparência Regulatória:</strong> Os dados de rentabilidade, saldo e indexador são inseridos manualmente pelo próprio usuário ou carregados em modo demonstrativo. Esta plataforma não realiza conexão automática com o Open Finance sem autorização prévia e não emite recomendações individualizadas de compra, venda ou alocação de valores mobiliários (conforme Resoluções CVM nº 19/2021 e nº 20/2021). O objetivo da ferramenta é estritamente educacional, organizador e estruturante.
        </div>
      </div>

      {/* Add / Edit Investment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">
              {editingId ? 'Editar Ativo Financeiro' : 'Cadastrar Novo Ativo na Carteira'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Nome do Ativo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Tesouro Selic 2029, CDB BTG 110%, HGLG11"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Classe do Ativo</label>
                  <select
                    value={assetClass}
                    onChange={(e) => setAssetClass(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100"
                  >
                    <option value="tesouro_direto">Tesouro Direto</option>
                    <option value="cdb">CDB</option>
                    <option value="lci_lca">LCI / LCA</option>
                    <option value="fii">FII (Fundo Imobiliário)</option>
                    <option value="acoes_br">Ações Brasileiras (B3)</option>
                    <option value="etf">ETF Global / Multimercado</option>
                    <option value="previdencia">Previdência Privada (PGBL/VGBL)</option>
                    <option value="outro">Outro Ativo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Instituição / Corretora</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: XP, BTG, Nubank, Itaú"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Valor Aplicado Original (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    value={investedAmount}
                    onChange={(e) => setInvestedAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Saldo Atual (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0,00"
                    value={currentBalance}
                    onChange={(e) => setCurrentBalance(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Rentabilidade Informada</label>
                  <input
                    type="text"
                    placeholder="Ex: 110% do CDI, IPCA + 6,2%"
                    value={returnRateDescription}
                    onChange={(e) => setReturnRateDescription(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Taxa Anual Estimada (% a.a.)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 11.5"
                    value={annualReturnEstimated}
                    onChange={(e) => setAnnualReturnEstimated(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Data da Aplicação</label>
                  <input
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Data de Vencimento (Opcional)</label>
                  <input
                    type="date"
                    value={maturityDate}
                    onChange={(e) => setMaturityDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Liquidez</label>
                  <select
                    value={liquidity}
                    onChange={(e) => setLiquidity(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100"
                  >
                    <option value="diaria">Diária (D+0 ou D+1)</option>
                    <option value="d30">D+30 (Bolsa / Fundos)</option>
                    <option value="d60">D+60</option>
                    <option value="no_vencimento">Apenas no Vencimento</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Vincular a uma Meta</label>
                  <select
                    value={targetGoalId}
                    onChange={(e) => setTargetGoalId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-100"
                  >
                    <option value="">Nenhuma meta associada</option>
                    {goals.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.title}
                      </option>
                    ))}
                  </select>
                </div>
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
                  {editingId ? 'Salvar Alterações' : 'Cadastrar Ativo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
