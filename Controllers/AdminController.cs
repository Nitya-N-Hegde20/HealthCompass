using HealthCompass.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthCompass.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Admin request)
        {
            var admin = await _context.Admins
                .FirstOrDefaultAsync(a => a.Email == request.Email && a.Password == request.Password);

            if (admin == null)
                return Unauthorized("Invalid credentials");

            return Ok(new { Message = "Login successful", AdminId = admin.Id, Email = admin.Email });
        }

        [HttpGet("patients")]
        public async Task<IActionResult> GetPatients()
        {
            var patients = await _context.Patients.ToListAsync();
            return Ok(patients);
        }
    }
}
