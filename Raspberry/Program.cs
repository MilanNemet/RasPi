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
            new WebSocketContext(new MotorController(), new SensorController());
        }
    }
}
