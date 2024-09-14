using FormDynamicAPI.DTO.UtilitiesDTO;
using FormDynamicAPI.Entity;

namespace FormDynamicAPI.Interface
{
    public interface IFormGroupRepository
    {
        Task<MessageInfoDTO> CreateFormGroup(FormGroup formGroup);
        Task<MessageInfoDTO> UpdateFormGroup(FormGroup formGroup);
        Task<MessageInfoDTO> DeleteFormGroup(long id);
        Task<FormGroup> GetFormGroup(long id);
        Task<List<FormGroup>> GetAllFormGroups();
    }
}
