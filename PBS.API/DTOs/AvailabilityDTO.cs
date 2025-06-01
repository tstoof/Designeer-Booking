namespace PBS.API.DTOs
{
    public class AvailabilityDTO
    {
        public int? Id { get; set; } // optional for creation
        public string ProviderName { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;    // Format: "YYYY-MM-DD"
        public string StartTime { get; set; } = string.Empty; // Format: "HH:mm"
        public string EndTime { get; set; } = string.Empty;   // Format: "HH:mm"
        public bool IsBooked { get; set; } = false;
    }
}