const currentScript = document.currentScript;
const scriptDir = currentScript?.src ? new URL('.', currentScript.src) : new URL('./', window.location.href);
const frontendRoot = new URL('..', scriptDir);

const resources = {
  menu: new URL('components/menu.html', frontendRoot).href,
  menuStyles: new URL('assets/menu.css', frontendRoot).href,
  themeScript: new URL('src/theme-toggle.js', frontendRoot).href,
  pages: {
    home: new URL('index.html', frontendRoot).href,
    project: new URL('components/project.html', frontendRoot).href,
    about: new URL('components/about.html', frontendRoot).href,
    hash: new URL('components/hash.html', frontendRoot).href,
  },
};

const mountPoint = document.getElementById('theme-menu-mount');

if (!mountPoint) {
  console.warn('[menu] mount point "theme-menu-mount" non trovato.');
} else {
  fetch(resources.menu)
    .then((res) => {
      if (!res.ok) throw new Error(`Fetch menu fallita: HTTP ${res.status}`);
      return res.text();
    })
    .then((markup) => {
      mountPoint.innerHTML = markup;

      ensureMenuStyles();
      attachMenuNavigation(mountPoint);
      ensureThemeToggleScript();

      // Adatta la larghezza del contenitore della spirale alla larghezza del menu.
      setTimeout(updateGoldenWidth, 1000); // dopo il rendering
      window.addEventListener('resize', updateGoldenWidth);

      wireTitleNavigation();
    })
    .catch((err) => console.error('[menu] caricamento fallito:', err));
}

function ensureMenuStyles() {
  const linksToEnsure = [
    {
      rel: 'stylesheet',
      href: resources.menuStyles,
      dataset: { menuStyles: 'true' },
    },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      attributes: { crossorigin: 'anonymous' },
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;800&display=swap',
    },
  ];

  linksToEnsure.forEach((item) => {
    const normalized = new URL(item.href, window.location.href).href;
    const exists = Array.from(document.querySelectorAll(`link[rel="${item.rel}"]`))
      .some((linkEl) => linkEl.href === normalized);

    if (exists) return;

    const link = document.createElement('link');
    link.rel = item.rel;
    link.href = item.href;

    if (item.attributes) {
      Object.entries(item.attributes).forEach(([key, value]) => {
        link.setAttribute(key, value);
      });
    }

    if (item.dataset) {
      Object.entries(item.dataset).forEach(([key, value]) => {
        link.dataset[key] = value;
      });
    }

    document.head.appendChild(link);
  });
}

function ensureThemeToggleScript() {
  if (document.querySelector('script[data-theme-toggle="true"]')) return;

  const script = document.createElement('script');
  script.src = resources.themeScript;
  script.defer = true;
  script.dataset.themeToggle = 'true';
  document.head.appendChild(script);
}

function attachMenuNavigation(root) {
  const buttons = root.querySelectorAll('[data-route]');

  buttons.forEach((btn) => {
    const target = btn.getAttribute('data-route');
    const href = resources.pages[target];
    if (!href) return;

    btn.addEventListener('click', () => {
      window.location.href = href;
    });
  });
}

function wireTitleNavigation() {
  const title = document.getElementById('FibonacciText');
  if (!title) return;

  title.style.cursor = 'pointer';
  title.setAttribute('role', 'button');
  title.setAttribute('tabindex', '0');

  const go = () => {
    window.location.href = resources.pages.hash;
  };

  title.addEventListener('click', go);
  title.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') go();
  });
}

function updateGoldenWidth() {
  const menuEl = mountPoint?.querySelector('.menu');
  const goldenContainer = document.querySelector('.golden-container');

  if (!menuEl || !goldenContainer) return;

  if (window.innerWidth > 768) {
    const width = menuEl.getBoundingClientRect().width;
    goldenContainer.style.width = `${width}px`;
  } else {
    goldenContainer.style.width = '90%';
  }
}