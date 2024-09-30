using System.ComponentModel.DataAnnotations;

namespace PaperAPI.DTOs;

public class UpdateCustomerDTO
{
    public string? Name { get; set; }

    public string? Address { get; set; }

    public string? Phone { get; set; }

    [EmailAddress]
    public string? Email { get; set; }
}