namespace PaperAPI.DTOs.PaperPropertyDTO;

public class AddPaperPropertyDTO
{
    public int PaperId { get; set; }
    public int PropertyId { get; set; } 
    public string PropertyName { get; set; } = null!; 

}

public class PaperPropertyDTO
{
    public int PaperId { get; set; }
    public int PropertyId { get; set; }
    
    public string PropertyName { get; set; } = null!; 
}