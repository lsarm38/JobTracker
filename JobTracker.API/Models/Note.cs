namespace JobTracker.API.Models
{
    public class Note
    {
        public int Id { get; set; }
        public int ApplicationId { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Application Application { get; set; } = null!;
    }
}
