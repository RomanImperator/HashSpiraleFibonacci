// app.js
(() => {
  const STORAGE_KEY = "theme"; // "dark" | "light"
  const checkbox = document.getElementById("theme-toggle");
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const getInitialTheme = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
    return media.matches ? "dark" : "light";
  };

  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    // toggle classe su <html>
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.setAttribute("data-theme", theme);
    // sincronizza lo stato dello switch (se presente)
    if (checkbox) checkbox.checked = isDark;
  };

  const setTheme = (theme) => {
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
  };

  // 1) inizializza
  applyTheme(getInitialTheme());

  // 2) reagisci al cambio dello switch
  if (checkbox) {
    checkbox.addEventListener("change", (e) => {
      setTheme(e.target.checked ? "dark" : "light");
    });
  }

  // 3) segui i cambi del sistema SOLO se l’utente non ha scelto manualmente
  media.addEventListener("change", (e) => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) applyTheme(e.matches ? "dark" : "light");
  });

  // 4) accessibilità: tasto rapido (opzionale): Alt+T
  document.addEventListener("keydown", (e) => {
    if (e.altKey && (e.key === "t" || e.key === "T")) {
      const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
      setTheme(next);
    }
  });
})();
