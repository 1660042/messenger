const form = document.querySelector(".login form");
const continueBtn = form.querySelector(".button input");
const token = document.querySelector('meta[name="csrf-token"]').content;
const url = form.action;

// console.log(url);

form.onsubmit = (e) => {
    e.preventDefault();
}

continueBtn.onclick = () => {

    let xhr = new XMLHttpRequest(); //creating XML object
    xhr.open("POST", url, true);

    xhr.setRequestHeader("X-CSRF-Token", token);
    xhr.responseType = "json";
    
    let data = new FormData(form);
    xhr.onload = () => {
        if(xhr.readyState === XMLHttpRequest.DONE) {
            if(xhr.status === 200) {
                let data = xhr.response;
                console.log(xhr);
                if(data.status) {
                    location.href = data.url;
                } else {
                    document.querySelector("div .error-txt").innerHTML = data.message;
                    document.querySelector("div .error-txt").style.display = "block";
                }
                console.log(xhr);
            }
        }
    }
    xhr.send(data);
}