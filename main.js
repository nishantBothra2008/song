var song_one = "";
var song_two = "";

var leftWristY = 0;
var leftWristX = 0;
var rightWristX = 0;
var rightWristY = 0;

var scoreLeftWrist = 0;
var scoreRightWrist = 0;

var song_one_status = "";
var song_two_status = "";

function preload() {
    song_one = loadSound("song_one.mp3");
    song_two = loadSound("song_two.mp3");
}

function setup() {
    canvas = createCanvas(400, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(400, 300);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("poseNet is Initialised");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftWristX =" + leftWristX, "leftWristY =" + leftWristY, "rightWristX =" + rightWristX, "rightWristY =" + rightWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score of left wrist =" + scoreLeftWrist + "Score of right wrist =" + scoreRightWrist);
    }
}

function draw() {
    image(video, 0, 0, 400, 300);
    song_one_status = song_one.isPlaying();
    song_two_status = song_two.isPlaying();
    fill("darkcyan");
    stroke("aliceblue");
    
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
         song_one.stop();
         if (song_two_status == false) {
             song_two.play();
             document.getElementById("song_name").innerHTML = "Song 2";
         }
    }
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song_two.stop();
        if (song_one_status == false) {
            song_one.play();
            document.getElementById("song_name").innerHTML = "Song 1";
        }
   }
}

function play_music() {
    song.play();
    song.setVolume(1);
    song.setRate(1);
}

































    