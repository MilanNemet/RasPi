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
            Type = "auth";
            UserId = 0;
            Value = "greeting";
            TimeStamp = DateTime.Now;
        }
        public MessageBlock(float[] value)
        {
            Type = "control";
            UserId = 0;
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
