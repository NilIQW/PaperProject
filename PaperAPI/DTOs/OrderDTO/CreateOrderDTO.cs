namespace PaperAPI.DTOs.OrderDTO;

public class CreateOrderDTO
{
    public double TotalAmount { get; set; }
    public int? CustomerId { get; set; }
    public List<OrderEntryDTO> OrderEntries { get; set; } = new List<OrderEntryDTO>();
}

public class OrderEntryDTO
{
    public int? ProductId { get; set; }
    public int Quantity { get; set; }
}