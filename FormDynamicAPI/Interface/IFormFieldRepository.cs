using FormDynamicAPI.DTO.UtilitiesDTO;
using FormDynamicAPI.Entity;

namespace FormDynamicAPI.Interface
{
    public interface IFormFieldRepository
    {
        Task<MessageInfoDTO> CreateFormField(FormField formField);
        Task<MessageInfoDTO> UpdateFormField(FormField formField);
        Task<MessageInfoDTO> DeleteFormField(long id);
        Task<FormField> GetFormField(long id);
        Task<List<FormField>> GetAllFormFields();
    }
}
