// Keep the footer year up to date.
(() => {
  "use strict";

  const year = document.getElementById("year");
  if (year) {
    const khmerDigits = "០១២៣៤៥៦៧៨៩";
    year.textContent = String(new Date().getFullYear()).replace(
      /\d/g,
      (digit) => khmerDigits[Number(digit)]
    );
  }
})();
