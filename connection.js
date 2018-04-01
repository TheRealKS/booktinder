var ws;
var data;
var current = 0;
var numberofbooks;
function connect() {
    //Connect to the server
    ws = new WebSocket("localhost:6848");
    ws.onmessage(function(event) {

    });
    ws.onopen(function(event) {

    });
    ws.onclose(function(event) {

    });
}

function transmitChoice(choice) {
    ws.send(JSON.stringify(choice));
}

//SECTION: preload assets: preload books

function preload() {
    //TODO: add fetch polyfill to support ios < 8 and other outdated garbage
    //First, retrieve a list of the available books, in random order
    fetch("getBooks.php").then(function(res) {
        if (res.ok) {
            return res.json();
        } else {
            console.log("Error while loading book list: " + res.status + ", " + res.statusText);
        }
    }).then(function(json) {    
        //Retrieved
        data = json;
        numberofbooks = data.length - 1;
        currentcard = data[current];
        createNewCard(true);
        connect();
        //Also preload the final image;
        var e = new Image;
        e.src = "empty.jpg";
    });
}