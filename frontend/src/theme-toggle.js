
//Dichiariamo una mediately-invoked function expression (IIFE) per evitare di inquinare lo scope globale

(() => {
  const STORAGE_KEY = "theme"; // "dark" | "light"
  const checkbox = document.getElementById("theme-toggle"); //prende il valore di <input type="checkbox" id="theme-toggle" />
  const media = window.matchMedia("(prefers-color-scheme: dark)"); //legge il tema preferito del sistema operativo

  /* Funzione per ottenere il tema iniziale:
     1) controlla se l'utente ha salvato una preferenza in localStorage
     2) se non c'è, usa il tema preferito del sistema operativo 
  */

  const getInitialTheme = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
    return media.matches ? "dark" : "light";
  };
  //-------------------------------------------------------------------

  // Funzione per applicare il tema alla pagina
  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    
    document.documentElement.classList.toggle("dark", isDark); // Aggiunge o rimuove la classe "dark" dall'elemento <html>
    document.documentElement.setAttribute("data-theme", theme); // Imposta l'attributo data-theme su "dark" o "light"
    
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
