/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************************!*\
  !*** ./resources/js/password-show-hide.js ***!
  \********************************************/
var passwordField = document.querySelector(".form .field input[type='password']");
var toggleBtn = document.querySelector(".form .field i.fas.fa-eye");

toggleBtn.onclick = function () {
  if (passwordField.type == "password") {
    passwordField.type = "text";
    toggleBtn.classList.add("active");
  } else {
    passwordField.type = "password";
    toggleBtn.classList.remove("active");
  }
};
/******/ })()
;