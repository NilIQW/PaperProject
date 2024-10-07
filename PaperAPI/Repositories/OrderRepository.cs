using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PaperAPI.Models;

namespace PaperAPI.Repositories;

public class OrderRepository : IOrderRepository
{
    private readonly PaperDbContext _context;

    public OrderRepository(PaperDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Order>> GetAllAsync()
    {
        return await _context.Orders
            .Include(o => o.Customer)
            .ToListAsync();
    }

    public async Task<Order> GetByIdAsync(int id)
    {
        return await _context.Orders
            .Include(o => o.Customer)
            .FirstOrDefaultAsync(o => o.Id == id);
    }

    public async Task AddAsync(Order order)
    {
        await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Order order)
    {
        _context.Orders.Update(order);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var order = await GetByIdAsync(id);
        if (order != null)
        {
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
        }
    }
    
    public async Task<Order> GetOrderWithDetailsAsync(int id)
    {
        return await _context.Orders
            .Include(o => o.Customer)               // Load the customer information
            .Include(o => o.OrderEntries)           // Load the order entries
            .ThenInclude(oe => oe.Product)          // Load the product for each order entry
            .FirstOrDefaultAsync(o => o.Id == id);
    }

}