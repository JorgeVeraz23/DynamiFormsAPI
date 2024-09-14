using FormDynamicAPI.DTO.UtilitiesDTO;
using FormDynamicAPI.Entity;

namespace FormDynamicAPI.Interface
{
    public interface IFilledFormFieldRepository
    {
        Task<MessageInfoDTO> CreateFilledFormField(FilledFormField filledFormField);
        Task<MessageInfoDTO> UpdateFilledFormField(FilledFormField filledFormField);
        Task<MessageInfoDTO> DeleteFilledFormField(long id);
        Task<FilledFormField> GetFilledFormField(long id);
        Task<List<FilledFormField>> GetAllFilledFormFields();
    }
}
