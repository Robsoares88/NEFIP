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
  about: 'sobre.html', team: 'equipe.html', data: 'dados.html', contact: 'contato.html'
};

const MENU_ITEMS = [
  ['home', 'Início'], ['about', 'Sobre o NEFIP'], ['team', 'Equipe'],
  ['news', 'Notícias'], ['projects', 'Projetos'],
  ['publications', 'Publicações'], ['awards', 'Premiações'],
  ['data', 'Dados e Materiais'], ['contact', 'Contato']
];

const currentPage = document.body.dataset.page;
const byId = id => document.getElementById(id);
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
    '<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">'
  );
}

function buildHeader() {
  const links = MENU_ITEMS.map(([id, label]) => {
    const href = PAGES[id];
    const active = currentPage === id ? ' aria-current="page"' : '';
    return `<a href="${href}"${active}>${label}</a>`;
  }).join('');

  byId('site-header').innerHTML = `
    <header class="site-header">
      <div class="wrap header-top">
        <a class="brand" href="index.html" aria-label="NEFIP, página inicial">
          <img src="assets/logo.png" alt="Logotipo do NEFIP">
          <span><strong>NEFIP</strong><small>Núcleo de Estudos em Finanças Públicas</small></span>
        </a>
      </div>
      <div class="wrap nav-row">
        <button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false">☰</button>
        <nav class="nav-links" aria-label="Navegação principal">${links}</nav>
      </div>
    </header>`;
}

function buildFooter() {
  byId('site-footer').innerHTML = `
    <footer class="site-footer">
      <div class="wrap footer-grid">
        <div><a class="brand" href="index.html"><img src="assets/logo.png" alt=""><span><strong>NEFIP</strong><small>Núcleo de Estudos em Finanças Públicas</small></span></a><p>Pesquisa e inovação para finanças públicas mais transparentes, eficientes e orientadas por evidências.</p></div>
        <div><h3>Acesso rápido</h3><div class="footer-links"><a href="projetos.html">Projetos</a><a href="publicacoes.html">Publicações</a><a href="dados.html">Dados e materiais</a><a href="contato.html">Contato</a></div></div>
        <div><h3>Contato</h3><p>Atendimento pelo formulário institucional.<br>Curitiba, Paraná — Brasil</div>
      </div>
      <div class="wrap copyright">© ${new Date().getFullYear()} NEFIP | Todos os direitos reservados.</div>
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
  });

  const topButton = document.querySelector('.to-top');
  /* A contração acompanha a rolagem gradualmente, sem salto visual. */
  let scrollFrame;
  function updateScrollState() {
    const progress = Math.min(window.scrollY / 180, 1);
    header?.style.setProperty('--header-top-height', `${70 - (14 * progress)}px`);
    header?.style.setProperty('--header-top-padding', `${11 - (5 * progress)}px`);
    header?.style.setProperty('--brand-mark-size', `${44 - (10 * progress)}px`);
    header?.style.setProperty('--brand-title-size', `${1.34 - (.18 * progress)}rem`);
    header?.style.setProperty('--navigation-padding', `${11 - (3 * progress)}px`);
    header?.style.setProperty('--brand-subtitle-opacity', String(1 - (.82 * progress)));
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
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' })
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

  const isProject = type === 'project';
  const metadata = isProject ? `${item.theme} · ${item.period}` : `${item.category} · ${formatDate(item.date)}`;
  const body = isProject
    ? `<p><b>Período:</b> ${item.period} · <b>Status:</b> ${item.status}</p><h3>Objetivos</h3><p>${item.objectives}</p><h3>Metodologia</h3><p>${item.methodology}</p><h3>Resultados e produtos</h3><p>${item.results}</p><h3>Parceiros</h3><p>${item.partners}</p>`
    : `<p>${item.content}</p><p>Esta notícia integra o acervo institucional do NEFIP. Consulte os materiais relacionados e acompanhe as próximas atualizações.</p>`;

  root.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><article class="modal-dialog"><button class="modal-close" aria-label="Fechar">×</button><p class="modal-meta">${metadata}</p><h1 id="modal-title">${item.title}</h1><p class="lead" style="color:#657287">${item.summary}</p><div class="modal-content">${body}</div></article></div>`;
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
  const loading = eager ? 'eager' : 'lazy';
  const image = item.coverImage
    ? `<img src="${item.coverImage}" alt="${item.coverAlt || item.title}" loading="${loading}">`
    : '<span class="news-cover-placeholder" aria-hidden="true">Dados públicos</span>';
  return `<a class="${className}" href="${item.pageUrl}" aria-label="Ler ${item.title}">${image}</a>`;
}

