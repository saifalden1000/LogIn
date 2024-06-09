// login card animation
var card = document.getElementById("card");
var registerBtn = document.getElementById("register");
var loginBtn = document.getElementById("login");
registerBtn.addEventListener("click", function () {
  card.classList.add("activated");
});

loginBtn.addEventListener("click", function () {
  card.classList.remove("activated");
});
// inputs and validation
var signUp = document.querySelector("#signup");
var signIn = document.querySelector("#signin");
var userName = document.getElementById("name");
var userEmail = document.getElementById("email");
var userPassword = document.getElementById("password");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var name;
var email;
var password;
var user;
var usersList = [];
if (localStorage.getItem("usersList") != null) {
  usersList = JSON.parse(localStorage.getItem("usersList"));
}

var regex = {
  name: /^[a-z0-9_-]{3,15}$/,
  email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
};
// ============== signup button
signUp.addEventListener("click", function () {
  user = {
    name: userName.value,
    email: userEmail.value,
    password: userPassword.value,
  };
  var test1 = validateInput(userName);
  var test2 = validateInput(userEmail);
  var test3 = validateInput(userPassword);
  if (test1 == true && test2 == true && test3 == true) {
    userExists(usersList.length);
  } else {
    document.querySelector("#failedsignup").classList.remove("d-none");
  }
});
// ================= signin button
signIn.addEventListener("click", function () {
  var testuser = null;
  for (var i = 0; i < usersList.length; i++) {
    if (loginEmail.value == usersList[i].email) {
      testuser = usersList[i].name;
      if (loginPassword.value == usersList[i].password) {
        window.location.href = "./login.html";
        sessionStorage.setItem("loggedUser", JSON.stringify(testuser));
      } else {
        document.getElementById("wrongpassword").classList.remove("d-none");
        clearPasswordInput();
      }
    }
  }
  if (testuser == null) {
    document.getElementById("wronguser").classList.remove("d-none");
    clearPasswordInput();
  }
});
// =============== signup inputs
var signUpList = document.querySelectorAll(".signup-form");
for (var i = 0; i < signUpList.length; i++) {
  signUpList[i].addEventListener("input", function () {
    validateInput(this);
    document.getElementById("usedBefore").classList.add("d-none");
    document.querySelector("#failedsignup").classList.add("d-none");
  });
}
// =============== signin inputs
var signInList = document.querySelectorAll(".signin-form");
for (var i = 0; i < signInList.length; i++) {
  signInList[i].addEventListener("input", function () {
    clearWrongUser();
  });
}
// ========= hides the wrong signin errors
function clearWrongUser() {
  document.getElementById("wronguser").classList.add("d-none");
  document.getElementById("wrongpassword").classList.add("d-none");
}
// =========== clears password after failing to log in
function clearPasswordInput() {
  loginPassword.value = "";
}
// ========== validation function with showing and hiding errors messeges
function validateInput(element) {
  if (regex[element.id].test(element.value) == true) {
    element.nextElementSibling.classList.add("d-none");
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    removeValidClass(element);
    return true;
  } else {
    element.nextElementSibling.classList.remove("d-none");
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    removeValidClass(element);
    return false;
  }
}
// ======== removes the validtion indicators after clearing the signup input
function removeValidClass(element) {
  if (element.value == "") {
    element.nextElementSibling.classList.add("d-none");
    element.classList.remove("is-valid");
    element.classList.remove("is-invalid");
  }
}
// checks if users exists or not and add him to the array
function userExists(num) {
  var value = 0;
  if (usersList.length == 0) {
    usersList.push(user);
    localStorage.setItem("usersList", JSON.stringify(usersList));
    setLogInData();
  } else {
    for (var i = 0; i < num; i++) {
      if (userEmail.value == usersList[i].email) {
        value = 1;
      }
    }
    if (value == 0) {
      usersList.push(user);
      localStorage.setItem("usersList", JSON.stringify(usersList));

      setLogInData();
    } else {
      document.getElementById("usedBefore").classList.remove("d-none");
    }
  }
}
//  moves to login card after signup and auto inputs the email and password for user
function setLogInData() {
  card.classList.remove("activated");
  loginEmail.value = user.email;
  loginPassword.value = user.password;
  document.querySelector(".text-success").classList.remove("d-none");
  clearSignUpInput();
}
//  clears signup inputs after signing up
function clearSignUpInput() {
  userName.value = "";
  userEmail.value = "";
  userPassword.value = "";
}
