function openWebservice()
{
   
  
    //skal hentes fra inputfelt  
    var start = [document.getElementById("start").value, "267470.579671", "206570173.086275"];   //{ "name": "Halden", "lat": "123", "lng": "345" };
    var stopp = [document.getElementById("stopp").value, "265317.333086", "206651035.484795"];//{ "name": "Halden", "lat": "123", "lang": "345" };
    var via = [["Sarp", "235", "454"], ["Moss", "453", "562"]];//[{ "name": "Halden", "lat": "123", "lng": "345" },{ "name": "Halden", "lat": "123", "lng": "345" }];
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
                   
                    //document.getElementById("out2").innerHTML = msg.d.Barriers[1][1];

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
                            // total = msg.d.TotalCostSmall;
                            document.getElementById("out1").innerHTML ="<br>Totalpris: " + msg.d.TotalCostSmall;
                            document.getElementById("out2").innerHTML = "<br><b>Bomstasjoner på ruta</b>" + bom;
                        }
                        else if (msg.d.Vehicle == 3) {
                            bom = bom + "<br>" + msg.d.Barriers[i][0] + ", pris: " + msg.d.Barriers[i][2];
                            total = msg.d.TotalCostLarge;
                            document.getElementById("out1").innerHTML = "<br>Totalpris: " + msg.d.TotalCostLarge;
                            document.getElementById("out2").innerHTML = "<br>Bomstasjoner på ruta" + bom;
                        }
                    }
                }
                

                

            }
        });
    });

    //
}



var i = 0;
var id;
function getVia() {
    var li = "";

    for (var j = 1; j < i + 1; j++) {

        li = li + (document.getElementById("text" + j)).value + ",";
    }
    return li;
}

function addListElement() {

    var numberList = document.getElementById("viaPlaces");

    i++;
    idList = "li" + i;
    idText = "text" + i;

    var newNumberListItem = document.createElement("li");
    newNumberListItem.setAttribute("id", idList);

    var newInput = document.createElement("input");
    newInput.setAttribute("id", idText);
    newInput.setAttribute('type', 'text');
    newInput.setAttribute('placeholder', "Angi Viapunkt");

    newNumberListItem.appendChild(newInput);

    viaPlaces.appendChild(newNumberListItem);


}


