alarm = "";
objects = [];
status ="";

function preload() {
    alarm = loadSound("Music.mp3");
}

function setup(){
    canvas = createCanvas(400,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(400,400);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Has been loaded");
    status = true;
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 400, 400);
    if(status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);
        for(i = 0;  i < objects.length;  i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y +15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "person"){
                document.getElementById("number_of_objects").innerHTML = "Baby has been found";
                console.log("Stopped playing song");
                alarm.stop();
            }else
            {
                document.getElementById("number_of_objects").innerHTML = "Baby has not been found";
                console.log("Playing song");
                alarm.play();
            }
            if(objects.length == 0) 
            { 
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found"; 
                console.log("Playing Song"); 
                alarm.play(); 
            }
        }
    }
}