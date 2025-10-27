// trova il placeholder e inietta lì il componente HTML
fetch("components/theme-toggle.html")
  .then(res => res.text())
  .then(markup => {
    const mountPoint = document.getElementById("theme-toggle-mount");
    mountPoint.innerHTML = markup;

    // molto importante:
    // adesso che il markup è stato inserito nel DOM,
    // posso attivare la logica del toggle
    const script = document.createElement("script");
    script.src = "src/theme-toggle.js";
    script.defer = true;
    document.body.appendChild(script);
  });
