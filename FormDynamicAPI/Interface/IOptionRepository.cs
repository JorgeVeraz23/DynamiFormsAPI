using FormDynamicAPI.DTO.UtilitiesDTO;
using FormDynamicAPI.Entity;

namespace FormDynamicAPI.Interface
{
    public interface IOptionRepository
    {
        Task<MessageInfoDTO> CreateOption(Option option);
        Task<MessageInfoDTO> UpdateOption(Option option);
        Task<MessageInfoDTO> DeleteOption(long id);
        Task<Option> GetOption(long id);
        Task<List<Option>> GetAllOptions();
    }
}
