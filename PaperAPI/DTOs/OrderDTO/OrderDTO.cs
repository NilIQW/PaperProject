namespace PaperAPI.DTOs.OrderDTO;

public class OrderDTO
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    public DateOnly? DeliveryDate { get; set; }
    public string Status { get; set; } = null!;
    public double TotalAmount { get; set; }
    public int CustomerId { get; set; }

    public List<OrderEntryDTO> OrderEntries { get; set; } = new List<OrderEntryDTO>();
}
