namespace PaperAPI.DTOs;

public class CustomerDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Address { get; set; }
    public string? Phone { get; set; }
    public string? Email { get; set; }
}