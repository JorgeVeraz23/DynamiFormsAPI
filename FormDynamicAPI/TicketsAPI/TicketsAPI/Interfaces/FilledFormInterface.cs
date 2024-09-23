using TicketsAPI.DTO;

namespace TicketsAPI.Interfaces
{
    public interface FilledFormInterface
    {

        public Task<MessageInfoSolicitudIdDTO> CreateFilledForm(FilledFormDTO filledFormDTO);
        public Task<MessageInfoSolicitudDTO> UpdateFilledForm(FilledFormDTO filledFormDTO);
        public Task<MessageInfoSolicitudDTO> DeleteFilledForm(long id);
        public Task<List<FilledFormDTO>> GetAllFilledForm();
        public Task<FilledFormDTO> GetFilledForm(long id);
        public Task<List<KeyValueDTO>> SelectorFilledForm();
        public Task<List<KeyValueDTO>> GetFilledFormsKeyValueAsync();
        public Task<MessageInfoSolicitudDTO> SaveFilledFormAsync(FilledFormDynamicDTO filledFormDynamicDTO);
    }
}
