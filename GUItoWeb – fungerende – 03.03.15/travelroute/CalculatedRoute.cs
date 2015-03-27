using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace travelroute
{
    public class CalculatedRoute
    {
        public string Start { get; set; }
        public string Stopp { get; set; }
        public List<string> Via { get; set; }
        public int Vehicle { get; set; }
        public int Distance { get; set; }
        public int TotalCostSmall { get; set; }
        public String Time { get; set; }
        public int TotalCostLarge { get; set; }
        public int NumbersOfBarriers { get; set; }
        public List<List<String>> Barriers { get; set; }
        public List<List<String>> Directions { get; set; }


    }
}
