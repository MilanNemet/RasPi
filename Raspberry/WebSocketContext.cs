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
        private bool _notFinished = true;
        private byte _attempts = 0;

        public WebSocketContext(MotorController motorController, SensorController sensorController)
        {
            InitContext(motorController, sensorController);
        }

        void InitContext(MotorController motorController, SensorController sensorController)
        {
            while (_notFinished && _attempts < Byte.MaxValue)
            {
                try
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
                        ws.Connect();

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
                catch
                {
                    ++_attempts;
                    //	  Console.WriteLine(e);
                    Console.WriteLine("WebSocket failure...");
                    Console.WriteLine("Reconnecting in 20 seconds...");
                    for (int i = 0; i < 20; ++i)
                    {
                        Console.Write(".");
                        Thread.Sleep(1000);
                    }
                }
                finally
                {
                    motorController.Dispose();
                    sensorController.Dispose();
                }
            }
        }
    }
}
