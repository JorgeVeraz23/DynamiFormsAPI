using FormDynamicAPI.DTO.UtilitiesDTO;
using FormDynamicAPI.Entity;

namespace FormDynamicAPI.Interface
{
    public interface IFilledFormRepository
    {
        Task<MessageInfoDTO> CreateFilledForm(FilledForm filledForm);
        Task<MessageInfoDTO> UpdateFilledForm(FilledForm filledForm);
        Task<MessageInfoDTO> DeleteFilledForm(long id);
        Task<FilledForm> GetFilledForm(long id);
        Task<List<FilledForm>> GetAllFilledForms();
    }
}
