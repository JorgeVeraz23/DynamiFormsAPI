using FormDynamicAPI.DTO.UtilitiesDTO;
using FormDynamicAPI.Entity;

namespace FormDynamicAPI.Interface
{
    public interface IFieldTypeRepository
    {
        Task<MessageInfoDTO> CreateFieldType(FieldType fieldType);
        Task<MessageInfoDTO> UpdateFieldType(FieldType fieldType);
        Task<MessageInfoDTO> DeleteFieldType(long id);
        Task<FieldType> GetFieldType(long id);
        Task<List<FieldType>> GetAllFieldTypes();
        Task<List<KeyValueDTO>> GetKeyValueFieldType();
    }
}
