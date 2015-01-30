function declarations() {

    DatumEqRad = [6378137.0, 6378137.0, 6378137.0, 6378135.0, 6378160.0, 6378245.0, 6378206.4, 6378388.0, 6378388.0, 6378249.1, 6378206.4, 6377563.4, 6377397.2, 6377276.3];

    DatumFlat = [298.2572236, 298.2572236, 298.2572215, 298.2597208, 298.2497323, 298.2997381, 294.9786982, 296.9993621, 296.9993621, 293.4660167, 294.9786982, 299.3247788,
    299.1527052, 300.8021499];

    Item = 0;

    //skala sentralmeridian (CM)

    k0 = 0.9996;

    //ekvatorial radius, meter

    a = DatumEqRad[Item];

    //polar utflatning

    f = 1 / DatumFlat[Item];

    //polar akse

    b = a * (1 - f);

    //eksentrisitet

    e = Math.sqrt(1 - b * b / a * a);

    //konvertere grader til radianer

    drad = Math.PI / 180;

    //latitude (breddegrad) i grader

    latd = 0;

    //lattitude (nord +, sør -)

    phi = 0;

    e0 = e / Math.sqrt(1 - e * e);

    N = a / Math.sqrt(1 - Math.pow(e * Math.sin(phi)), 2);

    T = Math.pow(Math.tan(phi), 2);

    C = Math.pow(e * Math.cos(phi), 2);

    //longitude (lengdegrad)

    lng = 0;

    //longitude av sentralmeridianen

    lngd0 = 0;

    //longitude i grader

    lngd = 0;

    M = 0;

    //x koordinat

    x = 0;

    //y koordinat

    y = 0;

    k = 1;

    //utm sone

    utmz = 33;

    //sone sentralmeridian

    zcm = 0;


}

function latlongToUTM() {

    declarations();

    k0 = 0.9996;

    b = a * (1 - f);

    e = Math.sqrt(1 - (b / a) * (b / a));

    latd0 = parseFloat(latdd);
    lngd0 = parseFloat(longd);



    lngd = lngd0;
    latd = latd0;

    //konvertere latitude til radianer

    phi = latd * drad;

    //konvertere longitude til radianer

    lng = lngd * drad;

    utmz = parseFloat(33);
    latz = 0;


    if (latd > -80 && latd < 72) {

        latz = Math.floor((latd + 80) / 8) + 2;

    }

    if (latd > 72 && latd < 84) {

        latz = 21;

    }

    if (latd > 84) {

        latz = 23;

    }

    zcm = 3 + 6 * (utmz - 1) - 180;

    e0 = e / Math.sqrt(1 - e * e);

    esq = (1 - (b / a) * (b / a));

    e0sq = e * e / (1 - e * e);

    N = a / Math.sqrt(1 - Math.pow(e * Math.sin(phi), 2));

    T = Math.pow(Math.tan(phi), 2);

    C = e0sq * Math.pow(Math.cos(phi), 2);

    A = (lngd - zcm) * drad * Math.cos(phi);

    M = phi * (1 - esq * (1 / 4 + esq * (3 / 64 + 5 * esq / 256)));

    M = M - Math.sin(2 * phi) * (esq * (3 / 8 + esq * (3 / 32 + 45 * esq / 1024)));

    M = M + Math.sin(4 * phi) * (esq * esq * (15 / 256 + esq * 45 / 1024));

    M = M - Math.sin(6 * phi) * (esq * esq * esq * (35 / 3072));

    M = M * a;

    M0 = 0;

    //kalkuler UTM verdier

    x = k0 * N * A * (1 + A * A * ((1 - T + C) / 6 + A * A * (5 - 18 * T + T * T + 72 * C - 58 * e0sq) / 120));

    x = x + 500000;

    y = k0 * (M - M0 + N * Math.tan(phi) * (A * A * (1 / 2 + A * A * ((5 - T + 9 * C + 4 * C * C) / 24 + A * A * (61 - 58 * T + T * T + 600 * C - 330 * e0sq) / 720))));

    //yg = y + 10000000;

    if (y < 0) {

        y = 10000000 + y;

    }



    //document.getElementById('svar2').innerHTML = 10 * (x) / 10;

    //document.getElementById('svar3').innerHTML = 10 * y / 10;

    window.xkord = xkoordinat = 10 * (x) / 10;

    window.ykord = ykoordinat = 10 * y / 10;









}


