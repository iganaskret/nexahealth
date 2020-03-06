const form = document.querySelector("form");

form.addEventListener("submit", evt => {
  evt.preventDefault();

  if (form.reportValidity()) {
    const inputData = {
      Name: form.elements.fname.value,
      Type: form.elements.type.value,
      Email: form.elements.email.value
    };
    submitFormCode(inputData);
  } else {
    /*     alert("It's seems like your email is incorrect"); */
  }
});

function submitFormCode(inputData) {
  let postData = JSON.stringify(inputData);
  fetch("link", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5de4e9004658275ac9dc2184",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    // .then(inputData => console.log(inputData))
    .then(inputData => submittingCompleted(inputData));
}

function submittingCompleted(inputData) {
  console.log(inputData);
  if (inputData.status == 400) {
    alert("Your email is already in our database!");
  } else {
    // document.location.href = "subpage.html";
    form.classList.add("hide");
    document.querySelector(".success-message").classList.remove("hide");
  }
}
