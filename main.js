alarm = "";
object = [];
status_1 = "";

function preload()
{
    alarm = loadSound("ringing_old_phone.mp3");
}

function setup()
{
  canvas = createCanvas(400,300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  objectDetector = ml5.objectDetector("cocossd",modelLoaded);
}

function modelLoaded()
{
  console.log("Model Loaded!")
  status_1 = "true";
}



function draw()
{
    image(video,0,0,400,300);

    if(status_1 != "")
    {
       objectDetector.detect(video,gotresults);
 
        for(i = 0;i < objects.length;i++)
        {

          alarm.isPlaying();

          if(object.length > 0)
          {
            alarm.stop();
            document.getElementById("status").innerHTML = "Baby Detected";
          }
          else if(object.length < 0)
          {
            alarm.play();
            document.getElementById("status").innerHTML = "Baby not Detected";
          }
 
           fill("#eb3434");
           percent = floor(objects[i].confidence * 100);
           text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
           noFill();
           stroke("#eb3434");
           rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function play()
{
  alarm.play();
  alarm.setVolume(1);
  alarm.rate(1);
}

function gotresults(error,results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;
}