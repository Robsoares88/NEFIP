/* ================================================================
   NEFIP — JAVASCRIPT PRINCIPAL
   Este arquivo monta elementos compartilhados e inicializa somente
   os recursos necessários para a página identificada em <body data-page>.
   Dados editáveis ficam em assets/data.js.
   ================================================================ */

/* -------------------- CONFIGURAÇÃO DE ROTAS -------------------- */
const PAGES = {
  home: 'index.html', news: 'noticias.html', projects: 'projetos.html',
  publications: 'publicacoes.html', awards: 'premiacoes.html',
  about: 'sobre.html', data: 'dados.html', contact: 'contato.html'
};

const MENU_ITEMS = [
  ['home', 'Início'], ['about', 'Sobre o NEFIP'],
  ['news', 'Notícias'], ['projects', 'Projetos'],
  ['publications', 'Publicações'], ['awards', 'Premiações'],
  ['data', 'Dados e Materiais'], ['contact', 'Contato']
];

const currentPage = document.body.dataset.page;
const byId = id => document.getElementById(id);
/* -------------------- IDIOMA (PT / EN) --------------------
   O site tem uma única estrutura. O idioma é definido por ?lang=en;
   links internos preservam essa escolha e os textos são centralizados aqui.
   Para novos conteúdos do CMS, inclua a tradução inglesa quando disponível. */
