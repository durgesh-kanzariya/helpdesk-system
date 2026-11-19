using HelpDeskSystem.Data;
using HelpDeskSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace HelpDeskSystem.Services
{
    public class UserService
    {
        private readonly HelpDeskDbContext _context;

        public UserService(HelpDeskDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> GetUserByIdAsync(int id)
        {
            return await _context.Users
                .Include(u => u.Tickets)
                .FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}