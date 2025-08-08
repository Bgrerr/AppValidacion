const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('searchResults');

async function fetchAndSearch(term) {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  const filtered = posts.filter(post => post.title.includes(term) || post.body.includes(term));
  resultsDiv.innerHTML = filtered.map(p => `<p><strong>${p.title}</strong><br>${p.body}</p>`).join('') || 'No se encontraron resultados';
}

searchBtn.addEventListener('click', () => {
  const term = searchInput.value;
  if (!term) return;
  history.pushState({ term }, '', `?search=${term}`);
  fetchAndSearch(term);
});

window.onpopstate = (event) => {
  if (event.state?.term) {
    searchInput.value = event.state.term;
    fetchAndSearch(event.state.term);
  }
};