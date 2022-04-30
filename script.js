let score = 0;
let xPosCan = 0;
let xSpeedCan = 3;
let ySpeedBall = -35;
let xPosBall;
let yPosBall;
let ballShot = false;

//Startposition Target
let xPosTar = Math.floor(Math.random() * window.innerWidth - 20);
let yPosTar = Math.floor(Math.random() * window.innerHeight/2);


function setup() {
    createCanvas(windowWidth, windowHeight);
}

//function mit MouseClick wird geschossen
function mouseClicked() {
    ballShot = true
}

function draw() {
    //Canvas Hintergrund
    background(0);
    
    //Spielelemente Hintergrund
    fill(255);

    //Element Modis in Radius
    // rectMode(RADIUS);
    ellipseMode(CORNER);

    //Scoreboard erstellen
    textSize(24);
    text("Score: " + score, 10, 25);

    //Kanone bewegt sich frei
    xPosCan += xSpeedCan;

    //Kanone geht rechts/links
    if ((xPosCan >= windowWidth - 20) || (xPosCan <= 0)) {
        xSpeedCan *= -1
    }

    if( !xPosBall ) {
        //Ball wird in Kanone gesetzt 
        yPosBall = windowHeight - 20;
    }

    //Wenn Schuss abgefeuert, dann wird geht Ball nach oben
    if (ballShot) {
        yPosBall += ySpeedBall;
    }

    //Schuss folgt Kanone, wenn Abschuss noch nicht erfolgt
    if (!ballShot) {
        xPosBall = xPosCan;
    }

    //Kanone zeichnen
    rect(xPosCan, windowHeight - 50, 20, 50);

    // Schuss zeichnen
    ellipse(xPosBall, yPosBall, 20);

    //Wenn Ball über oberen Rand geht, dann wird Ball Position wieder in Kanone gesetzt
    if (yPosBall <= 5) {
        xPosBall = xPosCan;
        yPosBall = windowHeight - 20;
        ballShot = false
    }

    //Erstelle Ziel
    xPosTar += 0.005;
    yPosTar += 0.006;

    let nX = noise(xPosTar) * width
    // let nX = 200
    let nY = noise(yPosTar) * height/2
    // let nY = 200

    //console.log(nX)
    rect(nX, nY, 20);

    //Sound
    // osci1.frequency.value = nX ;

    //Wenn Ball Ziel trifft wird Score +1
    if ((nX <= xPosBall + 19 && nX + 19 >= xPosBall) && (nY + 20 >= yPosBall)) {
        score += 1;
        xPosTar = 0;
        yPosTar = 0;
        // xSpeedCan *= 1.1;
        
    }
}