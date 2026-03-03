export default function decorate(block) {
  block.innerHTML = `
    <div class="search-wrapper">
      <input type="text" placeholder="Search..." class="search-input" />
      <button class="search-btn">Search</button>
    </div>
  `;

  const input = block.querySelector('.search-input');
  const button = block.querySelector('.search-btn');

  button.addEventListener('click', () => {
    const query = input.value.trim();
    if (query) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      button.click();
    }
  });
}
