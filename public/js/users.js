/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./resources/js/users.js ***!
  \*******************************/
var searchBar = document.querySelector(".users .search input");
var searchBtn = document.querySelector(".users .search button");
var usersList = document.querySelector(".users .users-list");
var token = document.querySelector('meta[name="csrf-token"]').content;

searchBtn.onclick = function () {
  searchBar.value = "";
  searchBar.classList.toggle("active");
  searchBar.focus();
  searchBtn.classList.toggle("active");
};

searchBar.onkeyup = function () {
  var keyword = searchBar.value;

  if (keyword != "") {
    searchBar.classList.add("active");
  } else {
    searchBar.classList.remove("active");
  }

  var data = "keyword=" + keyword;
  callAPI("/search", "POST", token, data, isSearch = true);
};

var time = 500;
setInterval(function () {
  var data = "";
  callAPI("/search", "POST", token, data);
  time = 3000;
}, time);

function callAPI(url, method, token, data) {
  var isSearch = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var xhr = new XMLHttpRequest(); //creating XML object

  xhr.open(method, url, true);
  xhr.setRequestHeader("X-CSRF-Token", token);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.responseType = "json"; // let data = "keyword=" + keyword;

  xhr.onload = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      callAPICallback(xhr, isSearch);
    }
  };

  xhr.send(data);
}

function callAPICallback(response, isSearch) {
  if (response.status === 200) {
    var data = response.response;
    var html = "";

    if (data.status) {
      data.users.forEach(function (item) {
        var msgReceiver = item.get_message_receiver;
        var msgSender = item.get_message_sender;
        var msg = ""; // alert(msgReceiver.length);
        // console.log(msgSender.length);

        if (msgReceiver.length != 0 && msgSender.length != 0) {
          msg = msgReceiver.at(-1).id < msgSender.at(-1).id ? msgSender.at(-1).message : msgReceiver.at(-1).message;
        } else {
          if (msgReceiver.length != 0) {
            msg = msgReceiver.at(-1).message;
          } else if (msgSender.length != 0) {
            msg = msgSender.at(-1).message;
          }
        }

        html += "<a href=\"/chat/" + item.id + "\">\n                <div class=\"content\">\n                    <img src=\"/storage/images/" + item.avatar_path + "\" alt=\"\">\n                    <div class=\"details\">\n                        <span>" + item.first_name + " " + item.last_name + "</span>\n                        <p>" + msg + "</p>\n                    </div>\n                </div>\n                <div class=\"status-dot " + (item.status == "2" ? "offline" : "") + "\"><i class=\"fas fa-circle\"></i></div>\n            </a>";
      });

      if (isSearch == true) {
        console.log('isSearch: ' + isSearch);
        console.log(data.message);
        usersList.innerHTML = html;
      } else {
        if (searchBar.classList.contains("active") == false) {
          console.log('is search false');
          usersList.innerHTML = html;
        }
      }
    } else {
      html = "<p>" + data.message + "</p>";
      usersList.innerHTML = html;
    }

    console.log(response);
  }
}
/******/ })()
;