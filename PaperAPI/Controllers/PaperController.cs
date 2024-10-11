using Microsoft.AspNetCore.Mvc;
using PaperAPI.DTOs.PaperDTO;
using PaperAPI.DTOs.PaperPropertyDTO;
using PaperAPI.DTOs.PropertyDTO;
using PaperAPI.Models;
using PaperAPI.Repositories;

namespace PaperAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaperController : ControllerBase
    {
        private readonly IPaperRepository _paperRepository;
        private readonly IPropertyRepository _propertyRepository;

        public PaperController(IPaperRepository paperRepository, IPropertyRepository propertyRepository)
        {
            _paperRepository = paperRepository;
            _propertyRepository = propertyRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaperDTO>>> GetPapers()
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

                    PaperProperties = p.PaperProperties.Select(pp => new PaperPropertyDTO
                    {
                        PaperId = pp.PaperId,
                        PropertyId = pp.PropertyId,
                        PropertyName = pp.Property.PropertyName
                    }).ToList()
                }).ToList();

                return Ok(paperDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
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

                PaperProperties = paper.PaperProperties.Select(pp => new PaperPropertyDTO
                {
                    PaperId = pp.PaperId,
                    PropertyId = pp.PropertyId,
                    PropertyName = pp.Property.PropertyName
                }).ToList()
            };

            return Ok(paperDto);
        }

        [HttpPost]
        public async Task<ActionResult<PaperDTO>> PostPaper(CreatePaperDTO createPaperDto)
        {
            var paper = new Paper
            {
                Name = createPaperDto.Name,
                Discontinued = createPaperDto.Discontinued,
                Stock = createPaperDto.Stock,
                Price = createPaperDto.Price,
                ImageUrl = createPaperDto.ImageUrl,
                SheetsPerPacket = createPaperDto.SheetsPerPacket,
                PaperProperties = new List<PaperProperty>()
            };

            // Process the properties and create associations
            foreach (var propertyDto in createPaperDto.PaperProperties)
            {
                var existingProperty = await _propertyRepository.GetByIdAsync(propertyDto.PropertyId);

                if (existingProperty != null)
                {
                    // If the property exists, associate it with the paper
                    paper.PaperProperties.Add(new PaperProperty
                    {
                        Paper = paper,
                        PropertyId = existingProperty.Id,
                    });
                }
                else
                {
                    // If the property does not exist, create a new one
                    var newProperty = new Property
                    {
                        PropertyName = propertyDto.PropertyName
                    };

                    await _propertyRepository.AddAsync(newProperty);

                    // Associate the newly created property with the paper
                    paper.PaperProperties.Add(new PaperProperty
                    {
                        Paper = paper,
                        PropertyId = newProperty.Id,
                    });
                }
            }

            await _paperRepository.AddAsync(paper);

            var paperDto = new PaperDTO
            {
                Id = paper.Id,
                Name = paper.Name,
                Discontinued = paper.Discontinued,
                Stock = paper.Stock,
                Price = paper.Price,
                ImageUrl = paper.ImageUrl,
                SheetsPerPacket = paper.SheetsPerPacket,
                PaperProperties = paper.PaperProperties.Select(pp => new PaperPropertyDTO
                {
                    PaperId = pp.PaperId,
                    PropertyId = pp.PropertyId,
                    PropertyName = pp.Property.PropertyName
                }).ToList()
            };

            return CreatedAtAction(nameof(GetPaperById), new { id = paper.Id }, paperDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePaper(int id, UpdatePaperDTO updatePaperDto)
        {
            // Fetch the existing paper
            var existingPaper = await _paperRepository.GetByIdAsync(id);
            if (existingPaper == null)
            {
                return NotFound();
            }

            // Update basic fields
            existingPaper.Name = updatePaperDto.Name ?? existingPaper.Name;
            existingPaper.Discontinued = updatePaperDto.Discontinued ?? existingPaper.Discontinued;
            existingPaper.Stock = updatePaperDto.Stock ?? existingPaper.Stock;
            existingPaper.Price = updatePaperDto.Price ?? existingPaper.Price;
            existingPaper.ImageUrl = updatePaperDto.ImageUrl ?? existingPaper.ImageUrl;
            existingPaper.SheetsPerPacket = updatePaperDto.SheetsPerPacket ?? existingPaper.SheetsPerPacket;

            // Process the properties
            foreach (var propertyDto in updatePaperDto.PaperProperties)
            {
                var existingProperty = await _propertyRepository.GetByIdAsync(propertyDto.PropertyId);

                if (existingProperty != null)
                {
                    // Check if the property already exists in the paper
                    var existingPaperProperty = existingPaper.PaperProperties
                        .FirstOrDefault(pp => pp.PropertyId == existingProperty.Id);

                    if (existingPaperProperty == null)
                    {
                        // If the property does not exist, add it
                        existingPaper.PaperProperties.Add(new PaperProperty
                        {
                            Paper = existingPaper,
                            PropertyId = existingProperty.Id,
                        });
                    }
                    // Optionally, if you want to update the property name if provided:
                    // existingPaperProperty.PropertyName = propertyDto.PropertyName ?? existingPaperProperty.PropertyName;
                }
                else
                {
                    // Create a new property if it does not exist
                    var newProperty = new Property
                    {
                        PropertyName = propertyDto.PropertyName
                    };

                    await _propertyRepository.AddAsync(newProperty);

                    existingPaper.PaperProperties.Add(new PaperProperty
                    {
                        Paper = existingPaper,
                        PropertyId = newProperty.Id,
                    });
                }
            }

            // Save changes
            await _paperRepository.UpdateAsync(existingPaper);
            return NoContent(); // Or return the updated paper if you prefer
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaper(int id)
        {
            // Fetch the paper along with its associated properties
            var paper = await _paperRepository.GetByIdAsync(id, includeProperties: true); // Ensure you include properties

            if (paper == null) return NotFound();

            // Optionally delete associated PaperProperties only, not the Property itself
            foreach (var paperProperty in paper.PaperProperties)
            {
                await _paperRepository.DeletePaperProperty(paper.Id, paperProperty.PropertyId);
            }

            // Now delete the paper
            await _paperRepository.DeleteAsync(id);
    
            return NoContent();
        }


    }
    
}


