using System.Diagnostics;
using System.Configuration;

namespace RasPi
{
    static class Program
    {
        static void Main()
        {
//            StartStreaming();
            new WebSocketContext(new MotorController(), new SensorController());
        }
        
        static void StartStreaming()
        {
            Process process = new Process();
            ProcessStartInfo startInfo = new ProcessStartInfo();
            
            startInfo.WindowStyle = ProcessWindowStyle.Hidden;
            startInfo.FileName = ConfigurationManager.AppSettings["RaspividProcessName"];
            startInfo.Arguments = ConfigurationManager.AppSettings["RaspividProcessArgs"];
            
            process.StartInfo = startInfo;
            process.Start();
        }
    }
}
