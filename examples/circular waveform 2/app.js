var song
var fft
var particles = []
var img


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
    // song = loadSound("../../assets/Veens - Girl.mp3")
    
    img = loadImage("https://images.unsplash.com/photo-1482686115713-0fbcaced6e28?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=747")
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES)
    imageMode(CENTER)
    colorMode(HSB);
    rectMode(CENTER)
    fft = new p5.FFT(0.9,512)
    img.filter(BLUR, 3)
    noLoop()
}

function draw() {
    background(0)
    var spectrum = fft.analyze()
    translate(width/2, height/2)

    amp = fft.getEnergy(20, 200)

    push()
    if(amp>230) {
        rotate(random(-1, 1))
    }
    image(img, 0, 0, width + 100, height + 100)
    pop()

    var alpha = map(amp, 0, 255, 100, 150)
    colorMode(RGB);
    fill(33)
    noStroke()
    rect(0, 0, width, height)
    colorMode(HSB);

    strokeWeight(3)
    noFill()
    
    for(var i = 0; i < spectrum.length; i+=6) {
        var angle = map(i,1,spectrum.length,0,360)-90
        var amp2 = spectrum[i]
        var r = map(amp2, 0, 256, 80, 250)
        var x = r * sin(angle);
        var y = r * cos(angle);
        
        line(0,0,x,y);
        line(x*1.05,y*1.05,x*1.06,y*1.06);
        stroke(i/1.4,200,200);
    }
    noStroke();
    colorMode(RGB);
    fill(33)
    circle(0,0,155)
    

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
