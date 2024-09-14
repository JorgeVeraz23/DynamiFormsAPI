using FormDynamicAPI.DTO;
using FormDynamicAPI.DTO.UtilitiesDTO;
using FormDynamicAPI.Entity;

namespace FormDynamicAPI.Interface
{
    public interface IFormRepository
    {
        Task<MessageInfoDTO> CreateForm(Form form);
        Task<MessageInfoDTO> UpdateForm(Form form);
        Task<MessageInfoDTO> DeleteForm(long id);
        Task<Form> GetForm(long id);
        Task<List<Form>> GetAllForm();

    }
}
