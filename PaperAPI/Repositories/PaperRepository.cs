using Microsoft.EntityFrameworkCore;
 using PaperAPI.Models;
 
 namespace PaperAPI.Repositories;
 
 public class PaperRepository : IPaperRepository
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
 
     // Original GetByIdAsync method as per IRepository
     public async Task<Paper> GetByIdAsync(int id)
     {
         return await _context.Papers.FirstOrDefaultAsync(p => p.Id == id);
     }
 
     // Overloaded GetByIdAsync method that includes properties
     public async Task<Paper> GetByIdAsync(int id, bool includeProperties)
     {
         IQueryable<Paper> query = _context.Papers.AsQueryable();
 
         // Check if we should include related properties
         if (includeProperties)
         {
             query = query
                 .Include(p => p.PaperProperties) // Include the linking entity
                 .ThenInclude(pp => pp.Property); // Include the related Property
         }
 
         return await query.FirstOrDefaultAsync(p => p.Id == id);
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
     
     public async Task DeletePaperProperty(int paperId, int propertyId)
     {
         var paperProperty = await _context.PaperProperties
             .FirstOrDefaultAsync(pp => pp.PaperId == paperId && pp.PropertyId == propertyId);

         if (paperProperty != null)
         {
             _context.PaperProperties.Remove(paperProperty); // Remove only the association
             await _context.SaveChangesAsync();
         }
     }

 }