var leftTiltTreshold = 50;
var rightTiltTreshold = 0;
var leftTreshold = 10;
var rightTreshold = 0;
var topTreshold = 0;
var bottomTreshold = 0;
var tilted = false;
var element;
var width, height;
var CardPanRecognizer, CardTapRecognizer;
var FooterSwipeRecognizer;
var currentcard, currentimage, numberofimages;
docReady(function() {
    var spinner = new Spinner().spin();
    var target = document.getElementsByClassName("content")[0];
    target.appendChild(spinner.el);
    calculateTresholds();
    preload();
});

function initEvent() {
    CardPanRecognizer = new Hammer(element);
    CardPanRecognizer.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, treshold: 0 }));
    CardPanRecognizer.on("pan", HandleDrag);
    CardTapRecognizer = new Hammer(element);
    CardTapRecognizer.add(new Hammer.Tap());
    CardTapRecognizer.on("tap", HandleTap);

    FooterSwipeRecognizer = new Hammer(document.getElementById("footer"));
    FooterSwipeRecognizer.add(new Hammer.Swipe({direction: Hammer.DIRECTION_VERTICAL}));
    FooterSwipeRecognizer.on("swipe", HandleSwipe);
}

function calculateTresholds() {
    width = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    height = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    leftTiltTreshold = (width / -2) + 20;
    leftTreshold = (width / -2) + 10;
    rightTiltTreshold = (width / 2) - 20;
    rightTreshold = (width / 2) - 10;
    topTreshold = document.getElementById("header").style.bottom;
    bottomTreshold = height - document.getElementById("footer").style.height;
    console.log(rightTiltTreshold);
    //alert(width / 4 + " ; " + -width / 4);
}

var lastX = 0;
var lastY = 0;
let highestVelocity = 0;
var isDragging = false;

function HandleDrag(event) {
    //Reference to card obj
    let element = event.target;
    let direction = event.direction;
    //Calculate new position of card
    if (!isDragging) {
        isDragging = true;
        lastX = element.offsetLeft;
        lastY = element.offsetTop;
    }
    let eX = (event.deltaX + lastX);
    let eY = (event.deltaY + lastY);
    //console.log(eX, eY);
    //TODO: add treshold;
    //Move card to new position
    if (eX <= leftTiltTreshold) {
        if (!tilted) {
            element.className = "tilt_left";
            tilted = true;
        }
    } else if (eX >= rightTiltTreshold) {
        if (!tilted) {
            element.className = "tilt_right";
            tilted = true;
        }
    } else if (eX >= leftTiltTreshold || eX <= rightTiltTreshold) {
        if (tilted) {
            element.className = "tiltback";
            tilted = false;
        }
    }

    let Y = element.style.bottom;
    if (eY <= topTreshold || Y >= bottomTreshold) { /*Botom/toptreshold*/ } else {
        element.style.left = eX + "px";
        element.style.top = eY + "px";
    }

    if (event.isFinal) {
        console.log(event.deltaX);
        console.log(event.velocity);
        isDragging = false;
        if (event.direction !== Hammer.DIRECTION_VERTICAL) {
            if (event.velocity > -1 || event.velocity < 1) {
                if (event.deltaX > width / 4 && event.velocity > 1) {
                    dismissCard(Hammer.DIRECTION_RIGHT); //like
                } else if (event.deltaX < -width / 4 && event.velocity < -1) {
                    dismissCard(Hammer.DIRECTION_LEFT); //dislike
                }
            } else {
                dismissCard();
            }
        }
    }
}

function dismissCard(direction) {
    console.log("loll");
    element.style.display = "none";
    delete element;
    //Transmit the choice.

    if (current < numberofbooks) {
        current++;
        currentcard = data[current];
        setTimeout(function() {
            createNewCard(false);
        }, 200);
    } else {
        setTimeout(createLastCard, 200);
    }
}

function createNewCard(first) {
    var coverimageurl = currentcard.path + "/images/1.jpg";
    element = document.createElement("img");
    element.classList.add("bookimage");
    element.id = "card";
    //Reset touch-action response to respond to new element
    element.src = coverimageurl;
    var images = currentcard.images;
    for (var image of images) {
        var el = new Image;
        el.src = currentcard.path + "/images/" + image;
    }
    currentimage = 1;
    numberofimages = images.length;
    console.log(numberofimages);
    initEvent();
    var holder = document.getElementsByClassName("content")[0];
    if (first) {
        holder.innerHTML = "";
    }
    holder.appendChild(element);
}

function createLastCard() {
    element = document.createElement("img");
    element.classList.add("bookimage");
    element.id = "card";
    element.src = "empty.jpg";
    document.getElementsByClassName("content")[0].appendChild(element);
}

//SECTION: cycling images of the book

function HandleTap(event) {
    let location = event.center;
    //We need to check what side of the image was tapped
    let half = width / 2;
    if (location.x > half) {
        //right
        nextImage();
    } else {
        //left
        previousImage();
    }
}

function nextImage() {
    //Images to be stored in current object
    if (currentimage < numberofimages) {
        //Next image
        currentimage++;
        element.src = currentcard.path + "/images/" + currentimage + ".jpg";  
    } else {
        //First image
        currentimage = 1;
        element.src = currentcard.path + "/images/1.jpg";
    }
}

function previousImage() {
    if (currentimage > 1) {
        //Previous image
        currentimage--;
        element.src = currentcard.path + "/images/" + currentimage + ".jpg";
    } else {
        //Last image
        currentimage = numberofimages;
        element.src = currentcard.path + "/images/" + numberofimages + ".jpg"; 
    }
}

//SECTION: footer swipe for bio

function HandleSwipe(event) {
    var footer = document.getElementById("footer");
    console.log(event.direction);
    if (event.direction == Hammer.DIRECTION_UP) {
        console.log("up");
        footer.style.height = "80%";
    } else {
        console.log("down");    
        footer.style.height = "20%";
    }
}
