namespace JobTracker.API.Models
{
    public class Application
    {
        public int Id { get; set; }
        public string Company { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Status { get; set; } = "Applied";
        public string? JobUrl { get; set; }
        public DateTime AppliedDate { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Note> Notes { get; set; } = new List<Note>();
        public ICollection<StatusHistory> StatusHistories { get; set; } = new List<StatusHistory>();
    }
}
