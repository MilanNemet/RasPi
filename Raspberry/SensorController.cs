﻿using System;
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
        private string localHost = ConfigurationManager.AppSettings["UdpAddress"];
        private int port = int.Parse(ConfigurationManager.AppSettings["UdpPort"]);
        private bool terminate = false;
        private uint counter = 1;
        private uint sf = uint.Parse(ConfigurationManager.AppSettings["SendingFrequency"]);

        private UdpClient RemoteUdpClient;
        private IPEndPoint RemoteIpEndPoint;
        public WebSocket WS { get; set; }

        private VelocityManager vmx = new VelocityManager(float.Parse(ConfigurationManager.AppSettings["MuzzleVelocity-X"]));
        private VelocityManager vmy = new VelocityManager(float.Parse(ConfigurationManager.AppSettings["MuzzleVelocity-Y"]));
        private VelocityManager vmz = new VelocityManager(float.Parse(ConfigurationManager.AppSettings["MuzzleVelocity-Z"]));

        public SensorController()
        {
            RemoteUdpClient = new UdpClient(port);
            RemoteIpEndPoint = new IPEndPoint(IPAddress.Parse(localHost), port);
        }

        public void StartTransmission()
        {
            RunPyScript();
            while (!terminate)
            {
                try
                {
                    Byte[] receiveBytes = RemoteUdpClient.Receive(ref RemoteIpEndPoint);
                    string returnData = Encoding.UTF8.GetString(receiveBytes);

                    var information = JsonSerializer.Deserialize<float[]>(returnData);

                    vmx.ReCount(information[0], information[3]);
                    vmy.ReCount(information[1], information[3]);
                    vmz.ReCount(information[2], information[3]);

                    float[] clientData = new float[] 
                    {
                        information[0], information[1], information[2], 
                        vmx.Velocity, vmy.Velocity, vmz.Velocity 
                    };

                    if (counter % sf == 0) 
                    {
                        if (!WS.IsAlive)
                        {
                            WebSocketContext.StartConnecting();
                        }
                        else
                        {
                            string clientJson = JsonSerializer.Serialize(clientData);
                            WS.Send(clientJson);
                        }
                        if (counter > 4294967000) counter = 0;
                    }
                    ++counter;
                }
                catch
                {
                    Console.WriteLine("\n\n SENSORCONTROLLER CLASS \n\n");
                    throw;
                }
            }
        }

        private void RunPyScript()
        {
            System.Diagnostics.Process process = new System.Diagnostics.Process();
            System.Diagnostics.ProcessStartInfo startInfo = new System.Diagnostics.ProcessStartInfo();
            startInfo.WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden;
            startInfo.FileName = ConfigurationManager.AppSettings["ProcessName"];
            startInfo.Arguments = ConfigurationManager.AppSettings["ProcessArgs"];
            process.StartInfo = startInfo;
            process.Start();
        }

        public void Dispose()
        {
            terminate = true;
            Thread.Sleep(100);
            RemoteUdpClient.Dispose();
        }
    }
}
