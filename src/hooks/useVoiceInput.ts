import { useState, useEffect, useRef, useCallback } from 'react';

interface VoiceInputOptions {
  onResult?: (text: string) => void;
  lang?: string;
}

export function useVoiceInput({ onResult, lang = 'pt-BR' }: VoiceInputOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognitionRef = useRef<any>(null);

  const hasSupport = typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  const hasTtsSupport = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    if (!hasSupport) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = lang;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: any) => {
      let currentTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
      if (onResult && currentTranscript) {
        onResult(currentTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        setError('Permissão de microfone negada no navegador.');
      } else {
        setError('Não foi possível capturar o áudio. Tente novamente.');
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [hasSupport, lang, onResult]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) {
      setError('Reconhecimento de voz não suportado neste navegador.');
      return;
    }
    try {
      setTranscript('');
      setError(null);
      recognitionRef.current.start();
    } catch (e) {
      console.warn('Recognition start exception:', e);
      try {
        recognitionRef.current.stop();
        setTimeout(() => recognitionRef.current.start(), 150);
      } catch (_) {}
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  const speakText = useCallback((text: string) => {
    if (!hasTtsSupport) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('TTS error:', err);
      setIsSpeaking(false);
    }
  }, [hasTtsSupport, lang]);

  const stopSpeaking = useCallback(() => {
    if (hasTtsSupport) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [hasTtsSupport]);

  return {
    isListening,
    transcript,
    error,
    hasSupport,
    isSpeaking,
    hasTtsSupport,
    startListening,
    stopListening,
    speakText,
    stopSpeaking,
  };
}
