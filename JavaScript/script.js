// Variables
const postLink = "http://iganaskret.com/wpv1/wp-json/wp/v2/nexa_health?_embed";
const template = document.querySelector("template").content;

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
