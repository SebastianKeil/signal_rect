var time = 0;
let wave = [];
let groundwave = [];

function setup() {
  createCanvas(800, 400);
  speed = createSlider(1, 100, 50);
  slider = createSlider(1, 10, 1);
}

function draw() {
  background(0);
  stroke(250,250,250,80);
  rect(width-410, 100, 310, 200);
  line(width-410, 200, width-100, 200);
  
  translate(200,200);
  let radius;
  let x = 0;
  let y = 0;
  let y_0;
  let x_0;
  
  for(let i = 0; i < slider.value(); i++){
    
    let prevx = x;
    let prevy = y;
    
    let n = i * 2 + 1;
    
    radius = 100 * (4/((n-1) * PI+ PI))
    x += radius * cos(n * time);
    y += radius * sin(n * time);
    

    stroke(50 * i, 50 * i/2 + 50, 150 - 50 * i/3);
    noFill();
    ellipse(prevx, prevy, radius*2)
  
    fill(255);
    line(x,y, prevx, prevy);
    
    if(i == 0){
      x_0 = x;
      y_0 = y;
      groundwave.unshift(y);
    }
    
    if(i == slider.value()-1){
      noStroke();
      fill(255, 0, 0);
      ellipse(x,y,6);
    }
  }
  
  wave.unshift(y);
    
  translate(200,0);
  
  fill(0,0,200);
  ellipse(0, y_0,4);
  stroke(0,0,200);
  line(x_0 - 200, y_0, 0, y_0);
  
  beginShape();
  for(let i = 0; i < groundwave.length; i++){
    noFill();
    vertex(i, groundwave[i]);
  }
  endShape();
  
    
  ellipse(0,y,4);
  stroke(200,0,0);
  line(0, y, -200+x, y);
  
  beginShape();
  for (let i = 0; i < wave.length; i++) {
    noFill();
    vertex(i, wave[i]);
  }
  endShape();
  let rms = max(wave)/sqrt(2);
  //print(rms);
  stroke(0,200,200);
  line(-10,rms,300,rms);
  stroke(200,100,200);
  line(-10,y/sqrt(2),300,y/sqrt(2));
  line(-10, -max(groundwave)/sqrt(2),300,-max(groundwave)/sqrt(2));
  
  if(groundwave.length >= width - 500){
    groundwave.pop();
  }
  
  if(wave.length >= width - 500){
    wave.pop();
  }
    
  time -= 1/speed.value();
}