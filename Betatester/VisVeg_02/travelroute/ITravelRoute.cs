using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace travelroute
{
   public interface ITravelRoute
    {
         IEnumerable<MapPosition> Search(String search);
         RouteResult Calculate(IEnumerable<MapPosition> mapPositions);

    }
}
