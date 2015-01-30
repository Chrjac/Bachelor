using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RouteMock
{
    public class TravelRoute : travelroute.ITravelRoute
    {
        public IEnumerable<travelroute.MapPosition> Search(string search)
        {
            var ret = new List<travelroute.MapPosition>();
            ret.Add(new travelroute.MapPosition { Name = "Test" });
            return ret;
        }

        public travelroute.RouteResult Calculate(IEnumerable<travelroute.MapPosition> mapPositions)
        {
            throw new NotImplementedException();
        }
    }
}
