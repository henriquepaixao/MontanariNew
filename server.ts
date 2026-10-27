import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// Initialize Google GenAI client if GEMINI_API_KEY is present
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({});
  } catch (err) {
    console.warn('Could not initialize Google GenAI client:', err);
  }
}

// 1. API: Reference Market Rates for Brazilian Economy
app.get('/api/market-rates', (_req: Request, res: Response) => {
  res.json({
    selic: 11.25,
    cdi: 11.15,
    ipca: 4.15,
    poupanca: 6.17,
    metaInflacao: 3.0,
    lastUpdated: new Date().toISOString(),
    source: 'Banco Central do Brasil & B3 (Taxas de Referência)',
  });
});

// 2. API: Montanari Mentor AI Assistant
app.post('/api/mentor', async (req: Request, res: Response) => {
  const { message, history, userContext } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Mensagem inválida ou ausente.' });
  }

  // System instruction defining Montanari Mentor's persona
  const systemInstruction = `
Você é o Montanari Mentor, assistente virtual exclusivo da Montanari Arquitetura Patrimonial.
Sua missão é educar, orientar e esclarecer conceitos financeiros para brasileiros com elegância, didática acessível e total embasamento técnico na realidade do Brasil (R$, Selic, CDI, IPCA, Tesouro Direto, CDBs, LCIs/LCAs, FIIs, Fundos de Investimento e Ações da B3).

Princípios Inegociáveis:
1. "Construa hoje a estrutura do patrimônio que deseja ter amanhã."
2. Educação, clareza e autonomia: nunca prometa dinheiro fácil, enriquecimento rápido ou retorno garantido acima da renda fixa soberana.
3. Não emita recomendações individualizadas de compra/venda de ativos específicos como analista regulado; foque na estrutura, planejamento, diversificação e entendimento de riscos.
4. Responda em Português do Brasil com tom sóbrio, respeitoso, encorajador e profissional.
5. Se o usuário fornecer contexto financeiro pessoal (renda, reserva, metas), use esses dados com discrição para ilustrar raciocínios com números práticos.
6. Mantenha as respostas concisas, bem estruturadas em parágrafos claros ou tópicos se necessário.
`;

  // If Gemini API is available, invoke it
  if (aiClient && process.env.GEMINI_API_KEY) {
    try {
      let promptWithContext = message;
      if (userContext) {
        promptWithContext = `[Contexto Financeiro do Usuário (autorizado): ${JSON.stringify(userContext)}]\n\nPergunta do Usuário: ${message}`;
      }

      // Format multi-turn history if provided
      let contentsPayload: any = promptWithContext;
      if (Array.isArray(history) && history.length > 0) {
        const mappedHistory = history
          .filter((h: any) => h && h.text)
          .map((h: any) => ({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }],
          }));
        mappedHistory.push({
          role: 'user',
          parts: [{ text: promptWithContext }],
        });
        contentsPayload = mappedHistory;
      }

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contentsPayload,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || 'Desculpe, não consegui elaborar uma resposta no momento.';
      return res.json({ reply: replyText, source: 'ai' });
    } catch (error) {
      console.error('Erro na chamada Gemini API:', error);
      // Fallback below
    }
  }

  // Intelligent fallback responses for common queries
  const lower = message.toLowerCase();
  let fallbackReply = '';

  if (lower.includes('cdi') || lower.includes('selic')) {
    fallbackReply = `A taxa Selic (atualmente em torno de 11,25% a.a.) é a taxa básica de juros da economia brasileira, fixada pelo Banco Central a cada 45 dias. Já o CDI (Certificado de Depósito Interbancário) é a taxa que os bancos cobram entre si, operando historicamente cerca de 0,10 p.p. abaixo da Selic (em torno de 11,15% a.a.).\n\nQuando um CDB paga 100% do CDI, você recebe aproximadamente o rendimento do CDI bruto. É o referencial mais comum para a renda fixa pós-fixada no Brasil.`;
  } else if (lower.includes('reserva') || lower.includes('emergência') || lower.includes('emergencia')) {
    fallbackReply = `A reserva de emergência é a fundação da sua arquitetura financeira. Ela deve cobrir entre 3 a 6 meses do seu custo de vida (se for servidor ou CLT com estabilidade) e até 9 a 12 meses (se for autônomo, profissional liberal ou empresário).\n\nEla deve estar alocada exclusivamente em ativos de baixíssimo risco de crédito e com liquidez imediata (D+0 ou D+1), como o Tesouro Selic ou CDBs com liquidez diária de grandes instituições.`;
  } else if (lower.includes('organizar') || lower.includes('salário') || lower.includes('salario') || lower.includes('orçamento') || lower.includes('orcamento')) {
    fallbackReply = `Para organizar seu orçamento de forma estruturada, sugerimos o método das Três Dimensões:\n1. 50% para Gastos Essenciais (moradia, alimentação básica, saúde, transporte indispensável).\n2. 30% para Estilo de Vida (lazer em família, restaurantes, assinaturas, compras conscientes).\n3. 20% para o Seu Futuro (pague-se primeiro: reserva de emergência, quitação de dívidas e investimentos de longo prazo).\n\nO segredo não é cortar tudo o que traz prazer, mas definir limites claros e honrar o aporte do seu futuro assim que a renda entra na conta.`;
  } else if (lower.includes('juros compostos') || lower.includes('longo prazo')) {
    fallbackReply = `Os juros compostos são juros incidentes sobre juros acumulados (M = C * (1 + i)^t). No início de uma trajetória de investimentos, mais de 90% do seu patrimônio virá do suor dos seus aportes mensais. Com o passar dos anos (geralmente a partir do 7º ao 10º ano), os juros gerados pelos seus ativos passam a render mais do que o seu próprio aporte do mês, criando uma curva exponencial de multiplicação de riqueza.`;
  } else if (lower.includes('tesouro direto') || lower.includes('ipca')) {
    fallbackReply = `O Tesouro Direto é o programa do Governo Federal que permite que pessoas físicas comprem títulos da dívida pública. É o investimento de menor risco de crédito do país.\n\nPrincipais títulos:\n- Tesouro Selic: Pós-fixado, ideal para reserva de emergência e curto prazo.\n- Tesouro IPCA+: Paga a inflação oficial mais uma taxa fixa real (ex: IPCA + 6,2% a.a.), blindando seu poder de compra para metas de médio e longo prazo.\n- Tesouro Prefixado: Garante uma taxa exata até o vencimento, ideal quando você sabe a data exata do objetivo.`;
  } else {
    fallbackReply = `Excelente reflexão patrimonial! Na visão da Montanari Arquitetura Patrimonial, todo objetivo sólido passa por três etapas: organização rigorosa do orçamento presente, proteção do patrimônio já conquistado (reserva e gestão de riscos) e alocação estratégica em ativos geradores de renda.\n\nVocê pode explorar nossos simuladores de juros compostos e reserva na aba 'Simuladores', ou aprofundar seu conhecimento nas trilhas da 'Academia Montanari'. Como posso apoiar seu próximo passo hoje?`;
  }

  return res.json({ reply: fallbackReply, source: 'curated_knowledge' });
});

// Setup Vite in Dev or serve build in Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Montanari Arquitetura Patrimonial rodando na porta ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
