namespace PBS.Domain
{
    public class Appointment
    {
        public int Id { get; set; }
        public int AvailabilityId { get; set; }
        public string ClientName { get; set; } = string.Empty;
        public string ClientEmail { get; set; } = string.Empty;
    }
}