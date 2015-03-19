using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace travelroute
{
   public interface ITravelRoute
    {
         String Search(travelroute.Route input);
         Result CalculateResult(String jsonInput, travelroute.Route input);
         CalculatedRoute Calculate(travelroute.Route input);
         CalculatedRoute CalcReturn(travelroute.Route input, travelroute.Result result);
    }
}
