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

        static private WebSocket WS { get; set; } = new WebSocket(ConfigurationManager.AppSettings["WebSocketAddress"]);

        void InitContext(MotorController motorController, SensorController sensorController)
        {
            try
            {
                WS.OnOpen += (sender, e) =>
                {
                    Console.WriteLine("WS OPEN");
                };
                WS.OnError += (sender, e) =>
                {
                    Console.WriteLine("WS ERROR");
                };
                WS.OnClose += (sender, e) =>
                {
                    Console.WriteLine("WS CLOSED");
                };
                WS.OnMessage += (sender, e) =>
                {
                    Console.WriteLine(e.Data);
                };
                WS.OnMessage += motorController.HandleCommand;

                StartConnecting();

                sensorController.WS = WS;
                var senderThread = new Thread(sensorController.StartTransmission);
                senderThread.IsBackground = true;
                senderThread.Start();

                var str = "";
                while (str != "exit")
                {
                    str = Console.ReadLine();
                    WS.Send(str);
                }
                Thread.Sleep(500);
                
            }
            catch
            {
                throw;
            }
            finally
            {
                WS.Close();
                motorController.Dispose();
                sensorController.Dispose();
            }
        }
        static public void StartConnecting()
        {
            while (!WS.IsAlive)
            {
                Console.WriteLine("WS CONNECTING...");
                WS.Connect();
            }
        }
    }
}
