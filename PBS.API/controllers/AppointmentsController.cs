using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PBS.API.DTOs;
using PBS.Domain;
using PBS.Persistence;

namespace PBS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AppointmentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAll()
        {
            return await _context.Appointments.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetById(int id)
        {
            var appt = await _context.Appointments.FindAsync(id);
            if (appt == null) return NotFound();
            return appt;
        }

        [HttpPost]
        public async Task<ActionResult<Appointment>> Create(AppointmentDTO dto)
        {
            // Check if availability exists and is not booked
            var availability = await _context.Availabilities.FindAsync(dto.AvailabilityId);
            if (availability == null)
            {
                return NotFound("Availability not found.");
            }
            if (availability.IsBooked)
            {
                return BadRequest("This time slot is already booked.");
            }

            // Create new appointment
            var appt = new Appointment
            {
                AvailabilityId = dto.AvailabilityId,
                ClientName = dto.ClientName,
                ClientEmail = dto.ClientEmail
            };
            _context.Appointments.Add(appt);

            // Update availability flag
            availability.IsBooked = true;
            _context.Availabilities.Update(availability);

            // Save changes
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = appt.Id }, appt);
        }
         

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var appt = await _context.Appointments.FindAsync(id);
            if (appt == null) return NotFound();

            _context.Appointments.Remove(appt);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
