using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VisVeg
{
 public   class TravelRoute : travelroute.ITravelRoute
    {
        public IEnumerable<travelroute.MapPosition> Search(string search)
        {
            throw new NotImplementedException();
        }

        public travelroute.RouteResult Calculate(IEnumerable<travelroute.MapPosition> mapPositions)
        {
            throw new NotImplementedException();
        }
    }
}
