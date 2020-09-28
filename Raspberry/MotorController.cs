using System;
using System.Configuration;
using System.Device.Gpio;
using System.Device.Pwm.Drivers;
using System.Threading;
using WebSocketSharp;

namespace RasPi
{
    class MotorController : IDisposable
    {
        static readonly int FwL = int.Parse(ConfigurationManager.AppSettings["ForwardLeft"]);
        static readonly int BwL = int.Parse(ConfigurationManager.AppSettings["BackwardLeft"]);
        static readonly int FwR = int.Parse(ConfigurationManager.AppSettings["ForwardRight"]);
        static readonly int BwR = int.Parse(ConfigurationManager.AppSettings["BackwardRight"]);
        static readonly int PwmL = int.Parse(ConfigurationManager.AppSettings["PwmLeft"]);
        static readonly int PwmR = int.Parse(ConfigurationManager.AppSettings["PwmRight"]);
        static readonly int STBY = int.Parse(ConfigurationManager.AppSettings["StandBy"]);
        static readonly int StdFreq = int.Parse(ConfigurationManager.AppSettings["StandardFrequency"]);
        static readonly double StdCycle = double.Parse(ConfigurationManager.AppSettings["StdDutyCycle"]);

        MotionState motionState = null;
        GpioController gpio = null;

        SoftwarePwmChannel LeftChannel = new SoftwarePwmChannel(PwmL, StdFreq, StdCycle, true);
        SoftwarePwmChannel RightChannel = new SoftwarePwmChannel(PwmR, StdFreq, StdCycle, true);

        public MotorController()
        {
            //gpio = new GpioController();
	        var pns = PinNumberingScheme.Logical;
            var rpi3Driver = new System.Device.Gpio.Drivers.RaspberryPi3Driver();
            gpio = new GpioController(pns, rpi3Driver);

            motionState = new MotionState();
            InitMotors();
        }
        ~MotorController()
        {
            Dispose();
        }
        void InitMotors()
        {
            Console.WriteLine("Initializing DC Motors... \n");

            gpio.OpenPin(FwL, PinMode.Output);
            gpio.OpenPin(BwL, PinMode.Output);
            gpio.OpenPin(FwR, PinMode.Output);
            gpio.OpenPin(BwR, PinMode.Output);
            gpio.OpenPin(STBY, PinMode.Output);

            LeftChannel.Start();
            RightChannel.Start();
        }
        public void Dispose()
        {
            LeftChannel.Stop();
            RightChannel.Stop();
            SetDefaults(gpio);

            gpio.ClosePin(FwL);
            gpio.ClosePin(BwL);

            gpio.ClosePin(FwR);
            gpio.ClosePin(BwR);

            gpio.ClosePin(STBY);

            LeftChannel.Dispose();
            RightChannel.Dispose();
            gpio.Dispose();
        }

        public void HandleCommand(object sender, MessageEventArgs e)
        {
            if (e.IsText)
            {
                DoControl((new MessageBlock(e.Data)).Value);
                return;
            }
            if (e.IsBinary)
            {
                Console.WriteLine($"Binary: {e.Data}");
                return;
            }
        }
        public void HandleEmergency()
        {
                DoControl("S");
                return;
        }
        void DoControl(string ControlSign)
        {
            //Starters
            if (ControlSign.isF())
            {
                GoForward(gpio);
                HandleFB(ControlSign);
            }
            if (ControlSign.isB())
            {
                GoBackward(gpio);
                HandleFB(ControlSign);
            }
            if (ControlSign.isL())
            {
                HandleLR(ControlSign);
            }
            if (ControlSign.isR())
            {
                HandleLR(ControlSign);
            }
            //Stoppers
            if (ControlSign.isS()) FullStop(gpio);
            if (ControlSign.isSF())
            {
                motionState.Vector &= Direction.FMask;
                HandleSFB();
            }
            if (ControlSign.isSB())
            {
                motionState.Vector &= Direction.BMask;
                HandleSFB();
            }
            if (ControlSign.isSL())
            {
                motionState.Vector &= Direction.LMask;
                HandleSLR();
            }
            if (ControlSign.isSR())
            {
                motionState.Vector &= Direction.RMask;
                HandleSLR();
            }
            Thread.Sleep(50);
        }

