using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.Serialization;
using Newtonsoft.Json;
 using System.Web.Script.Serialization;
using Newtonsoft.Json.Linq;
using System.Reflection;

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
                    Time = null,
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
                    Time = null,
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
            string start = input.Start[1] + "," + input.Start[2];
            string stop = input.Stopp[1] + "," + input.Stopp[2];
            string via = "";

            for (int i = 0; i < input.Via.Count(); i++)
            {
                via = via + input.Via[i][1] + "," + input.Via[i][2] + ";";
            }

            string url = "https://www.vegvesen.no/ruteplan/routingservice_v1_0/routingservice/solve?&stops=" + start + ";" + via + stop + "&barriers&format=json&lang=nb-NO";

            //Testurl med koordinatfeil
            //string testurl = "https://www.vegvesen.no/ruteplan/routingservice_v1_0/routingservice/solve?&stops=" + start + ":" + via + ";" + stop + "&barriers&format=json&en-NO";

            NetworkCredential myCredentials = new NetworkCredential("", "");
            myCredentials.UserName = "TjeRuteplanChja";
            myCredentials.Password = "7LJ7jZETcN";

            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
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
            var testobj = JsonConvert.DeserializeObject<Example>(jsonInput);

            //eksisterende kode som fungerer:
            JObject o = JObject.Parse(jsonInput);

            var distance = int.Parse(o["directions"][0]["summary"]["totalLength"].ToString());
            var numbersOfBarriers = int.Parse(o["directions"][0]["summary"]["statistics"][3]["value"].ToString());
            int totalCostSmall = int.Parse(o["directions"][0]["summary"]["statistics"][0]["value"].ToString());
            int totalCostLarge = int.Parse(o["directions"][0]["summary"]["statistics"][1]["value"].ToString());
            var time = o["directions"][0]["summary"]["totalDriveTime"].ToString();
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

            var directionList = new List<List<String>>();


            for (int i = 0; i < c; i++)
            {

                var list = new List<String>();
                var dir = o["directions"][0]["features"][i]["attributes"]["text"];
                list.Add(dir.ToString());

                directionList.Add(list);
            }




            travelroute.Result barrierAndDistanceObject = new travelroute.Result
            {
                Distance = distance,
                Barriers = new List<List<String>>(barrierList),
                NumbersOfBarriers = numbersOfBarriers,
                PriceSmall = totalCostSmall,
                Time = time,
                PriceTruck = totalCostLarge,
                Directions = directionList

            };

            return barrierAndDistanceObject;
        }

        public travelroute.CalculatedRoute CalcReturn(travelroute.Route input, travelroute.Result result)
        {

            //skal endres til å være hentet fra json fra ruteplantjenesten
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
                Time = result.Time,
                Directions = result.Directions,
                TotalCostSmall = result.PriceSmall,
                TotalCostLarge = result.PriceTruck

            };
            return routeInfo;
        }
    }

   public class Location
    {
        [JsonProperty("easting")]
        public double Easting { get; set; }

        [JsonProperty("northing")]
        public double Northing { get; set; }

        [JsonProperty("srs")]
        public string Srs { get; set; }
    }

    public class Value
    {
        [JsonProperty("key")]
        public string Key { get; set; }

        [JsonProperty("value")]
        public string Valuee { get; set; }
    }

    public class RoadFeature
    {
        [JsonProperty("attributeType")]
        public string AttributeType { get; set; }

        [JsonProperty("distanceAlongSegment")]
        public double DistanceAlongSegment { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("location")]
        public Location[] Location { get; set; }

        [JsonProperty("values")]
        public Value[] Values { get; set; }
    }

    public class Attributes
    {
        [JsonProperty("ETA")]
        public int ETA { get; set; }

        [JsonProperty("length")]
        public double Length { get; set; }

        [JsonProperty("maneuverType")]
        public string ManeuverType { get; set; }

        [JsonProperty("roadFeatures")]
        public RoadFeature[] RoadFeatures { get; set; }

        [JsonProperty("text")]
        public string Text { get; set; }

        [JsonProperty("time")]
        public double Time { get; set; }
    }

    public class Feature
    {
        [JsonProperty("attributes")]
        public Attributes Attributes { get; set; }

        [JsonProperty("compressedGeometry")]
        public string CompressedGeometry { get; set; }
    }

    public class Envelope
    {
        [JsonProperty("xmax")]
        public int Xmax { get; set; }

        [JsonProperty("xmin")]
        public int Xmin { get; set; }

        [JsonProperty("ymax")]
        public int Ymax { get; set; }

        [JsonProperty("ymin")]
        public int Ymin { get; set; }
    }

    public class Statistic
    {

        [JsonProperty("key")]
        public string Key { get; set; }

        [JsonProperty("value")]
        public int Value { get; set; }
    }

    public class Summary
    {
        [JsonProperty("envelope")]
        public Envelope Envelope { get; set; }

        [JsonProperty("statistics")]
        public Statistic[] Statistics { get; set; }

        [JsonProperty("totalDriveTime")]
        public double TotalDriveTime { get; set; }

        [JsonProperty("totalLength")]
        public int TotalLength { get; set; }

        [JsonProperty("totalTime")]
        public double TotalTime { get; set; }
    }

    public class Direction
    {
        [JsonProperty("features")]
        public Feature[] Features { get; set; }

        [JsonProperty("routeId")]
        public int RouteId { get; set; }

        [JsonProperty("routeName")]
        public string RouteName { get; set; }

        [JsonProperty("summary")]
        public Summary Summary { get; set; }
    }

    public class Attribute
    {
        [JsonProperty("key")]
        public string Key { get; set; }

        [JsonProperty("value")]
        public int Value { get; set; }
    }

    public class Attributes2
    {
        [JsonProperty("Name")]
        public object Name { get; set; }

        [JsonProperty("ObjectID")]
        public int ObjectID { get; set; }

        [JsonProperty("Shape_Length")]
        public int ShapeLength { get; set; }

        [JsonProperty("Total_DriveTime tourist")]
        public int TotalDriveTimeTourist { get; set; }

        [JsonProperty("Total_Meters")]
        public int TotalMeters { get; set; }

        [JsonProperty("Total_Minutes")]
        public double TotalMinutes { get; set; }

        [JsonProperty("Total_Toll large")]
        public int TotalTollLarge { get; set; }

        [JsonProperty("Total_Toll small")]
        public int TotalTollSmall { get; set; }

        [JsonProperty("attributes")]
        public Attribute[] Attributes { get; set; }
    }

    public class Geometry
    {
        [JsonProperty("paths")]
        public int[][][] Paths { get; set; }
    }

    public class Feature2
    {
        [JsonProperty("attributes")]
        public Attributes2 Attributes { get; set; }

        [JsonProperty("geometry")]
        public Geometry Geometry { get; set; }

        [JsonProperty("geometrysimple")]
        public object Geometrysimple { get; set; }
    }

    public class Routes
    {
        [JsonProperty("features")]
        public Feature2[] Features { get; set; }
    }

    public class Example
    {
        public Direction[] directions { get; set; }
        public object error { get; set; }
        public Routes routes { get; set; }
    }


}
