function popup() {
    alert("Hello World")
}

function readText(form) {
    TestVar = form.inputbox.value;
    console.log("You typed: " + TestVar);
    //console.log Må du inn i console menyen i bowseren for å lese det du får ut.
    //alert får du popup på skjermen med verdien du skriver ut.
}
function writeText(form) {
    form.tbox.value = (form.inputbox.value + form.inputbox1.value);
}

function barrier(form){

   var x =  document.write("https://www.vegvesen.no/ruteplan/routingservice_v1_0/routingservice/solve?&stops=" + form.inputbox.value +";" + form.inputbox1.value+ "&barriers&format=json");
    console.log(x);
}



$(document).ready(function () {
    $("#asd").on("click", function () {
        var reqUrl = 'https://www.vegvesen.no/ruteplan/routingservice_v1_0/routingservice/solve?stops=267470.579671,%206570173.086275;265317.333086,%206651035.484795&barriers&format=json';
        //Bytt ut URL med variabel X når url generatoren er ferdig.

        var req = $.ajax({
            type: "GET",
            url: reqUrl,
            dataType: 'jsonp',
            crossDomain: true,
            /*username: TjeRuteplanChja,
            password: 7LJ7jZETcN,*/
            error: function () {
                alert('failed');
            },
            success: function (json) {
                $('#out').text(json.directions[0].summary.statistics[0].value),
                $('#out1').text(json.directions[0].summary.statistics[1].value);
                var m = parseInt(json.directions[0].summary.totalLength);
                var km = m / 1000;
                var leng = (km.toFixed(1));
                document.getElementById("out2").innerHTML = leng;

        }
        });
    });
});
