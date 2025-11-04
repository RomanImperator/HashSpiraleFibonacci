// trova il placeholder e inietta lì il componente HTML
fetch("../components/menu.html")
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
      const menuEl = mountPoint.querySelector('.menu');
      const goldenContainer = document.querySelector('.golden-container');

      if (menuEl && goldenContainer) {
        if (window.innerWidth > 768) {
          // schermi grandi: adatta alla larghezza del menu
          const width = menuEl.getBoundingClientRect().width;
          goldenContainer.style.width = `${width}+50px`;
        } else {
          // schermi piccoli: riempi quasi tutto lo schermo
          goldenContainer.style.width = "90%";
        }
      }
    }


    // Esegui l'impostazione iniziale e aggiorna in caso di resize.
    updateGoldenWidth();
    window.addEventListener('resize', updateGoldenWidth);

    // molto importante:
    // adesso che il markup è stato inserito nel DOM,
    // posso attivare la logica del toggle
    const script = document.createElement("script");
    script.src = "../src/theme-toggle.js";
    script.defer = true;
    document.body.appendChild(script);

    // Naviga alla pagina input quando clicchi sulla scritta
    const title = document.getElementById('FibonacciText');
    if (title) {
      title.style.cursor = 'pointer';
      title.setAttribute('role', 'button');
      title.setAttribute('tabindex', '0');

      const go = () => (window.location.href = '../components/hash.html');
      title.addEventListener('click', go);
      title.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') go();
      });
    }
});
