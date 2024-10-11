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
        private readonly IPropertyRepository _propertyRepository;

        public PropertyController(IPropertyRepository propertyRepository)
        {
            _propertyRepository = propertyRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PropertyDTO>>> GetProperties()
        {
            var properties = await _propertyRepository.GetAllAsync();
            var propertyDtoList = properties.Select(p => new PropertyDTO
            {
                Id = p.Id,
                PropertyName = p.PropertyName
            }).ToList();
            
            return Ok(propertyDtoList);
        }

        [HttpPost]
        public async Task<ActionResult<PropertyDTO>> CreateProperty(PropertyDTO propertyDto)
        {
            var property = new Property
            {
                PropertyName = propertyDto.PropertyName
            };
            
            await _propertyRepository.AddAsync(property);
            
            propertyDto.Id = property.Id; // Get the Id of the created property
            return CreatedAtAction(nameof(GetProperties), new { id = propertyDto.Id }, propertyDto);
        }
    }
}