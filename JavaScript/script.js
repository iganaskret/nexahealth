// Variables
let root = document.documentElement;
const loaderText = document.querySelector(".loader .header");
const loaderWrapper = document.querySelector(".wrapper");
let typewriterText = "NEXA HEALTH";
let vWidth = root.clientWidth;
root.style.setProperty("--v-width", vWidth);

// Typewriter animation
let i = 0;
function typewriting() {
  let width = document.querySelector(".loader").clientWidth;
  root.style.setProperty("--typewriter-width", width);
  loaderText.textContent = loaderText.textContent + typewriterText[i];

  i++;
  if (i < typewriterText.length) {
    setTimeout(typewriting, 150);
  } else {
    setTimeout(loaded, 1000);
  }
}
typewriting();
