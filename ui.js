var leftTiltTreshold = 50;
var rightTiltTreshold = 0;
var leftTreshold = 10;
var rightTreshold = 0;
var topTreshold = 0;
var bottomTreshold = 0;
var tilted = false;
var element;
window.onload = function() {
    calculateTresholds();
    element = document.getElementById("card");
    var CardPanRecognizer = new Hammer(element);
    CardPanRecognizer.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, treshold: 0 }));
    CardPanRecognizer.on("pan", HandleDrag);
}

function calculateTresholds() {
    var width = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    var height = window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    leftTiltTreshold = (width / -2) + 20;
    leftTreshold = (width / -2) + 10;
    rightTiltTreshold = (width / 2) - 20;
    rightTreshold = (width / 2) - 10;
    console.log(rightTiltTreshold);
}

var lastX = 0;
var lastY = 0;
let highestVelocity = 0;
var isDragging = false;

function HandleDrag(event) {
    //Reference to card obj
    let element = event.target;
    //Calculate new position of card
    if (!isDragging) {
        isDragging = true;
        lastX = element.offsetLeft;
        lastY = element.offsetTop;
    }
    let eX = (event.deltaX + lastX);
    let eY = (event.deltaY + lastY);
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
    let velX = event.velocityX;
    if (velX > highestVelocity) {
        highestVelocity = velX;
        document.getElementById("velocity").innerHTML = velX;
    }
    document.getElementById("velocity").innerHTML = event.velocity;
    element.style.left = eX + "px";
    element.style.top = eY + "px";

    if (event.isFinal) {
        isDragging = false;
        
    }
}

function dismissCard() {
    console.log("loll");
    element.style.display = "none";
    //TODO: animation

}