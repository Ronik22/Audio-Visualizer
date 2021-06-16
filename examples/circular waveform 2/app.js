var song
var fft
var particles = []
var img

function preload() {
    // song = loadSound("./track01.mp3")
    // song = loadSound("../../assets/Masked Wolf - Astronaut in the Ocean.mp3")
    song = loadSound("../../assets/Whales & Jo Cohen - Love Is Gone [NCS Release].mp3")
    img = loadImage("https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES)
    imageMode(CENTER)
    colorMode(HSB);
    rectMode(CENTER)
    fft = new p5.FFT(0.8, 64)
    img.filter(BLUR, 5)
    noLoop()
}

function draw() {
    background(0)
    var spectrum = fft.analyze()
    translate(width/2, height/2)

    //////////////////////
    // amp = fft.getEnergy(50, 200)

    // push()
    // if(amp>230) {
    //     rotate(random(-1, 1.5))
    // }
    // image(img, 0, 0, width + 100, height + 100)
    // pop()

    // var alpha = map(amp, 0, 255, 100, 150)
    // fill(20, alpha)
    fill(15)
    noStroke()
    rect(0, 0, width, height)
    ///////////////////////////

    // stroke(255)     // stroke color of ring
    strokeWeight(3)
    noFill()
    // fill(255)

    var wave = fft.waveform()


    // beginShape()
    for(var i = 0; i < spectrum.length; i+=1) {
        var angle = map(i,1,spectrum.length,0,360)
        var amp = spectrum[i]
        var r = map(amp, 0, 256, 80, 250)
        var x = r * sin(angle);
        var y = r * cos(angle);
        
        line(0,0,x,y);
        stroke(i*6,255,255);
        // vertex(x,y)
    }
}
    // endShape()


function mouseClicked() {
    if(song.isPlaying()) {
        song.pause()
        noLoop()
    } else {
        song.play()
        loop()
    }
}
