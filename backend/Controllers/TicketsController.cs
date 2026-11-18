using HelpDeskSystem.Models;
using HelpDeskSystem.Services;
using Microsoft.AspNetCore.Mvc;

namespace HelpDeskSystem.Controllers
{    
    [ApiController]
    [Route("api/[controller]")]
    public class TicketsController : ControllerBase
    {
        private readonly TicketService _service;

        public TicketsController(TicketService service)
        {
            _service = service;
        }

        // GET: api/tickets
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAll());
        }

        // GET: api/tickets/1
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var ticket = _service.GetById(id);

            if (ticket == null)
            {
                return NotFound("Ticket not found");
            }

            return Ok(ticket);
        }

        // POST: api/tickets
        [HttpPost]
        public IActionResult Create(Ticket ticket)
        {
            _service.Add(ticket);

            return CreatedAtAction(
                nameof(GetById),
                new { id = ticket.Id },
                ticket
            );
        }
    }
}
