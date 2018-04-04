var latest = [];
window.onload = () => {
    //Start polling
    setInterval(poll, 2000);
}

function poll() {
    fetch("../results.json")
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then((json) => {
        if (json != latest) {
            updateTable(json);
            latest = json;
        }
    });
}

function updateTable(json) {
    var table = document.getElementById("table");
    for (var o of json) {
        let elem = document.getElementById(o.title);
        if (elem === null) {
            //Add entry
            elem = document.createElement("tr");
            elem.id = o.title;
            let title = document.createElement("td");
            title.innerHTML = o.title;
            let like = document.createElement("td");
            like.innerHTML = o.score;
            let dislike = document.createElement("td");
            dislike.innerHTML = o.dislike;
            elem.appendChild(title);
            elem.appendChild(like);
            elem.appendChild(dislike);
            table.appendChild(elem);
        } else {
            //Update entry
            elem.childNodes[1].innerHTML = o.score;
            elem.childNodes[2].innerHTML = o.dislike;
        }
    }
}