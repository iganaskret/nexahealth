// Variables
let root = document.documentElement;
// const postLink = "https://nexahealth.dk/wp-json/wp/v2/posts?_embed";
// const template = document.querySelector("template").content;
// const body = document.querySelector("body");
// const content = document.querySelector(".content");
// const burgerMenu = document.querySelector(".burger-menu");
const loaderText = document.querySelector(".loader .header");
const loaderWrapper = document.querySelector(".wrapper");
let typewriterText = "NEXA HEALTH";
let vWidth = root.clientWidth;
root.style.setProperty("--v-width", vWidth);

// Fetch SVG loader
// fetch("../Images/head.svg")
//   .then(e => e.text())
//   .then(data => loadSVGloader(data));

// function loadSVGloader(data) {
//   document.querySelector(".loader").innerHTML = data;
// }

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

//delete this line!
// loaded();

function loaded() {
  // loaderWrapper.classList.add("fade-out-menu");
  // setTimeout(() => {
  //   loaderWrapper.classList.add("hide");
  //   loaderWrapper.classList.remove("fade-out-menu");
  // }, 500);
  // setTimeout(() => {
  //   body.classList.add("body-loaded");
  //   body.classList.remove("no-scroll");
  // }, 700);
  // content.classList.remove("hide");
}

// Fetch SVG logo
// fetch("../Images/logo-final-1.svg")
//   .then(e => e.text())
//   .then(data => loadSVGlogo(data));

// function loadSVGlogo(data) {
//   document.querySelector(".logo").innerHTML = data;
// }

// // Open / close burger menu
// burgerMenu.addEventListener("click", () => {
//   burgerMenu.classList.toggle("menu-on");
//   if (burgerMenu.classList.contains("menu-on")) {
//     root.style.setProperty("--opacity1", "0");
//     root.style.setProperty("--opacity2", "1");
//     document.querySelector(".menu").classList.remove("hide");
//     document.querySelector(".menu").classList.add("fade-in-menu");
//     setTimeout(() => {
//       document.querySelector(".menu").classList.remove("fade-in-menu");
//     }, 500);
//   } else {
//     root.style.setProperty("--opacity1", "1");
//     root.style.setProperty("--opacity2", "0");
//     document.querySelector(".menu").classList.add("fade-out-menu");
//     setTimeout(() => {
//       document.querySelector(".menu").classList.add("hide");
//       document.querySelector(".menu").classList.remove("fade-out-menu");
//     }, 500);
//   }
//   document.querySelector("body").classList.toggle("no-scroll");
// });

// // Fetch and display from Wordpress

// function loadData() {
//   fetch(postLink)
//     .then(e => e.json())
//     .then(showData);
// }

// function showData(data) {
//   data.forEach(post => {
//     //clone
//     const clone = template.cloneNode(true);
//     //populate
//     const postHeader = clone.querySelector(".post-header");
//     const postContent = clone.querySelector(".post-content");
//     postHeader.textContent = post.title.rendered;
//     postContent.innerHTML = post.content.rendered;

//     //append
//     document.querySelector(".post-container").appendChild(clone);
//   });
// }

// loadData(postLink);
