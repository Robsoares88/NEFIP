# NEFIP — Site institucional

Site estático em HTML, CSS e JavaScript puro. Abra `index.html` no navegador ou use uma extensão de servidor local.

## Navegação técnica

- `assets/app.js`: estrutura global, menu, listagens, filtros, modais e botão de topo. Cada página tem uma função `init...` própria.
- `assets/contact-form.js`: envio assíncrono do formulário ao Formspree; não expõe o e-mail destinatário.
- `assets/data.js`: todo conteúdo repetível, separado em blocos comentados.
- `assets/style.css`: estilos por seção, com cabeçalhos em caixa alta.
- `news/content/<slug>.json`: fonte de cada notícia, editável pelo Pages CMS.
- `scripts/build_news.py`: gera páginas individuais em `noticias/<slug>/` e o índice leve carregado na listagem.

## Onde editar

- Conteúdo de projetos, publicações, premiações e equipe: `assets/data.js`.
- Notícias publicadas: use o Pages CMS; ele grava o arquivo em `news/content/` e o GitHub Actions gera o site automaticamente.
- O gerador separa automaticamente o índice em páginas de 24 itens; a listagem carrega páginas adicionais somente quando necessário.
- Imagens devem ser enviadas pelo Pages CMS e ficam em `news/media/`. URLs externas não são aceitas.
- Textos fixos de páginas: respectivos arquivos `.html`.
- Cores, tipografia e layout: `assets/style.css`.
- Navegação, cards, filtros e modais: `assets/app.js`.
- Logotipo: substitua `assets/logo.png` mantendo o mesmo nome, ou atualize as referências no projeto.

Para inserir novos registros, copie um objeto existente em `assets/data.js`, altere seus dados e separe os objetos por vírgula. Links de PDF, DOI, dashboards e redes sociais estão como `#` e devem ser trocados pelos endereços finais.
