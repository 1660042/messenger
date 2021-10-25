/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./resources/js/login.js ***!
  \*******************************/
var form = document.querySelector(".login form");
var continueBtn = form.querySelector(".button input");
var token = document.querySelector('meta[name="csrf-token"]').content;
var url = form.action; // console.log(url);

form.onsubmit = function (e) {
  e.preventDefault();
};

continueBtn.onclick = function () {
  var xhr = new XMLHttpRequest(); //creating XML object

  xhr.open("POST", url, true);
  xhr.setRequestHeader("X-CSRF-Token", token);
  xhr.responseType = "json";
  var data = new FormData(form);

  xhr.onload = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var _data = xhr.response;
        console.log(xhr);

        if (_data.status) {
          location.href = _data.url;
        } else {
          document.querySelector("div .error-txt").innerHTML = _data.message;
          document.querySelector("div .error-txt").style.display = "block";
        }

        console.log(xhr);
      }
    }
  };

  xhr.send(data);
};
/******/ })()
;