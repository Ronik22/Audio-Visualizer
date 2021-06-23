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
    inputbtn.position(windowWidth/2 -50,15)
    // song = loadSound("../../assets/Veens - Girl.mp3")
    // song = loadSound("../../assets/Masked Wolf - Astronaut in the Ocean.mp3")
    // song = loadSound("../../assets/Whales & Jo Cohen - Love Is Gone [NCS Release].mp3")
    img = loadImage("https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES)
    imageMode(CENTER)
    rectMode(CENTER)
    colorMode(HSB)
    fft = new p5.FFT(0.9)
    img.filter(BLUR, 1)
    noLoop()
}

function draw() {
    background(0)
    

    translate(width/2, height/2)

    fft.analyze()
    amp = fft.getEnergy(20, 200)

    push()
    if(amp>230) {
        rotate(random(-1, 1.5))
    }
    image(img, 0, 0, width + 100, height + 100)
    pop()

    var alpha = map(amp, 0, 255, 100, 150)
    fill(10, alpha)
    noStroke()
    rect(0, 0, width, height)

    // stroke(255)     // stroke color of ring
    // stroke(220, 107, 255)
    strokeWeight(5)
    noFill()
    // fill(255)

    var wave = fft.waveform()

    for(var t = -1; t <= 1; t += 2) {
        // beginShape()
        for(var i = 0; i <= 180; i += 5) {
            var index = floor(map(i,0,180,0,wave.length-1))
            var r = map(wave[index], -1, 1, 50, 300)
            var x = r * sin(i) * t
            var y = r * cos(i)
            line(0,0,x,y);
            stroke(i*2,255,255);
            // vertex(x,y)
        }
        // endShape()
    }

    var p = new Particle()
    particles.push(p)

    for(var i = particles.length - 1; i >= 0; i--) {
        if(!particles[i].edges()) {
            particles[i].update(amp > 230)
            particles[i].show()
        } else {
            particles.splice(i, 1)
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

class Particle{
    constructor() {
        this.pos = p5.Vector.random2D().mult(210)
        this.vel = createVector(0,0)
        this.acc = this.pos.copy().mult(random(0.0001, 0.00001))

        this.w = random(3, 5)
        this.color = [random(0,255), random(0,255), random(0,255)]
    }
    update(cond) {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        if(cond) {
            this.pos.add(this.vel)
            this.pos.add(this.vel)
            this.pos.add(this.vel)
        }
    }
    edges() {
        if(this.pos.x < -width/2 || this.pos.x > width/2 || this.pos.y < -height/2 || this.pos.y > height/2) {
            return true
        } else {
            return false
        }
    }
    show() {
        noStroke()
        fill(this.color)
        ellipse(this.pos.x, this.pos.y, this.w)
    }
}