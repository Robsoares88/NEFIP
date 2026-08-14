/* ================================================================
   NEFIP — DADOS EDITÁVEIS DO SITE
   Para adicionar um registro, copie um objeto existente dentro da
   lista correspondente. Mantenha vírgulas entre os objetos.
   ================================================================ */

/* NOTÍCIAS: a fonte ativa é news/content, gerenciada pelo Pages CMS. */

/* PROJETOS: só inclua registros com fonte institucional ou validação do NEFIP. */
const projects = [
  { id: 2, title: 'Painel Evolução Orçamentária do Planejamento Municipal por ODS', period: '2026', year: '2026', status: 'Publicado', theme: 'Dados e desenvolvimento sustentável', summary: 'Ferramenta que permite consultar a alocação orçamentária dos municípios paranaenses nos 17 Objetivos de Desenvolvimento Sustentável.', partners: 'TCE-PR', results: 'Painel público com filtros territoriais e por ciclo do PPA.', objectives: 'Apoiar a leitura do financiamento municipal relacionado aos ODS.', methodology: 'Classificação automatizada de ações orçamentárias dos ciclos 2022–2025 e 2026–2029.', link: 'https://app.powerbi.com/view?r=eyJrIjoiNGMwYjE2ZDAtY2M2OS00ZmNmLTk0NGQtMTllYWU1ODRiOWVkIiwidCI6ImY3MGEwYWY2LWRhMGYtNDViZS1iN2VkLTlmOGMxYjI0YmZkZiIsImMiOjR9' },
  { id: 3, title: 'Painel de Gestão Fiscal Municipal', period: '2026', year: '2026', status: 'Publicado', theme: 'Gestão fiscal municipal', summary: 'Painel de Business Intelligence que integra informações da gestão fiscal das entidades municipais paranaenses informadas ao SIM-AM.', partners: 'TCE-PR', results: 'Indicadores, análises comparativas e visualizações sobre gestão fiscal, evolução patrimonial, metas e riscos fiscais, renúncias de receita, dívida pública, investimentos e alterações orçamentárias.', objectives: 'Apresentar, de forma integrada e acessível, informações relevantes sobre a gestão fiscal dos municípios e apoiar o controle social, a transparência da gestão pública e o acompanhamento da gestão fiscal municipal.', methodology: 'Organização dos dados informados pelas entidades municipais paranaenses ao Sistema de Informações Municipais — Acompanhamento Mensal (SIM-AM) em indicadores e análises comparativas desde 2018.', link: 'https://app.powerbi.com/view?r=eyJrIjoiY2Y1NjYyZDYtNDBkZC00ZGRmLWJjYjEtZTk5Y2IwYWUzM2ZmIiwidCI6ImY3MGEwYWY2LWRhMGYtNDViZS1iN2VkLTlmOGMxYjI0YmZkZiIsImMiOjR9' },
  { id: 1, title: 'Painel PPA e Índice de Maturidade', period: '2025', year: '2025', status: 'Publicado', theme: 'Planejamento e orçamento', summary: 'Ferramenta pública para consulta de informações sobre a maturidade dos PPAs dos 399 municípios paranaenses.', partners: 'TCE-PR', results: 'Painel interativo disponível no Portal Informação para Todos.', objectives: 'Ampliar o acesso a informações sobre o planejamento municipal.', methodology: 'Organização e apresentação de dados dos Planos Plurianuais municipais.', link: 'https://app.powerbi.com/view?r=eyJrIjoiNDNmNDRlNGYtNDY1My00OWMyLTk3NGYtMGE1MDk4YTVmYWQyIiwidCI6ImY3MGEwYWY2LWRhMGYtNDViZS1iN2VkLTlmOGMxYjI0YmZkZiIsImMiOjR9' }
];

/* PUBLICAÇÕES E MATERIAIS TÉCNICOS: registros com referência pública. */
const publications = [
  { title: 'Public Sector Financing Needs and and the Multi-Year Plan Maturity Index in the Municipalities of Parana', collection: 'Working Papers', type: 'Congress Presentation', year: '2026', theme: 'Planning and budgeting', authors: 'Fernando Motta Correia, Robson Fernandes Soares & Denilson Aldino Beal', summary: 'A panel Probit analysis of fiscal adjustment and budget-planning institutions', keywords: 'PPA, municipal planning, monitoring, evaluation', link: 'assets/publicacoes/working-papers/International_Conference_on_Public_Economic_Theory_Presentation.pdf' },
  { title: 'Public sector financing needs and the multi-year plan maturity index', collection: 'Working Papers', type: 'Paper', year: '2026', theme: 'Planning and Budgeting', authors: 'Fernando Motta Correia, Robson Fernandes Soares & Denilson Aldino Beal', summary: 'This article examines the relationship between public sector financing needs and municipal budgetary planning capacity in the State of Paraná, as measured by the Multi-Year Plan Maturity Index (MYP-MI).', keywords: 'PPA, municipal planning, monitoring, evaluation', link: 'assets/publicacoes/working-papers/Article_Probit_PSFN_MYPMI_FGVRio.pdf' },
  { title: 'Nota Técnica nº 37/2025 – CGF/TCE-PR', collection: 'Published Papers', type: 'Nota Técnica', year: '2025', theme: 'Planejamento e orçamento', authors: 'Coordenadoria-Geral de Fiscalização do TCE-PR', summary: 'Orientações e modelos de documentos para elaboração, monitoramento, revisão e avaliação do PPA.', keywords: 'PPA, planejamento municipal, monitoramento, avaliação', link: 'https://www1.tce.pr.gov.br/conteudo/nota-tecnica-n-37-de-19-de-novembro-de-2025-cgf.htm' }
];

