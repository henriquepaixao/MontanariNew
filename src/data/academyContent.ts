import { Track } from '../types';

export const INITIAL_TRACKS: Track[] = [
  {
    id: 1,
    title: 'Trilha 1 — Fundamentos Financeiros',
    subtitle: 'A base estrutural da sua vida financeira',
    description: 'Compreenda a mecânica do dinheiro, assuma o controle do fluxo de caixa e crie sua fortaleza de estabilidade.',
    iconName: 'ShieldCheck',
    lessons: [
      {
        id: 't1_l1',
        trackId: 1,
        order: 1,
        title: 'Como Funciona o Dinheiro e a Mentalidade de Construtor',
        learningObjective: 'Compreender o dinheiro como energia acumulada e instrumento de liberdade, e não apenas de consumo.',
        summary: 'Dinheiro é uma ferramenta de troca e segurança. Quem gasta tudo o que recebe trabalha para os outros; quem retém e investe coloca o dinheiro para trabalhar por si.',
        articleContent: `O dinheiro desempenha três funções clássicas na economia: meio de troca, unidade de conta e reserva de valor. No entanto, no nível individual, a forma como nos relacionamos com ele define nossa liberdade no tempo.\n\nA arquitetura patrimonial começa com uma mudança essencial de perspectiva: parar de encarar o salário apenas como combustível para pagar boletos e começar a encará-lo como o alicerce para construir a autonomia da sua família. Pequenos vazamentos em despesas invisíveis e a ilusão de status através de dívidas são as duas principais armadilhas que impedem a formação de patrimônio.`,
        practicalExample: 'Carlos ganha R$ 7.000 e gasta R$ 7.100 todo mês utilizando o limite do cheque especial. Mariana ganha os mesmos R$ 7.000, mas estruturou seu padrão de vida em R$ 5.500, canalizando R$ 1.500 religiosamente todos os meses para sua infraestrutura financeira. Em 5 anos, Mariana acumula mais de R$ 120.000 enquanto Carlos acumulou R$ 18.000 em juros bancários.',
        readTimeMinutes: 5,
        xpReward: 50,
        quiz: {
          id: 'q_t1_l1',
          question: 'Qual é a principal premissa da arquitetura patrimonial em relação ao dinheiro?',
          options: [
            'Gastar todo o salário para movimentar o comércio e obter milhas.',
            'Encarar o dinheiro como ferramenta estrutural de liberdade e autonomia sustentável.',
            'Buscar métodos de enriquecimento rápido em plataformas não reguladas.',
            'Acumular papel-moeda físico guardado em cofre em casa.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Correto! Na visão da Montanari Arquitetura Patrimonial, o dinheiro é a argamassa com a qual você ergue a liberdade e estabilidade da sua família, com foco na retenção disciplinada e alocação estratégica.'
        }
      },
      {
        id: 't1_l2',
        trackId: 1,
        order: 2,
        title: 'Receitas, Despesas e Orçamento Inteligente',
        learningObjective: 'Dominar a categorização de receitas e despesas para enxergar com clareza para onde cada centavo está indo.',
        summary: 'A gestão do orçamento divide gastos em essenciais, estilo de vida e futuro. O método 50/30/20 serve como parâmetro flexível de reflexão.',
        articleContent: `Sem medição não existe gestão. Um orçamento eficiente não é uma camisa de força que proíbe o café ou o lazer com a família, mas um mapa de voo que define prioridades deliberadas.\n\nDividimos as saídas em: despesas fixas (aluguel, condomínio, internet), despesas variáveis essenciais (supermercado, energia, farmácia), estilo de vida (restaurantes, viagens, assinaturas) e o Aporte para o Futuro (sua primeira fatura do mês, paga a você mesmo).`,
        practicalExample: 'Ao analisar o extrato dos últimos 90 dias, a família Silva descobriu 6 assinaturas de streaming não utilizadas, pagamentos de tarifas de conta corrente que poderiam ser isentas e compras por impulso em aplicativos de comida que somavam R$ 850 mensais. Esse valor foi redirecionado para a reserva.',
        readTimeMinutes: 6,
        xpReward: 50,
        quiz: {
          id: 'q_t1_l2',
          question: 'No método de orçamento equilibrado, o que deve ser considerado a primeira despesa a ser honrada ao receber sua renda?',
          options: [
            'O pagamento de faturas de compras supérfluas no cartão de crédito.',
            'O aporte para o seu próprio futuro e reserva patrimonial.',
            'Uma comemoração imediata em restaurante caro.',
            'A compra de bilhetes de loteria.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Excelente! O conceito "Pague-se Primeiro" ensina que o seu futuro e a estabilidade da sua família são prioridades estruturais inegociáveis, devendo ser separados antes dos gastos supérfluos.'
        }
      },
      {
        id: 't1_l3',
        trackId: 1,
        order: 3,
        title: 'Consumo Consciente e Armadilhas do Crédito',
        learningObjective: 'Aprender a diferenciar necessidade real de desejo passageiro e dominar o uso responsável do cartão de crédito.',
        summary: 'O cartão de crédito é um excelente meio de pagamento e organizador de fluxo, mas uma das piores fontes de crédito rotativo do planeta.',
        articleContent: `No Brasil, as taxas de juros do rotativo do cartão de crédito podem superar 400% ao ano. Isso significa que uma dívida de R$ 1.000 pode se transformar em mais de R$ 5.000 em pouco mais de 12 meses.\n\nConsumo consciente baseia-se na regra dos 3 dias: diante de um desejo não essencial de alto valor, espere 72 horas antes de comprar. Se a vontade persistir e couber no seu orçamento de estilo de vida sem comprometer seus aportes, compre sem culpa.`,
        practicalExample: 'Juliana costumava parcelar roupas em 10 vezes sem juros. Ao cabo de 6 meses, somava 12 parcelas concorrentes comprometendo 40% do seu salário líquido. Ela pausou compras parceladas por 4 meses até quitar as faturas e passou a comprar apenas à vista com desconto via Pix.',
        readTimeMinutes: 5,
        xpReward: 50,
        quiz: {
          id: 'q_t1_l3',
          question: 'Por que o crédito rotativo do cartão de crédito e o cheque especial são perigosos no Brasil?',
          options: [
            'Porque têm taxas de juros exorbitantes que causam efeito bola de neve destrutivo.',
            'Porque o banco devolve dinheiro se você atrasar a fatura.',
            'Porque são formas de investimento com alta rentabilidade para o correntista.',
            'Porque a legislação brasileira proíbe parcelar compras.'
          ],
          correctAnswerIndex: 0,
          explanation: 'Correto! Os juros compostos atuam de forma brutal contra quem fica no rotativo do cartão de crédito no Brasil, destruindo a renda do indivíduo em tempo recorde.'
        }
      },
      {
        id: 't1_l4',
        trackId: 1,
        order: 4,
        title: 'Como Sair das Dívidas com Método',
        learningObjective: 'Conhecer as duas estratégias consagradas de quitação: Método Bola de Neve e Método Avalanche.',
        summary: 'Eliminar dívidas onerosas é o investimento de maior retorno líquido garantido que qualquer pessoa pode fazer.',
        articleContent: `Antes de investir em ações ou fundos, a prioridade máxima é eliminar dívidas com taxas elevadas. Rendimento de 12% ao ano em um investimento perde completamente o sentido quando se paga 120% ao ano em um empréstimo pessoal ou rotativo.\n\nDuas abordagens comprovadas:\n1. Método Avalanche: Pagar o mínimo em todas e concentrar toda a renda extra na dívida com a maior taxa de juros (mais eficiente matematicamente).\n2. Método Bola de Neve: Quitar primeiro a dívida de menor saldo total para colher vitórias emocionais rápidas (mais eficiente psicologicamente).`,
        practicalExample: 'Roberto renegociou uma dívida de cartão com juros de 14% ao mês por um crédito consignado a 1,8% ao mês, reduzindo a parcela pela metade e estipulando prazo final de quitação em 18 meses.',
        readTimeMinutes: 6,
        xpReward: 50,
        quiz: {
          id: 'q_t1_l4',
          question: 'Em termos de retorno financeiro líquido garantido, por que quitar dívidas caras tem prioridade sobre novos investimentos?',
          options: [
            'Porque a bolsa de valores fecha as portas para quem tem empréstimo.',
            'Porque eliminar um juro passivo de 80% ao ano economiza muito mais do que os 10% a 13% que um investimento rende.',
            'Porque dívidas bancárias são canceladas sozinhas após 30 dias.',
            'Porque o governo federal paga as contas de quem investe em CDB.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Exatamente! Economizar o pagamento de juros de 80% a 300% ao ano gera um ganho patrimonial imediato muito superior a qualquer investimento conservador de mercado.'
        }
      },
      {
        id: 't1_l5',
        trackId: 1,
        order: 5,
        title: 'Como Construir sua Reserva de Emergência',
        learningObjective: 'Calcular a dimensão correta da sua reserva e escolher os instrumentos adequados para custodiá-la no Brasil.',
        summary: 'A reserva de emergência é o airbag financeiro que impede você de se endividar diante de imprevistos de saúde, manutenção ou trabalho.',
        articleContent: `A reserva não foi feita para deixar ninguém rico, mas para evitar que você fique pobre diante de tempestades inevitáveis da vida.\n\nTamanho recomendado:\n- Servidores públicos concursados: 3 a 4 meses de custo de vida.\n- Funcionários sob regime CLT: 6 meses de custo de vida.\n- Profissionais liberais, autônomos e empresários (PJ): 9 a 12 meses de custo de vida.\n\nOnde deixar alocada: estritamente em ativos com liquidez diária (D+0 ou D+1), risco de crédito soberano ou garantia do FGC, e sem volatilidade negativa: Tesouro Selic, CDB de liquidez diária 100% a 110% do CDI, ou contas remuneradas seguras.`,
        practicalExample: 'Patrícia calculou seu custo de vida essencial em R$ 4.000 por mês. Sendo autônoma, sua meta é acumular R$ 48.000 no Tesouro Selic. Quando precisou fazer uma cirurgia odontológica de R$ 3.500, sacou do Tesouro Selic em 24h sem contrair 1 centavo de dívida.',
        readTimeMinutes: 6,
        xpReward: 50,
        quiz: {
          id: 'q_t1_l5',
          question: 'Qual é a característica essencial do local onde a reserva de emergência deve ser investida?',
          options: [
            'Ações com grande potencial de valorização rápida.',
            'Liquidez imediata (diária), risco mínimo de crédito e baixa oscilação negativa de preço.',
            'Títulos de longo prazo que não podem ser resgatados antes de 10 anos.',
            'Criptomoedas de alta volatilidade.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Perfeito! Emergência não escolhe dia útil nem momento de alta da bolsa. O dinheiro precisa estar disponível em até 24 horas, com capital preservado e risco quase zero.'
        }
      }
    ]
  },
  {
    id: 2,
    title: 'Trilha 2 — Primeiros Investimentos',
    subtitle: 'Compreendendo o ecossistema financeiro brasileiro',
    description: 'Aprenda como inflação, taxas de juros, títulos públicos e privados funcionam na prática no Brasil.',
    iconName: 'TrendingUp',
    lessons: [
      {
        id: 't2_l1',
        trackId: 2,
        order: 1,
        title: 'Inflação e Poder de Compra: O Monstro Invisível',
        learningObjective: 'Entender o IPCA e por que dinheiro parado na conta corrente ou na gaveta perde valor continuamente.',
        summary: 'A inflação corrói silenciosamente o poder de compra. Seu patrimônio precisa render acima da inflação para gerar enriquecimento real.',
        articleContent: `O IPCA (Índice Nacional de Preços ao Consumidor Amplo) é a métrica oficial de inflação no Brasil. Quando o IPCA é de 5% ao ano, significa que uma cesta de compras que custava R$ 100 passou a custar R$ 105.\n\nSe seu dinheiro render 5% ao ano nominalmente, você não ganhou nada: apenas empatou com o aumento dos preços. O que realmente importa para a sua liberdade é o Retorno Real: o ganho percentual que sobra depois de expurgar a inflação e os impostos.`,
        practicalExample: 'R$ 50.000 guardados na gaveta em 2014 compravam um carro popular zero quilômetro. Em 2026, esses mesmos R$ 50.000 não compram metade do mesmo veículo, devido ao acúmulo da inflação de mais de 10 anos.',
        readTimeMinutes: 5,
        xpReward: 50,
        quiz: {
          id: 'q_t2_l1',
          question: 'O que representa o retorno real de um investimento?',
          options: [
            'A taxa bruta divulgada pelo banco antes de qualquer desconto.',
            'O ganho percentual efetivo acima da inflação do período.',
            'O valor que o investidor gasta em lazer no final de semana.',
            'O total de dividendos sem descontar tarifas bancárias.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Correto! O retorno real reflete o verdadeiro aumento do seu poder de compra, deduzida a inflação oficial (IPCA).'
        }
      },
      {
        id: 't2_l2',
        trackId: 2,
        order: 2,
        title: 'Juros Simples e Compostos: O Motor da Fortuna',
        learningObjective: 'Visualizar como os juros sobre juros aceleram o crescimento patrimonial ao longo das décadas.',
        summary: 'No juro simples, o rendimento é linear. No juro composto, os rendimentos geram novos rendimentos, criando uma curva exponencial.',
        articleContent: `Albert Einstein chamou os juros compostos de a oitava maravilha do mundo: quem entende, ganha; quem não entende, paga.\n\nA fórmula do montante é: M = C * (1 + i)^t. Note que o tempo (t) está no expoente! Isso significa que a variável mais poderosa não é necessariamente ter uma taxa absurda no curto prazo, mas manter aportes consistentes durante o maior período de tempo possível sem interrupções.`,
        practicalExample: 'Investindo R$ 500 por mês a uma taxa de 10% ao ano: nos primeiros 5 anos, o investidor aporta R$ 30.000 e acumula R$ 38.700. Em 30 anos, tendo aportado R$ 180.000, o patrimônio acumulado atinge impressionantes R$ 1.130.000 — sendo R$ 950.000 apenas de juros compostos!',
        readTimeMinutes: 6,
        xpReward: 50,
        quiz: {
          id: 'q_t2_l2',
          question: 'Qual é o principal efeito dos juros compostos no longo prazo?',
          options: [
            'Os juros incidem apenas sobre o valor inicialmente depositado.',
            'Os juros incidem tanto sobre o capital investido quanto sobre os rendimentos previamente acumulados.',
            'O investimento deixa completamente de ter qualquer tipo de risco.',
            'A inflação deixa de afetar a economia do país.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Perfeito! Os juros sobre juros formam uma bola de neve virtuosa onde o dinheiro ganho passa a gerar mais dinheiro para você.'
        }
      },
      {
        id: 't2_l3',
        trackId: 2,
        order: 3,
        title: 'A Santíssima Trindade: CDI, Selic e IPCA',
        learningObjective: 'Desmistificar as três siglas fundamentais do mercado financeiro nacional.',
        summary: 'A Selic é a taxa básica de juros do país; o CDI anda colado nela; e o IPCA é o medidor da inflação.',
        articleContent: `A taxa Selic Over é definida pelo Copom (Banco Central do Brasil) a cada 45 dias para controlar a inflação. O CDI (Certificado de Depósito Interbancário) é a taxa que os bancos cobram para emprestar dinheiro entre si no overnight, operando historicamente 0,10 ponto percentual abaixo da Selic Meta.\n\nQuando você vê um CDB que paga "100% do CDI", se o CDI estiver em 11,15% ao ano, aquele CDB renderá 11,15% ao ano brutos. Se a inflação (IPCA) for de 4,15%, seu ganho real bruto é de aproximadamente 7,0% ao ano.`,
        practicalExample: 'Com Selic a 11,25% e CDI a 11,15%, um investimento a 115% do CDI renderá 12,82% ao ano bruto. Descontando o IR de 15% após 2 anos, o ganho líquido fica em cerca de 10,90% a.a., bem acima da inflação estimada.',
        readTimeMinutes: 6,
        xpReward: 50,
        quiz: {
          id: 'q_t2_l3',
          question: 'Qual é a relação histórica entre a taxa Selic e o CDI no mercado brasileiro?',
          options: [
            'O CDI costuma acompanhar de perto a taxa Selic, ficando ligeiramente abaixo (cerca de 0,10 p.p.).',
            'O CDI é sempre o dobro da taxa de inflação calculada pelo IBGE.',
            'A Selic só se aplica a compras no exterior, enquanto o CDI é apenas para poupança.',
            'O CDI é fixado em 100% ao ano por determinação da Constituição.'
          ],
          correctAnswerIndex: 0,
          explanation: 'Correto! O CDI reflete as operações interbancárias diárias e caminha praticamente colado à taxa Selic.'
        }
      },
      {
        id: 't2_l4',
        trackId: 2,
        order: 4,
        title: 'Renda Fixa e Renda Variável: Os Dois Mundos',
        learningObjective: 'Entender a diferença conceitual entre ser credor (renda fixa) e ser sócio (renda variável).',
        summary: 'Na renda fixa, você empresta dinheiro a um emissor com regras pactuadas. Na renda variável, você se torna sócio de empreendimentos reais.',
        articleContent: `Na Renda Fixa (CDB, LCI, LCA, Tesouro Direto), você atua como um credor: você empresta seu capital para o Governo, bancos ou empresas, e recebe juros por isso. A previsibilidade de retorno é alta se levado ao vencimento.\n\nNa Renda Variável (Ações, Fundos Imobiliários, ETFs), você compra fatias de empresas ou imóveis. O retorno vem do crescimento das empresas e da distribuição de lucros (dividendos). O preço das cotas oscila diariamente no mercado, exigindo horizonte de tempo mais longo.`,
        practicalExample: 'Ao comprar R$ 1.000 em CDB do Banco XP, você tem garantia contratual de receber o valor com juros. Ao comprar R$ 1.000 em ações da Weg ou Itaú na B3, você se torna sócio e compartilha dos lucros, suportando a volatilidade das cotações em troca de potencial de multiplicação de longo prazo.',
        readTimeMinutes: 6,
        xpReward: 50,
        quiz: {
          id: 'q_t2_l4',
          question: 'Em termos de posição jurídica e econômica, qual é a postura do investidor em Renda Fixa vs Renda Variável?',
          options: [
            'Na renda fixa ele é sócio da empresa; na renda variável ele é funcionário.',
            'Na renda fixa ele atua como credor pactuando regras; na renda variável ele é sócio/proprietário com direitos a lucros.',
            'Em ambos os casos o governo se responsabiliza integralmente por qualquer prejuízo.',
            'Não existe nenhuma diferença entre as duas modalidades.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Exato! Credores recebem primeiro com juros acordados; sócios correm os riscos do negócio em troca de participação nos lucros e crescimento patrimonial ilimitado.'
        }
      },
      {
        id: 't2_l5',
        trackId: 2,
        order: 5,
        title: 'O Trilema Financeiro: Liquidez, Risco e Retorno',
        learningObjective: 'Reconhecer que não existe investimento perfeito que combine altíssima rentabilidade, risco zero e resgate instantâneo.',
        summary: 'Todo investimento equilibra três vértices: quanto maior o retorno prometido, maior o risco ou menor a liquidez exigida.',
        articleContent: `O trilema financeiro é uma lei universal dos mercados: você só pode escolher com consistência duas das três propriedades ao mesmo tempo:\n1. Alta Liquidez + Baixo Risco = Rentabilidade Moderada (ex: Tesouro Selic).\n2. Baixo Risco + Alta Rentabilidade = Baixa Liquidez (ex: CDB de 5 anos ou Debênture de infraestrutura).\n3. Alta Rentabilidade + Alta Liquidez = Alto Risco de Volatilidade (ex: Ações e Criptoativos).\n\nQualquer pessoa ou propaganda que ofereça alto retorno garantido com risco zero e liquidez diária está violando as leis da matemática financeira — desconfie imediatamente.`,
        practicalExample: 'Uma proposta promete "retorno de 4% ao mês garantido com saque diário". Como a taxa Selic anual está em torno de 11%, 4% ao mês equivale a mais de 60% ao ano! Trata-se de uma promessa matematicamente insustentável, típica de esquemas fraudulentos.',
        readTimeMinutes: 5,
        xpReward: 50,
        quiz: {
          id: 'q_t2_l5',
          question: 'De acordo com o trilema dos investimentos, o que ocorre quando alguém promete "alto retorno garantido com liquidez imediata e risco zero"?',
          options: [
            'É uma oportunidade legítima aprovada pelos órgãos de proteção ao consumidor.',
            'Trata-se de uma promessa matematicamente insustentável e com altíssimo risco de fraude.',
            'É o funcionamento padrão de qualquer poupança bancária.',
            'É um produto exclusivo oferecido a todos os correntistas comuns.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Correto! Nenhum ativo sério no mundo oferece o ápice dos três vértices simultaneamente. A busca por retorno exige prazos maiores ou tolerância a oscilações.'
        }
      },
      {
        id: 't2_l6',
        trackId: 2,
        order: 6,
        title: 'Perfil de Investidor e Diversificação Inteligente',
        learningObjective: 'Identificar a sua tolerância pessoal ao risco e os princípios de não colocar todos os ovos na mesma cesta.',
        summary: 'A diversificação é o único almoço grátis nos investimentos: reduz o risco global da carteira sem sacrificar o retorno esperado.',
        articleContent: `A CVM classifica os perfis em Conservador, Moderado e Arrojado com base no conhecimento, situação financeira e horizonte temporal.\n\nA diversificação eficiente não significa comprar 10 CDBs do mesmo banco ou 5 ações do mesmo setor (como 5 bancos). Significa distribuir o patrimônio entre classes descorrelacionadas: títulos pós-fixados para estabilidade, títulos indexados à inflação (IPCA+) para ganho real, imóveis (FIIs) para fluxo de renda mensal isento, e ações/ETFs globais para crescimento econômico.`,
        practicalExample: 'Em um ano de choque nos juros onde a bolsa caiu 10%, uma carteira bem diversificada (50% em renda fixa atrelada ao CDI e inflação, 25% em FIIs e 25% em ações) manteve rentabilidade positiva global de +7%, enquanto quem estava 100% em ações amargou forte desvalorização psicológica.',
        readTimeMinutes: 6,
        xpReward: 50,
        quiz: {
          id: 'q_t2_l6',
          question: 'Por que a diversificação é considerada essencial na arquitetura patrimonial?',
          options: [
            'Porque diminui o risco de perda catastrófica ao alocar em ativos de comportamentos diferentes.',
            'Porque obriga o investidor a pagar mais impostos à Receita Federal.',
            'Porque garante que todas as ações subam simultaneamente todos os dias.',
            'Porque impede que o investidor compre títulos do governo.'
          ],
          correctAnswerIndex: 0,
          explanation: 'Exato! Ao distribuir o capital em classes descorrelacionadas, as perdas eventuais em um setor são amortecidas pelos ganhos em outros, garantindo sobrevivência e consistência no longo prazo.'
        }
      }
    ]
  },
  {
    id: 3,
    title: 'Trilha 3 — Construção de Patrimônio',
    subtitle: 'A estratégia de acumulação disciplinada e regular',
    description: 'Transforme renda ativa em ativos geradores de fluxo através de aportes regulares e alocação estratégica.',
    iconName: 'Building2',
    lessons: [
      {
        id: 't3_l1',
        trackId: 3,
        order: 1,
        title: 'Estratégias de Aportes Regulares (DCA - Dollar Cost Averaging)',
        learningObjective: 'Compreender as vantagens de investir mensalmente sem tentar adivinhar o momento exato do mercado.',
        summary: 'Comprar ativos com disciplina todo mês dilui a volatilidade das cotações e elimina o estresse de tentar prever topos e fundos.',
        articleContent: `Tentar acertar o ponto mínimo exato para comprar e o topo máximo para vender (market timing) é comprovadamente um exercício fútil, mesmo para gestores profissionais com supercomputadores.\n\nA estratégia de Aportes Constantes (DCA) estipula um dia fixo no mês (por exemplo, todo dia 5, após o salário cair) para alocar o valor planejado. Nos meses em que as cotações estiverem em baixa, seu dinheiro comprará mais cotas; nos meses de alta, comprará menos cotas. No longo prazo, seu preço médio é extremamente vantajoso e você não perde os dias de maior valorização.`,
        practicalExample: 'Felipe tentou esperar a bolsa cair para comprar e perdeu a alta de 35% do ano. Camila comprou R$ 1.000 todo dia 10, faça chuva ou faça sol. No fim de 3 anos, a carteira de Camila rendeu 18% a mais e ela não perdeu uma única noite de sono.',
        readTimeMinutes: 6,
        xpReward: 50,
        quiz: {
          id: 'q_t3_l1',
          question: 'Qual é a principal vantagem da estratégia de aportes mensais constantes (DCA)?',
          options: [
            'Garante que você nunca pagará taxa de corretagem.',
            'Dilui os preços de compra ao longo dos ciclos e elimina a necessidade ineficaz de tentar prever os topos e fundos do mercado.',
            'Permite resgatar o dinheiro de ações no mesmo segundo.',
            'Isenta qualquer ganho de capital de declaração de IR.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Correto! A consistência de compras periódicas remove o fator emocional e constrói um preço médio saudável ao longo dos ciclos econômicos.'
        }
      },
      {
        id: 't3_l2',
        trackId: 3,
        order: 2,
        title: 'Planejamento de Médio e Longo Prazo',
        learningObjective: 'Estruturar gavetas temporais para cada objetivo, alinhando ativos aos prazos correspondentes.',
        summary: 'Cada meta exige um prazo, e cada prazo exige uma classe de ativo correspondente.',
        articleContent: `O erro mais comum do investidor iniciante é colocar dinheiro de curto prazo (como a viagem do próximo ano ou a entrada do apartamento em 18 meses) em ativos voláteis como ações ou fundos imobiliários.\n\nRegra das Três Gavetas da Montanari:\n1. Curto Prazo (até 2 anos): Liquidez e previsibilidade absoluta (Tesouro Selic, CDBs com vencimento casado).\n2. Médio Prazo (2 a 5 anos): Renda fixa indexada à inflação ou prefixada com vencimento exatamente na data do objetivo (Tesouro IPCA+).\n3. Longo Prazo (acima de 5 a 10 anos): Ativos reais com potencial de valorização e geração de fluxo (Ações consolidadas, FIIs, Fundos de Infraestrutura).`,
        practicalExample: 'Lucas guardou a entrada do casamento (marcado para daqui a 8 meses) em ações de tecnologia. O mercado recuou 20% no trimestre e ele precisou adiar o evento. Se tivesse mantido em CDB de liquidez diária, teria o valor integral corrigido pela taxa Selic.',
        readTimeMinutes: 6,
        xpReward: 50,
        quiz: {
          id: 'q_t3_l2',
          question: 'Onde deve ser alocado o dinheiro destinado a um objetivo familiar de curto prazo (por exemplo, 12 meses)?',
          options: [
            'Em ações de empresas em recuperação judicial.',
            'Em títulos de Renda Fixa de baixo risco com liquidez diária ou vencimento exatamente no prazo.',
            'Em imóveis na planta para revenda futura.',
            'Em opções e derivativos alavancados.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Exato! O curto prazo não tolera oscilação negativa de cota. O capital precisa estar preservado e acessível na data planejada.'
        }
      },
      {
        id: 't3_l3',
        trackId: 3,
        order: 3,
        title: 'O Poder do Reinvestimento de Proventos',
        learningObjective: 'Entender como o reinvestimento de dividendos e juros sobre capital próprio acelera a curva exponencial.',
        summary: 'Na fase de acumulação, proventos recebidos nunca devem ser gastos: eles devem ser imediatamente reinvestidos na compra de novos ativos geradores de renda.',
        articleContent: `Quando você adquire cotas de Fundos Imobiliários ou ações de empresas sólidas, recebe proventos mensais ou trimestrais na sua conta. No início, esses valores parecem pequenos: R$ 15, R$ 50, R$ 120.\n\nNo entanto, ao utilizar esse dinheiro para comprar novas cotas, no mês seguinte você receberá rendimentos sobre as cotas antigas E sobre as cotas novas adquiridas. Chega um ponto (o "Efeito Bola de Neve") em que os rendimentos mensais superam o valor do seu próprio aporte do salário!`,
        practicalExample: 'Guilherme possui 100 cotas de um FII que pagam R$ 1,00 por cota. Ele recebe R$ 100/mês. Sendo a cota R$ 100, ele compra 1 cota a mais a cada mês só com os dividendos. Em 10 anos reinvestindo, a quantidade de cotas cresce geometricamente sem demandar dinheiro extra do seu trabalho.',
        readTimeMinutes: 5,
        xpReward: 50,
        quiz: {
          id: 'q_t3_l3',
          question: 'O que deve ser feito com os dividendos e rendimentos de FIIs durante a fase de acumulação patrimonial?',
          options: [
            'Ser gastos imediatamente com pequenos luxos do dia a dia.',
            'Ser reinvestidos na compra de novas cotas para acelerar o efeito dos juros compostos.',
            'Ser transferidos para a conta de terceiros sem declaração.',
            'Ser mantidos parados na conta corrente sem nenhuma remuneração.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Correto! Na fase de construção, reinvestir todo provento multiplica a quantidade de cotas geradoras de fluxo, aproximando a independência financeira.'
        }
      },
      {
        id: 't3_l4',
        trackId: 3,
        order: 4,
        title: 'Alocação Estratégica de Ativos (Asset Allocation)',
        learningObjective: 'Construir uma distribuição percentual estruturada e aprender a rebalancear periodicamente.',
        summary: 'Mais de 90% do retorno e da volatilidade de uma carteira no longo prazo vêm da alocação entre classes, não da escolha isolada de um ativo.',
        articleContent: `Alocação de ativos é a arquitetura da sua carteira. Em vez de comprar papéis aleatórios, você define proporções alvo conforme seu perfil:\nExemplo de Carteira Montanari Equilibrada:\n- 35% Renda Fixa Pós-fixada (Reserva e Oportunidades)\n- 25% Títulos Públicos IPCA+ de Longo Prazo (Poder de compra real)\n- 20% Fundos Imobiliários (Renda mensal isenta)\n- 15% Ações e ETFs Brasileiros (Crescimento de produtividade)\n- 5% Ativos Internacionais (Proteção cambial em Dólar).\n\nRebalanceamento: Todo ano, ou quando uma classe desviar mais de 5 pontos percentuais da meta, você direciona os novos aportes para a classe que ficou para trás, comprando ativos baratos e vendendo ativos caros de forma disciplinada.`,
        practicalExample: 'Após forte alta da bolsa, as ações de Marcos passaram a representar 35% da sua carteira (quando o alvo era 20%). Em vez de pagar imposto vendendo, Marcos direcionou os novos aportes do salário dos 6 meses seguintes para Renda Fixa e FIIs até reequilibrar os percentuais sem atrito fiscal.',
        readTimeMinutes: 7,
        xpReward: 50,
        quiz: {
          id: 'q_t3_l4',
          question: 'Qual é a melhor forma de rebalancear uma carteira durante a fase de acumulação?',
          options: [
            'Vender todos os ativos todo mês e recomeçar do zero.',
            'Direcionar os novos aportes do salário prioritariamente para a classe que ficou abaixo do percentual alvo.',
            'Pedir empréstimo no banco para comprar a classe que mais subiu na semana.',
            'Ignorar os percentuais e comprar apenas o que os influenciadores indicam.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Excelente! Usar os novos aportes mensais para rebalancear economiza taxas, corretagens e Imposto de Renda sobre ganhos de capital, mantendo a disciplina alocativa intacta.'
        }
      },
      {
        id: 't3_l5',
        trackId: 3,
        order: 5,
        title: 'Planejamento de Grandes Objetivos (Imóvel e Educação)',
        learningObjective: 'Avaliar a compra de imóvel próprio vs aluguel com base em números e planejar a faculdade dos filhos.',
        summary: 'Grandes decisões patrimoniais devem ser fundamentadas em análise financeira, custo de oportunidade e objetivos familiares.',
        articleContent: `Financiar um imóvel em 30 anos no Brasil pela tabela SAC ou Price significa pagar frequentemente o valor de 2 a 3 imóveis em juros para o banco. Isso não significa que comprar um imóvel seja sempre ruim — para muitas famílias, traz estabilidade e segurança emocional.\n\nA abordagem da arquitetura patrimonial exige calcular o Custo de Oportunidade: comparar o valor da parcela do financiamento com o valor do aluguel somado ao rendimento do capital investido. Além disso, para a educação dos filhos em 15 ou 18 anos, títulos IPCA+ como o Tesouro Educa+ oferecem uma solução desenhada especificamente para pagar matrículas e custos universitários futuros corrigidos pela inflação.`,
        practicalExample: 'Beatriz e Gustavo tinham R$ 200 mil guardados. Em vez de dar de entrada em um imóvel de R$ 800 mil e assumir uma parcela de R$ 6.200 por 30 anos, alugaram um apartamento idêntico por R$ 2.400, investiram os R$ 200 mil no Tesouro IPCA+ e aportaram os R$ 3.800 de diferença todo mês. Em 8 anos, atingiram patrimônio suficiente para comprar o imóvel integralmente à vista com desconto.',
        readTimeMinutes: 7,
        xpReward: 50,
        quiz: {
          id: 'q_t3_l5',
          question: 'O que significa o conceito de custo de oportunidade ao decidir entre comprar um imóvel financiado ou alugar e investir a diferença?',
          options: [
            'É a comissão obrigatória paga à imobiliária pelo contrato de locação.',
            'É o rendimento que você deixa de ganhar ao imobilizar seu capital em um bem em vez de mantê-lo investido gerando juros compostos.',
            'É o desconto concedido pelo IPTU em caso de reforma.',
            'É a taxa cobrada pelo cartório de registro de imóveis.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Correto! O custo de oportunidade mede o que você abre mão ao escolher uma alternativa em detrimento de outra com o seu capital.'
        }
      },
      {
        id: 't3_l6',
        trackId: 3,
        order: 6,
        title: 'Como Acompanhar sua Evolução Patrimonial',
        learningObjective: 'Montar seu balanço patrimonial pessoal periódico (Ativos menos Passivos) e celebrar conquistas reais.',
        summary: 'O patrimônio líquido (o que você tem menos o que você deve) é o único termômetro verdadeiro da sua riqueza real.',
        articleContent: `Muitas pessoas confundem faturamento ou renda mensal com riqueza. Alguém que ganha R$ 40.000 por mês mas gasta R$ 42.000 e tem R$ 500.000 em dívidas tem patrimônio líquido negativo. Já alguém que ganha R$ 6.000, não tem dívidas e acumulou R$ 200.000 em ativos produtivos possui uma saúde financeira muito superior.\n\nPrática recomendada: Uma vez por mês (ou a cada trimestre), atualize seu Balanço Patrimonial na Montanari: liste todos os ativos (dinheiro, investimentos, imóveis quitados) e subtraia os passivos (financiamentos, saldos devedores de cartões e empréstimos). O gráfico da evolução do Patrimônio Líquido deve apresentar tendência ascendente ano após ano.`,
        practicalExample: 'No primeiro ano de uso do aplicativo, o patrimônio líquido de Fernando era de R$ -15.000 (devido a parcelas de carro e cartão). Ao final de 24 meses, após quitar o carro e manter aportes de R$ 1.200 mensais, seu patrimônio líquido virou para +R$ 38.000. Essa virada é a vitória da arquitetura financeira.',
        readTimeMinutes: 6,
        xpReward: 50,
        quiz: {
          id: 'q_t3_l6',
          question: 'O que é o Patrimônio Líquido de uma pessoa ou família?',
          options: [
            'A soma de todos os salários recebidos na vida inteira.',
            'O total de ativos e investimentos subtraído de todas as dívidas e obrigações pendentes (Ativos - Passivos).',
            'O limite total de crédito disponível em todos os cartões.',
            'O valor de mercado estimado da casa onde mora, ignorando o financiamento com o banco.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Exato! Patrimônio Líquido = Ativos - Passivos. É o que verdadeiramente sobra e pertence a você se você liquidasse tudo hoje e pagasse todas as dívidas.'
        }
      }
    ]
  },
  {
    id: 4,
    title: 'Trilha 4 — Proteção Patrimonial',
    subtitle: 'Blindagem, gestão de riscos e perpetuação',
    description: 'Aprenda a defender o que foi construído contra imprevistos, tributação ineficiente e litígios.',
    iconName: 'Lock',
    lessons: [
      {
        id: 't4_l1',
        trackId: 4,
        order: 1,
        title: 'Gestão de Riscos na Vida Financeira',
        learningObjective: 'Mapear as maiores ameaças à estabilidade de uma família e como mitigá-las com planejamento.',
        summary: 'Construir patrimônio sem protegê-lo é como construir um castelo sobre a areia sem diques de contenção.',
        articleContent: `Os principais riscos que podem dizimar décadas de acumulação financeira são:\n1. Morte prematura ou invalidez temporária/permanente do principal provedor de renda.\n2. Doenças graves que demandam tratamentos não cobertos pelo plano de saúde.\n3. Processos judiciais cíveis ou trabalhistas sobre atividade profissional (médicos, engenheiros, advogados, empresários).\n4. Rupturas conjugais sem planejamento prévio de regime de bens.\n\nA arquitetura de proteção desenha camadas preventivas: reserva de emergência, seguros adequados, diversificação geográfica e separação patrimonial entre pessoa física e jurídica.`,
        practicalExample: 'Um empresário do setor de transportes concentrava todo seu patrimônio em seu próprio CPF. Quando um caminhão sofreu um acidente grave que gerou uma ação de R$ 1,5 milhão, suas contas bancárias pessoais foram bloqueadas judicialmente. Se possuísse uma holding patrimonial e seguro de responsabilidade civil, o patrimônio familiar estaria resguardado.',
        readTimeMinutes: 6,
        xpReward: 50,
        quiz: {
          id: 'q_t4_l1',
          question: 'Qual é o objetivo primordial da gestão de riscos no planejamento patrimonial?',
          options: [
            'Apostar em cassinos e loterias para cobrir perdas da empresa.',
            'Proteger a família e o patrimônio acumulado contra eventos catastróficos que poderiam causar ruína financeira.',
            'Deixar de pagar impostos legais através de sonegação.',
            'Evitar a contratação de qualquer tipo de seguro.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Correto! A gestão de riscos busca identificar vulnerabilidades e transferir riscos catastróficos para seguradoras e estruturas jurídicas sólidas.'
        }
      },
      {
        id: 't4_l2',
        trackId: 4,
        order: 2,
        title: 'Seguros e Proteção da Renda Familiar',
        learningObjective: 'Diferenciar seguro de vida como proteção familiar de seguros desnecessários ou abusivos.',
        summary: 'Seguro de vida não é para quem vai embora, mas para dar fôlego financeiro a quem fica até a família se reestruturar.',
        articleContent: `No início da carreira, quando o patrimônio acumulado ainda é modesto e os dependentes (cônjuge e filhos pequenos) dependem 100% da sua renda mensal ativa, o seguro de vida temporário com cobertura de invalidez e doenças graves é fundamental.\n\nÀ medida que seu patrimônio líquido cresce e atinge milhões de reais em ativos geradores de renda passiva, a necessidade de seguro de renda diminui, passando o seguro a servir como liquidez imediata para o pagamento do ITCMD e custos de inventário sem necessidade de alienar bens às pressas.`,
        practicalExample: 'André tem 35 anos, dois filhos de 3 e 6 anos, e uma renda mensal de R$ 12.000. Seu patrimônio ainda é de R$ 80.000. Ele contratou uma apólice de seguro de vida com cobertura de R$ 1 milhão por R$ 120/mês. Se algo lhe acontecer, a família terá garantia de sustento e estudos pelos próximos 10 anos.',
        readTimeMinutes: 6,
        xpReward: 50,
        quiz: {
          id: 'q_t4_l2',
          question: 'Em que fase da vida o seguro de vida para reposição de renda é mais crítico?',
          options: [
            'Quando a pessoa já é bilionária e não possui dependentes econômicos.',
            'Na juventude/maturidade quando o patrimônio ainda está em formação e existem dependentes que contam com sua renda de trabalho.',
            'Apenas após os 95 anos de idade.',
            'Nunca, pois seguros não têm validade legal no Brasil.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Perfeito! É durante a fase em que os dependentes são vulneráveis e o patrimônio acumulado ainda não gera renda suficiente para mantê-los sozinhos que o seguro cumpre seu papel vital.'
        }
      },
      {
        id: 't4_l3',
        trackId: 4,
        order: 3,
        title: 'Organização Documental e Blindagem Cadastral',
        learningObjective: 'Manter a custódia organizada de certidões, escrituras, apólices e senhas para evitar dores de cabeça familiares.',
        summary: 'A desorganização de documentos custa tempo, dinheiro em honorários advocatícios e desgastes em momentos de luto ou emergência.',
        articleContent: `Ter clareza sobre onde estão os documentos essenciais é uma responsabilidade de qualquer chefe de família. Crie uma pasta física e um cofre digital criptografado contendo:\n- Escrituras e matrículas atualizadas de imóveis.\n- Contratos sociais de empresas e acordos de sócios.\n- Apólices de seguro com número de telefone e dados do corretor.\n- Lista de instituições financeiras onde existem contas e investimentos (sem expor senhas em texto puro, mas com instruções de como o inventariante pode acessá-las formalmente).\n- Certidões de casamento com pacto antenupcial averbado.`,
        practicalExample: 'Após o falecimento súbito de um parente, a família levou 3 anos para descobrir onde estavam aplicados mais de R$ 300.000 em corretoras desconhecidas. Com uma simples folha de inventário financeiro deixada em envelope lacrado, o processo teria sido resolvido em poucos meses.',
        readTimeMinutes: 5,
        xpReward: 50,
        quiz: {
          id: 'q_t4_l3',
          question: 'Por que manter um dossiê financeiro organizado com a lista de ativos e documentos é importante?',
          options: [
            'Para facilitar que terceiros sem autorização movimentem seu dinheiro.',
            'Para que a família saiba exatamente onde estão os bens e direitos em momentos de emergência ou sucessão, evitando perdas financeiras.',
            'Para aumentar o limite do cheque especial sem análise de crédito.',
            'Porque a Receita Federal exige impressão diária de todos os papéis.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Correto! A organização documental poupa desgastes emocionais, perdas de prazos legais e custos astronômicos de localização de bens em inventários.'
        }
      },
      {
        id: 't4_l4',
        trackId: 4,
        order: 4,
        title: 'Noções de Planejamento Sucessório',
        learningObjective: 'Compreender o impacto do ITCMD, custos de inventário e ferramentas como testamento, doação com usufruto e holdings.',
        summary: 'Inventários tradicionais podem corroer de 10% a 20% do valor total do patrimônio em tributos, custas cartorárias e honorários.',
        articleContent: `No Brasil, quando uma pessoa falece, os bens não passam automaticamente aos herdeiros. É obrigatório abrir um processo de inventário (judicial ou extrajudicial em cartório).\n\nCustos envolvidos:\n- ITCMD (Imposto sobre Transmissão Causa Mortis e Doação): de 2% a 8% do valor de mercado dos bens (com tendência de aumento na reforma tributária).\n- Honorários advocatícios: de 3% a 10% sobre o monte-mor.\n- Custas de cartório e certidões.\n\nFerramentas de planejamento sucessório:\n1. Previdência Privada (VGBL): Não entra no inventário e é liberada aos beneficiários indicados em até 30 dias úteis com liquidez imediata.\n2. Doação em vida com reserva de usufruto: Transfere a nua propriedade aos filhos enquanto os pais mantêm o uso e a totalidade dos aluguéis até o fim da vida.\n3. Holding Familiar Patrimonial: Estruturação dos imóveis e participações em uma pessoa jurídica própria, transmitindo as quotas sociais aos herdeiros de forma escalonada e pacífica.`,
        practicalExample: 'Uma família com R$ 3 milhões em imóveis teve as contas bancárias bloqueadas no inventário tradicional e precisou vender um apartamento às pressas com 35% de deságio para pagar o ITCMD e honorários de R$ 350 mil. Outra família com a mesma quantia estruturou um VGBL de liquidez e doação com usufruto, pagando o imposto previamente parcelado sem nenhum trauma patrimonial.',
        readTimeMinutes: 7,
        xpReward: 50,
        quiz: {
          id: 'q_t4_l4',
          question: 'Qual é uma das principais vantagens práticas de planos de previdência VGBL no contexto de planejamento sucessório?',
          options: [
            'Eles garantem rendimento de 50% ao mês sem tributação.',
            'Não passam pelo trâmite moroso de inventário e são repassados aos beneficiários indicados em curto prazo (geralmente até 30 dias).',
            'Impedem que a família pague IPTU para sempre.',
            'Substituem a necessidade de emissão de certidão de óbito.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Perfeito! Por terem natureza de seguro estipulado, os planos VGBL não compõem a herança formal para fins de inventário, garantindo liquidez imediata aos beneficiários para arcar com as despesas imediatas.'
        }
      },
      {
        id: 't4_l5',
        trackId: 4,
        order: 5,
        title: 'Tributação dos Investimentos no Brasil',
        learningObjective: 'Dominar a tabela regressiva da Renda Fixa, o come-cotas e as regras de isenção em FIIs e Renda Variável.',
        summary: 'Pagar apenas os impostos legalmente devidos (elisão fiscal legítima) é uma das formas mais eficientes de aumentar a rentabilidade líquida.',
        articleContent: `A Renda Fixa tributada segue a Tabela Regressiva de IR:\n- Até 180 dias: 22,5%\n- De 181 a 360 dias: 20,0%\n- De 361 a 720 dias: 17,5%\n- Acima de 720 dias: 15,0% (menor alíquota possível).\n\nProdutos Isentos de IR para pessoa física:\n- LCI, LCA, CRI, CRA e Debêntures Incentivadas de Infraestrutura.\n- Rendimentos mensais distribuídos por Fundos Imobiliários (FIIs) e Fiagros.\n\nFundos de Investimento tradicionais: Sofrem com o "Come-Cotas" nos meses de maio e novembro, uma antecipação semestral de IR que reduz o número de cotas e diminui o efeito dos juros compostos no longo prazo.`,
        practicalExample: 'Investidor A resgata seu CDB a cada 5 meses, sempre pagando 22,5% de IR sobre o rendimento. Investidor B mantém seu título por mais de 2 anos, pagando apenas 15%. No longo prazo de 15 anos, a economia de imposto do Investidor B resultou em mais de R$ 64.000 a mais no saldo final.',
        readTimeMinutes: 6,
        xpReward: 50,
        quiz: {
          id: 'q_t4_l5',
          question: 'Qual é a alíquota mínima de Imposto de Renda incidente sobre aplicações em Renda Fixa tributada (CDBs, Tesouro Direto) no Brasil?',
          options: [
            '27,5% para qualquer prazo.',
            '15,0%, alcançada quando a aplicação é mantida por mais de 720 dias (2 anos).',
            'Zero porcento após 60 dias.',
            '5,0% para quem recebe até 3 salários mínimos.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Correto! Após 720 dias de aplicação, o imposto cai para 15% sobre os rendimentos brutos auferidos.'
        }
      },
      {
        id: 't4_l6',
        trackId: 4,
        order: 6,
        title: 'Segurança Cibernética e Proteção contra Fraudes',
        learningObjective: 'Proteger senhas, contas em corretoras e dispositivos móveis contra golpes digitais contemporâneos.',
        summary: 'Seu smartphone tornou-se a agência bancária de toda a sua vida: medidas de higiene digital são indispensáveis para proteger o patrimônio.',
        articleContent: `Nos dias de hoje, a maioria dos ataques e roubos patrimoniais não ocorrem por arrombamento de cofres, mas por engenharia social e roubo de smartphones desbloqueados.\n\nRegras de ouro de segurança cibernética patrimonial:\n1. O "Celular do Banco": Mantenha os aplicativos de investimentos de alto valor em um aparelho secundário que fica em casa guardado em segurança, e utilize no aparelho da rua apenas uma conta de transações diárias com limite baixo via Pix.\n2. Autenticação de Dois Fatores (2FA) por aplicativo autenticador (Google Authenticator), nunca por SMS (vulnerável ao golpe de SIM swap).\n3. Nunca compartilhe tokens, códigos recebidos ou confirme transferências por ligações telefônicas — bancos sérios jamais solicitam senhas ou cancelamento de transferências suspeitas por ligação ativa.`,
        practicalExample: 'Após adotar a estratégia de deixar as contas da corretora e da previdência em um tablet guardado em casa, Renato teve o celular roubado em uma viagem. Os criminosos só tiveram acesso a uma conta com saldo de R$ 350 para combustível, mantendo intacto seu patrimônio de R$ 420.000.',
        readTimeMinutes: 5,
        xpReward: 50,
        quiz: {
          id: 'q_t4_l3_sec',
          question: 'Qual é uma prática recomendada para blindar grandes patrimônios investidos contra roubo ou furto de smartphones?',
          options: [
            'Anotar as senhas no bloco de notas sem proteção com a palavra "SENHA".',
            'Manter os aplicativos das principais corretoras em um dispositivo seguro que fica em casa ("celular do banco") e carregar na rua apenas uma conta com limite reduzido.',
            'Enviar todas as senhas para grupos de família por aplicativo de mensagens.',
            'Desativar qualquer biometria ou bloqueio de tela do celular.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Exato! A separação física entre o aparelho de uso diário (com exposição a furto) e o aparelho que custódia as grandes reservas de patrimônio é uma das melhores defesas práticas.'
        }
      }
    ]
  },
  {
    id: 5,
    title: 'Trilha 5 — Independência Financeira',
    subtitle: 'A arquitetura do futuro e liberdade de escolha',
    description: 'Planeje sua renda passiva perpétua, horizonte de aposentadoria e taxas seguras de retirada.',
    iconName: 'Award',
    lessons: [
      {
        id: 't5_l1',
        trackId: 5,
        order: 1,
        title: 'O Conceito Real de Independência Financeira',
        learningObjective: 'Compreender independência financeira não como parar de trabalhar, mas como ter soberania sobre o seu próprio tempo.',
        summary: 'Liberdade financeira é o ponto em que o rendimento do seu patrimônio cobre 100% do seu custo de vida sem depender de um salário.',
        articleContent: `A verdadeira riqueza não é medida em bens ostentados, mas no número de dias que você consegue viver com dignidade se parar de trabalhar hoje.\n\nAo atingir a independência financeira, o trabalho deixa de ser uma imposição desesperada para pagar contas no fim do mês e passa a ser uma escolha vocacional. Você passa a ter liberdade para dizer "não" a projetos abusivos, dedicar mais tempo ao crescimento dos filhos e construir legados duradouros.`,
        practicalExample: 'Eduardo atingiu aos 48 anos uma renda passiva mensal de R$ 12.000. Ele não se aposentou para ficar ocioso na praia; em vez disso, abriu mão de uma rotina corporativa estressante de 60 horas semanais e passou a lecionar em uma universidade e atuar como mentor voluntário 20 horas por semana.',
        readTimeMinutes: 5,
        xpReward: 50,
        quiz: {
          id: 'q_t5_l1',
          question: 'O que define o atingimento da independência financeira segundo a metodologia Montanari?',
          options: [
            'Comprar um veículo de luxo importado financiado em 60 parcelas.',
            'O momento em que os rendimentos passivos gerados pelo seu patrimônio cobrem com folga o seu padrão de vida desejado.',
            'Ganhar na loteria federal.',
            'Ter um limite ilimitado concedido pelo banco no cartão de crédito.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Correto! A independência financeira é conquistada quando os seus ativos trabalham por você, suprindo todo o seu custo de vida.'
        }
      },
      {
        id: 't5_l2',
        trackId: 5,
        order: 2,
        title: 'Estimativa de Despesas Futuras e Padrão de Vida',
        learningObjective: 'Projetar como suas despesas mudam na maturidade (menor gasto com dependentes, maior gasto com saúde).',
        summary: 'O custo de vida aos 65 anos não é idêntico ao custo de vida aos 30 anos: o planejamento precisa antecipar essas mutações.',
        articleContent: `Ao calcular quanto você precisará na maturidade, note que várias despesas diminuem ou desaparecem:\n- Financiamento da casa própria quitado.\n- Despesas com mensalidade escolar e faculdade dos filhos concluídas.\n- Despesas profissionais de deslocamento e vestuário reduzidas.\n\nPor outro lado, algumas despesas aumentam significativamente:\n- Planos de saúde (cujas mensalidades sobem por faixa etária a partir dos 59 anos).\n- Medicamentos de uso contínuo e cuidados preventivos.\n- Lazer, viagens e conforto doméstico.\n\nA recomendação da Montanari é estimar um custo de vida entre 70% e 90% do seu padrão de vida atual, com uma linha de contingência reforçada para saúde suplementar.`,
        practicalExample: 'Márcio calculava que precisaria de R$ 20.000/mês na aposentadoria. Ao detalhar as contas, percebeu que R$ 6.000 eram financiamentos que estariam quitados e R$ 4.000 eram faculdade dos filhos que já estariam formados. Ele ajustou a meta para R$ 13.000/mês (incluindo folga para plano de saúde premium), encurtando sua jornada em 7 anos.',
        readTimeMinutes: 6,
        xpReward: 50,
        quiz: {
          id: 'q_t5_l2',
          question: 'Qual categoria de despesas costuma apresentar maior crescimento percentual na terceira idade no Brasil?',
          options: [
            'Mensalidades de cursos pré-vestibulares para si mesmo.',
            'Despesas com plano de saúde, medicamentos e cuidados médicos.',
            'Financiamento de veículos esportivos novos a cada dois anos.',
            'Assinaturas de jogos de videogame online.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Exato! Os custos de saúde suplementar representam a principal linha de pressão orçamentária na maturidade e devem ser expressamente previstos nas projeções.'
        }
      },
      {
        id: 't5_l3',
        trackId: 5,
        order: 3,
        title: 'Taxas Seguras de Retirada (SWR e Regra dos 4%)',
        learningObjective: 'Compreender quanto você pode sacar por ano do patrimônio sem correr o risco de esgotá-lo antes do fim da vida.',
        summary: 'A Taxa Segura de Retirada (Safe Withdrawal Rate) determina a porcentagem anual que pode ser consumida do patrimônio preservando o capital.',
        articleContent: `O renomado "Trinity Study" nos EUA demonstrou que, para uma carteira diversificada entre ações e títulos públicos, uma taxa de retirada de 4% ao ano corrigida pela inflação garante sobrevivência do capital por mais de 30 anos em 95% dos cenários históricos.\n\nAdaptação para a realidade brasileira:\nNo Brasil, onde os juros reais históricos de títulos públicos (NTN-B / Tesouro IPCA+) gravitam frequentemente entre 5% e 6,5% ao ano acima da inflação, uma taxa de retirada entre 4,0% e 4,5% ao ano real é bastante segura e sustentável.\n\nCálculo prático:\nPatrimônio Necessário = Renda Anual Desejada / Taxa de Retirada\nExemplo: Para uma renda de R$ 10.000/mês (R$ 120.000/ano):\n- Com taxa de 4,0% a.a.: R$ 120.000 / 0,04 = R$ 3.000.000 de patrimônio acumulado.\n- Com taxa de 4,5% a.a.: R$ 120.000 / 0,045 = R$ 2.666.666 de patrimônio acumulado.`,
        practicalExample: 'Ao atingir R$ 2,5 milhões alocados com rendimento médio real de 5% a.a., Clara saca R$ 8.500 mensais (cerca de 4% ao ano) para viver. O restante do rendimento (1% real + inflação) é reinvestido para garantir que o patrimônio cresça no mesmo ritmo do aumento de custo de vida.',
        readTimeMinutes: 7,
        xpReward: 50,
        quiz: {
          id: 'q_t5_l3',
          question: 'Para uma família que almeja uma renda passiva de R$ 120.000 por ano (R$ 10.000 por mês) utilizando uma taxa segura de retirada de 4% ao ano, qual é o patrimônio acumulado necessário?',
          options: [
            'R$ 500.000',
            'R$ 1.200.000',
            'R$ 3.000.000 (R$ 120.000 / 0,04)',
            'R$ 50.000.000'
          ],
          correctAnswerIndex: 2,
          explanation: 'Correto! Pela regra da taxa segura de retirada, R$ 120.000 divididos por 0,04 resulta no capital de R$ 3.000.000 necessário para financiar a renda com alta margem de segurança.'
        }
      },
      {
        id: 't5_l4',
        trackId: 5,
        order: 4,
        title: 'Previdência Pública (INSS) vs Previdência Privada',
        learningObjective: 'Entender o papel do teto do INSS e a estruturação de previdência complementar (PGBL e VGBL).',
        summary: 'O INSS funciona como um seguro social de piso, enquanto a previdência privada ou carteira própria constrói o teto da sua dignidade.',
        articleContent: `O INSS possui um teto máximo de benefício (em torno de R$ 7.780 em valores atuais) e sofre com o envelhecimento demográfico da população brasileira. Para quem tem padrão de vida superior a 2 ou 3 salários mínimos, depender exclusivamente da aposentadoria pública resultará em drástica queda de padrão de vida.\n\nPrevidência Privada aberta:\n- PGBL: Indicado para quem faz a declaração completa do IR e contribui para o INSS. Permite abater até 12% da renda bruta tributável anual, postergando o imposto para o momento do resgate (onde o IR incide sobre o total acumulado).\n- VGBL: Indicado para quem faz a declaração simplificada ou já estourou o limite de 12% do PGBL. No resgate, o IR incide apenas sobre os rendimentos auferidos, funcionando como excelente veículo de sucessão patrimonial.`,
        practicalExample: 'Sérgio tem renda bruta tributável de R$ 150.000 ao ano. Ao aportar R$ 18.000 (12%) em um PGBL com tabela regressiva, ele reduz sua base tributável para R$ 132.000, recebendo uma restituição expressiva de imposto de renda da Receita Federal que ele imediatamente reinveste.',
        readTimeMinutes: 7,
        xpReward: 50,
        quiz: {
          id: 'q_t5_l4',
          question: 'A quem é recomendado prioritariamente o plano de previdência privada do tipo PGBL?',
          options: [
            'A quem faz a declaração Simplificada do Imposto de Renda e não tem emprego formal.',
            'A quem utiliza o modelo Completo de declaração do IR e deseja postergar o pagamento de imposto abatendo até 12% da renda bruta anual.',
            'Apenas a menores de 14 anos.',
            'A quem investe exclusivamente em criptomoedas.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Exato! O benefício fiscal de dedução de até 12% da renda bruta tributável anual no PGBL é privativo de quem entrega a declaração no modelo completo.'
        }
      },
      {
        id: 't5_l5',
        trackId: 5,
        order: 5,
        title: 'Cenários e Riscos de Planejamento de Longo Prazo',
        learningObjective: 'Preparar a carteira para sobreviver a choques inflacionários, reformas fiscais e riscos de longevidade.',
        summary: 'O risco de longevidade é o perigo de viver mais do que o seu dinheiro dura. Um plano patrimonial robusto contempla margens de segurança.',
        articleContent: `Ao desenhar planos para 20, 30 ou 40 anos, premissas ingênuas (como assumir que a taxa de juros nunca vai mudar ou que a moeda não sofrerá desvalorização) geram frustrações perigosas.\n\nTrês pilares de robustez anti-frágil:\n1. Margem de segurança de 20%: planeje ter 20% a mais de patrimônio do que o cálculo estrito aponta.\n2. Indexação à inflação real: garanta que pelo menos um terço do seu patrimônio esteja amarrado contratualmente a títulos públicos que pagam IPCA + cupom de juros real.\n3. Ativos reais geradores de caixa: participações em boas empresas e imóveis comerciais/logísticos têm capacidade natural de repassar a inflação nos preços dos produtos e nos contratos de locação.`,
        practicalExample: 'Durante a crise inflacionária dos anos 1980 e 1990 no Brasil, quem tinha dinheiro apenas em títulos prefixados ou depósitos sem correção perdeu praticamente tudo. Quem detinha ativos reais (imóveis, empresas sólidas e terra) e títulos indexados preservou sua riqueza integralmente.',
        readTimeMinutes: 6,
        xpReward: 50,
        quiz: {
          id: 'q_t5_l5',
          question: 'O que é o chamado "risco de longevidade" no planejamento financeiro para a maturidade?',
          options: [
            'O risco de o investidor falecer jovem antes de começar a trabalhar.',
            'O risco de o investidor viver mais tempo do que a durabilidade dos seus recursos e poupança acumulada.',
            'O perigo de as instituições bancárias fecharem aos finais de semana.',
            'A possibilidade de a moeda oficial mudar de nome.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Correto! Com o aumento da expectativa de vida média, o risco de longevidade exige que a carteira continue gerando rendimentos reais sem esgotar o capital principal.'
        }
      },
      {
        id: 't5_l6',
        trackId: 5,
        order: 6,
        title: 'O Legado Patrimonial: Princípios da Montanari',
        learningObjective: 'Compreender o patrimônio como uma ponte intergeracional para transmitir valores, conhecimento e solidez.',
        summary: 'Mais importante do que deixar dinheiro para as próximas gerações é preparar as próximas gerações para gerir o patrimônio com sabedoria.',
        articleContent: `O ditado popular "Pai rico, filho nobre, neto pobre" retrata a triste realidade de 90% das famílias que acumulam patrimônio mas falham em educar os sucessores.\n\nNa Montanari Arquitetura Patrimonial, defendemos que a transmissão de valores éticos, inteligência orçamentária e a cultura do esforço são partes inseparáveis do patrimônio financeiro. Envolva os filhos desde cedo no entendimento do orçamento doméstico, estimule o consumo consciente e ensine que o patrimônio da família não é para ostentação vazia, mas para servir de catalisador de oportunidades e proteção social.`,
        practicalExample: 'A família Albuquerque instituiu uma reunião semestral de conselho familiar, onde os filhos a partir dos 16 anos participam da prestação de contas, opinam sobre as doações beneficentes da família e aprendem sobre os investimentos que financiam os estudos de todos.',
        readTimeMinutes: 5,
        xpReward: 50,
        quiz: {
          id: 'q_t5_l6',
          question: 'De acordo com a filosofia da Montanari Arquitetura Patrimonial, qual é o principal fator para a perpetuação do patrimônio entre gerações?',
          options: [
            'Manter todas as decisões em segredo absoluto até o dia do inventário.',
            'Transmitir valores éticos, educação financeira e capacidade de gestão para os herdeiros, além dos recursos financeiros.',
            'Gastar todo o patrimônio antes dos 70 anos para não deixar nada a ninguém.',
            'Comprar apenas títulos emitidos por empresas estrangeiras.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Perfeito! Dinheiro sem educação e preparo evapora em poucas gerações. A verdadeira arquitetura patrimonial educa e constrói cabeças conscientes para preservar o legado.'
        }
      }
    ]
  }
];
