// Variables
let root = document.documentElement;
const postLink = "https://nexahealth.dk/wp-json/wp/v2/posts?_embed";
const template = document.querySelector("template").content;
const body = document.querySelector("body");
const content = document.querySelector(".content");
const burgerMenu = document.querySelector(".burger-menu");
const loaderWrapper = document.querySelector(".wrapper");
let user = document.querySelector(".user-type .disabled").textContent;
console.log(user);
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
  content.classList.remove("hide");
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
    if (
      document
        .querySelector(".post-container")
        .classList.contains("fade-in-posts")
    ) {
      const postContent = clone.querySelector(".post-content");
      if (post.title.rendered == user) {
        postContent.innerHTML = post.content.rendered;

        //append
        document.querySelector(".post-container").appendChild(clone);
      }
    }
  });
  showPrototype();
}

function showPrototype() {
  //show prototype on small screens
  document.querySelector(".video-btn").addEventListener("click", () => {
    document.querySelector(".video-modal").classList.remove("hide");
  });
  document.querySelector(".close-burger").addEventListener("click", () => {
    document.querySelector(".video-modal").classList.add("hide");
  });
}

// function videoControl() {
//   const video = document.querySelector(".video");
//   const config = {
//     root: null, //document.querySelector('#some-element')
//     rootMargin: "0px",
//     threshold: [0, 0.5, 0.75, 1]
//   };
//   let observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//       if (entry.intersectionRatio > 0.35) {
//         document.querySelector("#chatbox-video").play();
//       } else {
//         document.querySelector("#chatbox-video").pause();
//       }
//       // console.log(entry.intersectionRatio);
//     });
//   }, config);
//   observer.observe(video);
// }

loadData(postLink);
// videoControl();
