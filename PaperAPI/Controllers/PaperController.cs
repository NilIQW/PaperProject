using Microsoft.AspNetCore.Mvc;
using PaperAPI.DTOs.PaperDTO;
using PaperAPI.DTOs.PropertyDTO;
using PaperAPI.Models;
using PaperAPI.Repositories;

namespace PaperAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaperController : ControllerBase
    {
    public readonly IRepository<Paper> _paperRepository;
    public readonly IPropertyRepository _propertyRepository;


    public PaperController(IRepository<Paper> paperRepository, IPropertyRepository propertyRepository)
    {
        _paperRepository = paperRepository;
        _propertyRepository = propertyRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PaperDTO>>> GetPaper()
    {
        try
        {
            var allPapers = await _paperRepository.GetAllAsync();
            var paperDto = allPapers.Select(p => new PaperDTO
            {
                Id = p.Id,
                Name = p.Name,
                Discontinued = p.Discontinued,
                Stock = p.Stock,
                Price = p.Price,
                ImageUrl = p.ImageUrl,
                SheetsPerPacket = p.SheetsPerPacket,

                // Updated this line to access PaperProperties instead of Properties
                Properties = p.PaperProperties.Select(pp => new PropertyDTO
                {
                    Id = pp.Property.Id, // Accessing the related Property's Id
                    PropertyName = pp.Property.PropertyName, }).ToList()
            }).ToList();

            return Ok(paperDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, "Internal server error");
        }
    }



    [HttpGet("{id}")]
    public async Task<ActionResult<PaperDTO>> GetPaperById(int id)
    {
        var paper = await _paperRepository.GetByIdAsync(id);
        if (paper == null)
        {
            return NotFound();
        }
        
        var paperDto = new PaperDTO
        {
            Id = paper.Id,
            Name = paper.Name,
            Discontinued = paper.Discontinued,
            Stock = paper.Stock,
            Price = paper.Price,
            ImageUrl = paper.ImageUrl,
            SheetsPerPacket = paper.SheetsPerPacket,
        };

        return Ok(paperDto);

    }
    [HttpPost]
public async Task<ActionResult<PaperDTO>> PostPaper(CreatePaperDTO createPaperDto)
{
    // Create a new Paper object
    var paper = new Paper
    {
        Name = createPaperDto.Name,
        Discontinued = createPaperDto.Discontinued,
        Stock = createPaperDto.Stock,
        Price = createPaperDto.Price,
        ImageUrl = createPaperDto.ImageUrl,
        SheetsPerPacket = createPaperDto.SheetsPerPacket,
        PaperProperties = new List<PaperProperty>() // Initialize the list for PaperProperties
    };

    // Adding PaperProperties if they exist in the DTO
    if (createPaperDto.Properties != null)
    {
        foreach (var propertyDto in createPaperDto.Properties)
        {
            // Check if property already exists based on PropertyName
            var existingProperty = await _propertyRepository.GetByNameAsync(propertyDto.PropertyName);

            if (existingProperty == null)
            {
                // Create new property if it does not exist
                var newProperty = new Property
                {
                    PropertyName = propertyDto.PropertyName
                };
                // Insert new property into the properties table
                await _propertyRepository.AddAsync(newProperty);
                // Associate the new property with the paper
                paper.PaperProperties.Add(new PaperProperty
                {
                    Paper = paper,
                    PropertyId = newProperty.Id
                });
            }
            else
            {
                // Associate the existing property with the paper
                paper.PaperProperties.Add(new PaperProperty
                {
                    Paper = paper,
                    PropertyId = existingProperty.Id
                });
            }
        }
    }

    await _paperRepository.AddAsync(paper);

    // Create a DTO for the response
    var paperDto = new PaperDTO
    {
        Id = paper.Id,
        Name = paper.Name,
        Discontinued = paper.Discontinued,
        Stock = paper.Stock,
        Price = paper.Price,
        ImageUrl = paper.ImageUrl,
        SheetsPerPacket = paper.SheetsPerPacket,
        Properties = paper.PaperProperties.Select(pp => new PropertyDTO
        {
            Id = pp.Property.Id,
            PropertyName = pp.Property.PropertyName,
        }).ToList()
    };

    return CreatedAtAction(nameof(GetPaperById), new { id = paper.Id }, paperDto);
}

    [HttpPut("{id}")]
public async Task<IActionResult> PutPaper(int id, UpdatePaperDTO updatePaperDto)
{
    var existingPaper = await _paperRepository.GetByIdAsync(id);
    if (existingPaper == null) return NotFound();

    // Update existing paper properties only if they are provided
    if (updatePaperDto.Name != null)
        existingPaper.Name = updatePaperDto.Name;

    existingPaper.Discontinued = updatePaperDto.Discontinued ?? existingPaper.Discontinued; // Maintain existing value if null
    existingPaper.Stock = updatePaperDto.Stock ?? existingPaper.Stock; // Maintain existing value if null
    existingPaper.Price = updatePaperDto.Price ?? existingPaper.Price; // Maintain existing value if null
    if (updatePaperDto.ImageUrl != null)
        existingPaper.ImageUrl = updatePaperDto.ImageUrl;

    existingPaper.SheetsPerPacket = updatePaperDto.SheetsPerPacket ?? existingPaper.SheetsPerPacket; // Maintain existing value if null

    // Clear existing PaperProperties
    existingPaper.PaperProperties.Clear();

    // Handle updating properties
    if (updatePaperDto.Properties != null)
    {
        foreach (var propertyDto in updatePaperDto.Properties)
        {
            // Check if property already exists based on Property ID
            var existingProperty = await _propertyRepository.GetByIdAsync(propertyDto.Id);
            if (existingProperty != null)
            {
                // Associate the existing property with the paper
                existingPaper.PaperProperties.Add(new PaperProperty
                {
                    PaperId = existingPaper.Id,
                    PropertyId = existingProperty.Id
                });
            }
            else
            {
                return BadRequest($"Property with ID {propertyDto.Id} does not exist.");
            }
        }
    }

    // Save changes
    await _paperRepository.UpdateAsync(existingPaper);

    // Return the updated paper object
    var paperDto = new PaperDTO 
    {
        Id = existingPaper.Id,
        Name = existingPaper.Name,
        Discontinued = existingPaper.Discontinued, // Should be nullable
        Stock = existingPaper.Stock, // Should be nullable
        Price = existingPaper.Price, // Should be nullable
        ImageUrl = existingPaper.ImageUrl,
        SheetsPerPacket = existingPaper.SheetsPerPacket, // Should be nullable
        Properties = existingPaper.PaperProperties.Select(pp => new PropertyDTO
        {
            Id = pp.Property.Id,
            PropertyName = pp.Property.PropertyName,
        }).ToList(),
    };

    return Ok(paperDto); // Send the updated paper back as a response
}


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePaper(int id)
    {
        var paper = await _paperRepository.GetByIdAsync(id);
        if (paper == null) return NotFound();

        await _paperRepository.DeleteAsync(id);
        return NoContent();
    }
    }
}
