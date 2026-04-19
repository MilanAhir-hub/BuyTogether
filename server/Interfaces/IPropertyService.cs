using BuyTogether.Server.DTOs.Properties;

namespace BuyTogether.Server.Interfaces
{
    public enum PropertyDeleteResult
    {
        Deleted,
        NotFound,
        Forbidden,
        Conflict
    }

    public interface IPropertyService
    {
        Task<IReadOnlyCollection<PropertyResponseDto>> GetAllPropertiesAsync();
        Task<IReadOnlyCollection<PropertyResponseDto>> GetPropertiesByOwnerAsync(Guid ownerId);
        Task<PropertyResponseDto?> GetPropertyByIdAsync(Guid id);
        Task<PropertyResponseDto> CreatePropertyAsync(CreatePropertyDto dto, Guid userId);
        Task<PropertyResponseDto> UpdatePropertyAsync(Guid id, UpdatePropertyDto dto, Guid userId);
        Task<PropertyDeleteResult> DeletePropertyAsync(Guid id, Guid userId);
    }
}
