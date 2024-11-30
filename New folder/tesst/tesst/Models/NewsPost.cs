using System;

namespace tesst.Models
{
    public class NewsPost
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public DateTime Time { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }
        public string Tags { get; set; }
    }
}
