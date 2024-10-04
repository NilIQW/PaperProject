namespace PaperAPI.DTOs.PaperDTO;

public class PaperDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public bool Discontinued { get; set; }
    public int Stock { get; set; }
    public double Price { get; set; }
    public string ImageUrl { get; set; } = null!;
    public int SheetsPerPacket { get; set; }

    public List<PropertyDTO.PropertyDTO> Properties { get; set; } 
    
}

