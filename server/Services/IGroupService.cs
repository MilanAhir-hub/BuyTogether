using BuyTogether.Server.DTOs;
using System.Threading.Tasks;

namespace BuyTogether.Server.Services
{
    public interface IGroupService
    {
        Task<(bool Success, string Message)> JoinGroupAsync(JoinGroupRequestDto request);
    }
}
