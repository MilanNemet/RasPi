using System;

namespace RasPi
{
    [Flags]
    public enum Direction
    {
        None = 0b_0000,
        Forward = 0b_0001,
        Backward = 0b_0010,
        Left = 0b_0100,
        Right = 0b_1000,
        FMask = 0b_1110,
        BMask = 0b_1101,
        LMask = 0b_1011,
        RMask = 0b_0111
    }
    class MotionState
    {
        public MotionState()
        {
            Vector = Direction.None;
        }
        public Direction Vector { get; set; }
    }
}
