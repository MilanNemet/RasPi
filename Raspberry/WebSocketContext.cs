using System;
using System.Configuration;
using System.Threading;
using WebSocketSharp;

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
                    WS.Send(new MessageBlock().ToString());
                };
                WS.OnError += (sender, e) =>
                {
                    Console.WriteLine("WS ERROR");
                    WS.Close(CloseStatusCode.Abnormal);
                };
                WS.OnClose += (sender, e) =>
                {
                    Console.WriteLine("WS CLOSED");
                };
                WS.OnClose += (sender, e) =>
                {
                    if (!e.WasClean || e.Code == (ushort)CloseStatusCode.Abnormal)
                    {
                        WS.Close();
                        ReCreate();
                        StartConnecting();
                    }
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
        static public void ReCreate()
        {
            if (!WS.IsAlive)
            {
                WS = new WebSocket(ConfigurationManager.AppSettings["WebSocketAddress"]);
            }
        }
    }
}
