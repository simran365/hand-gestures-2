Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/qN-sYx9sn/model.json', modelLoaded);

function modelLoaded()
{
    console.log('Model Loaded!');
}

function check()
{
    img = document.getElementById('capture_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if (error) {
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "hello sign")
        {
            document.getElementById("update_emoji").innerHTML = "&#128075;";
        }
        if(results[0].label == "peace sign")
        {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if(results[0].label == "good job sign")
        {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(results[1].label == "hello sign")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128400;";
        }
        if(results[1].label == "peace sign")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
        }
        if(results[1].label == "good job sign")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128080;";
        }
    }
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is"+ prediction_1;
    speak_data_2 = "And the second prediction is"+ prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}