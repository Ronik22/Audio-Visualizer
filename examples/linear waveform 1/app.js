var song
var fft

function preload() {
    inputbtn = createFileInput((file)=>{
        song = loadSound(file)
        document.getElementsByTagName("input")[0].setAttribute("type","hidden");
        alert("Click on the screen to play or pause")
    }); 
    inputbtn.position(windowWidth/2 -50,15)
    // song = loadSound("../../assets/Masked Wolf - Astronaut in the Ocean.mp3")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    fft = new p5.FFT(0.9)
}

function draw() {
    background(20)
    stroke(250, 100, 0)
    strokeWeight(2)
    noFill()
    // fill(255)

    var wave = fft.waveform()

    beginShape()
    for(var i=0; i<width; i++) {
        var index = floor(map(i,0,width,0,wave.length))
        var x = i
        var y = wave[index] * 100 + height /2
        vertex(x,y)
    }
    endShape()
}

function mouseClicked() {
    if(song.isPlaying()) {
        song.pause()
        noLoop()
    } else {
        song.play()
        loop()
    }
}