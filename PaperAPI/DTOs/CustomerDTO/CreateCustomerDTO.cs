using System.ComponentModel.DataAnnotations;

namespace PaperAPI.DTOs;

public class CreateCustomerDTO
{
    [Required]
    public string Name { get; set; } = null!;

    public string? Address { get; set; }

    public string? Phone { get; set; }

    [EmailAddress]
    public string? Email { get; set; }
}