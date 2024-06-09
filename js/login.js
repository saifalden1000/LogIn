var loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"));

document.querySelector("h1 span").innerHTML = loggedUser;
