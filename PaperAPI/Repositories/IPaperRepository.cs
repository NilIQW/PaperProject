namespace PaperAPI.Repositories;

public interface IPaperRepository : IRepository<Paper>
{
    Task<Paper> GetByIdAsync(int id, bool includeProperties);
    Task DeletePaperProperty(int paperId, int propertyId);
}