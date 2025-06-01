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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AvailabilityDTO>>> GetAvailabilities()
        {
            var availabilities = await _context.Availabilities.ToListAsync();
            var appointments = await _context.Appointments.ToListAsync();

            var availabilityDTOs = availabilities.Select(a => new AvailabilityDTO
            {
                Id = a.Id,
                ProviderName = a.ProviderName,
                Date = a.Date,
                StartTime = a.StartTime,
                EndTime = a.EndTime,
                IsBooked = appointments.Any(appt => appt.AvailabilityId == a.Id)
            }).ToList();

            return Ok(availabilityDTOs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Availability>> GetById(int id)
        {
            var avail = await _context.Availabilities.FindAsync(id);
            if (avail == null) return NotFound();
            return Ok(avail);
        }

        [HttpPost]
        public async Task<ActionResult<Availability>> Create(AvailabilityDTO dto)
        {
            var avail = new Availability
            {
                ProviderName = dto.ProviderName,
                Date = dto.Date,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                IsBooked = false
            };

            _context.Availabilities.Add(avail);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = avail.Id }, avail);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var avail = await _context.Availabilities.FindAsync(id);
            if (avail == null) return NotFound();
            _context.Availabilities.Remove(avail);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
