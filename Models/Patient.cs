namespace HealthCompass.Models
{
    public class Patient
    {
        public int PatientID { get; set; }   // Identity column, Primary Key
        public string FullName { get; set; } // NVARCHAR(100), Required
        public int Age { get; set; }         // INT
        public string Gender { get; set; }   // NVARCHAR(10)
        public string Phone { get; set; }    // NVARCHAR(20)
        public string Email { get; set; }    // NVARCHAR(100)
        public string Address { get; set; }  // NVARCHAR(200)
        public DateTime CreatedAt { get; set; } // Defaults to GETDATE()
    }
}
