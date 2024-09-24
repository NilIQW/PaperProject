using Microsoft.EntityFrameworkCore;
using PaperAPI.Models;

namespace PaperAPI.Repositories;

public class OrderEntryRepository : IRepository<OrderEntry>
{
    private readonly PaperDbContext _context;

    public OrderEntryRepository(PaperDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<OrderEntry>> GetAllAsync()
    {
        return await _context.OrderEntries
            .Include(oe => oe.Product)
            .Include(oe => oe.Order)
            .ToListAsync();
    }

    public async Task<OrderEntry> GetByIdAsync(int id)
    {
        return await _context.OrderEntries
            .Include(oe => oe.Product)
            .Include(oe => oe.Order)
            .FirstOrDefaultAsync(oe => oe.Id == id);
    }

    public async Task AddAsync(OrderEntry orderEntry)
    {
        await _context.OrderEntries.AddAsync(orderEntry);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(OrderEntry orderEntry)
    {
        _context.OrderEntries.Update(orderEntry);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var orderEntry = await GetByIdAsync(id);
        if (orderEntry != null)
        {
            _context.OrderEntries.Remove(orderEntry);
            await _context.SaveChangesAsync();
        }
    }
}