/* PREMIAÇÕES: mantenha somente reconhecimentos comprovados. */
const awards = [
  { year: '2025', name: 'Menção Honrosa — Infosfera 2025', institution: 'Infojus / Programa de Pós-Graduação em Gestão da Informação da UFPR', project: 'Painel PPA e Índice de Maturidade', description: 'Reconhecimento do painel como boa prática de gestão da informação na administração pública.', link: 'https://infosfera.inf.br/infosfera2025/praticas-premiadas/' }
];

/* DADOS ABERTOS: links diretos extraídos dos painéis públicos do TCE-PR. */
const openDataCatalog = {
  ppa: {
    baseUrl: 'https://pit.tce.pr.gov.br/arquivos/ie_exp/ppa',
    periods: ['2014-2017', '2018-2021', '2022-2025', '2026-2029'],
    fileStem: 'ppa',
    formats: ['csv', 'json', 'xml']
  },
  fiscalMunicipal: {
    baseUrl: 'https://pit.tce.pr.gov.br/arquivos/ie_exp/ppa',
    years: ['all', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    resources: [
      { label: 'Gestão Fiscal Municipal', fileStem: 'GestaoFiscalMunicipal' },
      { label: 'Despesas de Capital', fileStem: 'DespCapital' }
    ],
    formats: ['csv', 'json', 'xml'],
    complementary: [
      { label: 'CAPAG (STN)', link: 'https://www.tesourotransparente.gov.br/ckan/dataset/capag-municipios' },
      { label: 'IFGF (Firjan)', link: 'https://firjan.com.br/data/files/86/20/2F/AC/1345991031B91689D8284EA8/Evolucao_por_Indicador_2013_a_2024_IFGF_2025.xlsx' },
      { label: 'ICF (Siconfi)', link: 'https://ranking-municipios.tesouro.gov.br/static/data/down_loads/municipios_bspn.zip' }
    ]
  }
};

/* EQUIPE: os dois primeiros caracteres de cada nome formam o avatar temporário. */
const team = [
  { name: 'Robson Fernandes Soares', role: 'Auditor de Controle Externo', interest: 'Planejamento Municipal e Orçamento', bio: 'É auditor de controle externo no TCE-PR e exerce o cargo de Acessor Executivo de Conselheiro pela Coordenadoria Geral de Fiscalização (CGF).' },
  { name: 'Denilson Aldino Beal', role: 'Auditor de Controle Externo', interest: 'Padrões de Fiscalização', bio: 'É auditor de controle externo no TCE-PR e exerce o cargo de Gerente de Métodos e Padrões de Fiscalização na Coordenadoria Geral de Fiscalização (CGF).' },
  { name: 'Fabio Junior Damacena', role: 'Auditor de Controle Externo', interest: 'Análise de Dados e DataViz', bio: 'É auditor de controle externo no TCE-PR e exerce o cargo de Coordenador Executivo na Coordenadoria de Sistemas e Informações da Fiscalização (COSIF).' },
  { name: 'Fernando Motta Correia', role: 'Professor e Pesquisador', interest: 'Economia do Setor Público e Macroeconomia.', bio: 'Atualmente é Professor Titular do Departamento de Economia da UFPR. Concentra suas pesquisas nas áreas de Macroeconomia e Economia do Setor Público.' },
  { name: 'Leandro Menezes Rodrigues', role: 'Auditor de Controle Externo', interest: 'Fiscalização e Orçamento Público', bio: 'É auditor de controle externo no TCE-PR e exerce o cargo de Gerente de Fiscalização na 4ª Inspetoria de Controle Externo (4ICE).' },
  { name: 'Douglas Nascimento de Oliveira', role: 'Estagiário de Pós-graduação', interest: 'Análise de Dados e Desenvolvimento Web', bio: 'É estudante de pós-graduação em Ciência de Dados e atua como estagiário na Coordenadoria de Geral de Fiscalização (CGF).' }
];
