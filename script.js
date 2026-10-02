// Generate local, high-contrast QR codes; retain PNG fallbacks if unavailable.
(() => {
  "use strict";

  const svgNamespace = "http://www.w3.org/2000/svg";
  const quietZone = 4;
  document.querySelectorAll(".qr-code").forEach((container) => {
    if (typeof qrcode !== "function") return;
    try {
      const destination = container.closest(".profile-card").querySelector(".facebook-button").getAttribute("href");
      const code = qrcode(0, "H");
      code.addData(destination, "Byte");
      code.make();
      const modules = code.getModuleCount();
      const size = modules + quietZone * 2;
      const svg = document.createElementNS(svgNamespace, "svg");
      svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
      svg.setAttribute("width", "280");
      svg.setAttribute("height", "280");
      svg.setAttribute("role", "img");
      svg.setAttribute("aria-label", `Scan to visit ${container.dataset.name} on Facebook`);
      svg.setAttribute("shape-rendering", "crispEdges");
      const background = document.createElementNS(svgNamespace, "rect");
      background.setAttribute("width", String(size));
      background.setAttribute("height", String(size));
      background.setAttribute("fill", "#ffffff");
      svg.append(background);
      const squares = [];
      for (let row = 0; row < modules; row++) {
        for (let column = 0; column < modules; column++) {
          if (code.isDark(row, column)) squares.push(`M${column + quietZone},${row + quietZone}h1v1h-1z`);
        }
      }
      const path = document.createElementNS(svgNamespace, "path");
      path.setAttribute("d", squares.join(""));
      path.setAttribute("fill", "#000000");
      svg.append(path);
      container.replaceChildren(svg);
    } catch (error) {
      console.warn("QR generation unavailable; using the local fallback.", error);
    }
  });

  const year = document.getElementById("year");
  if (year) {
    const khmerDigits = "០១២៣៤៥៦៧៨៩";
    year.textContent = String(new Date().getFullYear()).replace(
      /\d/g,
      (digit) => khmerDigits[Number(digit)]
    );
  }
})();
