namespace JobTracker.API.DTOs
{
    public class UpdateApplicationDto
    {
        public string Company { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Status { get; set; } = "Applied";
        public string? JobUrl { get; set; }
        public DateTime AppliedDate { get; set; }
    }
}
