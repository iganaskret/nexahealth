// Variables
const postLink = "https://nexahealth.dk/wp-json/wp/v2/posts?_embed";
const template = document.querySelector("template").content;
const burgerMenu = document.querySelector(".burger-menu");

// Fetch SVG logo

fetch("../Images/logo-final-1.svg")
  .then(e => e.text())
  .then(data => loadSVG(data));

function loadSVG(data) {
  document.querySelector(".logo").innerHTML = data;
}

// Open / close burger menu
burgerMenu.addEventListener("click", () => {
  burgerMenu.classList.toggle("menu-on");
  document.querySelector(".menu").classList.toggle("hide");
  document.querySelector("body").classList.toggle("no-scroll");
});

// Fetch and display from Wordpress

function loadData() {
  fetch(postLink)
    .then(e => e.json())
    .then(showData);
}

function showData(data) {
  data.forEach(post => {
    //clone
    const clone = template.cloneNode(true);
    //populate
    const postHeader = clone.querySelector(".post-header");
    const postContent = clone.querySelector(".post-content");

    postHeader.textContent = post.title.rendered;
    postContent.innerHTML = post.content.rendered;

    //append
    document.querySelector(".post-container").appendChild(clone);
  });
}

loadData(postLink);
