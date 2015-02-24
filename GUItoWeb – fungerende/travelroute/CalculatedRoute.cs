﻿using System;
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
        public string Vehicle { get; set; }
        public int Distance { get; set; }
        public int TotalCostSmall { get; set; }
        public int TotalCostLarge { get; set; }
        public List<List<String>> Barriers { get; set; }


    }
}
