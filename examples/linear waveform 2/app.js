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
    // song = loadSound("../../assets/Whales & Jo Cohen - Love Is Gone [NCS Release].mp3")
    // song = loadSound("../../assets/track01.mp3")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    fft = new p5.FFT(0.9)
    colorMode(HSB)
    // rectMode(CENTER)
    w = width/1024
}

function draw() {
    background(20)
    // stroke(255)
    // strokeWeight(5)
    noFill()
    // fill(255)

    var wave = fft.waveform()
    var spectrum = fft.analyze()
    noStroke()
    // beginShape()

    for(var i=-1; i<spectrum.length/2; i+=5) {
        var amp = spectrum[i]
        // var index = floor(map(i,0,width,0,wave.length))
        // var x = i
        var y = map(amp, 0, 1024, height, 0)
        // var y = wave[index] * 150 + height /1.2
        // vertex(x,y)
        // line(i*w,height,i*w,y*1.2);
        fill(i,255,255)
        rect(i*w, y/2, w*3, height-y+5)
        // line(x,windowHeight,x,y);
        // stroke(i,255,255);
        
    }

    for(var i=-1; i<spectrum.length/2; i+=5) {
        var amp = spectrum[i]
        // var index = floor(map(i,0,width,0,wave.length))
        // var x = i
        var y = map(amp, 0, 1024, height, 0)
        // var y = wave[index] * 150 + height /1.2
        // vertex(x,y)
        // line(i*w,height,i*w,y*1.2);
        fill(i,255,255)
        rect(width-i*w, y/2, w*3, height-y+5)
        // line(x,windowHeight,x,y);
        // stroke(i,255,255);
        
    }
    // endShape()
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