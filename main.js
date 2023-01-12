var som = ""
var som2 = ""
var som3 = ""
var pararSom = 0;
var nome = ""
var scoreRightWrist = 0;
var scoreLefttWrist = 0;

var rightWristX = 0;
var leftWristX = 0;

var rightWristY = 0;
var leftWristY = 0;

var volume;
var velocidade;

function preload() {
    nome = elemento("musicas").value;
    som = loadSound("Ocean.mp3")
    som2 = loadSound("Harry.mp3")
    som3 = loadSound("Road.mp3")
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoad);
    poseNet.on("pose", gotPose);
}

function gotPose(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        scoreLefttWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        console.log("pulso esquerdo X: " + leftWristX + " pulso esquerdo Y: " + leftWristY)

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;


        console.log("pulso direito X: " + rightWristX + " pulso direito Y: " + rightWristY)
    }
}

function draw() {
    image(video, 0, 0, 500, 500);
    
    if(scoreLefttWrist > 0.2) {
        fill("#ed1405");
        stroke("#ed1405");
        
        
        circle(rightWristX, rightWristY, 10);
        if(rightWristY > 0 && rightWristY < 100){
            velocidade = 0.5;
            elemento("speed").innerHTML = "Velocidade: " +"0,5x";

        }else if(rightWristY >= 100 && rightWristY < 200){
            velocidade = 1.0;
            elemento("speed").innerHTML = "Velocidade: " +"1x";

        }else if(rightWristY >= 200 && rightWristY < 300){
            velocidade = 1.5;
            elemento("speed").innerHTML = "Velocidade: " +"1,5x";

        }else if(rightWristY >= 300 && rightWristY < 400){
            velocidade = 2.5;
            elemento("speed").innerHTML = "Velocidade: " +"2x";

        }else if(rightWristY >= 400 && rightWristY < 500){
            velocidade = 2.5
            elemento("speed").innerHTML = "Velocidade: " +"2,5x";

        }
        som.rate(velocidade)
        som2.rate(velocidade)
        som3.rate(velocidade)
    }
    if(scoreLefttWrist > 0.2) {
    fill("#ed1405");
    stroke("#ed1405");
    circle(leftWristX, leftWristY, 10);
    leftWristY = Number(leftWristY);
    leftWristY = floor(leftWristY);
    volume = leftWristY/500;
    elemento("volume").innerHTML = "Volume: " +volume;
    som.setVolume(volume)
    som2.setVolume(volume)
    som3.setVolume(volume)
    }
}
function modelLoad() {
    console.log("model load!");
}




function Reproduzir() {
    nome = elemento("musicas").value
    som2.stop()
    som.stop()
    som3.stop()
    if (nome == "Road") {
        som3.play()
        som3.rate(1.50);
        som3.setVolume(volume)
    }
    if (nome == "Ocean") {
        som.play()
        som.rate(1.3);
        som.setVolume(volume)
    }
    if (nome == "Harry") {
        som2.play()
        som2.rate(1.3);
        som2.setVolume(volume)
    }
}

function pararMusica() {
    som2.stop()
    som.stop()
    som3.stop()
}

function elemento(name) {
    return document.getElementById(name);
}