// trova il placeholder e inietta lì il componente HTML
fetch("components/menu.html")
  .then(res => res.text())
  .then(markup => {
    const mountPoint = document.getElementById("theme-menu-mount");
    mountPoint.innerHTML = markup;

    // Dopo che il menu è stato montato, adatta la larghezza del contenitore
    // della spirale aurea (golden-container) alla larghezza del menu.
    // Questa funzione misura la larghezza effettiva del menu e applica lo
    // stesso valore come larghezza al div della spirale. Inoltre, si
    // aggiorna automaticamente al ridimensionamento della finestra.
    function updateGoldenWidth() {
      // Il menu iniettato vive all'interno di mountPoint e ha classe
      // "menu"; selezioniamo quell'elemento.
      const menuEl = mountPoint.querySelector('.menu');
      // La spirale è identificata con la classe "golden-container"
      const goldenContainer = document.querySelector('.golden-container');
      if (menuEl && goldenContainer) {
        const width = menuEl.getBoundingClientRect().width;
        goldenContainer.style.width = `${width}px`;
      }
    }

    // Esegui l'impostazione iniziale e aggiorna in caso di resize.
    updateGoldenWidth();
    window.addEventListener('resize', updateGoldenWidth);

    // molto importante:
    // adesso che il markup è stato inserito nel DOM,
    // posso attivare la logica del toggle
    const script = document.createElement("script");
    script.src = "src/theme-toggle.js";
    script.defer = true;
    document.body.appendChild(script);
  });