        #region HANDLERS
        private void HandleSLR()
        {
            ResetPwm();
            if (motionState.Vector == Direction.Forward)
            {
                GoForward(gpio);
            }
            else if (motionState.Vector == Direction.Backward)
            {
                GoBackward(gpio);
            }
            else FullStop(gpio);
        }
        private void HandleSFB()
        {
            ResetPwm();
            if (motionState.Vector == Direction.Left)
            {
                RotateLeft(gpio);
            }
            else if (motionState.Vector == Direction.Right)
            {
                RotateRight(gpio);
            }
            else FullStop(gpio);
        }
        private void HandleLR(string option)
        {
            if (option.isL())
            {
                if (motionState.Vector == Direction.None || motionState.Vector == Direction.Right)
                {
                    RotateLeft(gpio);
                    motionState.Vector &= Direction.RMask;
                }
                else KeepToLeft();
            }
            if (option.isR())
            {
                if (motionState.Vector == Direction.None || motionState.Vector == Direction.Left)
                {
                    RotateRight(gpio);
                    motionState.Vector &= Direction.LMask;
                }
                else KeepToRight();
            }
        }
        private void HandleFB(string option)
        {
            if ((motionState.Vector & Direction.Left) == Direction.Left)
            {
                KeepToLeft();
            }
            if ((motionState.Vector & Direction.Right) == Direction.Right)
            {
                KeepToRight();
            }
            if (option.isF())
            {
                motionState.Vector &= Direction.BMask;
            }
            if (option.isB())
            {
                motionState.Vector &= Direction.FMask;
            }
        }
        #endregion

        #region REGULATIONS
        private void KeepToRight()
        {
            LeftChannel.DutyCycle = StdCycle;
            RightChannel.DutyCycle = StdCycle / 2; //not sure
            motionState.Vector |= Direction.Right;
        }
        private void KeepToLeft()
        {
            LeftChannel.DutyCycle = StdCycle / 2; //not sure
            RightChannel.DutyCycle = StdCycle;
            motionState.Vector |= Direction.Left;
        }
        private void ResetPwm()
        {
            LeftChannel.DutyCycle = StdCycle;
            RightChannel.DutyCycle = StdCycle;
        }
        #endregion

        #region CONTROLS
        void GoForward(GpioController gpio)
        {
            SetDefaults(gpio);

            gpio.Write(FwL, PinValue.High);
            gpio.Write(BwL, PinValue.Low);

            gpio.Write(FwR, PinValue.High);
            gpio.Write(BwR, PinValue.Low);

            gpio.Write(STBY, PinValue.High);
            motionState.Vector |= Direction.Forward;
        }
        void GoBackward(GpioController gpio)
        {
            SetDefaults(gpio);

            gpio.Write(FwL, PinValue.Low);
            gpio.Write(BwL, PinValue.High);

            gpio.Write(FwR, PinValue.Low);
            gpio.Write(BwR, PinValue.High);

            gpio.Write(STBY, PinValue.High);
            motionState.Vector |= Direction.Backward;
        }
        void RotateLeft(GpioController gpio)
        {
            SetDefaults(gpio);

            gpio.Write(FwL, PinValue.Low);
            gpio.Write(BwL, PinValue.High);

            gpio.Write(FwR, PinValue.High);
            gpio.Write(BwR, PinValue.Low);

            gpio.Write(STBY, PinValue.High);

            motionState.Vector |= Direction.Left;
        }
        void RotateRight(GpioController gpio)
        {
            SetDefaults(gpio);

            gpio.Write(FwL, PinValue.High);
            gpio.Write(BwL, PinValue.Low);

            gpio.Write(FwR, PinValue.Low);
            gpio.Write(BwR, PinValue.High);

            gpio.Write(STBY, PinValue.High);

            motionState.Vector |= Direction.Right;
        }
        void FullStop(GpioController gpio)
        {
            motionState.Vector = Direction.None;
            ResetPwm();
            SetDefaults(gpio);
        }
        void SetDefaults(GpioController gpio)
        {
            gpio.Write(FwL, PinValue.Low);
            gpio.Write(BwL, PinValue.Low);
            gpio.Write(FwR, PinValue.Low);
            gpio.Write(BwR, PinValue.Low);
            gpio.Write(STBY, PinValue.Low);
        }
        #endregion
    }
}
