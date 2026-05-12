(function () {
  const path = window.location.pathname;
  const inSubdir = /\/posts\/[^/]+\.html/.test(path);
  const base = inSubdir ? '../' : '';

  function isActive(page) {
    if (page === 'home')  return path.endsWith('index.html') || path.endsWith('/');
    if (page === 'posts') return path.endsWith('posts.html') || inSubdir;
    return false;
  }

  function navLink(label, href, page) {
    const cls = 'nav-btn' + (isActive(page) ? ' active' : '');
    return `<a class="${cls}" href="${base}${href}">${label}</a>`;
  }

  function openRandom() {
    function pick() {
      const post = POSTS[Math.floor(Math.random() * POSTS.length)];
      window.open(base + post.url, '_blank', 'noopener');
    }
    if (typeof POSTS !== 'undefined') {
      pick();
    } else {
      const s = document.createElement('script');
      s.src = base + 'posts.js';
      s.onload = pick;
      document.head.appendChild(s);
    }
  }

  const nav = document.getElementById('nav');
  if (!nav) return;

  nav.innerHTML =
    `<a class="nav-logo" href="${base}index.html">耽翫</a>` +
    navLink('home',  'index.html', 'home')  +
    navLink('posts', 'posts.html', 'posts') +
    `<button class="nav-btn" onclick="(${openRandom})()">random</button>`;
})();
