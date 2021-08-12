img = "";
status = "";
object = [];

function preload(){
    sound = loadSound("alarm_r.mp3")
}

function setup(){
    canvas = createCanvas(470,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    object_detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function modelLoaded(){
    console.log("model has been loaded !");
    status = true;
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object = results;
    }
}

function draw(){
    image(video,0,0,470,380);

    if(status != "")
    {
        object_detector.detect(video,gotResult);
        for(i = 0 ; i < object.length; i++)
        {

            if(object[i].label == "person"){
                document.getElementById("Detection").innerHTML = "baby has been detected";
                sound.stop();            
            }
            else{
                document.getElementById("Detection").innerHTML = "baby has not been detected"
                sound.play();
            }

            document.getElementById("status").innerHTML = "Status : Object detected";
            
            fill("#5F9EA0");
            percentage = floor(object[i].confidence * 100);
            text(object[i].label + percentage + "%" , object[i].x , object[i].y);
            noFill();
            stroke("#5F9EA0");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }

    /*fill("#FF0000");
    text("dog",45,75);
    noFill();
    stroke("#FF0000");
    rect(30,60,450,350);

    fill("#FF0000");
    text("cat",320,120);
    noFill();
    stroke("#FF0000");
    rect(300,90,270,320);*/
}