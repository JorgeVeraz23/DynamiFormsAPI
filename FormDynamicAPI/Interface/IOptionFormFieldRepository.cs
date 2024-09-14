using FormDynamicAPI.DTO.UtilitiesDTO;
using FormDynamicAPI.Entity;

namespace FormDynamicAPI.Interface
{
    public interface IOptionFormFieldRepository
    {
        Task<MessageInfoDTO> CreateOptionFormField(OptionFormField optionFormField);
        Task<MessageInfoDTO> UpdateOptionFormField(OptionFormField optionFormField);
        Task<MessageInfoDTO> DeleteOptionFormField(long id);
        Task<OptionFormField> GetOptionFormField(long id);
        Task<List<OptionFormField>> GetAllOptionFormFields();
    }
}
