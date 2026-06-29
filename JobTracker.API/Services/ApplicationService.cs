using JobTracker.API.Data;
using JobTracker.API.DTOs;
using JobTracker.API.Models;
using JobTracker.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace JobTracker.API.Services;

public class ApplicationService : IApplicationService
{
    private readonly AppDbContext _context;

    public ApplicationService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Application>> GetAllAsync() =>
        await _context.Applications
            .OrderByDescending(a => a.AppliedDate)
            .ToListAsync();

    public async Task<Application?> GetByIdAsync(int id) =>
        await _context.Applications
            .Include(a => a.Notes)
            .Include(a => a.StatusHistories)
            .FirstOrDefaultAsync(a => a.Id == id);

    public async Task<Application> CreateAsync(Application application)
    {
        application.CreatedAt = DateTime.UtcNow;
        _context.Applications.Add(application);
        await _context.SaveChangesAsync();
        return application;
    }

    public async Task<bool> UpdateAsync(int id, UpdateApplicationDto dto)
    {
        var application = await _context.Applications.FindAsync(id);
        if (application == null) return false;

        if (application.Status != dto.Status)
        {
            _context.StatusHistories.Add(new StatusHistory
            {
                ApplicationId = id,
                OldStatus = application.Status,
                NewStatus = dto.Status,
                ChangedAt = DateTime.UtcNow
            });
        }

        application.Company = dto.Company;
        application.Role = dto.Role;
        application.Status = dto.Status;
        application.JobUrl = dto.JobUrl;
        application.AppliedDate = dto.AppliedDate;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var application = await _context.Applications.FindAsync(id);
        if (application == null) return false;

        _context.Applications.Remove(application);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<object> GetStatsAsync()
    {
        var applications = await _context.Applications.ToListAsync();
        var total = applications.Count;
        var byStatus = applications
            .GroupBy(a => a.Status)
            .Select(g => new { status = g.Key, count = g.Count() });

        var responded = applications.Count(a => a.Status != "Applied");
        var responseRate = total == 0 ? 0 : Math.Round((double)responded / total * 100, 1);

        return new { total, responseRate, byStatus };
    }
}