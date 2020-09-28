using System;
using System.Configuration;
using System.Diagnostics;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using WebSocketSharp;

namespace RasPi
{
	class SensorController : IDisposable
	{
		private string localHost = ConfigurationManager.AppSettings["UdpAddress"];
		private int port = int.Parse(ConfigurationManager.AppSettings["UdpPort"]);
		private bool terminate = false;
		private uint counter = 1;
		private uint snm = uint.Parse(ConfigurationManager.AppSettings["SendingNthMetrics"]);
		private byte deadline = byte.Parse(ConfigurationManager.AppSettings["DeadLine"]);

		private UdpClient RemoteUdpClient;
		private IPEndPoint RemoteIpEndPoint;
		public WebSocket WS { get; set; }
		public WebSocketContext OwnWsc { get; set; } = null;

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

					if (information[0] > deadline || information[1] > deadline || information[2] > deadline)
					{
						WebSocketContext.TriggerEmergency(OwnWsc);
					}

					if (counter % snm == 0)
					{
						float[] clientData = new float[]
						{
							information[0], information[1], information[2],
							vmx.Velocity, vmy.Velocity, vmz.Velocity
						};
						MessageBlock sendMsg = new MessageBlock(clientData);
						string clientJson = JsonSerializer.Serialize(sendMsg);
						
						try
						{
							WS.Send(clientJson);
						}
						catch (Exception ex)
						{
							Console.WriteLine("WS send error!\n\n" + ex.Message);
						}
						
						if (counter > 4294967000) counter = 1;
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
			Process process = new Process();
			ProcessStartInfo startInfo = new ProcessStartInfo();
			startInfo.WindowStyle = ProcessWindowStyle.Hidden;
			startInfo.FileName = ConfigurationManager.AppSettings["PythonProcessName"];
			startInfo.Arguments = ConfigurationManager.AppSettings["PythonProcessArgs"];
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
