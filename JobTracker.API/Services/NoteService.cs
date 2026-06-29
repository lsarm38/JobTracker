using JobTracker.API.Data;
using JobTracker.API.Models;
using JobTracker.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace JobTracker.API.Services;

public class NoteService : INoteService
{
    private readonly AppDbContext _context;

    public NoteService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Note>> GetAllAsync(int applicationId)
    {
        var exists = await _context.Applications.AnyAsync(a => a.Id == applicationId);
        if (!exists) return Enumerable.Empty<Note>();

        return await _context.Notes
            .Where(n => n.ApplicationId == applicationId)
            .OrderByDescending(n => n.CreatedAt)
            .ToListAsync();
    }

    public async Task<Note?> CreateAsync(int applicationId, Note note)
    {
        var exists = await _context.Applications.AnyAsync(a => a.Id == applicationId);
        if (!exists) return null;

        note.ApplicationId = applicationId;
        note.CreatedAt = DateTime.UtcNow;
        _context.Notes.Add(note);
        await _context.SaveChangesAsync();
        return note;
    }

    public async Task<bool> DeleteAsync(int applicationId, int noteId)
    {
        var note = await _context.Notes
            .FirstOrDefaultAsync(n => n.Id == noteId && n.ApplicationId == applicationId);
        if (note == null) return false;

        _context.Notes.Remove(note);
        await _context.SaveChangesAsync();
        return true;
    }
}