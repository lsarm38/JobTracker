using JobTracker.API.Models;
using JobTracker.API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace JobTracker.API.Controllers;

[ApiController]
[Route("api/applications/{applicationId}/notes")]
public class NotesController : ControllerBase
{
    private readonly INoteService _service;

    public NotesController(INoteService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Note>>> GetAll(int applicationId)
    {
        var notes = await _service.GetAllAsync(applicationId);
        return Ok(notes);
    }

    [HttpPost]
    public async Task<ActionResult<Note>> Create(int applicationId, Note note)
    {
        var created = await _service.CreateAsync(applicationId, note);
        if (created == null) return NotFound();
        return CreatedAtAction(nameof(GetAll), new { applicationId }, created);
    }

    [HttpDelete("{noteId}")]
    public async Task<IActionResult> Delete(int applicationId, int noteId)
    {
        return await _service.DeleteAsync(applicationId, noteId) ? NoContent() : NotFound();
    }
}