using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PBS.Domain;
using PBS.API.DTOs;
using PBS.Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PBS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AvailabilitiesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AvailabilitiesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/availabilities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AvailabilityDTO>>> GetAvailabilities()
        {
            var availabilities = await _context.Availabilities.ToListAsync();
            var appointments    = await _context.Appointments.ToListAsync();

            var availabilityDTOs = availabilities.Select(a => new AvailabilityDTO
            {
                Id           = a.Id,
                ProviderName = a.ProviderName,
                Date         = a.Date,
                StartTime    = a.StartTime,
                EndTime      = a.EndTime,
                IsBooked     = appointments.Any(appt => appt.AvailabilityId == a.Id)
            }).ToList();

            return Ok(availabilityDTOs);
        }

        // GET: api/availabilities/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Availability>> GetById(int id)
        {
            var avail = await _context.Availabilities.FindAsync(id);
            if (avail == null) return NotFound();
            return Ok(avail);
        }

        // POST: api/availabilities
        [HttpPost]
        public async Task<ActionResult<Availability>> Create(AvailabilityDTO dto)
        {
            var avail = new Availability
            {
                ProviderName = dto.ProviderName,
                Date         = dto.Date,
                StartTime    = dto.StartTime,
                EndTime      = dto.EndTime,
                IsBooked     = false
            };

            _context.Availabilities.Add(avail);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = avail.Id }, avail);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, AvailabilityDTO dto)
        {
            var availability = await _context.Availabilities.FindAsync(id);
            if (availability == null) return NotFound();

            if (availability.IsBooked)
                return BadRequest("Cannot edit a booked slot.");

            availability.Date         = dto.Date;
            availability.StartTime    = dto.StartTime;
            availability.EndTime      = dto.EndTime;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var avail = await _context.Availabilities.FindAsync(id);
            if (avail == null) return NotFound();

            // Optionally: if (avail.IsBooked) return BadRequest("Cannot delete a booked slot.");
            _context.Availabilities.Remove(avail);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
