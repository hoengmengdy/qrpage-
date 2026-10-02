// Keep the footer year up to date.
(() => {
  "use strict";

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
