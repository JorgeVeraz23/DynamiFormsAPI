using TicketsAPI.DTO;

namespace TicketsAPI.Interfaces
{
    public interface FilledFormFieldInterface
    {
        public Task<MessageInfoSolicitudDTO> CreateFilledFormField(CreateFilledFormFieldDTO createFilledFormFieldDTO);
        public Task<MessageInfoSolicitudDTO> EditFilledFormField(EditFilledFormFieldDTO editFilledFormFieldDTO);
        public Task<MessageInfoSolicitudDTO> EliminarFilledFormField(long id);
        public Task<List<FilledFormFieldDTO>> GetAlFilledFormField();
        public Task<FilledFormFieldDTO> GetFilledFormField(long id);
        public Task<FormWithResponsesDto> GetFormWithGroupsAndFieldsAndResponsesAsync(long formId);
        //GetFormWithGroupsAndFieldsAndResponsesAsyncNew
        public Task<FormWithResponsesDto> GetFormWithGroupsAndFieldsAndResponsesAsyncNew(long formId);

    }
}
