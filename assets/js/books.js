(() => {
  const library = document.querySelector('.books-library');
  if (!library) return;
  const input = library.querySelector('#books-search');
  const cards = Array.from(library.querySelectorAll('.book-card'));
  const count = library.querySelector('[data-books-count]');
  const empty = library.querySelector('[data-books-empty]');
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase().trim();
  const searchable = cards.map(card => normalize(`${card.dataset.bookTitle} ${card.dataset.bookAuthor}`));
  library.querySelector('[data-books-controls]').hidden = false;
  input.addEventListener('input', () => {
    const terms = normalize(input.value).split(/\s+/).filter(Boolean);
    let visible = 0;
    cards.forEach((card, index) => {
      card.hidden = !terms.every(term => searchable[index].includes(term));
      if (!card.hidden) visible += 1;
    });
    count.textContent = `${visible} ${visible === 1 ? 'book' : 'books'}`;
    empty.hidden = visible !== 0;
  });
})();
