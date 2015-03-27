function openWebservice()
{
    var vialist = getVia();

    //alle stedsnavn skal hentes fra inputfelt  
    var start = [document.getElementById("start").value, "292742.3396480047", "6559726.345567825"];   //{ "name": "Halden", "lat": "123", "lng": "345" };
    var stopp = [document.getElementById("stopp").value, "-31695.491607389762", "6733450.860556809"];//{ "name": "Halden", "lat": "123", "lang": "345" };
    //var via = null;
    var via = [["Sarp", "230607.51618372844", "6632656.554929794"], ["Moss", "88997.77630670881", "6467082.204379129"]];//[{ "name": "Halden", "lat": "123", "lng": "345" },{ "name": "Halden", "lat": "123", "lng": "345" }];
    var vehicleSelected;
    var vs = document.getElementById('vehicleSelector').innerHTML;
    if (vs == "Mc" ) {

        vehicleSelected = 1;
    }
    else if (vs == "Bil") {

        vehicleSelected = 2;
    }
    else if (vs == "Lastebil") {

        vehicleSelected = 3;
    }
    else {
        document.getElementById('ErrorMessage').innerHTML = "Venligst velg kjøretøy!";
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

                    document.getElementById('ErrorMessage').innerHTML = "";
                    var bom = "";
                    for (var i = 0; i < msg.d.Barriers.length; i++) {

                        if (msg.d.Vehicle == 1) {
                            bom = "Gratis bompassering";
                            total = 0;
                            b = bom / 1000;
                            document.getElementById("out_Km").innerHTML = b;
                            document.getElementById("out2").innerHTML = "<br>";
                            var a = parseInt(msg.d.Time)
                            a / 1000;
                            document.getElementById("out_Time").innerHTML = a;
                            
                        }
                        if (msg.d.Vehicle == 2) {
                            bom = bom + "<br>" + msg.d.Barriers[i][0] + ", pris: " + msg.d.Barriers[i][1];
                            document.getElementById("out_Km").innerHTML = msg.d.Distance;
                            document.getElementById("out_Takst").innerHTML = msg.d.TotalCostSmall;
                            var a = parseInt(msg.d.Time)
                            a * 0.0166667;
                            
                            document.getElementById("out_Time").innerHTML = a;
                            
                            document.getElementById("out2").innerHTML = "<br><b>Bomstasjoner på ruta</b>" + bom;
                            
                        }
                        else if (msg.d.Vehicle == 3) {
                            bom = bom + "<br>" + msg.d.Barriers[i][0] + ", pris: " + msg.d.Barriers[i][2];
                            document.getElementById("out_Km").innerHTML = msg.d.Distance;
                            document.getElementById("out_Takst").innerHTML = msg.d.TotalCostLarge;
                            
                            document.getElementById("out_Time").innerHTML = msg.d.Time / 1000;
                            document.getElementById("out2").innerHTML = "<br>Bomstasjoner på ruta <br>" + bom;
                            
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
    alert(out2);
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
(function ($) {

    $.fn.menumaker = function (options) {

        var cssmenu = $(this), settings = $.extend({
            title: "Menu",
            format: "dropdown",
            sticky: false
        }, options);

        return this.each(function () {
            cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
            $(this).find("#menu-button").on('click', function () {
                $(this).toggleClass('menu-opened');
                var mainmenu = $(this).next('ul');
                if (mainmenu.hasClass('open')) {
                    mainmenu.hide().removeClass('open');
                }
                else {
                    mainmenu.show().addClass('open');
                    if (settings.format === "dropdown") {
                        mainmenu.find('ul').show();
                    }
                }
            });

            cssmenu.find('li ul').parent().addClass('has-sub');

            multiTg = function () {
                cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
                cssmenu.find('.submenu-button').on('click', function () {
                    $(this).toggleClass('submenu-opened');
                    if ($(this).siblings('ul').hasClass('open')) {
                        $(this).siblings('ul').removeClass('open').hide();
                    }
                    else {
                        $(this).siblings('ul').addClass('open').show();
                    }
                });
            };

            if (settings.format === 'multitoggle') multiTg();
            else cssmenu.addClass('dropdown');

            if (settings.sticky === true) cssmenu.css('position', 'fixed');

            resizeFix = function () {
                if ($(window).width() > 768) {
                    cssmenu.find('ul').show();
                }

                if ($(window).width() <= 768) {
                    cssmenu.find('ul').hide().removeClass('open');
                }
            };
            resizeFix();
            return $(window).on('resize', resizeFix);

        });
    };
})(jQuery);

(function ($) {
    $(document).ready(function () {

        $(document).ready(function () {
            $("#cssmenu").menumaker({
                title: "Menu",
                format: "multitoggle"
            });

            $("#cssmenu").prepend("<div id='menu-line'></div>");

            var foundActive = false, activeElement, linePosition = 0, menuLine = $("#cssmenu #menu-line"), lineWidth, defaultPosition, defaultWidth;

            $("#cssmenu > ul > li").each(function () {
                if ($(this).hasClass('active')) {
                    activeElement = $(this);
                    foundActive = true;
                }
            });

            if (foundActive === false) {
                activeElement = $("#cssmenu > ul > li").first();
            }

            defaultWidth = lineWidth = activeElement.width();

            defaultPosition = linePosition = activeElement.position().left;

            menuLine.css("width", lineWidth);
            menuLine.css("left", linePosition);

            $("#cssmenu > ul > li").hover(function () {
                activeElement = $(this);
                lineWidth = activeElement.width();
                linePosition = activeElement.position().left;
                menuLine.css("width", lineWidth);
                menuLine.css("left", linePosition);
            },
            function () {
                menuLine.css("left", defaultPosition);
                menuLine.css("width", defaultWidth);
            });

        });


    });
})(jQuery);

function Mc() {
    document.getElementById('vehicleSelector').innerHTML = "Mc";
}
function Car() {
    document.getElementById('vehicleSelector').innerHTML = "Bil";
}
function Truck() {
    document.getElementById('vehicleSelector').innerHTML = "Lastebil";
}
i = 0;
function ListAddElement() {
    
    i++;
  /*  var item = document.createElement("li");
    item.innerHTML = "Item" + i;
    */
    if (i <= 4) {
        var item2 = '<li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 2</li>';

        $("#sortable").append(item2);
    }
    else {
        document.getElementById('ErrorMessage').innerHTML = "Maks antall viapunkter lagt til";
    }

}
function ListAddRoute() {
    if (document.getElementById("start").value == "" || document.getElementById("stopp").value == "") {
        document.getElementById('ErrorMessage').innerHTML = "Venligst angi start/stopp";
    }
    else {
        document.getElementById("via").style.visibility = "visible";
        document.getElementById("Calculate").style.visibility = "visible";
        
        var itemStart = '<li style="color:green" class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' + "Start : " + document.getElementById("start").value + '</li>';
        var itemStop = '<li style="color:red" class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' + "Stopp : " + document.getElementById("stopp").value + '</li>';
        $("#sortable").append(itemStart, itemStop);
        document.getElementById('ErrorMessage').innerHTML = "";
        
    }


}
function toggle() {

    if (document.getElementById("start").value == "" || document.getElementById("stopp").value == "") {
        document.getElementById('ErrorMessage').innerHTML = "Venligst angi start/stopp";
    }
    else {
        document.getElementById("via").style.visibility = "visible";
    }
    
    
    

}