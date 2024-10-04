using Microsoft.AspNetCore.Mvc;
using PaperAPI.Models;
using PaperAPI.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

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
        public async Task<ActionResult<List<PaperProperty>>> GetPaperProperties(int paperId)
        {
            var properties = await _repository.GetPaperPropertiesByPaperId(paperId);
            return Ok(properties);
        }

        [HttpPost]
        public async Task<ActionResult> AddPaperProperty([FromBody] PaperProperty paperProperty)
        {
            await _repository.AddPaperProperty(paperProperty);
            return CreatedAtAction(nameof(GetPaperProperties), new { paperId = paperProperty.PaperId }, paperProperty);
        }

        [HttpPut("{paperId}/{propertyId}")]
        public async Task<ActionResult> UpdatePaperProperty(int paperId, int propertyId, [FromBody] PaperProperty paperProperty)
        {
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