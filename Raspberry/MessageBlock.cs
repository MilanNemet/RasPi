using System;
using System.Collections.Generic;
using System.Text.Json;

namespace RasPi
{
    public class MessageBlock
    {
        public MessageBlock() { }
        public MessageBlock(string jsonstring)
        {
            var mb = JsonSerializer.Deserialize<MessageBlock>(jsonstring);
            Type = mb.Type;
            Value = mb.Value;
            TimeStamp = mb.TimeStamp;
        }
        public string Type { get; set; }
        public string Value { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
