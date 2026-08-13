/* ================================================================
   FORMULÁRIO DE CONTATO
   Envia os dados ao Formspree sem redirecionar para uma página externa.
   O endpoint está definido no atributo action de contato.html.
   ================================================================ */
const contactForm = document.querySelector('.contact-form');

contactForm?.addEventListener('submit', async event => {
  /* Impede o POST tradicional e mantém a pessoa na página atual. */
  event.preventDefault();
  event.stopImmediatePropagation();

  const button = contactForm.querySelector('button[type="submit"]');
  const note = contactForm.querySelector('.form-note');
  const originalLabel = button.textContent;

  button.disabled = true;
  button.textContent = 'Enviando…';
  note.setAttribute('aria-live', 'polite');
  note.textContent = '';

  try {
    /* O header Accept faz o Formspree retornar JSON para o navegador. */
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error('Falha no envio');

    /* Limpa os campos somente após uma resposta bem-sucedida. */
    contactForm.reset();
    note.textContent = 'Mensagem enviada com sucesso. Agradecemos o seu contato.';
  } catch (error) {
    note.textContent = 'Não foi possível enviar a mensagem agora. Tente novamente em alguns instantes.';
  } finally {
    button.disabled = false;
    button.textContent = originalLabel;
  }
}, true);
