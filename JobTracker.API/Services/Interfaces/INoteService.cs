using JobTracker.API.DTOs;
using JobTracker.API.Models;

namespace JobTracker.API.Services.Interfaces;

public interface INoteService
{
    Task<IEnumerable<Note>> GetAllAsync(int applicationId);
    Task<Note?> CreateAsync(int applicationId, CreateNoteDto dto);
    Task<bool> DeleteAsync(int applicationId, int noteId);
}