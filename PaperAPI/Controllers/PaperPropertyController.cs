using Microsoft.AspNetCore.Mvc;
using PaperAPI.Models;
using PaperAPI.Repositories;
using System.Collections.Generic;
using System.Linq; // Add this for the Select method
using System.Threading.Tasks;
using PaperAPI.DTOs.PaperPropertyDTO;

namespace PaperAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaperPropertyController : ControllerBase
    {
        private readonly PaperPropertyRepository _repository;

        public PaperPropertyController(PaperPropertyRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("{paperId}")]
        public async Task<ActionResult<List<PaperPropertyDTO>>> GetPaperProperties(int paperId)
        {
            var properties = await _repository.GetPaperPropertiesByPaperId(paperId);

            // Map to DTO
            var propertyDtos = properties.Select(pp => new PaperPropertyDTO
            {
                PaperId = pp.PaperId,
                PropertyId = pp.PropertyId,
                PropertyName = pp.Property.PropertyName
            }).ToList();

            return Ok(propertyDtos);
        }

        [HttpPost]
        public async Task<ActionResult> AddPaperProperty([FromBody] AddPaperPropertyDTO dto)
        {
            var paperProperty = new PaperProperty
            {
                PaperId = dto.PaperId,
                PropertyId = dto.PropertyId
            };

            await _repository.AddPaperProperty(paperProperty);

            return CreatedAtAction(nameof(GetPaperProperties), new { paperId = dto.PaperId }, paperProperty);
        }

        [HttpPut("{paperId}/{propertyId}")]
        public async Task<ActionResult> UpdatePaperProperty(int paperId, int propertyId, [FromBody] PaperPropertyDTO paperPropertyDto)
        {
            var paperProperty = new PaperProperty
            {
                PaperId = paperPropertyDto.PaperId,
                PropertyId = paperPropertyDto.PropertyId
            };

            if (paperId != paperProperty.PaperId || propertyId != paperProperty.PropertyId)
            {
                return BadRequest();
            }

            await _repository.UpdatePaperProperty(paperProperty);
            return NoContent();
        }

        [HttpDelete("{paperId}/{propertyId}")]
        public async Task<ActionResult> DeletePaperProperty(int paperId, int propertyId)
        {
            await _repository.DeletePaperProperty(paperId, propertyId);
            return NoContent();
        }
    }
}
