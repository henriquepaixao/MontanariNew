import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Track, Lesson } from '../../types';
import {
  GraduationCap,
  CheckCircle2,
  Lock,
  Play,
  FileText,
  HelpCircle,
  Award,
  ChevronRight,
  Sparkles,
  BookOpen,
  ArrowLeft,
  X,
  Share2,
  Printer,
  Check,
} from 'lucide-react';

export const AcademyView: React.FC = () => {
  const { user, tracks, gamification, completeLesson, submitQuiz } = useApp();

  const [selectedTrackId, setSelectedTrackId] = useState<number>(1);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Quiz state
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasSubmittedQuiz, setHasSubmittedQuiz] = useState(false);

  // Certificate Modal state
  const [certificateTrack, setCertificateTrack] = useState<Track | null>(null);

  const currentTrack = tracks.find((t) => t.id === selectedTrackId) || tracks[0];

  const handleOpenLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setSelectedAnswer(null);
    setHasSubmittedQuiz(false);
  };

  const handleAnswerSelect = (index: number) => {
    if (hasSubmittedQuiz) return;
    setSelectedAnswer(index);
  };

  const handleQuizSubmit = (quiz: Lesson['quiz']) => {
    if (selectedAnswer === null) return;
    setHasSubmittedQuiz(true);
    const isCorrect = selectedAnswer === quiz.correctAnswerIndex;
    submitQuiz(activeLesson!.id, isCorrect);
  };

  const handleCompleteCurrentLesson = () => {
    if (!activeLesson) return;
    completeLesson(activeLesson.id, activeLesson.trackId);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs text-amber-400 font-mono tracking-wide uppercase">
          <span>Central de Aprendizagem</span>
          <span aria-hidden="true">·</span>
          <span>Pedagogia Financeira</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
          Academia Montanari de Inteligência Patrimonial
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Trilhas progressivas, artigos técnicos, exemplos práticos brasileiros e avaliações com certificação.
        </p>
      </div>

      {/* Track Selector Cards (5 Progressive Tracks) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {tracks.map((track) => {
          const isSelected = track.id === selectedTrackId;
          const completedCount = track.lessons.filter((l) =>
            gamification.completedLessons.includes(l.id)
          ).length;
          const isCompleted = completedCount === track.lessons.length && track.lessons.length > 0;
          const progressPct = track.lessons.length > 0 ? (completedCount / track.lessons.length) * 100 : 0;

          return (
            <div
              key={track.id}
              onClick={() => {
                setSelectedTrackId(track.id);
                setActiveLesson(null);
              }}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-amber-500/50 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono text-[10px] text-slate-500">Trilha 0{track.id}</span>
                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3 h-3" /> Concluída
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400 font-mono">
                      {completedCount}/{track.lessons.length} aulas
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-bold text-white line-clamp-2">{track.title}</h3>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{track.subtitle}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isCompleted ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Track Details or Active Lesson View */}
      {!activeLesson ? (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs text-amber-400 font-mono">Trilha Selecionada</span>
              <h2 className="text-xl font-bold text-white mt-0.5">{currentTrack.title}</h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {currentTrack.description}
              </p>
            </div>

            {/* Certificate Button if all lessons in track are completed */}
            {currentTrack.lessons.every((l) => gamification.completedLessons.includes(l.id)) && (
              <button
                onClick={() => setCertificateTrack(currentTrack)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-semibold text-xs transition-all shadow-lg shadow-amber-500/20 cursor-pointer shrink-0"
              >
                <Award className="w-4 h-4" />
                <span>Visualizar Certificado Oficial</span>
              </button>
            )}
          </div>

          {/* Lessons List in Current Track */}
          <div className="space-y-3">
            {currentTrack.lessons.map((lesson, idx) => {
              const isDone = gamification.completedLessons.includes(lesson.id);
              const quizResult = gamification.completedQuizzes[lesson.id];

              return (
                <div
                  key={lesson.id}
                  onClick={() => handleOpenLesson(lesson)}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-amber-500/30 hover:bg-slate-950/90 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                        isDone
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {isDone ? <Check className="w-4 h-4" /> : `0${idx + 1}`}
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{lesson.learningObjective}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400 font-mono">
                      <span>{lesson.readTimeMinutes} min</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-400">+{lesson.xpReward} XP</span>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* LESSON DETAIL VIEW */
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-8 max-w-4xl mx-auto">
          {/* Back button */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <button
              onClick={() => setActiveLesson(null)}
              className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar para as aulas da Trilha
            </button>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-amber-400 font-semibold">+{activeLesson.xpReward} XP</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">{activeLesson.readTimeMinutes} min de leitura</span>
            </div>
          </div>

          {/* Lesson Header */}
          <div className="space-y-3">
            <span className="text-xs text-amber-400 font-mono uppercase tracking-wider">
              {currentTrack.title} — Aula 0{activeLesson.order}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{activeLesson.title}</h2>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-amber-400 block mb-0.5">Objetivo de Aprendizagem:</span>
              {activeLesson.learningObjective}
            </div>
          </div>

          {/* Audiovisual Space / Video Placeholder */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden relative group">
            <div className="aspect-video w-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Play className="w-7 h-7 text-amber-400 fill-amber-400/20 ml-1" />
              </div>
              <h4 className="text-sm font-semibold text-white">Espaço Audiovisual da Aula</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Material audiovisual complementar da Montanari Arquitetura Patrimonial. O artigo conceitual completo e o exemplo prático estão disponíveis abaixo.
              </p>
              <span className="text-[10px] text-slate-500 mt-3 font-mono">
                [Conteúdo em Produção para Turma 2026]
              </span>
            </div>
          </div>

          {/* Article & Content */}
          <div className="prose prose-invert max-w-none space-y-6 text-sm text-slate-300 leading-relaxed">
            <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
              Conceito Estrutural e Fundamentação
            </h3>

            {activeLesson.articleContent.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Practical Brazilian Example Card */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>Caso Prático da Realidade Brasileira</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {activeLesson.practicalExample}
              </p>
            </div>
          </div>

          {/* Quiz Section */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Quiz Avaliativo da Aula (+35 XP)</span>
              </div>
              {hasSubmittedQuiz && (
                <span
                  className={`text-xs font-semibold ${
                    selectedAnswer === activeLesson.quiz.correctAnswerIndex
                      ? 'text-emerald-400'
                      : 'text-amber-400'
                  }`}
                >
                  {selectedAnswer === activeLesson.quiz.correctAnswerIndex
                    ? 'Resposta Correta!'
                    : 'Revisão Necessária'}
                </span>
              )}
            </div>

            <p className="text-sm font-medium text-slate-200">{activeLesson.quiz.question}</p>

            {/* Quiz Options */}
            <div className="space-y-2 text-xs">
              {activeLesson.quiz.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === activeLesson.quiz.correctAnswerIndex;

                let stateClass = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                if (hasSubmittedQuiz) {
                  if (isCorrect) {
                    stateClass = 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200';
                  } else if (isSelected && !isCorrect) {
                    stateClass = 'bg-red-950/60 border-red-500/60 text-red-200';
                  }
                } else if (isSelected) {
                  stateClass = 'bg-amber-500/10 border-amber-500/50 text-amber-200';
                }

                return (
                  <button
                    key={idx}
                    disabled={hasSubmittedQuiz}
                    onClick={() => handleAnswerSelect(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${stateClass}`}
                  >
                    <span className="font-mono text-xs font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <span className="leading-relaxed">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Submit Quiz Button */}
            {!hasSubmittedQuiz ? (
              <button
                disabled={selectedAnswer === null}
                onClick={() => handleQuizSubmit(activeLesson.quiz)}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-semibold text-xs transition-colors cursor-pointer"
              >
                Confirmar Resposta do Quiz
              </button>
            ) : (
              /* Explanation Box */
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-amber-400 block mb-1">Explicação Educativa:</span>
                {activeLesson.quiz.explanation}
              </div>
            )}
          </div>

          {/* Footer Action: Complete Lesson */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setActiveLesson(null)}
              className="text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Voltar à Trilha
            </button>

            <button
              onClick={handleCompleteCurrentLesson}
              disabled={gamification.completedLessons.includes(activeLesson.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                gamification.completedLessons.includes(activeLesson.id)
                  ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 cursor-default'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/15'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {gamification.completedLessons.includes(activeLesson.id)
                  ? 'Aula Concluída (+50 XP)'
                  : 'Marcar Aula como Concluída (+50 XP)'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Track Completion Certificate Modal */}
      {certificateTrack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-950 border border-amber-500/40 rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative overflow-hidden">
            <button
              onClick={() => setCertificateTrack(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Decorative Border */}
            <div className="border-2 border-amber-500/30 rounded-2xl p-6 sm:p-8 text-center space-y-6 relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center">
                  <Award className="w-6 h-6 text-amber-400" />
                </div>
              </div>

              <div>
                <span className="text-[11px] font-mono tracking-[0.25em] text-amber-400 uppercase">
                  Montanari Arquitetura Patrimonial
                </span>
                <h3 className="text-xl sm:text-2xl font-serif-brand font-bold text-white mt-1">
                  Certificado de Conclusão de Trilha
                </h3>
              </div>

              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Certificamos para os devidos fins de formação financeira que
              </p>

              <div className="text-xl sm:text-2xl font-bold text-amber-300 font-serif-brand border-b border-amber-500/30 pb-2 max-w-sm mx-auto">
                {user?.name || 'Henrique Montanari'}
              </div>

              <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
                concluiu com êxito todos os módulos teóricos, casos práticos e avaliações avaliativas da
                <br />
                <strong className="text-white font-semibold">{certificateTrack.title}</strong>,
                desenvolvendo competências essenciais para a construção e proteção patrimonial sustentável.
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-slate-800 text-[10px] text-slate-400 font-mono">
                <div>
                  <span>Data de Emissão:</span>
                  <div className="text-white font-medium">{new Date().toLocaleDateString('pt-BR')}</div>
                </div>
                <div className="text-right">
                  <span>Código de Autenticidade:</span>
                  <div className="text-amber-400 font-medium">MAP-{certificateTrack.id}9X-2026</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Imprimir Certificado
              </button>
              <button
                onClick={() => setCertificateTrack(null)}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