const locale = new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'pt';
const EN = {
  'Início':'Home', 'Sobre o NEFIP':'About NEFIP', 'Notícias':'News', 'Projetos':'Projects',
  'Publicações':'Publications', 'Premiações':'Awards', 'Dados e Materiais':'Data & Materials', 'Contato':'Contact',
  'Núcleo de Estudos em Finanças Públicas':'Center for Public Finance Studies',
  'Pular para o conteúdo':'Skip to content', 'Abrir menu':'Open menu', 'Fechar menu':'Close menu',
  'Voltar ao topo':'Back to top', 'Pesquisa e inovação para finanças públicas mais transparentes, eficientes e orientadas por evidências.':'Research and innovation for more transparent, efficient and evidence-informed public finances.',
  'Acesso rápido':'Quick links', 'Dados e materiais':'Data & materials', 'Atendimento pelo formulário institucional.':'Contact us through the institutional form.', 'Curitiba, Paraná — Brasil':'Curitiba, Paraná — Brazil', 'Todos os direitos reservados.':'All rights reserved.',
  'NÚCLEO DE ESTUDOS EM FINANÇAS PÚBLICAS':'CENTER FOR PUBLIC FINANCE STUDIES',
  'Pesquisa, dados e inovação para as finanças públicas.':'Research, data and innovation for public finances.',
  'Produzimos conhecimento aplicado para decisões públicas mais transparentes, eficientes e orientadas por evidências.':'We produce applied knowledge for more transparent, efficient and evidence-informed public decisions.',
  'Conheça os projetos':'Explore projects', 'Ver publicações':'View publications', 'EM QUE ATUAMOS':'WHAT WE DO',
  'Pesquisa acadêmica, projetos técnicos e difusão de conhecimento voltados ao setor público.':'Academic research, technical projects and knowledge dissemination for the public sector.',
  'Pesquisa aplicada':'Applied research', 'Dados e ferramentas':'Data & tools', 'Formação e cooperação':'Training & collaboration',
  'EM DESTAQUE':'HIGHLIGHTS', 'Conhecimento que alcança o território.':'Knowledge that reaches communities.', 'Todas as notícias':'All news',
  'LINHAS DE PESQUISA':'RESEARCH AREAS', 'Temas que orientam nossa atuação.':'Themes that guide our work.',
  'Planejamento e orçamento público':'Public planning and budgeting', 'Transparência e controle social':'Transparency and social oversight',
  'Dados abertos e inteligência pública':'Open data and public intelligence', 'Gestão fiscal municipal':'Municipal fiscal management',
  'Políticas baseadas em evidências':'Evidence-based policies', 'Desenvolvimento regional':'Regional development',
  'Instrumentos para qualificar prioridades, alocação de recursos e monitoramento.':'Tools to strengthen priorities, resource allocation and monitoring.',
  'Informação acessível para fortalecer a participação e a accountability.':'Accessible information to strengthen participation and accountability.',
  'Dados transformados em diagnósticos, painéis e decisões mais ágeis.':'Data transformed into assessments, dashboards and more agile decisions.',
  'Análises para sustentabilidade e capacidade estatal nos municípios.':'Analysis for sustainability and public capacity in municipalities.',
  'Avaliação de resultados para ampliar o impacto das políticas públicas.':'Outcome evaluation to increase the impact of public policies.',
  'Finanças públicas a serviço de territórios mais equilibrados e inclusivos.':'Public finances serving more balanced and inclusive territories.',
  'ACERVO ABERTO':'OPEN COLLECTION', 'Dados e materiais para ampliar o debate público.':'Data and materials to broaden public debate.',
  'Explore bases, painéis, relatórios e materiais técnicos produzidos ou curados pelo NEFIP.':'Explore datasets, dashboards, reports and technical materials produced or curated by NEFIP.',
  'Acessar dados e materiais':'Access data & materials', 'Bases de dados':'Datasets', 'Painéis interativos':'Interactive dashboards', 'Relatórios técnicos':'Technical reports', 'Repositórios e códigos':'Repositories & code',
  'ACOMPANHE O NEFIP':'FOLLOW NEFIP', 'Pesquisas, parcerias, eventos e resultados que aproximam conhecimento e gestão pública.':'Research, partnerships, events and results that connect knowledge and public management.',
  'Buscar notícias':'Search news', 'Todas as categorias':'All categories', 'Todos os anos':'All years', 'Carregar mais':'Load more', 'NOTÍCIA EM DESTAQUE':'FEATURED NEWS', 'Ler notícia →':'Read article →', 'Nenhuma notícia encontrada.':'No news found.',
  'PESQUISA APLICADA':'APPLIED RESEARCH', 'Iniciativas acadêmicas e institucionais que transformam dados em capacidade pública.':'Academic and institutional initiatives that turn data into public capacity.',
  'Todos os temas':'All themes', 'Todos os status':'All statuses', 'Detalhes':'Details', 'Acessar painel':'Open dashboard', 'Painel interativo':'Interactive dashboard', 'Área':'Area', 'Instituição':'Institution', 'Formato':'Format', 'Acessar ferramenta':'Open tool', 'Objetivo':'Objective', 'Metodologia':'Methodology', 'Resultados e entregas':'Results & deliverables', 'Fechar':'Close',
  'PRODUÇÃO TÉCNICO-CIENTÍFICA':'TECHNICAL AND SCIENTIFIC OUTPUT', 'Artigos, relatórios, notas técnicas e produtos abertos do NEFIP.':'Articles, reports, technical notes and open products from NEFIP.',
  'Todas':'All', 'Todos os tipos':'All types', 'Palavras-chave:':'Keywords:', 'Acessar':'Access', 'Nenhuma publicação encontrada para este filtro.':'No publications found for this filter.',
  'RECONHECIMENTOS':'RECOGNITION', 'Resultados que reconhecem a qualidade e a relevância pública do nosso trabalho.':'Results that acknowledge the quality and public relevance of our work.', 'Projeto relacionado:':'Related project:', 'Conhecer o reconhecimento →':'View recognition →',
  'ACERVO ABERTO':'OPEN COLLECTION', 'Recursos para pesquisa, gestão e controle social.':'Resources for research, management and social oversight.', 'DADOS ABERTOS':'OPEN DATA', 'Painel do Plano Plurianual':'Multi-Year Plan Dashboard', 'Painel de Gestão Fiscal Municipal':'Municipal Fiscal Management Dashboard', 'Dados por período':'Data by period', 'Período':'Period', 'Ano':'Year', 'Abrir painel do PPA ↗':'Open MYP dashboard ↗', 'Abrir painel fiscal ↗':'Open fiscal dashboard ↗',
  'FALE CONOSCO':'GET IN TOUCH', 'Tem uma ideia, proposta de parceria ou pergunta sobre nossos dados? Escreva para nós.':'Have an idea, partnership proposal or question about our data? Write to us.', 'Atendimento institucional':'Institutional contact', 'Envie sua mensagem pelo formulário ao lado. Nossa equipe retornará assim que possível.':'Send your message using the form. Our team will respond as soon as possible.', 'Nome':'Name', 'Assunto':'Subject', 'Mensagem':'Message', 'Enviar mensagem':'Send message', 'As informações serão encaminhadas ao atendimento institucional.':'Your information will be forwarded to the institutional contact team.',
  'SOBRE O NEFIP':'ABOUT NEFIP', 'Conhecimento público, compromisso coletivo.':'Public knowledge, collective commitment.', 'Um núcleo acadêmico que combina pesquisa, extensão e cooperação institucional.':'An academic center combining research, outreach and institutional cooperation.', 'NOSSA MISSÃO':'OUR MISSION', 'Pesquisa aplicada para decisões públicas melhores.':'Applied research for better public decisions.', 'PRINCÍPIOS':'PRINCIPLES', 'Como trabalhamos':'How we work', 'Rigor técnico e independência':'Technical rigor and independence', 'Dados abertos e reprodutibilidade':'Open data and reproducibility', 'Diálogo com os territórios':'Dialogue with communities', 'Impacto público mensurável':'Measurable public impact', 'ATUAÇÃO RECENTE':'RECENT ACTIVITY', 'Trajetória':'Trajectory', 'Iniciativas e reconhecimentos relacionados às atividades do núcleo.':'Initiatives and recognitions related to the center’s activities.', 'PESSOAS':'PEOPLE', 'Equipe':'Team', 'Pesquisadores, estudantes e colaboradores dedicados a tornar as finanças públicas mais inteligíveis.':'Researchers, students and collaborators committed to making public finances more understandable.'
};
/* Conteúdos existentes: traduções de interface e dos registros já publicados.
   Se um registro novo ainda não tiver entrada em EN, ele permanece no idioma original. */
