namespace RasPi
{
    static class Program
    {
        static void Main()
        {
            new WebSocketContext(new MotorController(), new SensorController());
        }
    }
}