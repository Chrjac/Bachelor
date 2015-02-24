using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ruteplantjenesten
{
    public class TravelRoute : travelroute.ITravelRoute
    {


        public travelroute.CalculatedRoute Calculate(travelroute.Route input)
        {

            var test = Search(input);
            var barrierAndDistanceObject = CalculateResult(test, input);
            var calculatedResult = CalcReturn(input, barrierAndDistanceObject);

            //Debug.WriteLine(calculatedResult.Start);

            return calculatedResult;

        }

        public travelroute.Result CalculateResult(string jsonInput, travelroute.Route input)
        {

            Debug.WriteLine(jsonInput);

            //stasjonene beregnes utifra jsonstringen
            Random rnd = new Random();
            var distance = rnd.Next(1, 200);
            int numbersOfBarriers = 5;
            int totalCostSmall = 0;
            int totalCostLarge = 0;
            var trackList = new List<List<String>>();

            for (int i = 0; i < numbersOfBarriers; i++)
            {
                var list = new List<String>();
                var priceSmall = (rnd.Next(1, 20));
                var priceLarge = priceSmall + 100;
                list.Add("Bomnr" + i);
                list.Add(priceSmall.ToString());
                list.Add(priceLarge.ToString());
                trackList.Add(list);
            }

            for (int i = 0; i < numbersOfBarriers; i++)
            {
                totalCostSmall = totalCostSmall + int.Parse(trackList[i][1]);
                totalCostLarge = totalCostLarge + int.Parse(trackList[i][2]);
            }

            travelroute.Result barrierAndDistanceObject = new travelroute.Result
            {
                Distance = distance,
                Barriers = new List<List<String>>(trackList),
                PriceSmall = totalCostSmall,
                PriceTruck = totalCostLarge

            };


            return barrierAndDistanceObject;
        }


        public string Search(travelroute.Route input)
        {
            
            //søk mot visveg - skal returnere JSON
            return "test";
        }


        public travelroute.CalculatedRoute CalcReturn(travelroute.Route input, travelroute.Result result)
        {

            //skal endres når input endres til objekt
            string[] separators = { "," };
            string value = input.Via;
            string[] arrayOfInputVia = value.Split(separators, StringSplitOptions.RemoveEmptyEntries);

            //henter ut antallet viapunkter
            int numbersOfVia = arrayOfInputVia.Count();

            String[] viaList = new string[arrayOfInputVia.Count()];
            viaList = arrayOfInputVia;
            Random rnd = new Random();


            travelroute.CalculatedRoute routeInfo = new travelroute.CalculatedRoute
            {
                Start = input.Start,
                Stopp = input.Stopp,
                Via = new List<String>(viaList),
                Vehicle = input.Vehicle,
                Distance = result.Distance,
                Barriers = result.Barriers,
                TotalCostSmall = result.PriceSmall,
                TotalCostLarge = result.PriceTruck

            };
            return routeInfo;
        }
    }
}
