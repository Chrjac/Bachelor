using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;



namespace GUItoWeb
{
    /// <summary>
    /// Summary description for WebService1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]


    public class WebService1 : System.Web.Services.WebService
    {

     



        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public travelroute.CalculatedRoute PassToTravelRoute(String start, String stopp, String via, String vehicle)
        {

            travelroute.Route selectedRoute = new travelroute.Route
            {
                Start = start,
                Stopp = stopp,
                Via = via,
                Vehicle = vehicle
            };

            travelroute.ITravelRoute R = new Ruteplantjenesten.TravelRoute();
            var result = R.Calculate(selectedRoute);

        
            
            return result;
        }
        

    }
}
