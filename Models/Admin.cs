namespace HealthCompass.Models
{
    public class Admin
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty; // hash in real apps
    }
}
