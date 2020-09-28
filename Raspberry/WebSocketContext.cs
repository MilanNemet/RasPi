using System;
using System.Configuration;
using System.Threading;
using WebSocketSharp;

namespace RasPi
{
    class WebSocketContext
    {
        private MotorController Mc { get; set; }
        private SensorController Sc { get; set; }
        public WebSocketContext(MotorController motorController, SensorController sensorController)
        {;
            Mc = motorController;
            Sc = sensorController;
            Sc.OwnWsc = this;
            InitContext(Mc, Sc);
        }

        static private WebSocket WS { get; set; } = new WebSocket(ConfigurationManager.AppSettings["WebSocketAddress"]);

        void InitContext(MotorController motorController, SensorController sensorController)
        {
            try
            {
                WS.OnOpen += (sender, e) =>
                {
                    Console.WriteLine("WS OPEN");
                    WS.Send(new MessageBlock(new string[] { "auth", "greeting" }).ToString());
                };
                WS.OnError += (sender, e) =>
                {
                    Console.WriteLine("WS ERROR");
                    WS.Send(new MessageBlock(new string[] { "auth", "goodbye" }).ToString());
                    WS.Close(CloseStatusCode.Abnormal);
                };
                WS.OnClose += (sender, e) =>
                {
                    Console.WriteLine("WS CLOSED");
                    if (!e.WasClean || e.Code == (ushort)CloseStatusCode.Abnormal)
                    {
                        WS.Send(new MessageBlock(new string[] { "auth", "goodbye" }).ToString());
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
                }

                WS.Send(new MessageBlock(new string[] { "auth", "goodbye" }).ToString());
                WS.Close(CloseStatusCode.Normal, "Terminated by user...");
                Thread.Sleep(500);
            }
            catch
            {
                WS.Send(new MessageBlock(new string[] { "auth", "goodbye" }).ToString());
                WS.Close(CloseStatusCode.Abnormal, "Terminated by an Exception!");
                throw;
            }
            finally
            {
                WS.Send(new MessageBlock(new string[] { "auth", "goodbye" }).ToString());
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
                Thread.Sleep(1000);
            }
        }
        static public void ReCreate()
        {
            if (!WS.IsAlive)
            {
                WS = new WebSocket(ConfigurationManager.AppSettings["WebSocketAddress"]);
            }
        }
        
        public static void TriggerEmergency(WebSocketContext wsc)
        {
            wsc.Mc.HandleEmergency();
            return;
        }
        
        
    }
}
