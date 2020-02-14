// Variables
let root = document.documentElement;
const postLink = "https://nexahealth.dk/wp-json/wp/v2/posts?_embed";
const body = document.querySelector("body");
// const content = document.querySelector(".schedule-content");
const burgerMenu = document.querySelector(".burger-menu");
const url = window.location.href;
typeOfUser(url);

const loaderWrapper = document.querySelector(".wrapper-subpage");
loaded();

function loaded() {
  loaderWrapper.classList.add("fade-out-menu");
  setTimeout(() => {
    loaderWrapper.classList.add("hide");
    loaderWrapper.classList.remove("fade-out-menu");
  }, 500);
  setTimeout(() => {
    body.classList.add("body-loaded");
  }, 700);
  //   content.classList.remove("hide");
}

// Fetch SVG logo
// fetch("../Images/logo-final-1.svg")
//   .then(e => e.text())
//   .then(data => loadSVGlogo(data));

// function loadSVGlogo(data) {
//   document.querySelector(".logo").innerHTML = data;
// }

// Open / close burger menu
burgerMenu.addEventListener("click", () => {
  burgerMenu.classList.toggle("menu-on");
  if (burgerMenu.classList.contains("menu-on")) {
    document.querySelector("nav").style.zIndex = "auto";
    root.style.setProperty("--opacity1", "0");
    root.style.setProperty("--opacity2", "1");
    document.querySelector(".menu").classList.remove("hide");
    document.querySelector(".menu").classList.add("fade-in-menu");
    setTimeout(() => {
      document.querySelector(".menu").classList.remove("fade-in-menu");
    }, 500);
  } else {
    document.querySelector("nav").style.zIndex = "97";
    root.style.setProperty("--opacity1", "1");
    root.style.setProperty("--opacity2", "0");
    document.querySelector(".menu").classList.add("fade-out-menu");
    setTimeout(() => {
      document.querySelector(".menu").classList.add("hide");
      document.querySelector(".menu").classList.remove("fade-out-menu");
    }, 500);
  }
  document.querySelector("body").classList.toggle("no-scroll");
});

// Fetch and display from Wordpress

if (url.includes("team") || url.includes("vision")) {
  const template = document.querySelector("template").content;

  function loadData() {
    fetch(postLink)
      .then(e => e.json())
      .then(showData);
  }

  function showData(data) {
    data.forEach(post => {
      if (
        (post.title.rendered == "Team" && url.includes("team")) ||
        (post.title.rendered == "Vision" && url.includes("vision"))
      ) {
        console.log("team or vision");
        //clone
        const clone = template.cloneNode(true);
        //populate
        const postContent = clone.querySelector(".post-content");
        postContent.innerHTML = post.content.rendered;
        //append
        document.querySelector(".post-container").appendChild(clone);
      }
    });
  }
  loadData();
}

function typeOfUser(url) {
  let queryStart = url.indexOf("?") + 1;
  let type = url.slice(queryStart);
  if (type == "health-professional") {
    document
      .querySelector("#logo-link")
      .setAttribute("href", "health-professional.html");
    document
      .querySelector("#menu-link")
      .setAttribute("href", "health-professional.html");
    if (url.includes("subscription")) {
      document.querySelector("#hp").setAttribute("selected", true);
    }
    document.querySelectorAll(".hp-link").forEach(link => {
      link.classList.add("disabled");
    });
    document.querySelectorAll(".menu-link-subpage").forEach(link => {
      page = link.textContent.toLowerCase();
      link.setAttribute("href", page + ".html?health-professional");
    });
  } else {
    document.querySelectorAll(".menu-link-subpage").forEach(link => {
      page = link.textContent.toLowerCase();
      link.setAttribute("href", page + ".html?citizen");
    });
    if (url.includes("subscription")) {
      document.querySelector("#citizen").setAttribute("selected", true);
    }
    document.querySelector("#logo-link").setAttribute("href", "citizen.html");
    document.querySelector("#menu-link").setAttribute("href", "citizen.html");
    document.querySelectorAll(".citizen-link").forEach(link => {
      link.classList.add("disabled");
    });
  }
}