Object.assign(EN, {
  'Publicado': 'Published', 'Planejamento e orçamento': 'Planning and budgeting',
  'Dados e desenvolvimento sustentável': 'Data and sustainable development',
  'Comunicados': 'Announcements', 'Dados públicos': 'Public data', 'Premiações e Reconhecimentos': 'Awards and recognition',
  'Institucional': 'Institutional', 'Pesquisa e Estudos': 'Research and Studies', 'Projetos': 'Projects',
  'Dados Abertos': 'Open Data', 'Painéis e Ferramentas': 'Dashboards and Tools',
  'Relatórios e Notas Técnicas': 'Reports and Technical Notes', 'Inovação e Tecnologia': 'Innovation and Technology',
  'Planejamento e Orçamento': 'Planning and Budgeting', 'Gestão Fiscal': 'Fiscal Management',
  'Transparência e Controle Social': 'Transparency and Social Oversight', 'Políticas Públicas': 'Public Policies',
  'Desenvolvimento Regional': 'Regional Development', 'Parcerias e Cooperação': 'Partnerships and Cooperation',
  'Eventos e Agenda': 'Events and Calendar', 'Cursos e Capacitações': 'Courses and Training',
  'Editais e Oportunidades': 'Calls and Opportunities', 'Equipe e Trajetórias': 'Team and Trajectories', 'Na Mídia': 'In the Media',
  'Auditor de Controle Externo': 'External Control Auditor', 'Professor e Pesquisador': 'Professor and Researcher', 'Estagiário de Pós-graduação': 'Graduate Intern',
  'Padrões de Fiscalização': 'Audit Standards', 'Análise de Dados e DataViz': 'Data Analysis and Data Visualization', 'Fiscalização e Orçamento Público': 'Auditing and Public Budgeting', 'Análise de Dados e Desenvolvimento Web': 'Data Analysis and Web Development',
  'Menção Honrosa — Infosfera 2025': 'Honorable Mention — Infosfera 2025', 'Painel PPA e Índice de Maturidade': 'MYP Dashboard and Maturity Index',
  'Reconhecimento do painel como boa prática de gestão da informação na administração pública.': 'Recognition of the dashboard as a good information-management practice in public administration.',
  'Ferramenta pública para consulta de informações sobre a maturidade dos PPAs dos 399 municípios paranaenses.': 'A public tool for consulting information on the maturity of Multi-Year Plans in Paraná’s 399 municipalities.',
  'Painel público com filtros territoriais e por ciclo do PPA.': 'Public dashboard with territorial and MYP-cycle filters.',
  'Painel de Business Intelligence que integra informações da gestão fiscal das entidades municipais paranaenses informadas ao SIM-AM.': 'Business Intelligence dashboard integrating fiscal-management information reported by Paraná municipal entities to SIM-AM.'
  , 'Produzir e difundir conhecimento qualificado sobre finanças públicas, contribuindo para instituições mais transparentes, sustentáveis e capazes de gerar bem-estar social.': 'To produce and disseminate qualified knowledge on public finances, contributing to more transparent, sustainable institutions capable of generating social well-being.'
  , 'O NEFIP aproxima universidade, gestores, organizações da sociedade civil e comunidades de dados para responder aos desafios do presente.': 'NEFIP brings together universities, public managers, civil-society organizations and data communities to address present-day challenges.'
  , 'Painel PPA e Índice de Maturidade disponibilizado para consulta sobre os 399 municípios paranaenses.': 'The MYP Dashboard and Maturity Index was made available for consultation on Paraná’s 399 municipalities.'
  , 'Reconhecimento do painel no Infosfera 2025, promovido pela UFPR, como boa prática de gestão da informação pública.': 'The dashboard was recognized at Infosfera 2025, organized by UFPR, as a good public information-management practice.'
  , 'Nota Técnica nº 37/2025 orienta a gestão dos PPAs 2026–2029 nos municípios paranaenses.': 'Technical Note No. 37/2025 provides guidance on the management of 2026–2029 Multi-Year Plans in Paraná municipalities.'
  , 'Painel sobre a evolução orçamentária por ODS amplia a leitura do planejamento municipal.': 'The dashboard on budget allocation by SDG broadens the understanding of municipal planning.'
  , 'Consulte informações de projeções, programas, ações e indicadores dos Planos Plurianuais dos municípios paranaenses.': 'Consult projections, programs, actions and indicators from the Multi-Year Plans of Paraná municipalities.'
  , 'Os dados estão organizados por período e disponíveis nos formatos CSV, JSON e XML.': 'The data are organized by period and available in CSV, JSON and XML formats.'
  , 'Consulte indicadores e demonstrativos de gestão fiscal elaborados com dados enviados pelos municípios ao SIMAM.': 'Consult fiscal-management indicators and statements prepared from data submitted by municipalities to SIMAM.'
  , 'Os dados estão organizados por período e incluem informações de gestão fiscal municipal e despesas de capital.': 'The data are organized by period and include municipal fiscal-management and capital-expenditure information.'
  , 'Períodos:': 'Periods:'
  , 'Formatos:': 'Formats:'
  , 'Abrir painel do PPA': 'Open MYP dashboard'
  , 'Abrir painel fiscal': 'Open fiscal dashboard'
  , 'Gestão Fiscal': 'Fiscal Management'
  , 'Municipal (CSV)': 'Municipal (CSV)'
  , 'Municipal (JSON)': 'Municipal (JSON)'
  , 'Municipal (XML)': 'Municipal (XML)'
  , 'Despesas de': 'Capital Expenditure'
  , 'Capital (CSV)': '(CSV)'
  , 'Capital (JSON)': '(JSON)'
  , 'Capital (XML)': '(XML)'
  , 'CAPAG (STN)': 'CAPAG (National Treasury)'
  , 'Dados públicos': 'Public data'
  , 'UFPR - Instituição Parceira': 'UFPR - Partner Institution'
  , 'E-mail': 'Email'
  , 'Navegação principal': 'Main navigation'
  , 'NEFIP, página inicial': 'NEFIP, home page'
  , 'Filtrar por categoria': 'Filter by category'
  , 'Filtrar por ano': 'Filter by year'
  , 'Filtrar por tema': 'Filter by theme'
  , 'Filtrar por status': 'Filter by status'
  , 'Filtrar por tipo': 'Filter by type'
  , 'Lista de dados e materiais': 'Data and materials list'
  , 'Detalhes do conjunto de dados': 'Dataset details'
  , 'Downloads complementares': 'Supplementary downloads'
});
function t(value) { return locale === 'en' ? (EN[value] || value) : value; }
/* Traduções dos registros institucionais atuais. Novos registros podem usar
   diretamente um objeto `en` com apenas os campos que precisarem traduzir. */
