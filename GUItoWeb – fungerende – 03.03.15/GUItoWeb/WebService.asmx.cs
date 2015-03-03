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
        public travelroute.CalculatedRoute PassToTravelRoute(string[] Start, string[] Stopp, string[][] Via, int Vehicle)
        {
            var viaList = new List<List<String>>();

            for (int i = 0; i < Via.Count(); i++)
            {
                var list = new List<String>();
                list.Add(Via[i][0]);
                list.Add(Via[i][1]);
                list.Add(Via[i][2]);
                viaList.Add(list);
            }

            travelroute.Route selectedRoute = new travelroute.Route
            {
                Start = new List<String>(Start),
                Stopp = new List<String>(Stopp),
                Via = new List<List<String>>(viaList),
                Vehicle = Vehicle,


            };

            travelroute.ITravelRoute R = new Ruteplantjenesten.TravelRoute();
            var result = R.Calculate(selectedRoute);

        
            
            return result;
        }
        

    }
}
