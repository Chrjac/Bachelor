using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Ruteplantjenesten
{
    public class TravelRoute : travelroute.ITravelRoute
    {
        public travelroute.CalculatedRoute Calculate(travelroute.Route input)
        {

            var searchResponse = Search(input);


            if (searchResponse == "1")
            {
                travelroute.CalculatedRoute routeError = new travelroute.CalculatedRoute
                {
                    Start = null,
                    Stopp = "Kan ikke beregne rute, sjekk nettverksforbindelsen",
                    Via = null,
                    Vehicle = 0,
                    Distance = 0,
                    Barriers = null,
                    TotalCostSmall = 0,
                    TotalCostLarge = 0

                };
                return routeError;
            }
            if (searchResponse == "2")
            {
                travelroute.CalculatedRoute routeError = new travelroute.CalculatedRoute
                {
                    Start = null,
                    Stopp = "Kan ikke beregne rute, koordinatfeil",
                    Via = null,
                    Vehicle = 0,
                    Distance = 0,
                    Barriers = null,
                    TotalCostSmall = 0,
                    TotalCostLarge = 0

                };
                return routeError;

            }

            var barrierAndDistanceObject = CalculateResult(searchResponse, input);
            var calculatedResult = CalcReturn(input, barrierAndDistanceObject);

            return calculatedResult;


        }


        public string Search(travelroute.Route input)
        {

            string start = input.Start[1] + ",%" + input.Start[2];
            //start m koordinatfeil:  string start = input.Start[1] + input.Start[2];
            string stop = input.Stopp[1] + ",%" + input.Stopp[2];

            NetworkCredential myCredentials = new NetworkCredential("", "");
            myCredentials.UserName = "TjeRuteplanChja";
            myCredentials.Password = "7LJ7jZETcN";

            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://www.vegvesen.no/ruteplan/routingservice_v1_0/routingservice/solve?stops=" + start + ";" + stop + "&barriers&format=json");
                //HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://www.vegvesen.no/ruteplan/routingservice_v1_0/routingservice/solve?&stops=266280.9993786515,6572059.991325251;272550.6156930047,7042911.082557432&barriers&Navn&format=json");

                request.Credentials = myCredentials;
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                StreamReader stream = new StreamReader(response.GetResponseStream());

                string final = stream.ReadToEnd();

                if (final.Contains("directions"))
                {
                    return final;
                }
                else
                {
                    return "2";
                }
            }
            catch (WebException e)
            {
                return "1";
            }




        }
        public travelroute.Result CalculateResult(string jsonInput, travelroute.Route input)
        {

            JObject o = JObject.Parse(jsonInput);

            var distance = int.Parse(o["directions"][0]["summary"]["totalLength"].ToString());
            var numbersOfBarriers = int.Parse(o["directions"][0]["summary"]["statistics"][3]["value"].ToString());
            int totalCostSmall = int.Parse(o["directions"][0]["summary"]["statistics"][0]["value"].ToString());
            int totalCostLarge = int.Parse(o["directions"][0]["summary"]["statistics"][1]["value"].ToString());
            var barrierList = new List<List<String>>();

            int c = o["directions"][0]["features"].Count();
            for (int i = 0; i < c; i++)
            {
                if (o["directions"][0]["features"][i]["attributes"]["roadFeatures"].HasValues == true)
                {
                    if (o["directions"][0]["features"][i]["attributes"]["roadFeatures"][0].HasValues == true)
                    {
                        var b = o["directions"][0]["features"][i]["attributes"]["roadFeatures"].Count();
                        for (int j = 0; j < b; j++)
                        {
                            if (o["directions"][0]["features"][i]["attributes"]["roadFeatures"][j]["attributeType"].ToString().Equals("nvdb:Bomstasjon"))
                            {
                                var list = new List<String>();
                                var priceSmall = o["directions"][0]["features"][i]["attributes"]["roadFeatures"][j]["values"][0]["value"];
                                var priceLarge = o["directions"][0]["features"][i]["attributes"]["roadFeatures"][j]["values"][1]["value"];
                                list.Add(o["directions"][0]["features"][i]["attributes"]["roadFeatures"][j]["values"][2]["value"].ToString());
                                list.Add(priceSmall.ToString());
                                list.Add(priceLarge.ToString());
                                barrierList.Add(list);
                            }
                        }
                    }
                }
            }


            travelroute.Result barrierAndDistanceObject = new travelroute.Result
            {
                Distance = distance,
                Barriers = new List<List<String>>(barrierList),
                NumbersOfBarriers = numbersOfBarriers,
                PriceSmall = totalCostSmall,
                PriceTruck = totalCostLarge

            };

            return barrierAndDistanceObject;
        }

        public travelroute.CalculatedRoute CalcReturn(travelroute.Route input, travelroute.Result result)
        {
            String[] viaList = new string[input.Via.Count()];

            for (int i = 0; i < input.Via.Count(); i++)
                viaList[i] = input.Via[i][0];

            travelroute.CalculatedRoute routeInfo = new travelroute.CalculatedRoute
            {
                Start = input.Start[0],
                Stopp = input.Stopp[0],
                Via = new List<String>(viaList),
                Vehicle = input.Vehicle,
                Distance = result.Distance,
                NumbersOfBarriers = result.NumbersOfBarriers,
                Barriers = result.Barriers,
                TotalCostSmall = result.PriceSmall,
                TotalCostLarge = result.PriceTruck

            };
            return routeInfo;
        }
    }
}
