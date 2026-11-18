using HelpDeskSystem.Models;

namespace HelpDeskSystem.Services
{
    public class TicketService
    {
        private readonly List<Ticket> _tickets = new()
        {
            new Ticket
            {
                Id = 1,
                Title = "Login Issue",
                Status = "Open"
            },
            new Ticket
            {
                Id = 2,
                Title = "Payment Failed",
                Status = "Closed"
            }
        };

        public List<Ticket> GetAll()
        {
            return _tickets;
        }

        public Ticket? GetById(int id)
        {
            return _tickets.FirstOrDefault(t => t.Id == id);
        }

        public void Add(Ticket ticket)
        {
            ticket.Id = _tickets.Count + 1;
            _tickets.Add(ticket);
        }
    }
}
