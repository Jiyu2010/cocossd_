status="";
objects=[];
function preload()
{
img=loadImage('dog_cat.jpg');
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status is detecting objects..";
}

img="";


function modelLoaded()
{
    console.log("Model Loaded!");
    status=true;
    objectDetector.detect(video,gotResults);
}

function gotResults(error,results)
{
    if(error){
        console.log(error);
    }
    console.log(results);
objects=results;
}


function draw(){
    image(video,0,0,380,380);
    if(status != "")
    {
        objectDetector.detect(video,gotResults);
        r=random(255);
        g=random(255);
        b=random(255);
    for(var i =0; i < objects.length; i++){
        
        document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("number").innerHTML = "Number of object detected = "+objects.length;

        fill(r,g,b);
        percent = floor(objects[i].confidence*100);
        text(objects[i].label +""+percent+"%",objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

    }


    }

    
}




