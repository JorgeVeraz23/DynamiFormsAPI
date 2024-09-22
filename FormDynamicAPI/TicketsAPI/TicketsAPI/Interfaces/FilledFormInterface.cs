using TicketsAPI.DTO;

namespace TicketsAPI.Interfaces
{
    public interface FilledFormInterface
    {

        public Task<MessageInfoSolicitudDTO> CreateFilledForm(FilledFormDTO filledFormDTO);
        public Task<MessageInfoSolicitudDTO> UpdateFilledForm(FilledFormDTO filledFormDTO);
        public Task<MessageInfoSolicitudDTO> DeleteFilledForm(long id);
        public Task<List<FilledFormDTO>> GetAllFilledForm();
        public Task<FilledFormDTO> GetFilledForm(long id);
        public Task<List<KeyValueDTO>> SelectorFilledForm();
        public Task<MessageInfoSolicitudDTO> SaveFilledFormAsync(FilledFormDynamicDTO filledFormDynamicDTO);
    }
}
