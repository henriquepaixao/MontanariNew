<div align="center">

# 🏛️ MONTANARI ARQUITETURA PATRIMONIAL
### *“Construa hoje a estrutura do patrimônio que deseja ter amanhã.”*

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-8E75C2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  <strong>Plataforma completa de inteligência financeira, gestão orçamentária, simulações de investimentos adaptadas ao Brasil, academia com certificação, inteligência artificial multimodal (Gemini) e gamificação familiar.</strong>
</p>

</div>

---

## 📌 Sumário

1. [Sobre o Projeto](#-sobre-o-projeto)
2. [Principais Funcionalidades](#-principais-funcionalidades)
   - [Dashboard de Evolução Patrimonial](#1-dashboard-de-evolução-patrimonial)
   - [Organização Orçamentária & Família](#2-organização-orçamentária--família)
   - [Simuladores Financeiros Brasileiros](#3-simuladores-financeiros-brasileiros)
   - [Gestão de Carteira e Investimentos](#4-gestão-de-carteira-e-investimentos)
   - [Academia Montanari & Certificação](#5-academia-montanari--certificação)
   - [Gamificação em Duas Dimensões](#6-gamificação-em-duas-dimensões)
   - [Montanari Mentor (Gemini IA & Voz)](#7-montanari-mentor-gemini-ia--voz)
   - [Jogo Interativo para Pais & Filhos](#8-jogo-interativo-para-pais--filhos)
   - [Painel Administrativo & Governança](#9-painel-administrativo--governança)
   - [Privacidade & Conformidade LGPD](#10-privacidade--conformidade-lgpd)
   - [Suporte a Temas Claro e Escuro](#11-suporte-a-temas-claro-e-escuro)
3. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
4. [Estrutura de Pastas](#-estrutura-de-pastas)
5. [Como Executar Localmente](#-como-executar-localmente)
6. [Variáveis de Ambiente](#-variáveis-de-ambiente)
7. [Licença e Isenção de Responsabilidade](#-licença-e-isenção-de-responsabilidade)

---

## 🏛️ Sobre o Projeto

A **Montanari Arquitetura Patrimonial** foi criada com a missão de fornecer às famílias brasileiras as ferramentas e o conhecimento necessários para sair do endividamento, blindar uma reserva de emergência e construir independência financeira consistente ao longo do tempo.

Diferente de aplicativos puramente contábeis ou de bancos tradicionais, a plataforma enfatiza o **desenvolvimento de hábitos financeiros sustentáveis**, integrando:
- A realidade e as regras tributárias brasileiras (Tabela Regressiva de IR, Selic, CDI, IPCA, isenções de LCI/LCA e FIIs).
- Inteligência artificial conversacional contextualizada com o modelo **Google Gemini 3.8 Flash**.
- Acesso por **voz em português** (Web Speech API) e síntese de voz (TTS).
- Um **game interativo** para pais jogarem com seus filhos e transmitirem inteligência financeira entre gerações.

---

## 🚀 Principais Funcionalidades

### 1. Dashboard de Evolução Patrimonial
- **Métricas Executivas em Tempo Real:** Patrimônio Líquido (Ativos - Passivos), Saldo Disponível do Mês, Capacidade de Poupança (%) e Progresso da Reserva.
- **Gráfico Vetorial Interativo:** Linha do tempo da evolução patrimonial líquida.
- **Distribuição Visual por Classe:** Visualização percentual entre Renda Fixa, Títulos Públicos, Fundos Imobiliários (FIIs), Ações e ETFs.
- **Modo Demonstração:** Dados de exemplo realistas pré-carregados, com botão para alternar instantaneamente para uma base de dados reais zerada.

### 2. Organização Orçamentária & Família
- Cadastro detalhado de receitas e despesas (fixas e variáveis) com categorias da realidade brasileira (moradia, supermercado, saúde, educação, transporte, lazer).
- **Mapeamento de Dívidas e Passivos:** Cálculo de juros mensais, parcelas restantes e estratégias consagradas de quitação acelerada (**Método Avalanche** e **Bola de Neve**).
- **Parâmetro Educativo 50/30/20:** Análise inteligente do percentual de renda comprometido com Essenciais (~50%), Estilo de Vida (~30%) e Construção do Futuro (~20%).
- **Calendário Financeiro:** Acompanhamento de contas a pagar com alerta de vencimentos.
- **Exportação CSV:** Download de extrato compatível com Excel e planilhas.
- **Pesquisa por Voz:** Microfone integrado para filtrar despesas e receitas apenas falando termos como *"Supermercado"* ou *"Salário"*.

### 3. Simuladores Financeiros Brasileiros
1. **Juros Compostos:** Projeção detalhada ano a ano com aportes mensais, capitalização mensal e reajuste anual dos aportes pela inflação.
2. **Reserva de Emergência:** Dimensionamento baseado no perfil de estabilidade profissional (CLT: 6 meses; Autônomo/PJ: 9 a 12 meses; Servidor: 3 a 4 meses) com planos de aportes em 6, 12 e 24 meses.
3. **Renda Passiva (SWR):** Cálculo de patrimônio necessário para aposentadoria perpétua sob taxas seguras de retirada (3,5% a.a. conservador, 4,5% a.a. equilibrado e 6,0% a.a. otimista).
4. **Comparador de Investimentos no Brasil:** Comparativo entre Caderneta de Poupança, CDB 110% do CDI, Tesouro Selic, Tesouro IPCA+ 6,2%, LCI/LCA 92% do CDI e FIIs, aplicando a **Tabela Regressiva de IR da Lei nº 11.033/2004** e o retorno real líquido de inflação.
5. **Aporte para Metas:** Cálculo matemático do aporte mensal necessário para atingir qualquer marco futuro.

### 4. Gestão de Carteira e Investimentos
- Cadastro detalhado de títulos e ativos com custodiante, indexador (% CDI, IPCA+, Prefixado), liquidez (D+0, D+30, no vencimento) e vinculação a metas.
- Gráficos de concentração de risco por instituição (BTG, XP, Nubank, Itaú, etc.).
- Disclaimer regulatório de conformidade CVM.

### 5. Academia Montanari & Certificação
- **5 Trilhas Progressivas (29 Aulas Completas):**
  - *Trilha 1:* Fundamentos Financeiros e Orçamento Inteligente.
  - *Trilha 2:* Primeiros Investimentos, Selic, CDI e IPCA.
  - *Trilha 3:* Construção de Patrimônio, DCA e Reinvestimento de Proventos.
  - *Trilha 4:* Proteção Patrimonial, Seguros, ITCMD e Blindagem Sucessória.
  - *Trilha 5:* Independência Financeira, SWR e Previdência (PGBL/VGBL).
- **Conteúdo Rígido em Cada Aula:** Objetivos de aprendizagem, espaço audiovisual, artigo técnico aprofundado, exemplo prático brasileiro e **quiz avaliativo com feedback explicativo imediato**.
- **Certificado Digital de Conclusão:** Emissão e impressão de certificados com código de autenticidade para cada trilha finalizada.

### 6. Gamificação em Duas Dimensões
- **Dimensão A — Conhecimento Financeiro:** Níveis 1 a 7 (*Explorador*, *Organizador*, *Estrategista*, *Investidor Consciente*, *Construtor de Patrimônio*, *Planejador Patrimonial*, *Arquiteto do Futuro*) conquistados por XP ao concluir aulas e acertar quizzes.
- **Dimensão B — Jornada Patrimonial:** Etapas 1 a 8 baseadas no cumprimento de marcos práticos (diagnóstico, reserva completa, investimentos estruturados e diversificação).
- **Galeria de 10 Badges Exclusivos** com celebrações em confetes e notificações toast em tempo real.

### 7. Montanari Mentor (Gemini IA & Voz)
- **Botão Flutuante (FAB) e Aba Dedicada:** Acessível a qualquer instante em todas as telas da plataforma.
- **Multi-turn Chat:** Histórico de conversa contínuo via backend Express com o modelo `gemini-3.8-flash`.
- **Entrada e Pesquisa por Voz:** Fale suas dúvidas diretamente ao microfone em português brasileiro.
- **Síntese de Voz (TTS):** Ouça a resposta do Mentor com áudio natural.
- **Autorização de Contexto:** Opção para o usuário autorizar que a IA analise seus números de patrimônio e metas para dar orientações sob medida.

### 8. Jogo Interativo para Pais & Filhos (*"Arquitetos do Futuro"*)
- Desenvolvido para ensinar finanças de forma lúdica em família.
- **Simulação 60fps em Canvas:** Controle um cofrinho/veículo mascote em 3 faixas com teclado (`W`/`S` ou setas `↑`/`↓`) e botões touch responsivos para telas móveis.
- **Sintetizador de Áudio Web Audio:** Sons procedurais de moedas, ativação de FIIs, bônus de sabedoria e fanfarras de vitória (com botão de silenciar).
- **Mecânicas Educativas:** Colete moedas de poupança e tijolos de ativos que geram **renda passiva automática por segundo**, desviando de compras por impulso e dívidas rotativas.
- **Dilemas Familiares Interativos:** Pausas no jogo onde pais e filhos discutem decisões reais de consumo e investimento antes de escolher a resposta.
- **Diploma da Família Investidora:** Impressão de certificado familiar ao concluir a Torre da Liberdade Financeira.

### 9. Painel Administrativo & Governança
- Métricas agregadas da plataforma (volume de transações, usuários ativos, simuladores mais utilizados).
- Gerenciamento de aulas e quizzes da Academia.
- Ajuste centralizado das taxas de mercado padrão (Selic, CDI, IPCA).
- Mural de comunicados institucionais.
- Garantia de que operadores não acessam dados financeiros individuais confidenciais.

### 10. Privacidade & Conformidade LGPD
- **Download Integral em JSON:** Portabilidade completa de todos os dados do usuário com 1 clique.
- **Exportação CSV:** Planilha de transações para conferência contábil.
- Termos de uso e avisos de isenção de responsabilidade regulatória (Resoluções CVM nº 19/2021 e nº 20/2021).
- Opção para limpeza imediata de dados ou restauração de exemplos.

### 11. Suporte a Temas Claro e Escuro
- Alternador rápido no cabeçalho (Sol/Lua) com persistência no `localStorage`.
- **Tema Escuro Padrão:** Azul-marinho profundo (`#060B14`, `#0B192C`) com detalhes dourados elegantes.
- **Tema Claro Refinado:** Superfícies brancas com tipografia de alto contraste e realce dourado/âmbar.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:**
  - [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS v4](https://tailwindcss.com/)
  - [Lucide React](https://lucide.dev/) (Ícones minimalistas)
  - [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) (Celebrações de conquistas)
  - [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) (Reconhecimento de fala e síntese de voz PT-BR)
  - [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) (Sintetizador procedural de áudio para o jogo)
- **Backend & Inteligência Artificial:**
  - [Express.js](https://expressjs.com/) (Node.js REST API integrada)
  - [@google/genai](https://www.npmjs.com/package/@google/genai) (SDK oficial do Google Gemini API com o modelo `gemini-3.8-flash`)
  - [Vite 8](https://vitejs.dev/) (Build tool e middleware de desenvolvimento full-stack)

---

## 📁 Estrutura de Pastas

```text
├── src/
│   ├── components/
│   │   ├── academy/          # Academia Montanari (aulas, quizzes, certificados)
│   │   ├── admin/            # Painel administrativo de governança
│   │   ├── budget/           # Gestão orçamentária, 50/30/20 e dívidas
│   │   ├── common/           # Header, Toast, Floating Chatbot e widgets
│   │   ├── dashboard/        # Painel executivo, gráficos de evolução e KPIs
│   │   ├── game/             # Jogo familiar "Arquitetos do Futuro" (Canvas 60fps)
│   │   ├── goals/            # Acompanhamento de metas financeiras
│   │   ├── investments/      # Gestão de carteira de investimentos e classes
│   │   ├── mentor/           # Tela completa do Montanari Mentor IA
│   │   ├── profile/          # Perfil financeiro, planos e Central LGPD
│   │   └── simulators/       # 5 Simuladores de matemática financeira
│   ├── context/
│   │   └── AppContext.tsx    # Estado global, persistência e motor de XP/Badges
│   ├── data/
│   │   ├── academyContent.ts # 5 trilhas, 29 aulas ricas e quizzes
│   │   ├── demoData.ts       # Dados realistas brasileiros de exemplo
│   │   └── gamificationData.ts# Níveis, etapas e badges
│   ├── hooks/
│   │   └── useVoiceInput.ts  # Hook para entrada por voz e Text-to-Speech
│   ├── types/
│   │   └── index.ts          # Definições completas de tipagem TypeScript
│   ├── utils/
│   │   └── calculators.ts    # Fórmulas de juros compostos, reserva, SWR e IR
│   ├── App.tsx               # Roteamento de telas e casca da aplicação
│   ├── index.css             # Configuração Tailwind v4 e variáveis de tema
│   └── main.tsx              # Ponto de entrada React
├── server.ts                 # Backend Express, rotas da API e integração Gemini
├── index.html                # Metadados e fontes tipográficas (Cinzel / Plus Jakarta)
├── metadata.json             # Metadados do aplicativo
├── package.json
└── tsconfig.json
```

---

## 💻 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior.
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/).

### Passo a Passo

1. **Clone o repositório:**
```bash
git clone https://github.com/seu-usuario/montanari-arquitetura-patrimonial.git
cd montanari-arquitetura-patrimonial
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
Copie o arquivo de exemplo `.env.example` para `.env`:
```bash
cp .env.example .env
```
Preencha sua chave da API do Google Gemini em `GEMINI_API_KEY`. Caso não configure a chave, o aplicativo continuará funcionando normalmente com respostas educacionais curadas no modo offline.

4. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

O aplicativo estará disponível em: `http://localhost:3000`.

5. **Compilar para produção:**
```bash
npm run build
npm start
```

---

## 🔐 Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|---|---|---|
| `GEMINI_API_KEY` | Chave da API do Google Gemini para alimentar o Montanari Mentor (`gemini-3.8-flash`). | Opcional (possui fallback de conhecimento integrado) |
| `PORT` | Porta onde o servidor Express e Vite rodam (Padrão: `3000`). | Opcional |

---

## ⚖️ Licença e Isenção de Responsabilidade

Este projeto é distribuído sob a licença **MIT**. Consulte o arquivo `LICENSE` para mais detalhes.

> **Aviso Regulatório (CVM / Planejamento Financeiro):**
> Esta plataforma foi concebida para fins estritamente **educacionais, pedagógicos e de organização orçamentária pessoal**. As simulações, comparadores e cálculos apresentados não constituem, sob nenhuma circunstância, aconselhamento financeiro regulado, consultoria individualizada ou recomendação de compra e venda de valores mobiliários (conforme Resoluções CVM nº 19/2021 e nº 20/2021). Rentabilidade passada não representa garantia de rentabilidade futura.

---

<div align="center">
  <sub>Construído com excelência para a <strong>Montanari Arquitetura Patrimonial</strong> · 2026</sub>
</div>
