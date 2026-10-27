import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  Gamepad2,
  Trophy,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Award,
  ArrowRight,
  Shield,
  Coins,
  Building,
  BookOpen,
  AlertTriangle,
  Printer,
  ChevronRight,
  ArrowLeft,
  Users,
} from 'lucide-react';
import { formatCurrencyBRL } from '../../utils/calculators';

// Procedural Web Audio Synthesizer
class SoundManager {
  private ctx: AudioContext | null = null;
  public enabled = true;

  constructor() {
    // Created on user gesture
  }

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playCoin() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, this.ctx.currentTime); // B5
    osc.frequency.exponentialRampToValueAtTime(1318.51, this.ctx.currentTime + 0.1); // E6

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playInvestment() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
    osc.frequency.setValueAtTime(659.25, this.ctx.currentTime + 0.08); // E5
    osc.frequency.setValueAtTime(783.99, this.ctx.currentTime + 0.16); // G5
    osc.frequency.setValueAtTime(1046.5, this.ctx.currentTime + 0.24); // C6

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  playHazard() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(90, this.ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  playVictory() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.1);
      gain.gain.setValueAtTime(0.25, this.ctx!.currentTime + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + idx * 0.1 + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(this.ctx!.currentTime + idx * 0.1);
      osc.stop(this.ctx!.currentTime + idx * 0.1 + 0.3);
    });
  }
}

const sounds = new SoundManager();

interface Dilemma {
  id: number;
  stageName: string;
  triggerScore: number;
  question: string;
  context: string;
  optionA: {
    text: string;
    description: string;
    isCorrect: boolean;
    rewardCoins: number;
    feedback: string;
  };
  optionB: {
    text: string;
    description: string;
    isCorrect: boolean;
    rewardCoins: number;
    feedback: string;
  };
}

const FAMILY_DILEMMAS: Dilemma[] = [
  {
    id: 1,
    stageName: 'Fase 1: O Cofrinho da Família',
    triggerScore: 800,
    question: 'A mesada acabou de entrar! O que a família deve decidir juntos?',
    context: 'Sobrou R$ 100 depois das contas básicas. As crianças viram um brinquedo que esquecerão em 3 dias.',
    optionA: {
      text: 'Gastar tudo agora no brinquedo por impulso',
      description: 'Satisfação instantânea, mas o dinheiro acaba na hora.',
      isCorrect: false,
      rewardCoins: -50,
      feedback: 'Atenção da Família! Gastar por impulso reduz o fôlego da família para objetivos maiores.',
    },
    optionB: {
      text: 'Guardar R$ 70 no Tesouro Selic e usar R$ 30 com moderação',
      description: 'Paga-se primeiro! O dinheiro começa a render juros compostos.',
      isCorrect: true,
      rewardCoins: 250,
      feedback: 'Decisão de Ouro! Vocês aprenderam a adiar a recompensa para conquistar grandes sonhos.',
    },
  },
  {
    id: 2,
    stageName: 'Fase 2: O Escudo da Reserva de Emergência',
    triggerScore: 2200,
    question: 'Apareceu um imprevisto! O pneu do carro furou na volta da escola.',
    context: 'O conserto custa R$ 350. De onde deve sair esse recurso?',
    optionA: {
      text: 'Usar o limite do rotativo do cartão de crédito (Juros de 400% a.a.)',
      description: 'Parece fácil agora, mas a dívida vira uma bola de neve perigosa.',
      isCorrect: false,
      rewardCoins: -100,
      feedback: 'Cuidado! Dívidas no cartão devoram o orçamento da família.',
    },
    optionB: {
      text: 'Acionar a Reserva de Emergência guardada em liquidez diária',
      description: 'O colchão de segurança foi feito exatamente para essa hora, sem criar dívidas!',
      isCorrect: true,
      rewardCoins: 400,
      feedback: 'Parabéns Arquitetos! Vocês protegeram a paz da família sem dever um centavo ao banco.',
    },
  },
  {
    id: 3,
    stageName: 'Fase 3: O Pomar dos Juros Compostos',
    triggerScore: 4200,
    question: 'Chegaram os dividendos dos Fundos Imobiliários e Ações!',
    context: 'Seus investimentos pingaram R$ 200 de "aluguel" automático na conta da corretora.',
    optionA: {
      text: 'Gastar o rendimento imediatamente em compras supérfluas',
      description: 'Interrompe a árvore de crescimento dos juros compostos.',
      isCorrect: false,
      rewardCoins: -50,
      feedback: 'Oportunidade perdida! Na fase de crescimento, os filhotes do dinheiro devem trabalhar também.',
    },
    optionB: {
      text: 'Reinvestir os R$ 200 para comprar novas cotas geradoras de renda',
      description: 'Efeito Bola de Neve: no mês que vem, você receberá rendimentos sobre os rendimentos!',
      isCorrect: true,
      rewardCoins: 600,
      feedback: 'Espetacular! A bola de neve dos juros compostos foi ativada. A riqueza da família agora cresce sozinha!',
    },
  },
];

