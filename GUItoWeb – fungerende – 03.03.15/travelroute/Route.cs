using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace travelroute
{
    public class Route
    {
        public List<String> Start { get; set; }
        public List<String> Stopp { get; set; }
        public List<List<String>> Via { get; set; }
        public int Vehicle { get; set; }
    }
}