using JobTracker.API.Models;

namespace JobTracker.API.Services.Interfaces
{
    public interface INoteService
    {
        Task<IEnumerable<Note>> GetAllAsync(int applicationId);
        Task<Note?> CreateAsync(int applicationId, Note note);
        Task<bool> DeleteAsync(int applicationId, int noteId);
    }
}