export const FamilyFinancialGame: React.FC = () => {
  const { user, addXp, unlockBadge } = useApp();

  const [gameState, setGameState] = useState<'title' | 'playing' | 'dilemma' | 'paused' | 'victory' | 'gameover'>('title');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // HUD Metrics
  const [score, setScore] = useState(0); // Coins / R$
  const [passiveIncomeRate, setPassiveIncomeRate] = useState(0); // R$/s
  const [towerHeight, setTowerHeight] = useState(0); // Progress % to Financial Independence
  const [wisdomLevel, setWisdomLevel] = useState(1);
  const [currentDilemma, setCurrentDilemma] = useState<Dilemma | null>(null);
  const [dilemmaFeedback, setDilemmaFeedback] = useState<string | null>(null);
  const [resolvedDilemmaIds, setResolvedDilemmaIds] = useState<number[]>([]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Game loop references
  const animFrameId = useRef<number | null>(null);
  const playerRef = useRef({
    x: 100,
    y: 260,
    width: 44,
    height: 48,
    vy: 0,
    isGrounded: true,
    lane: 1, // 0: Top, 1: Middle, 2: Bottom
  });

  const itemsRef = useRef<
    {
      x: number;
      y: number;
      width: number;
      height: number;
      type: 'coin' | 'asset' | 'book' | 'hazard_impulse' | 'hazard_debt';
      speed: number;
      value: number;
    }[]
  >([]);

  const particlesRef = useRef<
    {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
      size: number;
    }[]
  >([]);

  const floatingTextsRef = useRef<
    {
      x: number;
      y: number;
      text: string;
      life: number;
      color: string;
    }[]
  >([]);

  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const lastSpawnTime = useRef(0);
  const lastPassiveTick = useRef(Date.now());

  // Sound toggle
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
  };

  // Keyboard handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = true;

      if (e.code === 'KeyP') {
        if (gameState === 'playing') setGameState('paused');
        else if (gameState === 'paused') setGameState('playing');
      }

      if (e.code === 'Space' || e.code === 'Enter') {
        if (gameState === 'title') {
          startGame();
        } else if (gameState === 'victory' || gameState === 'gameover') {
          startGame();
        }
      }

      // Lane controls
      if (gameState === 'playing') {
        if (e.code === 'ArrowUp' || e.code === 'KeyW') {
          playerRef.current.lane = Math.max(0, playerRef.current.lane - 1);
        } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
          playerRef.current.lane = Math.min(2, playerRef.current.lane + 1);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  const startGame = () => {
    setScore(200);
    setPassiveIncomeRate(5);
    setTowerHeight(5);
    setWisdomLevel(1);
    setCurrentDilemma(null);
    setDilemmaFeedback(null);
    setResolvedDilemmaIds([]);

    itemsRef.current = [];
    particlesRef.current = [];
    floatingTextsRef.current = [];
    playerRef.current = {
      x: 100,
      y: 260,
      width: 44,
      height: 48,
      vy: 0,
      isGrounded: true,
      lane: 1,
    };
    lastSpawnTime.current = Date.now();
    lastPassiveTick.current = Date.now();

    setGameState('playing');
  };

  // Touch on-screen lane controls
  const handleMoveLane = (delta: number) => {
    if (gameState !== 'playing') return;
    playerRef.current.lane = Math.max(0, Math.min(2, playerRef.current.lane + delta));
  };

  // Dilemma Selection
  const handleSelectDilemmaOption = (option: 'A' | 'B') => {
    if (!currentDilemma) return;
    const choice = option === 'A' ? currentDilemma.optionA : currentDilemma.optionB;

    setScore((prev) => Math.max(0, prev + choice.rewardCoins));
    setDilemmaFeedback(choice.feedback);

    if (choice.isCorrect) {
      sounds.playInvestment();
      setPassiveIncomeRate((prev) => prev + 15);
      setWisdomLevel((prev) => prev + 1);
      setTowerHeight((prev) => Math.min(100, prev + 25));
      addXp(40, 'Decisão familiar sábia no jogo!');
    } else {
      sounds.playHazard();
    }

    setResolvedDilemmaIds((prev) => [...prev, currentDilemma.id]);

    setTimeout(() => {
      setCurrentDilemma(null);
      setDilemmaFeedback(null);

      // Check if victory condition reached
      if (currentDilemma.id === 3 && choice.isCorrect) {
        sounds.playVictory();
        try {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#D4AF37', '#10B981', '#3B82F6', '#FFFFFF'],
          });
        } catch (_) {}
        unlockBadge('badge_patrimonial_architect');
        addXp(150, 'Vitória no Jogo da Família! Torre do Patrimônio Construída!');
        setGameState('victory');
      } else {
        setGameState('playing');
      }
    }, 2800);
  };

  // Main 60fps Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const lanesY = [120, 210, 300];

    const gameLoop = () => {
      if (gameState === 'playing') {
        const now = Date.now();

        // Passive Income Tick every 1 second
        if (now - lastPassiveTick.current >= 1000) {
          setScore((prev) => {
            const nextScore = prev + passiveIncomeRate;
            // Check dilemma triggers
            const nextDilemma = FAMILY_DILEMMAS.find(
              (d) => nextScore >= d.triggerScore && !resolvedDilemmaIds.includes(d.id)
            );
            if (nextDilemma) {
              setCurrentDilemma(nextDilemma);
              setGameState('dilemma');
            }
            return nextScore;
          });
          lastPassiveTick.current = now;
        }

        // Spawn items
        if (now - lastSpawnTime.current > 1100) {
          const lane = Math.floor(Math.random() * 3);
          const rand = Math.random();

          let type: any = 'coin';
          let value = 50;

          if (rand < 0.45) {
            type = 'coin';
            value = 50;
          } else if (rand < 0.70) {
            type = 'asset'; // FII / Tesouro
            value = 150;
          } else if (rand < 0.85) {
            type = 'book'; // Sabedoria
            value = 80;
          } else {
            type = Math.random() > 0.5 ? 'hazard_impulse' : 'hazard_debt';
            value = -100;
          }

          itemsRef.current.push({
            x: canvas.width + 40,
            y: lanesY[lane] - 16,
            width: 32,
            height: 32,
            type,
            speed: 3.8 + towerHeight * 0.02,
            value,
          });

          lastSpawnTime.current = now;
        }

        // Update player position smoothly toward lane
        const targetY = lanesY[playerRef.current.lane] - playerRef.current.height / 2;
        playerRef.current.y += (targetY - playerRef.current.y) * 0.22;

        // Update items
        for (let i = itemsRef.current.length - 1; i >= 0; i--) {
          const item = itemsRef.current[i];
          item.x -= item.speed;

          // Check collision with player
          const p = playerRef.current;
          const hit =
            p.x < item.x + item.width &&
            p.x + p.width > item.x &&
            p.y < item.y + item.height &&
            p.y + p.height > item.y;

          if (hit) {
            if (item.type === 'coin') {
              sounds.playCoin();
              setScore((s) => s + item.value);
              setTowerHeight((t) => Math.min(100, t + 0.8));
              floatingTextsRef.current.push({
                x: p.x,
                y: p.y - 10,
                text: `+R$ ${item.value}`,
                life: 30,
                color: '#D4AF37',
              });
              // Sparkle particles
              for (let k = 0; k < 6; k++) {
                particlesRef.current.push({
                  x: item.x,
                  y: item.y,
                  vx: (Math.random() - 0.5) * 5,
                  vy: (Math.random() - 0.5) * 5,
                  life: 25,
                  color: '#D4AF37',
                  size: 3,
                });
              }
            } else if (item.type === 'asset') {
              sounds.playInvestment();
              setScore((s) => s + item.value);
              setPassiveIncomeRate((r) => r + 4);
              setTowerHeight((t) => Math.min(100, t + 1.5));
              floatingTextsRef.current.push({
                x: p.x,
                y: p.y - 10,
                text: '+FII / Aluguel +R$ 4/s!',
                life: 40,
                color: '#10B981',
              });
            } else if (item.type === 'book') {
              sounds.playCoin();
              setWisdomLevel((w) => w + 1);
              setTowerHeight((t) => Math.min(100, t + 1.2));
              floatingTextsRef.current.push({
                x: p.x,
                y: p.y - 10,
                text: '+Sabedoria Financeira!',
                life: 35,
                color: '#3B82F6',
              });
            } else {
              // Hazards
              sounds.playHazard();
              setScore((s) => Math.max(0, s + item.value));
              setTowerHeight((t) => Math.max(0, t - 2.5));
              floatingTextsRef.current.push({
                x: p.x,
                y: p.y - 10,
                text: item.type === 'hazard_debt' ? '-R$ 100 Dívida Rotativa!' : '-R$ 100 Compra Impulso!',
                life: 40,
                color: '#EF4444',
              });
              // Red particles
              for (let k = 0; k < 8; k++) {
                particlesRef.current.push({
                  x: item.x,
                  y: item.y,
                  vx: (Math.random() - 0.5) * 6,
                  vy: (Math.random() - 0.5) * 6,
                  life: 25,
                  color: '#EF4444',
                  size: 4,
                });
              }
            }

            itemsRef.current.splice(i, 1);
            continue;
          }

          if (item.x < -50) {
            itemsRef.current.splice(i, 1);
          }
        }

        // Update particles
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const pt = particlesRef.current[i];
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.life--;
          if (pt.life <= 0) {
            particlesRef.current.splice(i, 1);
          }
        }

        // Update floating texts
        for (let i = floatingTextsRef.current.length - 1; i >= 0; i--) {
          const ft = floatingTextsRef.current[i];
          ft.y -= 1.2;
          ft.life--;
          if (ft.life <= 0) {
            floatingTextsRef.current.splice(i, 1);
          }
        }
      }

      // RENDER CANVAS
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient (Montanari deep navy twilight)
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#060B14');
      grad.addColorStop(0.7, '#0B192C');
      grad.addColorStop(1, '#0F1E36');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Distant Architectural Silhouette (Construção Patrimonial)
      ctx.fillStyle = 'rgba(15, 30, 54, 0.5)';
      ctx.fillRect(40, 90, 60, 280);
      ctx.fillRect(120, 60, 80, 310);
      ctx.fillRect(230, 110, 70, 260);
      ctx.fillRect(340, 40, 90, 330);
      ctx.fillRect(470, 80, 80, 290);
      ctx.fillRect(580, 50, 100, 320);

      // 3 Movement Lanes
      lanesY.forEach((y, idx) => {
        ctx.strokeStyle = idx === playerRef.current.lane ? 'rgba(212, 175, 55, 0.4)' : 'rgba(30, 41, 59, 0.5)';
        ctx.lineWidth = 2;
        ctx.setLineDash([12, 8]);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Render Items
      itemsRef.current.forEach((item) => {
        ctx.save();
        ctx.translate(item.x, item.y);

        if (item.type === 'coin') {
          // Gold coin
          ctx.fillStyle = '#D4AF37';
          ctx.beginPath();
          ctx.arc(16, 16, 13, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#F5D77F';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = '#060B14';
          ctx.font = 'bold 12px monospace';
          ctx.fillText('R$', 9, 20);
        } else if (item.type === 'asset') {
          // Real Estate FII / Asset Brick
          ctx.fillStyle = '#10B981';
          ctx.fillRect(4, 4, 24, 24);
          ctx.strokeStyle = '#6EE7B7';
          ctx.lineWidth = 2;
          ctx.strokeRect(4, 4, 24, 24);
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 10px monospace';
          ctx.fillText('FII', 7, 20);
        } else if (item.type === 'book') {
          // Wisdom book
          ctx.fillStyle = '#3B82F6';
          ctx.fillRect(4, 6, 24, 20);
          ctx.fillStyle = '#93C5FD';
          ctx.fillRect(6, 8, 20, 16);
          ctx.fillStyle = '#1E3A8A';
          ctx.font = 'bold 10px sans-serif';
          ctx.fillText('XP', 10, 20);
        } else if (item.type === 'hazard_impulse') {
          // Impulse purchase trap
          ctx.fillStyle = '#EF4444';
          ctx.beginPath();
          ctx.moveTo(16, 4);
          ctx.lineTo(28, 26);
          ctx.lineTo(4, 26);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 12px sans-serif';
          ctx.fillText('!', 14, 23);
        } else {
          // Debt trap
          ctx.fillStyle = '#DC2626';
          ctx.fillRect(4, 8, 24, 18);
          ctx.fillStyle = '#FEE2E2';
          ctx.font = 'bold 9px monospace';
          ctx.fillText('DÍVIDA', 5, 20);
        }

        ctx.restore();
      });

      // Render Player (Family Piggy Cart Mascot)
      const p = playerRef.current;
      ctx.save();
      ctx.translate(p.x, p.y);

      // Cart body (Geometric modern vehicle with Montanari gold trim)
      ctx.fillStyle = '#0B192C';
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(0, 8, p.width, p.height - 14, 8);
      ctx.fill();
      ctx.stroke();

      // Golden Family Mascot Icon inside cart
      ctx.fillStyle = '#D4AF37';
      ctx.beginPath();
      ctx.arc(16, 16, 7, 0, Math.PI * 2);
      ctx.arc(28, 16, 5, 0, Math.PI * 2);
      ctx.fill();

      // Wheels
      ctx.fillStyle = '#1E293B';
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(10, p.height - 4, 6, 0, Math.PI * 2);
      ctx.arc(p.width - 10, p.height - 4, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.restore();

      // Render Particles
      particlesRef.current.forEach((pt) => {
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Floating Text
      floatingTextsRef.current.forEach((ft) => {
        ctx.fillStyle = ft.color;
        ctx.font = 'bold 12px monospace';
        ctx.fillText(ft.text, ft.x, ft.y);
      });

      animFrameId.current = requestAnimationFrame(gameLoop);
    };

    animFrameId.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [gameState, towerHeight, passiveIncomeRate, resolvedDilemmaIds]);

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Title & Philosophy */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono tracking-wide uppercase">
            <span>Educação Financeira em Família</span>
            <span aria-hidden="true">·</span>
            <span>Game Interativo Pais & Filhos</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white mt-1">
            Arquitetos do Futuro: A Conquista do Patrimônio
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Joguem juntos, discutam decisões reais sobre mesada, reserva e investimentos, e construam a Torre da Independência Financeira!
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title={soundEnabled ? 'Silenciar Áudio' : 'Ativar Efeitos Sonoros'}
            aria-label="Controle de áudio do jogo"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
        </div>
      </div>

      {/* Main Game Shell Container */}
      <div className="relative bg-slate-950 border-2 border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* HUD Top Bar (Integrated World-Matched Cluster) */}
        <div className="p-3 sm:p-4 bg-slate-900/95 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-amber-400">
              <Coins className="w-4 h-4" />
              <span className="text-slate-400 font-sans">Patrimônio:</span>
              <span className="font-bold text-white text-sm">{formatCurrencyBRL(score)}</span>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-400">
              <Building className="w-4 h-4" />
              <span className="text-slate-400 font-sans">Renda Passiva:</span>
              <span className="font-bold text-emerald-300">+{formatCurrencyBRL(passiveIncomeRate)}/s</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-sans text-[11px]">Torre da Liberdade:</span>
              <div className="w-24 sm:w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all"
                  style={{ width: `${towerHeight}%` }}
                />
              </div>
              <span className="text-white font-bold">{Math.round(towerHeight)}%</span>
            </div>

            <div className="flex items-center gap-1 text-blue-400">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Sabedoria Nv.{wisdomLevel}</span>
            </div>
          </div>
        </div>

        {/* 60fps Canvas Display */}
        <canvas
          ref={canvasRef}
          width={760}
          height={380}
          className="w-full h-auto block select-none bg-slate-950"
        />

        {/* TITLE SCREEN OVERLAY */}
        {gameState === 'title' && (
          <div className="absolute inset-0 z-20 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center shadow-2xl shadow-amber-500/20">
              <Gamepad2 className="w-8 h-8 text-amber-400" />
            </div>

            <div className="space-y-2 max-w-lg">
              <span className="text-[11px] font-mono tracking-[0.25em] text-amber-400 uppercase">
                Montanari Arquitetura Patrimonial
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-serif-brand">
                Arquitetos do Futuro
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Um jogo colaborativo para pais e filhos aprenderem na prática: poupar moedas, desviar de compras por impulso e reinvestir em ativos reais que geram renda passiva!
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md text-[11px] text-slate-400">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-amber-400 font-bold block">Moedas</span>
                <span>Poupar dinheiro</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-emerald-400 font-bold block">FIIs & Ativos</span>
                <span>Renda passiva</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-blue-400 font-bold block">Livros</span>
                <span>Educação +XP</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <span className="text-red-400 font-bold block">Dívidas</span>
                <span>Desvie do perigo!</span>
              </div>
            </div>

            <button
              onClick={startGame}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Jogar em Família (Espaço / Iniciar)</span>
            </button>

            <div className="text-[10px] text-slate-500 font-mono">
              Controles: W / S ou Setas ↑ ↓ para trocar de faixa · Dispositivos móveis usam botões na tela
            </div>
          </div>
        )}

        {/* DILEMMA MODAL OVERLAY (Family Discussion Pop-up) */}
        {gameState === 'dilemma' && currentDilemma && (
          <div className="absolute inset-0 z-30 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase">
                  <Users className="w-4 h-4" />
                  <span>Dilema Familiar: {currentDilemma.stageName}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                  Hora da Decisão!
                </span>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {currentDilemma.question}
                </h3>
                <p className="text-xs text-slate-300 mt-2 bg-slate-950/70 p-3 rounded-xl border border-slate-800 leading-relaxed">
                  {currentDilemma.context}
                </p>
              </div>

              {/* Feedback banner after answering */}
              {dilemmaFeedback ? (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-slate-900 border border-amber-500/40 text-xs text-amber-200 leading-relaxed text-center font-medium animate-in fade-in">
                  <Sparkles className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                  {dilemmaFeedback}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <button
                    onClick={() => handleSelectDilemmaOption('A')}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-red-400/60 text-left transition-all cursor-pointer group space-y-1"
                  >
                    <span className="text-slate-400 text-[10px] block font-mono">OPÇÃO A</span>
                    <h4 className="font-semibold text-white group-hover:text-red-300">{currentDilemma.optionA.text}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{currentDilemma.optionA.description}</p>
                  </button>

                  <button
                    onClick={() => handleSelectDilemmaOption('B')}
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-400/60 text-left transition-all cursor-pointer group space-y-1"
                  >
                    <span className="text-emerald-400 text-[10px] block font-mono">OPÇÃO B (EDUCATIVA)</span>
                    <h4 className="font-semibold text-white group-hover:text-emerald-300">{currentDilemma.optionB.text}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{currentDilemma.optionB.description}</p>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VICTORY MODAL OVERLAY */}
        {gameState === 'victory' && (
          <div className="absolute inset-0 z-30 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center shadow-2xl shadow-emerald-500/20">
              <Award className="w-8 h-8 text-emerald-400" />
            </div>

            <div className="space-y-1 max-w-md">
              <span className="text-xs text-amber-400 font-mono uppercase tracking-wider">
                Independência Financeira Alcançada!
              </span>
              <h2 className="text-2xl font-bold text-white font-serif-brand">
                Parabéns, Família {user?.name ? user.name.split(' ')[0] : 'Montanari'}!
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Vocês superaram todas as armadilhas financeiras, completaram a reserva de emergência e colocaram os juros compostos para gerar renda passiva perpétua!
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-sm w-full text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Patrimônio:</span>
                <span className="text-amber-400 font-bold">{formatCurrencyBRL(score)}</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Renda Passiva:</span>
                <span className="text-emerald-400 font-bold">{formatCurrencyBRL(passiveIncomeRate)}/s</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Sabedoria:</span>
                <span className="text-blue-400 font-bold">Nv. {wisdomLevel}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium cursor-pointer flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Imprimir Diploma
              </button>
              <button
                onClick={startGame}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Jogar Novamente
              </button>
            </div>
          </div>
        )}
      </div>

      {/* On-screen touch & mobile controls */}
      <div className="flex items-center justify-between p-4 bg-slate-900/80 border border-slate-800 rounded-2xl text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="hidden sm:inline font-mono">Atalhos: W/S ou Setas</span>
          <span className="sm:hidden font-mono">Controles de Faixa:</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleMoveLane(-1)}
            disabled={gameState !== 'playing'}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold border border-slate-700 active:scale-95 disabled:opacity-40 transition-all cursor-pointer flex items-center gap-1.5"
          >
            ▲ Subir Faixa
          </button>
          <button
            onClick={() => handleMoveLane(1)}
            disabled={gameState !== 'playing'}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold border border-slate-700 active:scale-95 disabled:opacity-40 transition-all cursor-pointer flex items-center gap-1.5"
          >
            ▼ Descer Faixa
          </button>
        </div>
      </div>
    </div>
  );
};
