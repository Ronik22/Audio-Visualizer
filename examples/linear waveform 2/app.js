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
    colorMode(HSB)
    // rectMode(CENTER)
    w = width/1024
}

function draw() {
    background(10)
    var wave = fft.waveform()
    var spectrum = fft.analyze()
    noStroke()

    for(var t=-1; t<=1; t+=2) {
        for(var i=-1; i<spectrum.length/2; i+=5) {
            var amp = spectrum[i]
            var y = map(amp, 0, 1024, height, 0)
            if(i%4) {
                y = map(amp, 0, 1024, height, 0) * 1.05
            }
            else if(i%9) {
                y = map(amp, 0, 1024, height, 0) * 1.07
            }
            else if(i%7) {
                y = map(amp, 0, 1024, height, 0) * 1.09
            }

            fill(i,255,255)
            if(t===1){
                rect(i*w, height, w*3, y - height-50)
                rect(i*w, y-65, w*3)
            } else {
                rect(width-i*w, height, w*3, y - height-50)
                rect(width-i*w, y-65, w*3)
            }
            
        }
    }
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