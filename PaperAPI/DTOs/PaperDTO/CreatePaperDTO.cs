namespace PaperAPI.DTOs.PaperDTO;

public class CreatePaperDTO
{
    public string Name { get; set; } = String.Empty;
    public bool Discontinued { get; set; }
    public int Stock { get; set; }
    public double Price { get; set; }
    public string ImageUrl { get; set; } = String.Empty;
    public int SheetsPerPacket { get; set; }
    
    public List<PaperPropertyDTO.PaperPropertyDTO>? PaperProperties { get; set; } = new List<PaperPropertyDTO.PaperPropertyDTO>();


}