const PROJECT_EN = {
  1: {
    title: 'MYP Dashboard and Maturity Index', period: '2025', year: '2025', status: 'Published',
    theme: 'Planning and budgeting', summary: 'A public tool for consulting information on the maturity of Multi-Year Plans in Paraná’s 399 municipalities.',
    partners: 'TCE-PR', results: 'Interactive dashboard available on the Informação para Todos Portal.',
    objectives: 'Expand access to information on municipal planning.',
    methodology: 'Organization and presentation of data from municipal Multi-Year Plans.'
  },
  2: {
    title: 'SDG Municipal Planning Budget Allocation Dashboard', period: '2026', year: '2026', status: 'Published',
    theme: 'Data and sustainable development', summary: 'A tool for consulting municipal budget allocations across the 17 Sustainable Development Goals.',
    partners: 'TCE-PR', results: 'Public dashboard with territorial and MYP-cycle filters.',
    objectives: 'Support the analysis of municipal financing related to the SDGs.',
    methodology: 'Automated classification of budget actions for the 2022–2025 and 2026–2029 cycles.'
  },
  3: {
    title: 'Municipal Fiscal Management Dashboard', period: '2026', year: '2026', status: 'Published',
    theme: 'Municipal fiscal management', summary: 'Business Intelligence dashboard integrating fiscal-management information reported by Paraná municipal entities to SIM-AM.',
    partners: 'TCE-PR', results: 'Indicators, comparative analyses and visualizations on fiscal management, assets, fiscal targets and risks, revenue waivers, public debt, investments and budget changes.',
    objectives: 'Present relevant information on municipal fiscal management in an integrated and accessible way, supporting social oversight, transparency and monitoring.',
    methodology: 'Organization of data reported to the Municipal Information System — Monthly Monitoring (SIM-AM) into indicators and comparative analyses since 2018.'
  }
};
const TEAM_EN = {
  'Robson Fernandes Soares': { role: 'External Control Auditor', interest: 'Municipal Planning and Budgeting', bio: 'External control auditor at TCE-PR and Executive Advisor to a Council Member at the General Audit Coordination Office (CGF).' },
  'Denilson Aldino Beal': { role: 'External Control Auditor', interest: 'Audit Standards', bio: 'External control auditor at TCE-PR and Manager of Methods and Standards at the General Audit Coordination Office (CGF).' },
  'Fabio Junior Damacena': { role: 'External Control Auditor', interest: 'Data Analysis and Data Visualization', bio: 'External control auditor at TCE-PR and Executive Coordinator at the Audit Systems and Information Coordination Office (COSIF).' },
  'Fernando Motta Correia': { role: 'Professor and Researcher', interest: 'Public Sector Economics and Macroeconomics', bio: 'Full Professor at UFPR’s Department of Economics, with research interests in Macroeconomics and Public Sector Economics.' },
  'Leandro Menezes Rodrigues': { role: 'External Control Auditor', interest: 'Auditing and Public Budgeting', bio: 'External control auditor at TCE-PR and Audit Manager at the 4th External Control Inspectorate (4ICE).' },
  'Douglas Nascimento de Oliveira': { role: 'Graduate Intern', interest: 'Data Analysis and Web Development', bio: 'Graduate student in Data Science and intern at the General Audit Coordination Office (CGF).' }
};
function localizeRecord(item) {
  if (locale !== 'en' || !item) return item;
  if (item.en) return { ...item, ...item.en };
  if ('objectives' in item && PROJECT_EN[item.id]) return { ...item, ...PROJECT_EN[item.id] };
  if ('role' in item && TEAM_EN[item.name]) return { ...item, ...TEAM_EN[item.name] };
  return item;
}
function localizedUrl(url) {
  if (locale !== 'en' || /^(https?:|mailto:|#)/.test(url)) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}lang=en`;
}
/* O seletor usa a URL completa para funcionar também ao abrir o HTML por file:///. */
function languageToggleUrl() {
  const url = new URL(window.location.href);
  if (locale === 'en') url.searchParams.delete('lang');
  else url.searchParams.set('lang', 'en');
  return url.href;
}
function translateDocument(root = document) {
  if (locale !== 'en') return;
  document.documentElement.lang = 'en';
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode(node) {
    return node.parentElement && !['SCRIPT', 'STYLE'].includes(node.parentElement.tagName) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
  }});
  const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    const original = node.nodeValue;
    const trimmed = original.trim();
    if (EN[trimmed]) node.nodeValue = original.replace(trimmed, EN[trimmed]);
  });
  root.querySelectorAll?.('[placeholder],[aria-label],[title]').forEach(element => {
    ['placeholder', 'aria-label', 'title'].forEach(attribute => {
      const value = element.getAttribute(attribute);
      if (EN[value]) element.setAttribute(attribute, EN[value]);
    });
  });
  root.querySelectorAll?.('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !/^(https?:|mailto:|#)/.test(href) && !href.includes('lang=')) link.setAttribute('href', localizedUrl(href));
  });
  const englishTitles = {
    home: 'NEFIP — Center for Public Finance Studies', news: 'News | NEFIP',
    projects: 'Projects | NEFIP', publications: 'Publications | NEFIP',
    awards: 'Awards | NEFIP', data: 'Data & Materials | NEFIP',
    contact: 'Contact | NEFIP', about: 'About NEFIP | NEFIP',
    'news-article': `${document.querySelector('.news-article h1')?.textContent || 'News'} | NEFIP`
  };
  document.title = englishTitles[currentPage] || document.title;
}
/* Índice carregado apenas nas páginas inicial e de notícias. */
const news = window.NEFIP_NEWS || [];
const newsConfig = window.NEFIP_NEWS_CONFIG || { pages: [], categories: [], years: [] };

