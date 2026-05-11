(function () {
  const path = window.location.pathname;
  const inSubdir = /\/posts\/[^/]+\.html/.test(path);
  const base = inSubdir ? '../' : '';

  function isActive(page) {
    if (page === 'home')   return path.endsWith('index.html') || path.endsWith('/');
    if (page === 'posts')  return path.endsWith('posts.html') || inSubdir;
    if (page === 'random') return path.endsWith('random.html');
    return false;
  }

  function navLink(label, href, page) {
    const cls = 'nav-btn' + (isActive(page) ? ' active' : '');
    return `<a class="${cls}" href="${base}${href}">${label}</a>`;
  }

  const nav = document.getElementById('nav');
  if (!nav) return;

  nav.innerHTML =
    `<a class="nav-logo" href="${base}index.html">耦翰</a>` +
    navLink('home',   'index.html',  'home')   +
    navLink('posts',  'posts.html',  'posts')  +
    navLink('random', 'random.html', 'random');
})();
