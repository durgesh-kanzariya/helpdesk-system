using HelpDeskSystem.Models;
using HelpDeskSystem.Services;
using Microsoft.AspNetCore.Mvc;

namespace HelpDeskSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketsController : ControllerBase
    {
        private readonly ITicketService _service;

        public TicketsController(ITicketService service)
        {
            _service = service;
        }

        // GET: api/tickets
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tickets = await _service.GetAllTicketsAsync();

            return Ok(tickets);
        }

        // GET: api/tickets/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var ticket = await _service.GetTicketByIdAsync(id);

            if (ticket == null)
            {
                return NotFound("Ticket not found");
            }

            return Ok(ticket);
        }

        // POST: api/tickets
        [HttpPost]
        public async Task<IActionResult> Create(Ticket ticket)
        {
            var createdTicket = await _service.CreateTicketAsync(ticket);

            return CreatedAtAction(
                nameof(GetById),
                new { id = createdTicket.Id },
                createdTicket
            );
        }

        // PUT: api/tickets/1
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Ticket ticket)
        {
            var updated = await _service.UpdateTicketAsync(id, ticket);

            if (!updated)
            {
                return NotFound("Ticket not found");
            }

            return NoContent();
        }

        // DELETE: api/tickets/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteTicketAsync(id);

            if (!deleted)
            {
                return NotFound("Ticket not found");
            }

            return NoContent();
        }
    }
}