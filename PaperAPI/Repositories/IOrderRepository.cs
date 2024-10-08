using PaperAPI.Models;

namespace PaperAPI.Repositories;

public interface IOrderRepository : IRepository<Order>
{
    Task<Order> GetOrderWithDetailsAsync(int id);

    Task<IEnumerable<Order>> SearchOrdersByCustomerAsync(string query);

    Task<IEnumerable<Order>> GetCustomerOrdersAsync(int customerId);

}