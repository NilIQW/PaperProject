namespace PaperAPI.DTOs.OrderDTO;

public class CreateOrderDTO
{
    public DateTime OrderDate { get; set; }
    public DateOnly? DeliveryDate { get; set; }
    public string Status { get; set; } = null!;
    public double TotalAmount { get; set; }
    public int CustomerId { get; set; }
    public List<CreateOrderEntryDTO> OrderEntries { get; set; } = new List<CreateOrderEntryDTO>();
}


public class OrderEntryDTO
{
    public int Id { get; set; }
    public int Quantity { get; set; }
    public int? ProductId { get; set; }
    public int? OrderId { get; set; }
}

public class CreateOrderEntryDTO
{
    public int Quantity { get; set; }
    public int? ProductId { get; set; }
}

