namespace PaperAPI.DTOs.PaperDTO;

public class UpdatePaperDTO
{
    public string? Name { get; set; }
    public bool? Discontinued { get; set; }
    public int? Stock { get; set; }
    public double? Price { get; set; }
    public string? ImageUrl { get; set; }
    
    public int? SheetsPerPacket { get; set; }

}
