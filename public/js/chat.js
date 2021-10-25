/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!******************************!*\
  !*** ./resources/js/chat.js ***!
  \******************************/
var form = document.querySelector(".chat-area .typing-area"),
    btnSend = form.querySelector("button"),
    message = form.querySelector("input[name='message']"),
    textarea = form.querySelector(".textarea-message"),
    incoming = form.querySelector("input[name='incoming']"),
    chatBox = document.querySelector(".chat-area .chat-box"),
    statusUser = document.querySelector(".chat-area .details p");
var token = document.querySelector('meta[name="csrf-token"]').content;

message.onkeypress = function (event) {
  return event.keyCode != 13 || event.shiftKey == false;
};

function scrollToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatBox.onmouseenter = function () {
  chatBox.classList.add("active");
};

chatBox.onmouseleave = function () {
  chatBox.classList.remove("active");
};

btnSend.onclick = function (e) {
  e.preventDefault();
  message.value = textarea.value;

  if (message.value == "") {
    return;
  }

  var url = form.action;
  var data = new FormData(form);
  callAPI(url, "POST", token, data, callAPICallback);
};

function callAPI(url, method, token, data, callbackFunction) {
  var isSearch = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var xhr = new XMLHttpRequest(); //creating XML object

  xhr.open(method, url, true);
  xhr.setRequestHeader("X-CSRF-Token", token);
  xhr.responseType = "json"; // let data = "keyword=" + keyword;

  xhr.onload = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      callbackFunction(xhr, isSearch);
    }
  };

  xhr.send(data);
}

function callAPICallback(response, isSearch) {
  if (response.status === 200) {
    var data = response.response;
    var html = "";

    if (data.status) {
      html = "<div class=\"chat outgoing\">\n                    <div class=\"details\">\n                        <p>" + message.value + "</p>\n                    </div>\n                </div>";
      message.value = "";
      textarea.value = "";
      chatBox.innerHTML += html;
      scrollToBottom();
    } else {
      console.log(data.message);
    }

    console.log(response);
  }
}

function getChatCallback(response, isSearch) {
  if (response.status === 200) {
    var res = response.response;
    var html = "";

    if (res.status) {
      var user = res.user;
      statusUser.innerHTML = user.status == "1" ? "Active now" : "Offline";

      for (var index = 0; index < res.data.length; index++) {
        // console.log("A: " + res.data[index]);
        if (res.data[index]['incoming_id'] == incoming.value) {
          html += "<div class=\"chat outgoing\">\n                    <div class=\"details\">\n                        <p>" + res.data[index]['message'] + "</p>\n                    </div>\n                </div>";
        } else {
          html += "<div class=\"chat incoming\">\n                    <img src=\"/storage/images/" + user.avatar_path + "\" alt=\"\">\n                    <div class=\"details\">\n                        <p>" + res.data[index]['message'] + "</p>\n                    </div>\n                </div>";
        }
      }

      chatBox.innerHTML = html;

      if (!chatBox.classList.contains("active")) {
        scrollToBottom();
      }
    } else {
      chatBox.innerHTML = html;
    }

    console.log(response);
  }
}

var count = 0;
var time = 3000;
setInterval(function () {
  var data = "";
  callAPI("/get-chat/" + incoming.value, "GET", token, data, getChatCallback);
}, time);
/******/ })()
;