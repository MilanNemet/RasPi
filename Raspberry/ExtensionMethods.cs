namespace RasPi
{
    static class ExtensionMethods
    {
        #region EXTENSION METHODS
        public static bool isF(this string str)
        {
            return str == "F";
        }
        public static bool isB(this string str)
        {
            return str == "B";
        }
        public static bool isR(this string str)
        {
            return str == "R";
        }
        public static bool isL(this string str)
        {
            return str == "L";
        }
        public static bool isS(this string str)
        {
            return str == "S";
        }
        public static bool isSF(this string str)
        {
            return str == "SF";
        }
        public static bool isSB(this string str)
        {
            return str == "SB";
        }
        public static bool isSR(this string str)
        {
            return str == "SR";
        }
        public static bool isSL(this string str)
        {
            return str == "SL";
        }
        #endregion
    }
}