function loadNewsPage() {
  const source = newsConfig.pages.shift();
  if (!source) return Promise.resolve(false);
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = source;
    script.onload = () => { news.push(...(window.NEFIP_NEWS_PAGE || [])); resolve(true); };
    script.onerror = () => reject(new Error('Não foi possível carregar mais notícias.'));
    document.head.append(script);
  });
}

/* -------------------- COMPONENTES COMPARTILHADOS -------------------- */
function addFavicon() {
  document.head.insertAdjacentHTML(
    'beforeend',
    '<link rel="icon" href="assets/logo.png" type="image/png">'
  );
}

function buildHeader() {
  const links = MENU_ITEMS.map(([id, label]) => {
    const href = localizedUrl(PAGES[id]);
    const active = currentPage === id ? ' aria-current="page"' : '';
    return `<a href="${href}"${active}>${label}</a>`;
  }).join('');

  byId('site-header').innerHTML = `
    <header class="site-header">
      <div class="wrap header-top">
        <a class="brand" href="${localizedUrl('index.html')}" aria-label="NEFIP, página inicial">
          <img src="assets/logo.png" alt="Logotipo do NEFIP">
          <span><strong>NEFIP</strong><small>Núcleo de Estudos em Finanças Públicas</small></span>
        </a>
      </div>
      <div class="wrap nav-row">
        <button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false">☰</button>
        <nav class="nav-links" aria-label="Navegação principal">${links}</nav>
        <a class="language-switch" href="${languageToggleUrl()}" lang="${locale === 'en' ? 'pt-BR' : 'en'}" aria-label="${locale === 'en' ? 'Mudar para português' : 'Switch to English'}">${locale === 'en' ? 'PT' : 'EN'}</a>
      </div>
    </header>`;
}

function buildFooter() {
  byId('site-footer').innerHTML = `
    <footer class="site-footer">
      <div class="wrap footer-grid">
        <div><a class="brand" href="${localizedUrl('index.html')}"><img src="assets/logo.png" alt=""><span><strong>NEFIP</strong><small>Núcleo de Estudos em Finanças Públicas</small></span></a><p>Pesquisa e inovação para finanças públicas mais transparentes, eficientes e orientadas por evidências.</p></div>
        <div><h3>Acesso rápido</h3><div class="footer-links"><a href="${localizedUrl('projetos.html')}">Projetos</a><a href="${localizedUrl('publicacoes.html')}">Publicações</a><a href="${localizedUrl('dados.html')}">Dados e materiais</a><a href="${localizedUrl('contato.html')}">Contato</a></div></div>
        <div><h3>Contato</h3><p>Atendimento pelo formulário institucional.<br>Curitiba, Paraná — Brasil</div>
      </div>
      <div class="wrap copyright">© ${new Date().getFullYear()} NEFIP | ${t('Todos os direitos reservados.')}</div>
    </footer>`;
}

function setupGlobalInteractions() {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.nav-links');
  const header = document.querySelector('.site-header');
  menuButton?.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.textContent = isOpen ? '×' : '☰';
    menuButton.setAttribute('aria-label', isOpen ? t('Fechar menu') : t('Abrir menu'));
  });

  const topButton = document.querySelector('.to-top');
  /* A contração acompanha a rolagem gradualmente, sem salto visual. */
  let scrollFrame;
  function updateScrollState() {
    const progress = Math.min(window.scrollY / 180, 1);
    header?.style.setProperty('--header-top-height', `${70 - (14 * progress)}px`);
    header?.style.setProperty('--header-top-padding', `${11 - (5 * progress)}px`);
    header?.style.setProperty('--brand-mark-size', `${44 - (10 * progress)}px`);
    /* A sigla cresce à medida que o nome extenso se recolhe, terminando com
       uma altura visual equivalente à da marca reduzida. */
    header?.style.setProperty('--brand-title-size', `${1.34 + (.62 * progress)}rem`);
    header?.style.setProperty('--navigation-padding', `${11 - (3 * progress)}px`);
    header?.style.setProperty('--brand-subtitle-opacity', String(1 - progress));
    header?.style.setProperty('--brand-subtitle-height', `${.72 * (1 - progress)}rem`);
    header?.style.setProperty('--brand-subtitle-margin', `${2 * (1 - progress)}px`);
    header?.classList.toggle('is-condensed', progress > .02);
    topButton?.classList.toggle('visible', window.scrollY > 500);
  }

  updateScrollState();
  window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
      updateScrollState();
      scrollFrame = undefined;
    });
  }, { passive: true });
  topButton?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* -------------------- CARROSSÉIS DE GALERIA -------------------- */
function setupCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const slides = [...carousel.querySelectorAll('.carousel-slide')];
    const controls = carousel.querySelector('.carousel-controls');
    const dots = carousel.querySelector('[data-carousel-dots]');
    const previous = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    let currentSlide = 0;

    /* Não exibe controles desnecessários para uma galeria de imagem única. */
    if (slides.length < 2) return;
    controls.hidden = false;

    dots.innerHTML = slides.map((_, index) => `<button type="button" aria-label="Ir para imagem ${index + 1}" data-carousel-dot="${index}"></button>`).join('');

    function showSlide(index) {
      currentSlide = (index + slides.length) % slides.length;
      slides.forEach((slide, position) => { slide.hidden = position !== currentSlide; });
      dots.querySelectorAll('[data-carousel-dot]').forEach((dot, position) => {
        dot.classList.toggle('active', position === currentSlide);
        dot.setAttribute('aria-current', String(position === currentSlide));
      });
    }

    previous.addEventListener('click', () => showSlide(currentSlide - 1));
    next.addEventListener('click', () => showSlide(currentSlide + 1));
    dots.addEventListener('click', event => {
      const dot = event.target.closest('[data-carousel-dot]');
      if (dot) showSlide(Number(dot.dataset.carouselDot));
    });
    carousel.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') showSlide(currentSlide - 1);
      if (event.key === 'ArrowRight') showSlide(currentSlide + 1);
    });
    carousel.tabIndex = 0;
    showSlide(0);
  });
}

/* -------------------- FUNÇÕES AUXILIARES -------------------- */
function formatDate(date) {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'pt-BR', { dateStyle: 'medium' })
    .format(new Date(`${date}T12:00:00`));
}

function populateSelect(selectId, values) {
  const select = byId(selectId);
  const uniqueValues = [...new Set(values)].sort();
  if (select) select.insertAdjacentHTML('beforeend', uniqueValues.map(value => `<option value="${value}">${value}</option>`).join(''));
}

function getSelectValue(id) { return byId(id)?.value || ''; }

/* -------------------- MODAIS DE NOTÍCIAS E PROJETOS -------------------- */
function closeModal() { const root = byId('modal-root'); if (root) root.innerHTML = ''; }

