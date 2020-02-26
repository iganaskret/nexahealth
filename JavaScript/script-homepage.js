// Variables
let root = document.documentElement;
const postLink = "https://nexahealth.dk/wp-json/wp/v2/posts?_embed";
const templateStory = document.querySelector(".story").content;
const templateChatbox = document.querySelector(".chatbox").content;
const body = document.querySelector("body");
const content = document.querySelector(".content");
const burgerMenu = document.querySelector(".burger-menu");
const loaderWrapper = document.querySelector(".wrapper");
let user = document.querySelector(".user-type .disabled").textContent;
let counter = 1;
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
    const cloneStory = templateStory.cloneNode(true);
    const cloneChatbox = templateChatbox.cloneNode(true);
    //populate
    if (
      document
        .querySelector(".post-container")
        .classList.contains("fade-in-posts")
    ) {
      const postContent = cloneStory.querySelector(".post-content");
      if (post.title.rendered == user) {
        postContent.innerHTML = post.content.rendered;
        //append
        document.querySelector(".post-container").appendChild(cloneStory);
      }
    }
    if (post.title.rendered == "Chatbox") {
      cloneChatbox.querySelector(".messages").innerHTML = post.content.rendered;
      //append
      document.querySelector(".animation").appendChild(cloneChatbox);
    }
  });
  animateChat();
}

var isInViewport = function(elem) {
  var bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

function animateChat() {
  body.classList.add("scroll-stop");

  document.querySelectorAll(".messages .msg").forEach(msg => {
    msg.style.gridRow = counter;
    let spanDiv = document.createElement("div");
    spanDiv.classList.add("span-div");
    for (let i = 0; i < 3; i++) {
      let span = document.createElement("span");
      // var dots = document.createTextNode(".");
      // span.appendChild(dots);
      spanDiv.appendChild(span);
    }
    msg.appendChild(spanDiv);
    counter++;
  });
  document.querySelectorAll(".msg")[15].classList.add("last-msg");
  setTimeout(function() {
    let j, position;
    for (let i = 0; i < 16; i++) {
      setTimeout(function() {
        // let marginValue = 100 - i * 6.5;
        document.querySelectorAll(".msg")[i].style.opacity = 1;
        console.log();
        // if (i == 0) {
        //   document.querySelectorAll(".msg")[i].classList.add("just-opacity");

        // } else if (i == 1) {
        //   document
        //     .querySelectorAll(".msg")
        //     [i - 1].classList.add("opacity-margin");
        //   document.querySelectorAll(".msg")[i].classList.add("opacity-margin");
        // } else {
        //   document.querySelectorAll(".msg")[i].classList.add("opacity-margin");
        //   document.querySelectorAll(".msg")[0].classList.remove("just-opacity");
        // }

        position = 16;
        document.querySelectorAll(".msg")[i].classList.add("move-up");
        document.querySelectorAll(".msg")[i].style.gridRow = position;
        j = i;
        while (j > 0) {
          position--;
          j--;

          document.querySelectorAll(".msg")[j].style.gridRow = position;
        }

        document.querySelectorAll(".span-div span").forEach(span => {
          span.classList.add("animation-dot");
        });
        // document.querySelectorAll(".msg")[0].style.marginTop = marginValue + "%";
        setTimeout(function() {
          document.querySelectorAll(".msg p")[i].style.display = "block";
          document.querySelectorAll(".msg .span-div")[i].style.display = "none";
        }, 2000);
      }, 3000 * i);
    }
  }, 2000);
  let obj = document.querySelector(".animation");

  let lastMsg = document.querySelector(".last-msg");

  obj.addEventListener("scroll", () => {
    if (isInViewport(lastMsg)) {
      setTimeout(function() {
        body.classList.remove("scroll-stop");
      }, 3000);

      // alert("jes");
    } else {
      body.classList.add("scroll-stop");
    }
  });

  // for (i = 0; i < 16; i++) {
  //   let j = i + 1;
  //   document.querySelectorAll(".animation .messages p")[
  //     i
  //   ].style.animationDelay = j + "s";
  // }
}

// function showPrototype() {
//   //show prototype on small screens
//   document.querySelector(".video-btn").addEventListener("click", () => {
//     document.querySelector(".video-modal").classList.remove("hide");
//   });
//   document.querySelector(".close-burger").addEventListener("click", () => {
//     document.querySelector(".video-modal").classList.add("hide");
//   });
// }

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
