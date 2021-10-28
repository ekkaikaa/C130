song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist = 0;
scorerightwrist = 0;

function preload() {
    song = loadSound("music.mp3")
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video,modelloaded);
    posenet.on('pose',gotposes)
}

function gotposes(results){
    if (results.length > 0){
        console.log(results)
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("the value of left wrist x = " + leftWristX);
        console.log("the value of left wrist y = " + leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("the value of right wrist x = " + rightWristX);
        console.log("the value of right wrist y = " + rightWristY);
        scoreleftWrist = results[0].pose.keypoints[9].score    
        scorerightwrist = results[0].pose.keypoints[10].score
    }  
}

function modelloaded(){
    console.log("posenet has been initialized")
}

function draw() {
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    circle(rightWristX, rightWristY, 20)
    if (rightWristY > 0 && rightWristY <= 100) {
        document.getElementById("speed").innerHTML = "speed: 0.5x" 
        song.rate(0.5)
    }
    else if (rightWristY > 100 && rightWristY <= 200) {
        document.getElementById("speed"). innerHTML = "speed:1x"
        song.rate(1.0)
    }
    else if (rightWristY > 200 && rightWristY <= 300) {
        document.getElementById("speed"). innerHTML = "speed:1.5x"
        song.rate(1.5)
    }
    else if (rightWristY > 300 && rightWristY <= 400) {
        document.getElementById("speed"). innerHTML = "speed:2x"
        song.rate(2.0)
    }
    else if (rightWristY > 400 && rightWristY <= 500) {
        document.getElementById("speed"). innerHTML = "speed:2.5x"
        song.rate(2.5)
    }
    if (scoreleftWrist > 0.002) {
        circle(leftWristX, leftWristY, 20);
    numberlwy = Number(leftWristY);
    remove_decimals = floor(numberlwy);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "volume :" + volume;
    song.setVolume(volume);
    }
}

function play_btn() {
    song.play();
    song.setVolume(1)
    song.rate(1)
}

function stop_btn() {
    song.stop()
}