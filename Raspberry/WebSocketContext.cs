using System;
using System.Configuration;
using WebSocketSharp;
using System.Threading;
using System.Collections.Generic;
using System.Text;

namespace RasPi
{
    class WebSocketContext
    {
        public WebSocketContext(MotorController motorController, SensorController sensorController)
        {
            InitContext(motorController, sensorController);
        }

        void InitContext(MotorController motorController, SensorController sensorController)
        {
            using (var ws = new WebSocket(ConfigurationManager.AppSettings["WebSocketAddress"]))
            {
                ws.OnOpen += (sender, e) =>
                {
                    Console.WriteLine("WS OPEN");
                };
                ws.OnError += (sender, e) =>
                {
                    Console.WriteLine("WS ERROR");
                };
                ws.OnClose += (sender, e) =>
                {
                    Console.WriteLine("WS CLOSED");
                };
                ws.OnMessage += (sender, e) =>
                {
                    Console.WriteLine(e.Data);
                };
                ws.OnMessage += motorController.HandleCommand;

                StartConnecting(ws);

                sensorController.WS = ws;
                var senderThread = new Thread(sensorController.StartTransmission);
                senderThread.IsBackground = true;
                senderThread.Start();

                var str = "";
                while (str != "exit")
                {
                    str = Console.ReadLine();
                    ws.Send(str);
                }
                Thread.Sleep(500);
                motorController.Dispose();
                sensorController.Dispose();
            }
        }
        static void StartConnecting(WebSocket ws)
        {
            while (!ws.IsAlive)
            {
                Console.WriteLine("WS CONNECTING...");
                ws.Connect();
            }
        }
    }
}
