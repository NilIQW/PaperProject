using Microsoft.AspNetCore.Mvc;
using PaperAPI.DTOs.OrderDTO;
using PaperAPI.Models;
using PaperAPI.Repositories;

namespace PaperAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderRepository _orderRepository;
    private readonly IRepository<OrderEntry> _orderEntryRepository;

    public OrdersController(IOrderRepository orderRepository, IRepository<OrderEntry> orderEntryRepository)
    {
        _orderRepository = orderRepository;
        _orderEntryRepository = orderEntryRepository;
    }

    // Get all orders
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetAllOrders()
    {
        var orders = await _orderRepository.GetAllAsync();

        if (orders == null || !orders.Any())
        {
            return NotFound("No orders found.");
        }

        return Ok(orders);
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        var order = await _orderRepository.GetOrderWithDetailsAsync(id);

        if (order == null)
        {
            return NotFound();
        }

        return order;
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
            await _orderRepository.AddAsync(order); // Add the order first

            // Now order.Id should be populated after SaveChangesAsync in AddAsync
            foreach (var entry in createOrderDto.OrderEntries)
            {
                if (entry.Quantity <= 0)
                {
                    return BadRequest($"Quantity for product ID {entry.ProductId} must be greater than zero.");
                }

                var orderEntry = new OrderEntry
                {
                    OrderId = order.Id, // Ensure the order ID is set correctly
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

    
    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<Order>>> SearchOrders([FromQuery] string query)
    {
        var orders = await _orderRepository.SearchOrdersByCustomerAsync(query);

        if (orders == null || !orders.Any())
        {
            return NotFound("No orders found for this search.");
        }

        return Ok(orders);
    }
    
    [HttpGet("customer/{customerId}")]
    public async Task<ActionResult<IEnumerable<Order>>> GetCustomerOrders(int customerId)
    {
        var orders = await _orderRepository.GetCustomerOrdersAsync(customerId);

        if (orders == null || !orders.Any())
        {
            return NotFound();
        }

        return Ok(orders);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateOrder(int id, [FromBody] Order updatedOrder)
    {
        if (updatedOrder == null)
        {
            return BadRequest("Order is null.");
        }

        // Check if the order exists
        var existingOrder = await _orderRepository.GetByIdAsync(id);
        if (existingOrder == null)
        {
            return NotFound($"Order with ID {id} not found.");
        }

        // Update only the necessary fields
        existingOrder.Status = updatedOrder.Status; // Update the status
        existingOrder.DeliveryDate = updatedOrder.DeliveryDate; // Update the delivery date

        // Call the repository to update the order
        await _orderRepository.UpdateAsync(existingOrder);

        return NoContent(); // Return 204 No Content on successful update
    }
    
}