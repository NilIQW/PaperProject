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
        return await _context.Papers.ToListAsync();
    }

    public async Task<Paper> GetByIdAsync(int id)
    {
        return await _context.Papers.FindAsync(id);
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