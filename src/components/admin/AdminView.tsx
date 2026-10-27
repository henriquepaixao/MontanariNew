import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Users,
  GraduationCap,
  Calculator,
  Sliders,
  Plus,
  Trash2,
  Edit2,
  Bell,
  CheckCircle,
  Lock,
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { tracks, addNewLesson, deleteLesson, summary } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'metricas' | 'cursos' | 'taxas' | 'comunicados'>('metricas');

  // New Lesson Modal
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false);
  const [selectedTrackForNew, setSelectedTrackForNew] = useState<number>(1);
  const [newTitle, setNewTitle] = useState('');
  const [newObjective, setNewObjective] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newArticle, setNewArticle] = useState('');
  const [newExample, setNewExample] = useState('');
  const [newReadTime, setNewReadTime] = useState('6');
  const [newQuizQ, setNewQuizQ] = useState('');
  const [newQuizOptA, setNewQuizOptA] = useState('');
  const [newQuizOptB, setNewQuizOptB] = useState('');
  const [newQuizOptC, setNewQuizOptC] = useState('');
  const [newQuizOptD, setNewQuizOptD] = useState('');
  const [newQuizCorrect, setNewQuizCorrect] = useState(1);
  const [newQuizExplanation, setNewQuizExplanation] = useState('');

  // Market Rates Controls
  const [adminSelic, setAdminSelic] = useState(11.25);
  const [adminCdi, setAdminCdi] = useState(11.15);
  const [adminIpca, setAdminIpca] = useState(4.15);
  const [ratesSaved, setRatesSaved] = useState(false);

  // Announcements
  const [announcements, setAnnouncements] = useState([
    {
      id: 'ann_1',
      title: 'Atualização do Cenário de Inflação e Juros (Copom)',
      date: '2026-10-25',
      text: 'O Comitê de Política Monetária manteve a Selic Meta em 11,25% a.a. Nossos simuladores já refletem as novas curvas de juros.',
    },
    {
      id: 'ann_2',
      title: 'Lançamento da Trilha 5 — Independência Financeira',
      date: '2026-10-10',
      text: 'Novo módulo disponível com cálculo de taxas seguras de retirada (SWR) e riscos de longevidade.',
    },
  ]);
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnText, setNewAnnText] = useState('');

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newArticle) return;

    addNewLesson(selectedTrackForNew, {
      order: 10,
      title: newTitle,
      learningObjective: newObjective || 'Dominar princípios avançados.',
      summary: newSummary || newTitle,
      articleContent: newArticle,
      practicalExample: newExample || 'Exemplo prático aplicado ao mercado brasileiro.',
      readTimeMinutes: parseInt(newReadTime, 10) || 5,
      xpReward: 50,
      quiz: {
        id: `q_admin_${Date.now()}`,
        question: newQuizQ || 'Qual o principal aprendizado da aula?',
        options: [
          newQuizOptA || 'Alternativa A',
          newQuizOptB || 'Alternativa B',
          newQuizOptC || 'Alternativa C',
          newQuizOptD || 'Alternativa D',
        ],
        correctAnswerIndex: newQuizCorrect,
        explanation: newQuizExplanation || 'Resposta explicativa fundamentada na metodologia Montanari.',
      },
    });

    setIsAddLessonOpen(false);
    setNewTitle('');
    setNewArticle('');
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle || !newAnnText) return;
    setAnnouncements((prev) => [
      {
        id: `ann_${Date.now()}`,
        title: newAnnTitle,
        date: new Date().toISOString().split('T')[0],
        text: newAnnText,
      },
      ...prev,
    ]);
    setNewAnnTitle('');
    setNewAnnText('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono tracking-wide uppercase">
            <span>Área Restrita</span>
            <span aria-hidden="true">·</span>
            <span>Gestão da Plataforma</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Painel Administrativo Montanari
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Governança institucional, gestão de conteúdos da Academia, taxas de referência e métricas agregadas.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4" />
          <span>Controle de Acesso Operacional</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab('metricas')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeAdminTab === 'metricas'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Indicadores Agregados
        </button>
        <button
          onClick={() => setActiveAdminTab('cursos')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeAdminTab === 'cursos'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Gestão de Aulas & Quizzes
        </button>
        <button
          onClick={() => setActiveAdminTab('taxas')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeAdminTab === 'taxas'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Taxas de Mercado (Selic/CDI/IPCA)
        </button>
        <button
          onClick={() => setActiveAdminTab('comunicados')}
          className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeAdminTab === 'comunicados'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Mural de Comunicados
        </button>
      </div>

      {/* TAB 1: Métricas Agregadas */}
      {activeAdminTab === 'metricas' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
              <span className="text-xs text-slate-400 block">Usuários Ativos</span>
              <div className="text-2xl font-bold text-white font-mono mt-1">1.480</div>
              <span className="text-[11px] text-emerald-400 mt-1 block">+12% este mês</span>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
              <span className="text-xs text-slate-400 block">Aulas Concluídas na Academia</span>
              <div className="text-2xl font-bold text-amber-400 font-mono mt-1">8.940</div>
              <span className="text-[11px] text-slate-500 mt-1 block">Taxa de conclusão média: 68%</span>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
              <span className="text-xs text-slate-400 block">Simuladores Executados</span>
              <div className="text-2xl font-bold text-blue-400 font-mono mt-1">24.120</div>
              <span className="text-[11px] text-slate-500 mt-1 block">Juros Compostos e Reserva lideram</span>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
              <span className="text-xs text-slate-400 block">Metas em Acompanhamento</span>
              <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">3.620</div>
              <span className="text-[11px] text-slate-500 mt-1 block">41% com progresso no prazo</span>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white mb-2">Compromisso de Privacidade do Administrador</h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
              Em conformidade com a LGPD e as diretrizes éticas da Montanari Arquitetura Patrimonial, os dados individuais de extratos bancários, saldos específicos e descrições pessoais de receitas/despesas são estritamente sigilosos e inacessíveis aos operadores da plataforma. Apenas métricas de volume e engajamento estatístico são monitoradas para aprimoramento pedagógico.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: Gestão de Cursos e Quizzes */}
      {activeAdminTab === 'cursos' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">Conteúdos Publicados na Academia</h3>
            <button
              onClick={() => setIsAddLessonOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Publicar Nova Aula
            </button>
          </div>

          <div className="space-y-4">
            {tracks.map((track) => (
              <div key={track.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h4 className="text-sm font-bold text-amber-400">
                    Trilha 0{track.id}: {track.title}
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">{track.lessons.length} aulas</span>
                </div>

                <div className="divide-y divide-slate-800/60">
                  {track.lessons.map((lesson) => (
                    <div key={lesson.id} className="py-2.5 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-white font-medium">{lesson.title}</span>
                        <span className="text-[10px] text-slate-500 block">{lesson.readTimeMinutes} min · Quiz avaliativo configurado</span>
                      </div>
                      <button
                        onClick={() => deleteLesson(lesson.id)}
                        className="text-slate-500 hover:text-red-400 p-1 rounded transition-colors cursor-pointer"
                        title="Remover aula"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Taxas de Mercado */}
      {activeAdminTab === 'taxas' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 max-w-lg space-y-4">
          <h3 className="text-base font-semibold text-white">Taxas Básicas de Mercado (Parâmetros Globais)</h3>
          <p className="text-xs text-slate-400">
            Atualize as taxas de referência da economia brasileira utilizadas pelos simuladores e comparadores.
          </p>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-300 block mb-1">Taxa Selic Meta (% a.a.)</label>
              <input
                type="number"
                step="0.05"
                value={adminSelic}
                onChange={(e) => setAdminSelic(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-slate-300 block mb-1">CDI Estimado (% a.a.)</label>
              <input
                type="number"
                step="0.05"
                value={adminCdi}
                onChange={(e) => setAdminCdi(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-slate-300 block mb-1">IPCA Estimado para 12 Meses (% a.a.)</label>
              <input
                type="number"
                step="0.05"
                value={adminIpca}
                onChange={(e) => setAdminIpca(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono"
              />
            </div>
          </div>

          <button
            onClick={() => {
              setRatesSaved(true);
              setTimeout(() => setRatesSaved(false), 3000);
            }}
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs cursor-pointer transition-colors"
          >
            {ratesSaved ? 'Taxas Atualizadas com Sucesso!' : 'Aplicar Novas Taxas no Sistema'}
          </button>
        </div>
      )}

      {/* TAB 4: Mural de Comunicados */}
      {activeAdminTab === 'comunicados' && (
        <div className="space-y-6">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-base font-semibold text-white mb-4">Publicar Novo Comunicado Institucional</h3>
            <form onSubmit={handleCreateAnnouncement} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Título do Comunicado</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Atualização sobre Reforma Tributária e FIIs"
                  value={newAnnTitle}
                  onChange={(e) => setNewAnnTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">Conteúdo da Mensagem</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Descreva o impacto no planejamento dos usuários..."
                  value={newAnnText}
                  onChange={(e) => setNewAnnText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold cursor-pointer"
              >
                Publicar no Mural
              </button>
            </form>
          </div>

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                  <span>Comunicado Oficial</span>
                  <span>{ann.date}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{ann.title}</h4>
                <p className="text-slate-300 leading-relaxed">{ann.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Publicar Nova Aula */}
      {isAddLessonOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white mb-4">Publicar Nova Aula na Academia</h3>
            <form onSubmit={handleCreateLesson} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Trilha de Destino</label>
                <select
                  value={selectedTrackForNew}
                  onChange={(e) => setSelectedTrackForNew(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                >
                  {tracks.map((t) => (
                    <option key={t.id} value={t.id}>
                      Trilha {t.id}: {t.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Título da Aula</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Fundos de Infraestrutura e Isenção de IR"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Objetivo de Aprendizagem</label>
                <input
                  type="text"
                  placeholder="O que o aluno aprenderá..."
                  value={newObjective}
                  onChange={(e) => setNewObjective(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Texto Conceitual / Artigo</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Conteúdo aprofundado da aula..."
                  value={newArticle}
                  onChange={(e) => setNewArticle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Exemplo Prático Brasileiro</label>
                <textarea
                  rows={2}
                  placeholder="Caso ilustrativo do mercado brasileiro..."
                  value={newExample}
                  onChange={(e) => setNewExample(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                />
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="font-semibold text-amber-400 block mb-2">Quiz da Aula</span>
                <input
                  type="text"
                  placeholder="Pergunta do Quiz"
                  value={newQuizQ}
                  onChange={(e) => setNewQuizQ(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white mb-2"
                />
                <input
                  type="text"
                  placeholder="Alternativa A"
                  value={newQuizOptA}
                  onChange={(e) => setNewQuizOptA(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-white mb-1.5"
                />
                <input
                  type="text"
                  placeholder="Alternativa B"
                  value={newQuizOptB}
                  onChange={(e) => setNewQuizOptB(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-white mb-1.5"
                />
                <input
                  type="text"
                  placeholder="Alternativa C"
                  value={newQuizOptC}
                  onChange={(e) => setNewQuizOptC(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-white mb-1.5"
                />
                <input
                  type="text"
                  placeholder="Alternativa D"
                  value={newQuizOptD}
                  onChange={(e) => setNewQuizOptD(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-white mb-2"
                />
                <select
                  value={newQuizCorrect}
                  onChange={(e) => setNewQuizCorrect(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                >
                  <option value={0}>Gabarito: Alternativa A</option>
                  <option value={1}>Gabarito: Alternativa B</option>
                  <option value={2}>Gabarito: Alternativa C</option>
                  <option value={3}>Gabarito: Alternativa D</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddLessonOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold cursor-pointer"
                >
                  Publicar Aula
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
