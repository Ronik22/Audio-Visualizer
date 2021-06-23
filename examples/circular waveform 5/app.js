let sound, amplitude;

function preload(){
  inputbtn = createFileInput((file)=>{
      song = loadSound(file)
      document.getElementsByTagName("input")[0].setAttribute("type","hidden");
      alert("Click on the screen to play or pause")
  }); 
  inputbtn.position(windowWidth/2 -50,15)
  // sound = loadSound('../../assets/Whales & Jo Cohen - Love Is Gone [NCS Release].mp3');
//   sound = loadSound('../../assets/Masked Wolf - Astronaut in the Ocean.mp3');
}
function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.mouseClicked(toggleSound);
  amplitude = new p5.Amplitude(0.4);
  noLoop()
}

function draw() {
  background(33);

  let level = amplitude.getLevel();
  let size = map(level, 0, 1, 30, 300);
  noStroke()
  fill(73, 140, 255)
  ellipse(width/2, height/2, size*1.4, size*1.4);
  fill(22, 108, 255)
  ellipse(width/2, height/2, size, size);
}

function toggleSound() {
  if (sound.isPlaying() ){
    sound.pause();
    noLoop();
  } else {
    sound.play();
    loop();
  }
}