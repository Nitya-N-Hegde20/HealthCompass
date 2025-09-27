using HealthCompass.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthCompass.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PatientController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/patient/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Patient patient)
        {
            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Patient registered successfully", PatientId = patient.PatientID });
        }

        // GET: api/patient
        [HttpGet]
        public async Task<IActionResult> GetAllPatients()
        {
            var patients = await _context.Patients.ToListAsync();
            return Ok(patients);
        }

        // GET: api/patient/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPatientById(int id)
        {
            var patient = await _context.Patients.FindAsync(id);

            if (patient == null)
                return NotFound(new { Message = "Patient not found" });

            return Ok(patient);
        }

        // DELETE: api/patient/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var patient = await _context.Patients.FindAsync(id);

            if (patient == null)
                return NotFound(new { Message = "Patient not found" });

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Patient deleted successfully" });
        }
    }
}
