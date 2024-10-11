using Microsoft.EntityFrameworkCore;
using PaperAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using PaperAPI.DTOs.PaperPropertyDTO;

namespace PaperAPI.Repositories
{
    public class PaperPropertyRepository 
    {
        private readonly PaperDbContext _context;

        public PaperPropertyRepository(PaperDbContext context)
        {
            _context = context;
        }

        public async Task<List<PaperProperty>> GetPaperPropertiesByPaperId(int paperId)
        {
            return await _context.PaperProperties
                .Include(pp => pp.Property) // Include the related Property to get Property details
                .Where(pp => pp.PaperId == paperId)
                .ToListAsync();
        }


        public async Task AddPaperProperty(PaperProperty paperProperty)
        {
            _context.PaperProperties.Add(paperProperty);
            await _context.SaveChangesAsync();
        }

        public async Task UpdatePaperProperty(PaperProperty paperProperty)
        {
            _context.PaperProperties.Update(paperProperty);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePaperProperty(int paperId, int propertyId)
        {
            var paperProperty = await _context.PaperProperties
                .FirstOrDefaultAsync(pp => pp.PaperId == paperId && pp.PropertyId == propertyId);
            if (paperProperty != null)
            {
                _context.PaperProperties.Remove(paperProperty);
                await _context.SaveChangesAsync();
            }
        }
    }
}