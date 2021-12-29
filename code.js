Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

var camera = document.getElementById("camera");

Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    })
}

console.log("ml5 version: " + ml5.version);

var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Bi2lqurb-/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    var img = document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }

    else {
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();

        if (prediction_1 == "Happy") {
            document.getElementById("update_emoji1").innerHTML = "&#128522;";
        }

        if (prediction_1 == "Sad") {
            document.getElementById("update_emoji1").innerHTML = "&#128532;";
            document.getElementById("motivational_quote1").innerHTML = "Don't be sad! Because God sends hope in the most desperate moments. Don't forget, the heaviest rain comes out of the darkest clouds.";
        }

        if (prediction_1 == "Angry") {
            document.getElementById("update_emoji1").innerHTML = "&#128548;";
        }

        if (prediction_2 == "Happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }

        if (prediction_2 == "Sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
            document.getElementById("motivational_quote2").innerHTML = "Don't be sad! Because God sends hope in the most desperate moments. Don't forget, the heaviest rain comes out of the darkest clouds.";
        }

        if (prediction_2 == "Angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
        }
    }
}