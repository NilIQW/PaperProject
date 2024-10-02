using Microsoft.AspNetCore.Mvc;
using PaperAPI.DTOs.PaperDTO;
using PaperAPI.Models;
using PaperAPI.Repositories;

namespace PaperAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaperController : ControllerBase
    {
    public readonly IRepository<Paper> _paperRepository;


    public PaperController(IRepository<Paper> paperRepository)
    {
        _paperRepository = paperRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PaperDTO>>> GetPaper()
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
        }).ToList();
        
        return Ok(paperDto);
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
        var paper = new Paper
        {
            Name = createPaperDto.Name,
            Discontinued = createPaperDto.Discontinued,
            Stock = createPaperDto.Stock,
            Price = createPaperDto.Price,
            ImageUrl = createPaperDto.ImageUrl,
            SheetsPerPacket = createPaperDto.SheetsPerPacket,
        };
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
        };
        
        return CreatedAtAction(nameof(GetPaperById), new { id = paper.Id }, paperDto);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> PutPaper(int id, UpdatePaperDTO updatePaperDto)
    {
        var existingPaper = await _paperRepository.GetByIdAsync(id);
        if (existingPaper == null) return NotFound();

        existingPaper.Name = updatePaperDto.Name ?? existingPaper.Name;
        existingPaper.Discontinued = updatePaperDto.Discontinued ?? existingPaper.Discontinued;
        existingPaper.Stock = updatePaperDto.Stock ?? existingPaper.Stock;
        existingPaper.Price = updatePaperDto.Price ?? existingPaper.Price;
        existingPaper.ImageUrl = updatePaperDto.ImageUrl ?? existingPaper.ImageUrl;
        existingPaper.SheetsPerPacket = updatePaperDto.SheetsPerPacket ?? existingPaper.SheetsPerPacket;

        await _paperRepository.UpdateAsync(existingPaper);

        return NoContent();
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
