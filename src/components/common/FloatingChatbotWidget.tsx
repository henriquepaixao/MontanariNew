import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useVoiceInput } from '../../hooks/useVoiceInput';
import { ChatMessage } from '../../types';
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Maximize2,
  Minimize2,
  Sparkles,
  Shield,
  User,
  MessageSquare,
} from 'lucide-react';
import { ActiveTab } from './Header';

interface FloatingChatbotWidgetProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const FloatingChatbotWidget: React.FC<FloatingChatbotWidgetProps> = ({ setActiveTab }) => {
  const { user, summary, goals, gamification } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [allowContext, setAllowContext] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'float_init_1',
      sender: 'mentor',
      text: `Olá, ${user?.name ? user.name.split(' ')[0] : 'investidor(a)'}! Sou o Montanari Mentor com inteligência Gemini. Você pode tirar dúvidas por texto ou falar comigo pelo microfone sobre inflação, CDI, juros ou organizar suas contas.`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        'Como funciona o Tesouro Selic?',
        'Qual o tamanho ideal da minha reserva?',
        'Como calcular juros compostos?',
      ],
    },
  ]);

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
    onResult: (text) => {
      setInputValue(text);
    },
  });

  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    if (isListening) {
      stopListening();
    }

    const userMsg: ChatMessage = {
      id: `usr_float_${Date.now()}`,
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
      const historyPayload = messages.slice(-6).map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const res = await fetch('/api/mentor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
          userContext,
        }),
      });

      if (!res.ok) throw new Error('Falha no servidor');

      const data = await res.json();
      const replyText = data.reply || 'Orientação registrada com sucesso pela Montanari.';
      const mentorMsg: ChatMessage = {
        id: `mnt_float_${Date.now()}`,
        sender: 'mentor',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, mentorMsg]);
    } catch (err) {
      console.warn('Erro ao chamar mentor no float widget:', err);
      const fallbackMsg: ChatMessage = {
        id: `mnt_fallback_${Date.now()}`,
        sender: 'mentor',
        text: 'A chave para construir patrimônio duradouro é a consistência: honre sua reserva no Tesouro Selic e mantenha aportes regulares sem tentar adivinhar topos e fundos.',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button (Always Visible) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 p-3.5 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-amber-500/50 text-white shadow-2xl shadow-amber-500/20 hover:border-amber-400 hover:scale-105 transition-all cursor-pointer"
            aria-label="Abrir Gemini Chatbot Montanari Mentor"
          >
            {/* Pulsing indicator */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950"></span>
            </span>

            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            </div>

            <div className="hidden sm:block text-left">
              <div className="flex items-center gap-1.5 text-xs font-bold tracking-tight text-white">
                <span>Montanari Mentor</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                  Gemini IA
                </span>
              </div>
              <span className="text-[10px] text-slate-300 block -mt-0.5">
                Dúvidas de finanças & voz
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[420px] h-[580px] max-h-[88vh] bg-slate-950 border border-amber-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in slide-in-from-bottom-6 fade-in duration-300">
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <Bot className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <span>Montanari Mentor</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <span className="text-[10px] text-slate-400 block -mt-0.5">
                  Gemini 3.8 Flash · Suporte por Voz
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              {/* Expand to full tab */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setActiveTab('mentor');
                }}
                className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                title="Expandir para tela cheia"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                title="Fechar janela"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Context Authorization Sub-bar */}
          <div className="px-4 py-1.5 bg-slate-900/50 border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              <Sparkles className="w-3 h-3 text-amber-400" /> Personalização
            </span>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={allowContext}
                onChange={(e) => setAllowContext(e.target.checked)}
                className="rounded bg-slate-950 border-slate-700 text-amber-500"
              />
              <span>Usar meus dados de patrimônio</span>
            </label>
          </div>

          {/* Messages Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 max-w-[90%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-semibold ${
                      isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-amber-500/10 border border-amber-500/30 text-amber-400'
                    }`}
                  >
                    {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div className="space-y-1.5">
                    <div
                      className={`p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? 'bg-blue-600 text-white rounded-tr-none'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>

                    <div className="flex items-center gap-2 px-1 text-[9px] text-slate-500 font-mono">
                      <span>{msg.timestamp}</span>
                      {!isUser && (
                        <button
                          onClick={() => (isSpeaking ? stopSpeaking() : speakText(msg.text))}
                          className="text-slate-400 hover:text-amber-400 flex items-center gap-0.5 cursor-pointer transition-colors"
                          title="Ouvir resposta com síntese de voz"
                        >
                          {isSpeaking ? (
                            <>
                              <VolumeX className="w-3 h-3 text-amber-400" /> Parar
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3" /> Ouvir
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="pt-1 flex flex-wrap gap-1">
                        {msg.suggestedActions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(action)}
                            className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-[10px] text-slate-300 hover:text-white transition-colors cursor-pointer text-left"
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
              <div className="flex gap-2.5 max-w-[90%]">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 rounded-tl-none flex items-center gap-2">
                  <span>Gemini está analisando sua pergunta...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Voice Input Feedback Indicator */}
          {isListening && (
            <div className="px-4 py-2 bg-amber-950/40 border-t border-amber-500/30 flex items-center justify-between text-xs text-amber-300 animate-pulse">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span>Ouvindo sua voz em português... Fale agora</span>
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
            <div className="px-3 py-1 bg-red-950/60 border-t border-red-500/30 text-[10px] text-red-300">
              {voiceError}
            </div>
          )}

          {/* Input Footer */}
          <div className="p-3 bg-slate-900/90 border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={isListening ? 'Ouvindo...' : 'Pergunte sobre investimentos ou fale no mic...'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
              />

              {/* Voice Search Button */}
              {hasVoiceSupport && (
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    isListening
                      ? 'bg-red-500 text-white border-red-400 shadow-lg shadow-red-500/20 animate-pulse'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40'
                  }`}
                  title={isListening ? 'Parar captura de voz' : 'Falar por voz em português'}
                  aria-label="Pesquisa por voz"
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              )}

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 transition-colors cursor-pointer shrink-0"
                aria-label="Enviar mensagem para o Gemini Mentor"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
