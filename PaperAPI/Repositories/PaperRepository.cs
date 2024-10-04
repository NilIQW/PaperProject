using Microsoft.EntityFrameworkCore;
using PaperAPI.Models;

namespace PaperAPI.Repositories;

public class PaperRepository : IRepository<Paper>
{
    private readonly PaperDbContext _context;

    public PaperRepository(PaperDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Paper>> GetAllAsync()
    {
        // Updated to include PaperProperties and the related Property
        return await _context.Papers
            .Include(p => p.PaperProperties) // Include the linking entity
            .ThenInclude(pp => pp.Property) // Include the related Property
            .ToListAsync();
    }

    public async Task<Paper> GetByIdAsync(int id)
    {
        return await _context.Papers
            .Include(p => p.PaperProperties) // Include PaperProperties for the single paper
            .ThenInclude(pp => pp.Property) // Include the related Property
            .FirstOrDefaultAsync(p => p.Id == id);
    }


    public async Task AddAsync(Paper paper)
    {
        await _context.Papers.AddAsync(paper);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Paper paper)
    {
        _context.Papers.Update(paper);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var paper = await GetByIdAsync(id);
        if (paper != null)
        {
            _context.Papers.Remove(paper);
            await _context.SaveChangesAsync();
        }
    }
}