function openWebservice()
{
    var vialist = getVia();

    //alle stedsnavn skal hentes fra inputfelt  
    var start = [document.getElementById("start").value, "292742.3396480047", "6559726.345567825"];   //{ "name": "Halden", "lat": "123", "lng": "345" };
    var stopp = [document.getElementById("stopp").value, "-31695.491607389762", "6733450.860556809"];//{ "name": "Halden", "lat": "123", "lang": "345" };
    //var via = null;
    var via = [["Sarp", "230607.51618372844", "6632656.554929794"], ["Moss", "88997.77630670881", "6467082.204379129"]];//[{ "name": "Halden", "lat": "123", "lng": "345" },{ "name": "Halden", "lat": "123", "lng": "345" }];
    var vehicleSelected;

    if (document.getElementById('r1').checked) {

        vehicleSelected = 1;
    }
    else if (document.getElementById('r2').checked) {

        vehicleSelected = 2;
    }
    else if (document.getElementById('r3').checked) {

        vehicleSelected = 3;
    }

    var jsonText = JSON.stringify({ Start: start, Stopp: stopp, Via: via, Vehicle: vehicleSelected });

    $(document).ready(function () {
        $.ajax({
            type: "POST",
            url: "http://localhost:58317/WebService.asmx/PassToTravelRoute",
            data: jsonText,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                
                if (msg.d.Start == null) {
                    document.getElementById("out").innerHTML = msg.d.Stopp;

                }
                else {

                    document.getElementById("out").innerHTML = msg.d.Start +"<br>"+msg.d.Stopp;

                    var bom = "";
                    for (var i = 0; i < msg.d.Barriers.length; i++) {

                        if (msg.d.Vehicle == 1) {
                            bom = "Gratis bompassering";
                            total = 0;
                            document.getElementById("out1").innerHTML = bom;
                            document.getElementById("out2").innerHTML = "<br>";
                        }
                        if (msg.d.Vehicle == 2) {
                            bom = bom + "<br>" + msg.d.Barriers[i][0] + ", pris: " + msg.d.Barriers[i][1];
                            document.getElementById("out1").innerHTML = "<br>Avstand: " + msg.d.Distance + "m<br>Totalpris: " + msg.d.TotalCostSmall;
                            document.getElementById("out2").innerHTML = "<br><b>Bomstasjoner på ruta</b>" + bom;
                        }
                        else if (msg.d.Vehicle == 3) {
                            bom = bom + "<br>" + msg.d.Barriers[i][0] + ", pris: " + msg.d.Barriers[i][2];
                            document.getElementById("out1").innerHTML = "<br>Avstand: " + msg.d.Distance + "m<br>Totalpris: " + msg.d.TotalCostLarge;
                            document.getElementById("out2").innerHTML = "<br>Bomstasjoner på ruta" + bom;
                        }
                    }
                    var dir = "";
                    for(var k = 0; k< msg.d.Directions.length;k++)
                    {
                        dir = dir + "<br>"+msg.d.Directions[k];
                    }
                    document.getElementById("out3").innerHTML = "Viser ingenting relevant med mindre man er lokalkjent" +dir;
                }           
            }
        });
    });
}


var k = 0;
var id;

function getVia() {
    var li = [];

    for (var j = 1; j < k + 1; j++) {

        li[j-1] = (document.getElementById("text" + j)).value;
    }
    
    return li;
}

function addListElement() {

    var numberList = document.getElementById("viaPlaces");

    k++;
    idList = "li" + k;
    idText = "text" + k         ;

    var newNumberListItem = document.createElement("li");
    newNumberListItem.setAttribute("id", idList);

    var newInput = document.createElement("input");
    newInput.setAttribute("id", idText);
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('placeholder', "Angi Viapunkt");

    newNumberListItem.appendChild(newInput);

    viaPlaces.appendChild(newNumberListItem);


}
