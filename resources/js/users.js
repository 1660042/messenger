const searchBar = document.querySelector(".users .search input");
const searchBtn = document.querySelector(".users .search button");
const usersList = document.querySelector(".users .users-list");

const token = document.querySelector('meta[name="csrf-token"]').content;

searchBtn.onclick = () => {
    searchBar.value = "";
    searchBar.classList.toggle("active");
    searchBar.focus();
    searchBtn.classList.toggle("active");
}

searchBar.onkeyup = () => {
    let keyword = searchBar.value;

    if (keyword != "") {
        searchBar.classList.add("active");
    } else {
        searchBar.classList.remove("active");
    }

    let data = "keyword=" + keyword;

    callAPI("/search", "POST", token, data, isSearch = true);
}

setInterval(() => {
    let data = "";
    callAPI("/search", "POST", token, data);
}, 500);


function callAPI(url, method, token, data, isSearch = false) {

    let xhr = new XMLHttpRequest(); //creating XML object
    xhr.open(method, url, true);

    xhr.setRequestHeader("X-CSRF-Token", token);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.responseType = "json";

    // let data = "keyword=" + keyword;

    xhr.onload = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            callAPICallback(xhr, isSearch);
        }
    }
    xhr.send(data);
}

function callAPICallback(response, isSearch) {
    if (response.status === 200) {
        let data = response.response;
        let html = "";
        if (data.status) {
            data.users.forEach(item => {

                let msgReceiver = item.get_message_receiver;
                let msgSender = item.get_message_sender;
                let msg = "";

                if(msgReceiver != null && msgSender != null) {
                    msg = msgReceiver.at(-1).id < msgSender.at(-1).id ? msgSender.at(-1).message : msgReceiver.at(-1).message;
                } else {
                    if(msgReceiver != null) {
                        msg = msgReceiver.at(-1).message;
                    } else if(msgSender != null) {
                        msg = msgSender.at(-1).message;
                    }
                }

                html += `<a href="/chat/` + item.id + `">
                <div class="content">
                    <img src="/storage/images/`+ item.avatar_path + `" alt="">
                    <div class="details">
                        <span>` + item.first_name + " " + item.last_name + `</span>
                        <p>` + msg + `</p>
                    </div>
                </div>
                <div class="status-dot ` + (item.status == 0 ? "offline" : "") + `"><i class="fas fa-circle"></i></div>
            </a>`;
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

            html = `<p>` + data.message + `</p>`;
            usersList.innerHTML = html;

        }
        console.log(response);
    }
}