function newsCard(item) {
  return `<article class="item-card news-card">${newsCover(item, 'card-cover')}<span class="meta">${item.category} · ${formatDate(item.date)}</span><h2>${item.title}</h2><p>${item.summary}</p><a class="text-link" href="${item.pageUrl}">Ler notícia →</a></article>`;
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

  const featured = news.find(item => item.featured);
  byId('featured-news').innerHTML = `<article class="featured">${newsCover(featured, 'featured-visual', true)}<div class="featured-copy"><p class="eyebrow">NOTÍCIA EM DESTAQUE</p><p class="meta">${featured.category} · ${formatDate(featured.date)}</p><h2>${featured.title}</h2><p>${featured.summary}</p><a class="text-link" href="${featured.pageUrl}">Ler notícia →</a></div></article>`;

  function renderNews() {
    const search = getSelectValue('news-search').toLowerCase();
    const category = getSelectValue('news-category');
    const year = getSelectValue('news-year');
    const filtered = news.filter(item => (!search || `${item.title} ${item.summary}`.toLowerCase().includes(search)) && (!category || item.category === category) && (!year || item.date.startsWith(year)));
    list.innerHTML = filtered.slice(0, visibleItems).map(newsCard).join('') || '<p>Nenhuma notícia encontrada.</p>';
    moreButton.style.display = (filtered.length > visibleItems || newsConfig.pages.length) ? 'block' : 'none';
  }

  ['news-search', 'news-category', 'news-year'].forEach(id => byId(id).addEventListener('input', async () => { while (newsConfig.pages.length) await loadNewsPage(); visibleItems = 3; renderNews(); }));
  moreButton.addEventListener('click', async () => { visibleItems += 3; while (news.length < visibleItems && newsConfig.pages.length) await loadNewsPage(); renderNews(); });
  renderNews();
}

function initProjects() {
  populateSelect('project-theme', projects.map(item => item.theme));
  populateSelect('project-year', projects.map(item => item.year));
  populateSelect('project-status', projects.map(item => item.status));
  const list = byId('projects-list');

  function renderProjects() {
    const filtered = projects.filter(item => ['theme', 'year', 'status'].every(field => !getSelectValue(`project-${field}`) || item[field] === getSelectValue(`project-${field}`)));
    list.innerHTML = filtered.map(item => `<article class="item-card"><span class="meta">${item.status} · ${item.period}</span><h2>${item.title}</h2><p>${item.summary}</p><p><b>${item.theme}</b></p><button class="text-link open-project" data-id="${item.id}">Ver projeto →</button></article>`).join('') || '<p>Nenhum projeto encontrado.</p>';
  }
  ['project-theme', 'project-year', 'project-status'].forEach(id => byId(id).addEventListener('change', renderProjects));
  renderProjects();
}

function initPublications() {
  populateSelect('pub-type', publications.map(item => item.type));
  populateSelect('pub-year', publications.map(item => item.year));
  populateSelect('pub-theme', publications.map(item => item.theme));
  const list = byId('publications-list');
  const tabs = [...document.querySelectorAll('.publication-tab')];
  let activeCollection = '';

  function renderPublications() {
    const filtered = publications.filter(item =>
      (!activeCollection || item.collection === activeCollection) &&
      ['type', 'year', 'theme'].every(field => !getSelectValue(`pub-${field}`) || item[field] === getSelectValue(`pub-${field}`))
    );
    list.innerHTML = filtered.map(item => `<article class="publication"><div><span class="pub-type">${item.type}</span><p>${item.year}</p></div><div><h2>${item.title}</h2><p>${item.authors}</p><p>${item.summary}</p><p class="keywords"><b>Palavras-chave:</b> ${item.keywords}</p></div>${item.link ? `<a class="button primary" href="${item.link}" target="_blank" rel="noopener noreferrer">Acessar</a>` : ''}</article>`).join('') || '<p class="empty-state">Nenhuma publicação encontrada para este filtro.</p>';
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
  byId('awards-list').innerHTML = awards.map(item => `<article class="award"><span class="award-year">${item.year}</span><p class="eyebrow">${item.institution}</p><h2>${item.name}</h2><p><b>Projeto relacionado:</b> ${item.project}</p><p>${item.description}</p>${item.link ? `<a class="text-link" href="${item.link}" target="_blank" rel="noopener noreferrer">Conhecer o reconhecimento →</a>` : ''}</article>`).join('');
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
  byId('team-list').innerHTML = team.map(item => `<article class="person"><div class="avatar" aria-hidden="true">${item.name.split(' ').map(word => word[0]).join('').slice(0, 2)}</div><h2>${item.name}</h2><p class="role">${item.role}</p><p><b>${item.interest}</b></p><p>${item.bio}</p></article>`).join('');
}

/* -------------------- INICIALIZAÇÃO DA PÁGINA ATUAL -------------------- */
addFavicon();
buildHeader();
buildFooter();
setupGlobalInteractions();
setupCarousels();

const pageInitializers = { home: initHome, news: initNews, projects: initProjects, publications: initPublications, awards: initAwards, team: initTeam, data: initData };
pageInitializers[currentPage]?.();
