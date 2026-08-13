/* ================================================================
   NEFIP — DADOS EDITÁVEIS DO SITE
   Para adicionar um registro, copie um objeto existente dentro da
   lista correspondente. Mantenha vírgulas entre os objetos.
   ================================================================ */

/* NOTÍCIAS LEGADAS: a fonte ativa passou a ser news/index.js.
   Estes exemplos podem ser removidos após a migração completa. */
const legacyNews = [
  { id: 1, slug: 'indice-gestao-fiscal', title: 'NEFIP lança índice para leitura da gestão fiscal municipal', category: 'Pesquisa', date: '2026-07-22', summary: 'Nova ferramenta reúne indicadores em uma linguagem clara para gestores e cidadãos.', content: 'O Índice de Gestão Fiscal Municipal foi criado para apoiar a leitura de receitas, despesas e capacidade de investimento. A plataforma reúne dados abertos, metodologia documentada e comparações territoriais.', tags: ['dados abertos', 'municípios'], featured: true },
  { id: 2, slug: 'seminario-evidencias', title: 'Seminário debate evidências para o ciclo orçamentário', category: 'Eventos', date: '2026-06-11', summary: 'Encontro reuniu pesquisadores e gestores para discutir avaliação de políticas.', content: 'Durante o seminário, participantes compartilharam experiências de uso de evidências no planejamento e na execução orçamentária.', tags: ['orçamento', 'eventos'] },
  { id: 3, slug: 'parceria-observatorio', title: 'Parceria amplia observatório de transparência pública', category: 'Parcerias', date: '2026-05-03', summary: 'Acordo de cooperação vai qualificar ferramentas de monitoramento cidadão.', content: 'A iniciativa integra conhecimentos acadêmicos e demandas de organizações que atuam no controle social.', tags: ['transparência'] },
  { id: 4, slug: 'nota-tecnica-transferencias', title: 'Nota técnica analisa transferências intergovernamentais', category: 'Publicações', date: '2026-03-18', summary: 'Estudo detalha efeitos distributivos de regras de repartição de recursos.', content: 'O material apresenta um recorte regional e recomendações para aprimorar a previsibilidade fiscal.', tags: ['federalismo'] }
];

/* PROJETOS: status e theme alimentam automaticamente os filtros. */
const projects = [
  { id: 1, title: 'Observatório das Finanças Municipais', period: '2025–2026', year: '2026', status: 'Em andamento', theme: 'Gestão fiscal', summary: 'Plataforma de dados e análises para apoiar decisões locais.', partners: 'Universidades e municípios parceiros', results: 'Painel público, base harmonizada e boletins trimestrais.', objectives: 'Ampliar a capacidade de leitura fiscal nos municípios.', methodology: 'Integração de dados abertos e validação com equipes técnicas.' },
  { id: 2, title: 'Orçamento em Linguagem Cidadã', period: '2024–2025', year: '2025', status: 'Publicado', theme: 'Transparência', summary: 'Projeto de visualização para aproximar orçamento e sociedade.', partners: 'Organizações de controle social', results: 'Guia metodológico e protótipo de painel.', objectives: 'Traduzir informações orçamentárias complexas.', methodology: 'Design participativo e testes de usabilidade.' },
  { id: 3, title: 'Avaliação de Capacidade de Investimento', period: '2023–2024', year: '2024', status: 'Concluído', theme: 'Desenvolvimento regional', summary: 'Estudo sobre espaço fiscal e investimentos públicos regionais.', partners: 'Consórcio intermunicipal', results: 'Relatório técnico e oficinas territoriais.', objectives: 'Mapear condições para investimento sustentável.', methodology: 'Análise de séries fiscais e entrevistas.' }
];

/* PUBLICAÇÕES: substitua o link '#' em app.js pelo destino definitivo quando houver. */
const publications = [
  { title: 'Panorama das Finanças Municipais Brasileiras', type: 'Relatório', year: '2026', theme: 'Gestão fiscal', authors: 'Carolina Mendes; Rafael Nunes; equipe NEFIP', summary: 'Diagnóstico de receitas, despesas e capacidade de investimento em municípios brasileiros.', keywords: 'finanças municipais, sustentabilidade fiscal, dados abertos' },
  { title: 'Transparência orçamentária e participação social', type: 'Artigo', year: '2025', theme: 'Transparência', authors: 'Helena Duarte; Lucas Paiva', summary: 'Evidências sobre formatos de divulgação e apropriação cidadã de dados públicos.', keywords: 'orçamento, transparência, participação' },
  { title: 'Guia de indicadores para avaliação de políticas', type: 'Nota técnica', year: '2025', theme: 'Avaliação', authors: 'Marina Lopes; NEFIP', summary: 'Referencial prático para construir e interpretar indicadores de resultados.', keywords: 'avaliação, indicadores, políticas públicas' },
  { title: 'Painel de transferências intergovernamentais', type: 'Painel', year: '2024', theme: 'Federalismo', authors: 'Laboratório de Dados NEFIP', summary: 'Visualização interativa das transferências entre entes federativos.', keywords: 'federalismo, transferências, painel' }
];

/* PREMIAÇÕES: ordene do reconhecimento mais recente para o mais antigo. */
const awards = [
  { year: '2026', name: 'Prêmio Inovação em Gestão Pública', institution: 'Rede de Administração Pública', project: 'Observatório das Finanças Municipais', description: 'Reconhecimento pela inovação no uso de dados abertos para gestão local.' },
  { year: '2025', name: 'Menção Honrosa em Dados Abertos', institution: 'Fórum Brasileiro de Transparência', project: 'Orçamento em Linguagem Cidadã', description: 'Destaque para a clareza e o potencial de controle social da plataforma.' },
  { year: '2023', name: 'Prêmio Pesquisa Aplicada', institution: 'Associação de Estudos Regionais', project: 'Avaliação de Capacidade de Investimento', description: 'Premiação pela contribuição ao debate sobre desenvolvimento regional.' }
];

/* EQUIPE: os dois primeiros caracteres de cada nome formam o avatar temporário. */
const team = [
  { name: 'Robson Fernandes Soares', role: 'Auditor de Controle Externo', interest: 'Planejamento Municipal e Orçamento', bio: 'É auditor de controle externo no TCE-PR e exerce o cargo de Acessor Executivo de Conselheiro pela Coordenadoria Geral de Fiscalização (CGF).' },
  { name: 'Denilson Aldino Beal', role: 'Auditor de Controle Externo', interest: 'Padrões de Fiscalização', bio: 'É auditor de controle externo no TCE-PR e exerce o cargo de Gerente de Métodos e Padrões de Fiscalização na Coordenadoria Geral de Fiscalização (CGF).' },
  { name: 'Fabio Junior Damacena', role: 'Auditor de Controle Externo', interest: 'Análise de Dados e DataViz', bio: 'É auditor de controle externo no TCE-PR e exerce o cargo de Coordenador Executivo na Coordenadoria de Sistemas e Informações da Fiscalização (COSIF).' },
  { name: 'Fernando Motta Correia', role: 'Professor e Pesquisador', interest: 'Economia do Setor Público e Macroeconomia.', bio: 'Atualmente é Professor Titular do Departamento de Economia da UFPR. Concentra suas pesquisas nas áreas de Macroeconomia e Economia do Setor Público.' }
];
