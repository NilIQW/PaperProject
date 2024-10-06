using Microsoft.AspNetCore.Mvc;
using PaperAPI.DTOs.OrderDTO;
using PaperAPI.Models;
using PaperAPI.Repositories;

namespace PaperAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IRepository<Order> _orderRepository;
    private readonly IRepository<OrderEntry> _orderEntryRepository;

    public OrdersController(IRepository<Order> orderRepository, IRepository<OrderEntry> orderEntryRepository)
    {
        _orderRepository = orderRepository;
        _orderEntryRepository = orderEntryRepository;
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(CreateOrderDTO createOrderDto)
    {
        if (createOrderDto.OrderEntries == null || !createOrderDto.OrderEntries.Any())
        {
            return BadRequest("Order must contain at least one order entry.");
        }

        if (createOrderDto.TotalAmount <= 0)
        {
            return BadRequest("Total amount must be greater than zero.");
        }

        var order = new Order
        {
            OrderDate = DateTime.UtcNow,
            TotalAmount = createOrderDto.TotalAmount,
            CustomerId = createOrderDto.CustomerId,
            Status = "pending"
        };

        try
        {
            await _orderRepository.AddAsync(order);

            foreach (var entry in createOrderDto.OrderEntries)
            {
                if (entry.Quantity <= 0)
                {
                    return BadRequest($"Quantity for product ID {entry.ProductId} must be greater than zero.");
                }

                var orderEntry = new OrderEntry
                {
                    OrderId = order.Id,
                    ProductId = entry.ProductId,
                    Quantity = entry.Quantity
                };
                await _orderEntryRepository.AddAsync(orderEntry);
            }

            return CreatedAtAction(nameof(CreateOrder), new { id = order.Id }, order);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
