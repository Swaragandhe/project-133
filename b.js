img = "";
objects = [];
status = "";

function preload(){
  img = loadImage('basket.webp');
}


function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  if (status != undefined) {
  	  image(img, 0, 0, 640, 420);
    for (var i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status : Objects Detected";
      noStroke();
      fill(0, 255, 0);
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x , objects[i].y );
      noFill();
      stroke(0, 255, 0);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}
