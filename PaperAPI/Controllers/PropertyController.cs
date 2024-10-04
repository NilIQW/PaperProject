// PaperAPI/Controllers/PropertiesController.cs
using Microsoft.AspNetCore.Mvc;
using PaperAPI.DTOs;
using PaperAPI.DTOs.PropertyDTO;
using PaperAPI.Models;
using PaperAPI.Repositories;

namespace PaperAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        private readonly IRepository<Property> _propertyRepository;

        public PropertyController(IRepository<Property> propertyRepository)
        {
            _propertyRepository = propertyRepository;
        }

        [HttpPost]
        public async Task<ActionResult<PropertyDTO>> PostProperty(CreatePropertyDTO createPropertyDto)
        {
            var property = new Property
            {
                PropertyName = createPropertyDto.PropertyName,
            };

            await _propertyRepository.AddAsync(property);

            var propertyDto = new PropertyDTO
            {
                Id = property.Id,
                PropertyName = property.PropertyName,
            };

            return CreatedAtAction(nameof(PostProperty), new { id = property.Id }, propertyDto);
        }
    }
}