import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useVoiceInput } from '../../hooks/useVoiceInput';
import { ChatMessage } from '../../types';
import {
  Bot,
  Send,
  Sparkles,
  Shield,
  HelpCircle,
  CheckCircle2,
  Lock,
  User,
  RotateCcw,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
} from 'lucide-react';

export const MentorView: React.FC = () => {
  const { profile, summary, goals, user, gamification } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init_1',
      sender: 'mentor',
      text: `Olá, ${user?.name || 'investidor(a)'}! Sou o Montanari Mentor, seu assistente de inteligência patrimonial com modelo Gemini. Como posso apoiar sua jornada financeira hoje? Você pode digitar ou falar comigo por voz sobre juros, Selic, CDI, orçamento ou estratégias de longo prazo.`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        'Qual é a diferença entre CDI e Selic?',
        'Como posso organizar meu salário?',
        'Quanto preciso para ter R$ 10.000 de renda passiva?',
        'Por que minha reserva de emergência é importante?',
      ],
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [allowContext, setAllowContext] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Voice Input hook
  const {
    isListening,
    transcript,
    error: voiceError,
    hasSupport: hasVoiceSupport,
    isSpeaking,
    startListening,
    stopListening,
    speakText,
    stopSpeaking,
  } = useVoiceInput({
    onResult: (text) => setInputValue(text),
  });

  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
    }
  }, [transcript]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    if (isListening) {
      stopListening();
    }

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const userContext = allowContext
      ? {
          monthlyIncome: summary.monthIncome,
          monthlyExpenses: summary.monthExpenses,
          netWorth: summary.netWorth,
          emergencyFundProgress: `${summary.emergencyFundProgress}%`,
          knowledgeLevel: gamification.knowledgeLevel,
          wealthStage: gamification.wealthStage,
          goalsCount: goals.length,
        }
      : null;

    try {
      const historyPayload = messages.slice(-8).map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const response = await fetch('/api/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
          userContext,
        }),
      });

      if (!response.ok) throw new Error('Falha no servidor');

      const data = await response.json();
      const mentorMsg: ChatMessage = {
        id: `mnt_${Date.now()}`,
        sender: 'mentor',
        text: data.reply || 'Compreendo a reflexão. Como posso apoiar seu próximo passo?',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, mentorMsg]);
    } catch (error) {
      console.warn('Fallback local para Mentor:', error);
      const fallbackMsg: ChatMessage = {
        id: `mnt_fallback_${Date.now()}`,
        sender: 'mentor',
        text: 'A arquitetura patrimonial se baseia na disciplina constante: gaste menos do que ganha, blinde sua família com uma reserva de emergência no Tesouro Selic e diversifique seus ativos com foco no longo prazo.',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-xs text-amber-400 font-mono tracking-wide uppercase">
          <span>Educação & Mentoria</span>
          <span aria-hidden="true">·</span>
          <span>Inteligência Artificial Montanari</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
          Montanari Mentor (Gemini IA)
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Tire dúvidas por texto ou microfone por voz sobre indexadores, inflação, reserva de emergência e planejamento de patrimônio.
        </p>
      </div>

      {/* Main Chat Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-col h-[600px] overflow-hidden shadow-2xl">
        {/* Chat Header with Context Toggle */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                Montanari Mentor
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </h3>
              <span className="text-[10px] text-slate-400">Gemini 3.8 Flash · Reconhecimento e Síntese de Voz</span>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
            <input
              type="checkbox"
              checked={allowContext}
              onChange={(e) => setAllowContext(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-amber-500"
            />
            <span className="hidden sm:inline text-[11px] text-slate-400">
              Autorizar personalização com meus dados de patrimônio
            </span>
            <span className="sm:hidden text-[11px] text-slate-400">Contexto</span>
          </label>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-semibold ${
                    isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-2">
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>

                  <div className="flex items-center gap-3 px-1 text-[9px] text-slate-500 font-mono">
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => (isSpeaking ? stopSpeaking() : speakText(msg.text))}
                        className="text-slate-400 hover:text-amber-400 flex items-center gap-1 cursor-pointer transition-colors"
                        title="Ouvir resposta por voz"
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-amber-400" /> Parar Áudio
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5" /> Ouvir Resposta
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Suggested Prompts if attached */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {msg.suggestedActions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(action)}
                          className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500/40 text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 rounded-tl-none flex items-center gap-2">
                <span>Montanari Mentor com Gemini está estruturando sua orientação...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Voice Listening Feedback Banner */}
        {isListening && (
          <div className="px-4 py-2 bg-amber-950/40 border-t border-amber-500/30 flex items-center justify-between text-xs text-amber-300 animate-pulse">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span>Escutando sua voz em português... Fale agora</span>
            </div>
            <button
              onClick={stopListening}
              className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded hover:bg-amber-500/40 cursor-pointer"
            >
              Concluir
            </button>
          </div>
        )}

        {voiceError && (
          <div className="px-4 py-1.5 bg-red-950/60 border-t border-red-500/30 text-xs text-red-300">
            {voiceError}
          </div>
        )}

        {/* Input Bar with Voice Button */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={isListening ? 'Ouvindo...' : 'Digite sua dúvida financeira ou use o microfone...'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50 disabled:opacity-50"
            />

            {/* Voice Search Button */}
            {hasVoiceSupport && (
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isListening
                    ? 'bg-red-500 text-white border-red-400 animate-pulse shadow-lg shadow-red-500/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40'
                }`}
                title={isListening ? 'Parar microfone' : 'Pesquisar e falar por voz'}
                aria-label="Pesquisa por voz"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            )}

            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 transition-colors cursor-pointer shrink-0"
              aria-label="Enviar mensagem"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-2 text-[10px] text-slate-500 text-center flex items-center justify-center gap-1.5">
            <Shield className="w-3 h-3 text-slate-600" />
            <span>
              O Montanari Mentor oferece orientação educacional e não substitui consultoria financeira habilitada.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
