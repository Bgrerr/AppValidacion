const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchButton');
const resultsDiv = document.getElementById('searchResults');

async function fetchAndSearch(term) {
  const url = `https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(term)}&format=json&origin=*`;
  
  const res = await fetch(url);
  const data = await res.json();

  const results = data.query.search;

  resultsDiv.innerHTML = results.length
    ? results.map(r => `
        <div>
          <h3><a href="https://es.wikipedia.org/?curid=${r.pageid}" target="_blank">${r.title}</a></h3>
          <p>${r.snippet}...</p>
        </div>
      `).join('')
    : '<p>No se encontraron resultados</p>';
}

function doSearch(term) {
  searchInput.value = term;
  history.pushState({ term }, '', `?search=${encodeURIComponent(term)}`);
  fetchAndSearch(term);
}

searchBtn.addEventListener('click', () => {
  const term = searchInput.value.trim();
  if (term) {
    doSearch(term);
  }
});

window.addEventListener('popstate', (event) => {
  if (event.state?.term) {
    searchInput.value = event.state.term;
    fetchAndSearch(event.state.term);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const term = params.get('search');
  if (term) {
    searchInput.value = term;
    fetchAndSearch(term);
  }
});