function declarations1() {

    DatumEqRad = [6378137.0, 6378137.0, 6378137.0, 6378135.0, 6378160.0, 6378245.0, 6378206.4, 6378388.0, 6378388.0, 6378249.1, 6378206.4, 6377563.4, 6377397.2, 6377276.3];

    DatumFlat = [298.2572236, 298.2572236, 298.2572215, 298.2597208, 298.2497323, 298.2997381, 294.9786982, 296.9993621, 296.9993621, 293.4660167, 294.9786982, 299.3247788,
    299.1527052, 300.8021499];

    Item = 0;

    //skala sentralmeridian (CM)

    k0 = 0.9996;

    //ekvatorial radius, meter

    a = DatumEqRad[Item];

    //polar utflatning

    f = 1 / DatumFlat[Item];

    //polar akse

    b = a * (1 - f);

    //eksentrisitet

    e = Math.sqrt(1 - b * b / a * a);

    //konvertere grader til radianer

    drad = Math.PI / 180;

    //latitude (breddegrad) i grader

    latd = 0;

    //lattitude (nord +, sør -)

    phi = 0;

    e0 = e / Math.sqrt(1 - e * e);

    N = a / Math.sqrt(1 - Math.pow(e * Math.sin(phi)), 2);

    T = Math.pow(Math.tan(phi), 2);

    C = Math.pow(e * Math.cos(phi), 2);

    //longitude (lengdegrad)

    lng = 0;

    //longitude av sentralmeridianen

    lngd0 = 0;

    //longitude i grader

    lngd = 0;

    M = 0;

    //x koordinat

    x = 0;

    //y koordinat

    y = 0;

    k = 1;

    //utm sone

    utmz = 33;

    //sone sentralmeridian

    zcm = 0;


}

function latlongToUTM1() {

    declarations1();

    k0 = 0.9996;

    b = a * (1 - f);

    e = Math.sqrt(1 - (b / a) * (b / a));

    latd0 = parseFloat(latdd1);
    lngd0 = parseFloat(longd1);



    lngd = lngd0;
    latd = latd0;

    //konvertere latitude til radianer

    phi = latd * drad;

    //konvertere longitude til radianer

    lng = lngd * drad;

    utmz = parseFloat(33);
    latz = 0;


    if (latd > -80 && latd < 72) {

        latz = Math.floor((latd + 80) / 8) + 2;

    }

    if (latd > 72 && latd < 84) {

        latz = 21;

    }

    if (latd > 84) {

        latz = 23;

    }

    zcm = 3 + 6 * (utmz - 1) - 180;

    e0 = e / Math.sqrt(1 - e * e);

    esq = (1 - (b / a) * (b / a));

    e0sq = e * e / (1 - e * e);

    N = a / Math.sqrt(1 - Math.pow(e * Math.sin(phi), 2));

    T = Math.pow(Math.tan(phi), 2);

    C = e0sq * Math.pow(Math.cos(phi), 2);

    A = (lngd - zcm) * drad * Math.cos(phi);

    M = phi * (1 - esq * (1 / 4 + esq * (3 / 64 + 5 * esq / 256)));

    M = M - Math.sin(2 * phi) * (esq * (3 / 8 + esq * (3 / 32 + 45 * esq / 1024)));

    M = M + Math.sin(4 * phi) * (esq * esq * (15 / 256 + esq * 45 / 1024));

    M = M - Math.sin(6 * phi) * (esq * esq * esq * (35 / 3072));

    M = M * a;

    M0 = 0;

    //kalkuler UTM verdier

    x = k0 * N * A * (1 + A * A * ((1 - T + C) / 6 + A * A * (5 - 18 * T + T * T + 72 * C - 58 * e0sq) / 120));

    x = x + 500000;

    y = k0 * (M - M0 + N * Math.tan(phi) * (A * A * (1 / 2 + A * A * ((5 - T + 9 * C + 4 * C * C) / 24 + A * A * (61 - 58 * T + T * T + 600 * C - 330 * e0sq) / 720))));

    //yg = y + 10000000;

    if (y < 0) {

        y = 10000000 + y;

    }



    //document.getElementById('svar2').innerHTML = 10 * (x) / 10;

    //document.getElementById('svar3').innerHTML = 10 * y / 10;



    xkoordinat = 10 * (x) / 10;

    ykoordinat = 10 * y / 10;







    window.fromplacex = window.xkord;
    window.fromplacey = window.ykord;
    window.toplacex = xkoordinat;
    window.toplacey = ykoordinat;

    // console.log(fromplace, toplace, fromplace1, toplace1);

    window.urlferdig = 'https://www.vegvesen.no/ruteplan/routingservice_v1_0/routingservice/solve?&stops=' + fromplacex + "," + fromplacey + ";" + toplacex + "," + toplacey + '&barriers&Navn&format=json';


    console.log(urlferdig);



    ajaxget();

}


function ajaxget() {
    $(document).ready(function () {

        var reqUrl = urlferdig;
        var myData = '';
        var req = $.ajax({
            type: "GET",
            headers: {
                username: 'TjeRuteplanChja',
                password: '7LJ7jZETcN'
            },
            url: reqUrl,
            dataType: 'jsonp',
            crossDomain: true,
            error: function () {
                alert('failed');
            },
            success: function (json) {
                $('#takstlitenbil').text(json.directions[0].summary.statistics[0].value);
                $('#out1').text(json.directions[0].summary.statistics[1].value);
                var m = parseInt(json.directions[0].summary.totalLength);
                var km = m / 1000;
                var leng = (km.toFixed(1));
                document.getElementById("leng").innerHTML = leng;

                var myData = JSON.stringify(req);
                console.log(myData);

                for (var x = 0; x < myData.length; x++) {
                    //var c = myData.charAt(x);
                    var c = myData.search("nvdb:Bomstasjon");
                    alert(c);
                }
                }
            
        });
    });
};


