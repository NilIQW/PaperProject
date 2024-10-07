using PaperAPI.Models;

namespace PaperAPI.Repositories;

public interface IOrderRepository : IRepository<Order>
{
    Task<Order> GetOrderWithDetailsAsync(int id);

}