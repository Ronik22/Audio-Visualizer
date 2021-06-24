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
    // img = loadImage("https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=823&q=80")
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES)
    imageMode(CENTER)
    colorMode(HSB);
    rectMode(CENTER)
    fft = new p5.FFT(0.7,512)
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
    fill(15, alpha)
    noStroke()
    rect(0, 0, width, height)
    colorMode(HSB);

    strokeWeight(3)
    noFill()

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
    for(t=-1;t<=1;t+=2) {
        for(var i = 0; i < spectrum.length/2; i+=5) {
            var angle = map(i,0,spectrum.length-2,0,360)
            var amp2 = spectrum[i]
            var r = map(amp2, 0, 256, 80, 250) - 10
            if(i%3) {
                r = map(amp2, 0, 256, 80, 250) * 1.2
            }
            var x = r * sin(angle)*t ;
            var y = r * cos(angle);
            line(0,0,x,y);
            stroke(i*1.4,255,100);
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
        this.pos = p5.Vector.random2D().mult(150)
        this.vel = createVector(0,0)
        this.acc = this.pos.copy().mult(random(0.0001, 0.00001))

        this.w = random(3, 5)
        this.color = [255]
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