namespace PBS.Domain
{
    public class Availability
    {
        public int Id { get; set; }
        public string ProviderName { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;    // Format: "YYYY-MM-DD"
        public string StartTime { get; set; } = string.Empty; // Format: "HH:mm"
        public string EndTime { get; set; } = string.Empty;   // Format: "HH:mm"
        public bool IsBooked { get; set; } = false;
    }
}
