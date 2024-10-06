namespace PaperAPI.Repositories;

public interface IPropertyRepository : IRepository<Property>
{
    Task<Property> GetByNameAsync(string propertyName);

}