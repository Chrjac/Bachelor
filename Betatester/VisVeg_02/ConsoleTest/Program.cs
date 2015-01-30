using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleTest
{
    class Program
    {
        static void Main(string[] args)
        {


            LazyFramework.Runtime.Context.Current = new LazyFramework.Runtime.WinThread();

            LazyFramework.ClassFactory.SetTypeInstance<travelroute.ITravelRoute, VisVeg.TravelRoute>();
            travelroute.ITravelRoute service;
            //service = new RouteMock.TravelRoute();

            service = LazyFramework.ClassFactory.GetTypeInstance<travelroute.ITravelRoute, RouteMock.TravelRoute>();
            
            foreach  (var e in service.Search("blablabla") ){
                Console.WriteLine(e.Name);

            }
            Console.ReadKey();
            


        }
    }
}
