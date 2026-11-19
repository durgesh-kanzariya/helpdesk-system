using HelpDeskSystem.Models;

namespace HelpDeskSystem.Services
{
    public interface ITicketService
    {
        Task<IEnumerable<Ticket>> GetAllTicketsAsync();

        Task<Ticket?> GetTicketByIdAsync(int id);

        Task<Ticket> CreateTicketAsync(Ticket ticket);

        Task<bool> UpdateTicketAsync(int id, Ticket ticket);

        Task<bool> DeleteTicketAsync(int id);
    }
}