function openDetailsModal(item, type) {
  const root = byId('modal-root');
  if (!root) return;

  item = localizeRecord(item);
  const isProject = type === 'project';
  if (isProject) {
    root.innerHTML = `<div class="modal project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><article class="modal-dialog project-dialog"><button class="modal-close" aria-label="Fechar">×</button><header class="project-modal-header"><p class="project-modal-label">${item.status} · ${item.period}</p><h1 id="modal-title">${item.title}</h1><p class="project-modal-summary">${item.summary}</p><dl class="project-facts"><div><dt>Área</dt><dd>${item.theme}</dd></div><div><dt>Instituição</dt><dd>${item.partners}</dd></div><div><dt>Formato</dt><dd>Painel interativo</dd></div></dl>${item.link ? `<a class="button project-tool-link" href="${item.link}" target="_blank" rel="noreferrer"><iconify-icon icon="simple-icons:powerbi" aria-hidden="true"></iconify-icon>Acessar ferramenta <span aria-hidden="true">↗</span><span class="sr-only">Power BI, abre em nova aba</span></a>` : ''}</header><div class="project-modal-content"><section><h2>Objetivo</h2><p>${item.objectives}</p></section><section><h2>Metodologia</h2><p>${item.methodology}</p></section><section class="project-results"><h2>Resultados e entregas</h2><p>${item.results}</p></section></div></article></div>`;
    translateDocument(root);
    root.querySelector('.modal-close').focus();
    root.querySelector('.modal-close').addEventListener('click', closeModal);
    root.querySelector('.modal').addEventListener('click', event => { if (event.target === event.currentTarget) closeModal(); });
    return;
  }

  const metadata = isProject ? `${item.theme} · ${item.period}` : `${item.category} · ${formatDate(item.date)}`;
  const body = `<p>${item.content}</p><p>Esta notícia integra o acervo institucional do NEFIP. Consulte os materiais relacionados e acompanhe as próximas atualizações.</p>`;

  root.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><article class="modal-dialog"><button class="modal-close" aria-label="Fechar">×</button><p class="modal-meta">${metadata}</p><h1 id="modal-title">${item.title}</h1><p class="lead" style="color:#657287">${item.summary}</p><div class="modal-content">${body}</div></article></div>`;
  translateDocument(root);
  root.querySelector('.modal-close').focus();
  root.querySelector('.modal-close').addEventListener('click', closeModal);
  root.querySelector('.modal').addEventListener('click', event => { if (event.target === event.currentTarget) closeModal(); });
}

document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });
document.addEventListener('click', event => {
  const projectButton = event.target.closest('.open-project');
  if (projectButton) openDetailsModal(projects.find(item => item.id === Number(projectButton.dataset.id)), 'project');
});

/* -------------------- CARDS E LISTAGENS -------------------- */
function newsCover(item, className, eager = false) {
  item = localizeRecord(item);
  const loading = eager ? 'eager' : 'lazy';
  const image = item.coverImage
    ? `<img src="${item.coverImage}" alt="${item.coverAlt || item.title}" loading="${loading}">`
    : '<span class="news-cover-placeholder" aria-hidden="true">Dados públicos</span>';
  return `<a class="${className}" href="${item.pageUrl}" aria-label="Ler ${item.title}">${image}</a>`;
}

function newsCard(item) {
  item = localizeRecord(item);
  return `<article class="item-card news-card">${newsCover(item, 'card-cover')}<div class="meta"><span class="news-category">${item.category}</span><time datetime="${item.date}">${formatDate(item.date)}</time></div><h2>${item.title}</h2><p>${item.summary}</p><a class="text-link" href="${item.pageUrl}">Ler notícia →</a></article>`;
}

function initHome() {
  const target = byId('home-highlights');
  if (target) target.innerHTML = news.slice(0, 4).map(newsCard).join('');
}

function initNews() {
  populateSelect('news-category', newsConfig.categories.length ? newsConfig.categories : news.map(item => item.category));
  populateSelect('news-year', newsConfig.years.length ? newsConfig.years : news.map(item => item.date.slice(0, 4)));
  const list = byId('news-list');
  const moreButton = byId('news-more');
  let visibleItems = 3;

  const featured = localizeRecord(news.find(item => item.featured));
  byId('featured-news').innerHTML = `<article class="featured">${newsCover(featured, 'featured-visual', true)}<div class="featured-copy"><p class="eyebrow">NOTÍCIA EM DESTAQUE</p><p class="meta">${featured.category} · ${formatDate(featured.date)}</p><h2>${featured.title}</h2><p>${featured.summary}</p><a class="text-link" href="${featured.pageUrl}">Ler notícia →</a></div></article>`;

  function renderNews() {
    const search = getSelectValue('news-search').toLowerCase();
    const category = getSelectValue('news-category');
    const year = getSelectValue('news-year');
    const filtered = news.filter(item => {
      const localized = localizeRecord(item);
      // O valor do select usa a categoria PT-BR como chave canônica; apenas o
      // texto exibido é traduzido. Assim, o filtro funciona nos dois idiomas.
      return (!search || `${localized.title} ${localized.summary}`.toLowerCase().includes(search)) && (!category || item.category === category) && (!year || localized.date.startsWith(year));
    });
    list.innerHTML = filtered.slice(0, visibleItems).map(newsCard).join('') || '<p>Nenhuma notícia encontrada.</p>';
    moreButton.style.display = (filtered.length > visibleItems || newsConfig.pages.length) ? 'block' : 'none';
    translateDocument(list);
  }

  ['news-search', 'news-category', 'news-year'].forEach(id => byId(id).addEventListener('input', async () => { while (newsConfig.pages.length) await loadNewsPage(); visibleItems = 3; renderNews(); }));
  moreButton.addEventListener('click', async () => { visibleItems += 3; while (news.length < visibleItems && newsConfig.pages.length) await loadNewsPage(); renderNews(); });
  renderNews();
}

function initProjects() {
  populateSelect('project-theme', projects.map(item => localizeRecord(item).theme));
  populateSelect('project-year', projects.map(item => item.year).filter(Boolean));
  populateSelect('project-status', projects.map(item => localizeRecord(item).status));
  const list = byId('projects-list');

  function renderProjects() {
    const filtered = projects.map(localizeRecord).filter(item => ['theme', 'year', 'status'].every(field => !getSelectValue(`project-${field}`) || item[field] === getSelectValue(`project-${field}`)));
    list.innerHTML = filtered.map(item => `<article class="item-card"><span class="meta">${item.status} · ${item.period}</span><h2>${item.title}</h2><p>${item.summary}</p><p><b>${item.theme}</b></p><div class="project-actions"><button class="text-link open-project" data-id="${item.id}">Detalhes</button>${item.link ? `<a class="text-link powerbi-link" href="${item.link}" target="_blank" rel="noreferrer"><iconify-icon icon="simple-icons:powerbi" aria-hidden="true"></iconify-icon>Acessar painel <span aria-hidden="true">↗</span><span class="sr-only">Power BI, abre em nova aba</span></a>` : ''}</div></article>`).join('') || '<p>Nenhum projeto encontrado.</p>';
    translateDocument(list);
  }
  ['project-theme', 'project-year', 'project-status'].forEach(id => byId(id).addEventListener('change', renderProjects));
  renderProjects();
}

function initPublications() {
  populateSelect('pub-type', publications.map(item => localizeRecord(item).type));
  populateSelect('pub-year', publications.map(item => item.year));
  populateSelect('pub-theme', publications.map(item => localizeRecord(item).theme));
  const list = byId('publications-list');
  const tabs = [...document.querySelectorAll('.publication-tab')];
  let activeCollection = '';

  function renderPublications() {
    const filtered = publications.map(localizeRecord).filter(item =>
      (!activeCollection || item.collection === activeCollection) &&
      ['type', 'year', 'theme'].every(field => !getSelectValue(`pub-${field}`) || item[field] === getSelectValue(`pub-${field}`))
    );
    list.innerHTML = filtered.map(item => `<article class="publication"><div><span class="pub-type">${item.type}</span><p>${item.year}</p></div><div><h2>${item.title}</h2><p>${item.authors}</p><p>${item.summary}</p><p class="keywords"><b>Palavras-chave:</b> ${item.keywords}</p></div>${item.link ? `<a class="button primary" href="${item.link}" target="_blank" rel="noopener noreferrer">Acessar</a>` : ''}</article>`).join('') || '<p class="empty-state">Nenhuma publicação encontrada para este filtro.</p>';
    translateDocument(list);
  }

  tabs.forEach(tab => tab.addEventListener('click', () => {
    activeCollection = tab.dataset.publicationCollection;
    tabs.forEach(item => {
      const isActive = item === tab;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
    renderPublications();
  }));

  ['pub-type', 'pub-year', 'pub-theme'].forEach(id => byId(id).addEventListener('change', renderPublications));
  renderPublications();
}

function initAwards() {
  byId('awards-list').innerHTML = awards.map(localizeRecord).map(item => `<article class="award"><span class="award-year">${item.year}</span><p class="eyebrow">${item.institution}</p><h2>${item.name}</h2><p><b>Projeto relacionado:</b> ${item.project}</p><p>${item.description}</p>${item.link ? `<a class="text-link" href="${item.link}" target="_blank" rel="noopener noreferrer">Conhecer o reconhecimento →</a>` : ''}</article>`).join('');
  translateDocument(byId('awards-list'));
}

/* -------------------- DADOS E MATERIAIS -------------------- */
function initData() {
  const ppaCatalog = openDataCatalog.ppa;
  const catalog = openDataCatalog.fiscalMunicipal;

  /* Links do PPA por ciclo: o identificador do ciclo vira parte do nome do arquivo. */
  byId('ppa-period-downloads').innerHTML = ppaCatalog.periods.map(period => {
    const filePeriod = period.replace('-', '_');
    const links = ppaCatalog.formats.map(format => {
      const url = `${ppaCatalog.baseUrl}/${ppaCatalog.fileStem}_${filePeriod}_${format}.zip`;
      return `<a class="download-icon" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Baixar PPA do período ${period}, formato ${format.toUpperCase()}">↓ <span class="sr-only">${format.toUpperCase()}</span></a>`;
    });
    return `<tr><th scope="row">${period}</th>${links.map(link => `<td>${link}</td>`).join('')}</tr>`;
  }).join('');

  /* Gestão fiscal por ano: combina os dois conjuntos de dados e três formatos. */
  byId('fiscal-period-downloads').innerHTML = catalog.years.filter(year => year !== 'all').map(year => {
    const cells = catalog.formats.flatMap(format => catalog.resources.map(resource => {
      const url = `${catalog.baseUrl}/${resource.fileStem}_${year}_${format}.zip`;
      return `<td><a class="download-icon" href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Baixar ${resource.label}, ano ${year}, formato ${format.toUpperCase()}">↓ <span class="sr-only">${format.toUpperCase()}</span></a></td>`;
    }));
    return `<tr><th scope="row">${year}</th>${cells.join('')}</tr>`;
  }).join('');

  /* Indicadores complementares exibidos no painel fiscal. */
  byId('fiscal-complementary-downloads').innerHTML = catalog.complementary.map(item => `
    <a href="${item.link}" target="_blank" rel="noopener noreferrer">
      <span>${item.label}</span><b aria-hidden="true">↓</b>
      <span class="sr-only">Baixar ${item.label}</span>
    </a>
  `).join('');
}

function initTeam() {
  byId('team-list').innerHTML = team.map(localizeRecord).map(item => `<article class="person"><div class="avatar" aria-hidden="true">${item.name.split(' ').map(word => word[0]).join('').slice(0, 2)}</div><h2>${item.name}</h2><p class="role">${item.role}</p><p><b>${item.interest}</b></p><p>${item.bio}</p></article>`).join('');
  translateDocument(byId('team-list'));
}

/* NOTÍCIA EM INGLÊS: o gerador inclui um template somente quando contentEn existe. */
function initNewsArticleLanguage() {
  if (currentPage !== 'news-article' || locale !== 'en') return;
  const template = byId('article-en-content');
  const article = document.querySelector('.news-article');
  if (template && article) article.innerHTML = template.innerHTML;
}

/* -------------------- INICIALIZAÇÃO DA PÁGINA ATUAL -------------------- */
addFavicon();
buildHeader();
buildFooter();
setupGlobalInteractions();
initNewsArticleLanguage();
setupCarousels();

const pageInitializers = { home: initHome, news: initNews, projects: initProjects, publications: initPublications, awards: initAwards, about: initTeam, data: initData };
pageInitializers[currentPage]?.();
translateDocument();
