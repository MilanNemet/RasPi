using System;
using System.Configuration;
using System.Diagnostics;
using System.Threading;
using WebSocketSharp;

namespace RasPi
{
    static class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Waiting for debugger attach.\n");
            while (true)
            {
                if (Debugger.IsAttached) break;
                Console.Write("█");
                Thread.Sleep(200);
            }
            //string js1 = "{\"Type\":\"control\",\"Value\":\"SL\",\"TimeStamp\":\"2020-02-28T17:29:34.486Z\"}";
            //string js2 = "{\"Type\":\"control\",\"Value\":\"SF\",\"TimeStamp\":\"2020-02-28T17:42:53.512Z\"}";

            //var mb1 = new MessageBlock(js1);
            //var mb2 = new MessageBlock(js2);

            //Console.WriteLine(mb1.Type);
            //Console.WriteLine(mb1.Value);
            //Console.WriteLine(mb1.TimeStamp);

            //Console.WriteLine();

            //Console.WriteLine(mb2.Type.ToUpper());
            //Console.WriteLine(mb2.Value.ToUpper());
            //Console.WriteLine(mb2.TimeStamp.ToString().ToUpper());

            new WebSocketContext(new MotorController(), new SensorController());
        }
    }
}
