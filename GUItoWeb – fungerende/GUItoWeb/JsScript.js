function openWebservice()
{
    
   
    
    var routeCoordinate = {};



    routeCoordinate.start = ["Halden", "koord1", "koord2"];
    routeCoordinate.stopp = ["Oslo", "koord1", "koord2"];
    routeCoordinate.via = ["Sarpsborg", "koord1", "koord2"];
    routeCoordinate.vehicle = "car";

    
    alert(JSON.stringify(routeCoordinate));

    var route = {};


    route.start = "Halden";
    route.stopp = "Oslo";
    route.via = "Sarpsborg";
    route.vehicle = "car";

    $(document).ready(function () {
        $.ajax({
            type: "POST",
            url: "http://localhost:58317/WebService.asmx/PassToTravelRoute",
            data: JSON.stringify(route),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                
                document.getElementById("out").innerHTML = msg.d.Start;
                document.getElementById("out1").innerHTML = msg.d.TotalCostSmall;
                //document.getElementById("out2").innerHTML = msg.d.Barriers[1][1];

                var bom = "";
                for (var i = 0; i < msg.d.Barriers.length; i++) {

                    if (msg.d.Vehicle == "mc") {
                        bom = "Gratis bompassering";
                        total = 0;
                    }
                    if (msg.d.Vehicle == "car") {
                        bom = bom + "<br>" + msg.d.Barriers[i][0] + ", pris: " + msg.d.Barriers[i][1];
                       // total = msg.d.TotalCostSmall;
                        document.getElementById("out2").innerHTML = bom;
                    }
                    else if (msg.d.Vehicle == "truck") {
                        bom = bom + "<br>" + msg.d.Barriers[i][0] + ", pris: " + msg.d.Barriers[i][2];
                        total = msg.d.TotalCostLarge;
                    }
                }
                

                

            }
        });
    });

    //
}