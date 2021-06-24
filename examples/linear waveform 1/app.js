var song
var fft

function preload() {
    inputbtn = createFileInput((file)=>{
        song = loadSound(file)
        document.getElementsByTagName("input")[0].setAttribute("type","hidden");
        alert("Click on the screen to play or pause")
    }); 
    var inputELE = document.getElementsByTagName("input")[0]
    inputbtn.position(windowWidth/2 -120,15)
    inputELE.style.backgroundColor = '#fe00e8';
    inputELE.style.height = '42px';
    inputELE.style.padding = '10px';
    // song = loadSound("../../assets/highroad.mp3")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    fft = new p5.FFT(0.9)
}

function draw() {
    background(33)
    stroke(random(0,255), random(20,255), random(20,255))
    // stroke(254, 0, 232)
    strokeWeight(2)
    noFill()

    var wave = fft.waveform()

    beginShape()
    for(var i=0; i<width; i+=0.5) {
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