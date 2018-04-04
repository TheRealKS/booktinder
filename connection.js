var data;
var current = 0;
var numberofbooks;
function connect() {
    //Connect to the server
    
}

function transmitChoice(choice) {
    if (choice === Hammer.DIRECTION_RIGHT) {
        //like
        var o = {
            "type": "choice",
            "book": currentcard.title,
            "choice": true
        };
        o = JSON.stringify(o);
        fetch("submitChoice.php?data=" + o)
        .then(function(res) {
            if (res.ok) {
                return res.text();
            }
        })
        .then(function(test) {
            //Something?
        });
    } else {
        var o = {
            "type": "choice",
            "book": currentcard.title,
            "choice": false
        };
        o = JSON.stringify(o);
        fetch("submitChoice.php?data=" + o)
        .then(function(res) {
            if (res.ok) {
                return res.text();
            }
        })
        .then(function(test) {
            //Something?
        });
    }
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