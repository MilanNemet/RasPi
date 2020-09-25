using static System.Math;

namespace RasPi
{
    class VelocityManager
    {
        private float _lastAcceleration = 0.0f; // m/s²
        private float _timeSlice; // s
        private float _velocity; // m/s
        public float Velocity { get => _velocity; }

        public VelocityManager(float initialSpeed)
        {
            _velocity = initialSpeed;
        }

        public void ReCount(float acceleration, float timeSlice)
        {
            _timeSlice = timeSlice;
            _velocity += GetAdditionalPlotArea(acceleration);
            _lastAcceleration = acceleration;
        }
        private float GetAdditionalPlotArea(float acc)
        {
            float result;
            bool crossing = (acc < 0 && _lastAcceleration > 0) || (acc > 0 && _lastAcceleration < 0);

            if (crossing)
            {
                result = CalcCrossCase(acc);
            }
            else
            {
                result = CalcBaseCase(acc, _lastAcceleration);
            }

            return result;
        }
        private float CalcCrossCase(float acc)
        {
            float pos = acc > 0 ? acc : _lastAcceleration;
            float neg = acc < 0 ? acc : _lastAcceleration;

            float positivePart = CalcBaseCase(pos, 0);
            float negativePart = CalcBaseCase(neg, 0);

            return positivePart + negativePart;
        }

        private float CalcBaseCase(float acc, float referencePoint)
        {
            float a = Abs(acc);
            float aRefPt = Abs(referencePoint);

            float sign = (acc < 0.0f || referencePoint < 0.0f) ? -1f : 1f;
            float triSideLength = Abs(a - aRefPt);
            float recSideLength = a - triSideLength;

            float triangle = triSideLength * _timeSlice / 2f;
            float rectangle = recSideLength * _timeSlice;

            return sign * (triangle + rectangle);
        }
    }
}
