const form = document.querySelector(".chat-area .typing-area"),
btnSend = form.querySelector("button"),
message = form.querySelector("input[name='message']"),
incoming = form.querySelector("input[name='incoming']"),
chatBox = document.querySelector(".chat-area .chat-box");

const token = document.querySelector('meta[name="csrf-token"]').content;

message.onkeypress = (event) => {
    return event.keyCode != 13 || event.shiftKey == false;
}

btnSend.onclick = (e) => {
    e.preventDefault();

    let url = form.action;
    let data = new FormData(form);
    callAPI(url, "POST", token, data, callAPICallback);
}

function callAPI(url, method, token, data, callbackFunction, isSearch = false) {

    let xhr = new XMLHttpRequest(); //creating XML object
    xhr.open(method, url, true);

    xhr.setRequestHeader("X-CSRF-Token", token);
    xhr.responseType = "json";

    // let data = "keyword=" + keyword;

    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            callbackFunction(xhr, isSearch);
        }
    }
    xhr.send(data);
}

function callAPICallback(response, isSearch) {
    if (response.status === 200) {
        let data = response.response;
        let html = "";
        if (data.status) {
            message.value = "";
            console.log(data.message);

        } else {

            console.log(data.message);
        }
        console.log(response);
    }
}

function getChatCallback(response, isSearch) {
    if (response.status === 200) {
        let res = response.response;
        let html = "";
        if (res.status) {
            const user = res.user;
            for (let index = 0; index < res.data.length; index++) {

                // console.log("A: " + res.data[index]);
               if(res.data[index]['incoming_id'] == incoming.value) {
                    
                html += `<div class="chat outgoing">
                    <div class="details">
                        <p>` + res.data[index]['message'] + `</p>
                    </div>
                </div>`;
                } else {
                    html += `<div class="chat incoming">
                    <img src="/storage/images/` + user.avatar_path + `" alt="">
                    <div class="details">
                        <p>` + res.data[index]['message'] + `</p>
                    </div>
                </div>`;
                }
                
            }

            chatBox.innerHTML = html;

        } else {

            chatBox.innerHTML = html;
        }
        console.log(response);
    }
}

let isFirst = true;

window.scrollTo(0, 500);

setInterval(() => {
    let data = "";
    callAPI("/get-chat/" + incoming.value, "GET", token, data, getChatCallback);
    if(isFirst == true) {
        window.scrollTo(0, 1000);
        // window.scrollTo(0,chatBox.scrollHeight);
        isFirst = false;
    }
}, 500);