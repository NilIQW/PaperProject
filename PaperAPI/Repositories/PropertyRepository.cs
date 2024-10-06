using Microsoft.EntityFrameworkCore;
using PaperAPI.Models;

namespace PaperAPI.Repositories;

public class PropertyRepository : IPropertyRepository
{
    private readonly PaperDbContext _context;

    public PropertyRepository(PaperDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Property>> GetAllAsync()
    {
        return await _context.Properties.ToListAsync();
    }

    public async Task<Property> GetByIdAsync(int id)
    {
        return await _context.Properties.FindAsync(id);
    }

    public async Task AddAsync(Property property)
    {
        await _context.Properties.AddAsync(property);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Property property)
    {
        _context.Properties.Update(property);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var property = await GetByIdAsync(id);
        if (property != null)
        {
            _context.Properties.Remove(property);
            await _context.SaveChangesAsync();
        }
    }
    public async Task<Property> GetByNameAsync(string propertyName)
    {
        return await _context.Properties.FirstOrDefaultAsync(p => p.PropertyName == propertyName);
    }

}