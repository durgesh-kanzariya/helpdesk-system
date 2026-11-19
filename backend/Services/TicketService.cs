using HelpDeskSystem.Data;
using HelpDeskSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace HelpDeskSystem.Services
{
    public class TicketService : ITicketService
    {
        private readonly HelpDeskDbContext _context;

        public TicketService(HelpDeskDbContext context)
        {
            _context = context;
        }

        // Get all tickets
        public async Task<IEnumerable<Ticket>> GetAllTicketsAsync()
        {
            return await _context.Tickets
                .Include(t => t.User)
                .Include(t => t.Category)
                .AsNoTracking()
                .ToListAsync();
        }

        // Get ticket by ID
        public async Task<Ticket?> GetTicketByIdAsync(int id)
        {
            return await _context.Tickets
                .Include(t => t.User)
                .Include(t => t.Category)
                .AsNoTracking()
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        // Create ticket
        public async Task<Ticket> CreateTicketAsync(Ticket ticket)
        {
            ticket.Status = "Open";

            _context.Tickets.Add(ticket);

            await _context.SaveChangesAsync();

            return ticket;
        }

        // Update ticket
        public async Task<bool> UpdateTicketAsync(int id, Ticket ticket)
        {
            var existingTicket = await _context.Tickets
                .FirstOrDefaultAsync(t => t.Id == id);

            if (existingTicket == null)
            {
                return false;
            }

            existingTicket.Title = ticket.Title;
            existingTicket.Status = ticket.Status;
            existingTicket.UserId = ticket.UserId;
            existingTicket.CategoryId = ticket.CategoryId;

            await _context.SaveChangesAsync();

            return true;
        }

        // Delete ticket
        public async Task<bool> DeleteTicketAsync(int id)
        {
            var ticket = await _context.Tickets
                .FirstOrDefaultAsync(t => t.Id == id);

            if (ticket == null)
            {
                return false;
            }

            _context.Tickets.Remove(ticket);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}