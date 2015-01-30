using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FindRoute.Controllers
{
    public class ValuesController : ApiController
    {


        // GET api/values/5
        public IEnumerable<travelroute.MapPosition> Get(string search)
        {
            return LazyFramework.ClassFactory.GetTypeInstance<travelroute.ITravelRoute>().Search(search);
        }

      

    }
}