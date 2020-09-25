using System;
using System.Text.Json;

namespace RasPi
{
    public class MessageBlock
    {
        public string Type { get; set; }
        public int UserId { get; private set; }
        public string Value { get; set; }
        public DateTime TimeStamp { get; set; }

        public MessageBlock()
        {
            //for JsonSerializer.Deserialize<T>(A)
        }
        public MessageBlock(string[] values)
        {
            if (values.Length != 2)
            {
                throw new ArgumentException("\n\npublic MessageBlock(params string[] values) \n" +
                    "\t -> {values.Length} has to be equal 2 !!!\n\n");
            }
            Type = values[0];
            UserId = -1;
            Value = values[1];
            TimeStamp = DateTime.Now;
        }
        public MessageBlock(float[] value)
        {
            Type = "control";
            UserId = -1;
            Value = JsonSerializer.Serialize(value);
            TimeStamp = DateTime.Now;
        }
        public MessageBlock(string jsonstring)
        {
            var mb = JsonSerializer.Deserialize<MessageBlock>(jsonstring);
            Type = mb.Type;
            UserId = mb.UserId;
            Value = mb.Value;
            TimeStamp = mb.TimeStamp;
        }

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
