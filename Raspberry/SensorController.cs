using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using WebSocketSharp;
using System.Threading;

namespace RasPi
{
    class SensorController:IDisposable
    {
        static string localHost = ConfigurationManager.AppSettings["UdpAddress"];
        static int port = int.Parse(ConfigurationManager.AppSettings["UdpPort"]);
        static bool terminate = false;
        
        private UdpClient RemoteUdpClient;
        private IPEndPoint RemoteIpEndPoint;
        public WebSocket WS { get; set; }

        public SensorController()
        {
            RemoteUdpClient = new UdpClient(port);
            RemoteIpEndPoint = new IPEndPoint(IPAddress.Parse(localHost), port);
        }

        public void StartTransmission()
        {
            while (!terminate)
            {
                try
                {
                    Byte[] receiveBytes = RemoteUdpClient.Receive(ref RemoteIpEndPoint);
                    string returnData = Encoding.UTF8.GetString(receiveBytes);

                    //var information = JsonSerializer.Deserialize<float[]>(returnData);

                    WS.Send(returnData);

                    //Console.WriteLine("received message: \n" +
                    //                    "json: " + returnData.ToString() + "\n" +
                    //                    "after processing: ");
                    //foreach (var item in information)
                    //{
                    //    Console.Write(item + "\t");
                    //}
                    //Console.WriteLine("\n" +
                    //                    "From -> " +
                    //                            RemoteIpEndPoint.Address.ToString() +
                    //                            ":" +
                    //                            RemoteIpEndPoint.Port.ToString());
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.ToString());
                    throw;
                }
            }
        }

        public void Dispose()
        {
            terminate = true;
            Thread.Sleep(100);
            RemoteUdpClient.Dispose();
        }
    }
}
