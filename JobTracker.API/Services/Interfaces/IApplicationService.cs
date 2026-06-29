using JobTracker.API.DTOs;
using JobTracker.API.Models;

namespace JobTracker.API.Services.Interfaces
{
    public interface IApplicationService
    {
        Task<IEnumerable<Application>> GetAllAsync();
        Task<Application?> GetByIdAsync(int id);
        Task<Application> CreateAsync(Application application);
        Task<bool> UpdateAsync(int id, UpdateApplicationDto dto);
        Task<bool> DeleteAsync(int id);
        Task<object> GetStatsAsync();
    }
}
