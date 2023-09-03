let rotation = 0;
let lastVariation;
let off = false;

function setup() {
    const canvasWidth = windowWidth * 0.8;
    const canvasHeight = windowHeight * 0.8;
    createCanvas(canvasWidth, canvasHeight, WEBGL);
    frameRate(30);
    background(10);
}

function draw() {
    rotateZ(rotation);
    fill(255);
    noStroke();

    const maxSize = (windowWidth > windowHeight) ? windowWidth/2 : windowHeight/2;

    let variation = (maxSize * (sin(frameCount/10) + 1 ));
    let radius = 100 + variation;

    if (frameCount > 1 && !off) {
        off = variation && variation < 10;
        if (variation > lastVariation) {
            fill(10);
        } else {
            fill(color(random(0, 255), 10, 150));
        }
        ellipse(0, 0, radius, radius, 8);
        lastVariation = variation;
    } else {
        lastVariation = variation;
    }

    rotation+=100;
}

function normalizeValue(originalValue) {
    const minOriginal = 1;
    const maxOriginal = 1400;
    const minNormalized = 1;
    const maxNormalized = 255;
  
    const normalizedValue = ((originalValue - minOriginal) / (maxOriginal - minOriginal)) * (maxNormalized - minNormalized) + minNormalized;
    return normalizedValue;
}