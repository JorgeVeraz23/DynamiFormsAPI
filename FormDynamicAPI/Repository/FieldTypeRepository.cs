using FormDynamicAPI.DTO;
using FormDynamicAPI.DTO.UtilitiesDTO;
using FormDynamicAPI.Entity;
using FormDynamicAPI.Interface;
using Microsoft.EntityFrameworkCore;

namespace FormDynamicAPI.Repository
{
    public class FieldTypeRepository : IFieldTypeRepository
    {
        private readonly ApplicationDbContext _context;

        public FieldTypeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<MessageInfoDTO> CreateFieldType(FieldType fieldType)
        {
            var infoDTO = new MessageInfoDTO();
            try
            {
                if (fieldType == null)
                {
                    throw new ArgumentNullException(nameof(fieldType), "FieldType cannot be null");
                }

                _context.FieldTypes.Add(fieldType);
                await _context.SaveChangesAsync();

                infoDTO.Cod = "201";
                infoDTO.Mensaje = "FieldType creado exitosamente!";
                
                

                return infoDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<MessageInfoDTO> DeleteFieldType(long id)
        {
            var infoDTO = new MessageInfoDTO();
            try
            {
                if (id <= 0)
                {
                    throw new ArgumentNullException(nameof(id), "Por favor ingrese el id requerido");
                }

                var fieldTypeToDelete = await _context.FieldTypes
                    .Where(x => x.IdFieldType == id)
                    .FirstOrDefaultAsync();

                if (fieldTypeToDelete != null)
                {
                    _context.FieldTypes.Remove(fieldTypeToDelete);
                    await _context.SaveChangesAsync();

                    infoDTO.Mensaje = "FieldType Eliminado correctamente";
                }
                else
                {
                    infoDTO.Mensaje = "Hubo un error al intentar eliminar";
                }

                return infoDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<List<FieldType>> GetAllFieldTypes()
        {
            return await _context.FieldTypes.ToListAsync();
        }

        public async Task<FieldType> GetFieldType(long id)
        {
            var fieldType = await _context.FieldTypes
                .FirstOrDefaultAsync(x => x.IdFieldType == id);

            if (fieldType == null)
            {
                throw new ArgumentNullException(nameof(id), "No existe el FieldType seleccionado");
            }

            return fieldType;
        }

        public async  Task<List<KeyValueDTO>> GetKeyValueFieldType()
        {
            var selectorFiedType = await _context.FieldTypes.Where(x => x.Active).Select(c => new KeyValueDTO
            {
                Key = c.IdFieldType,
                Value = c.Name
            }).ToListAsync();

            return selectorFiedType;
        }

        public async Task<MessageInfoDTO> UpdateFieldType(FieldType fieldType)
        {
            var infoDTO = new MessageInfoDTO();
            try
            {
                var model = await _context.FieldTypes
                    .FirstOrDefaultAsync(x => x.IdFieldType == fieldType.IdFieldType);

                if (model == null)
                {
                    infoDTO.Mensaje = "el fieldType ingresado fue nulo";
                    return infoDTO;
                }

                model.Name = fieldType.Name;
                await _context.SaveChangesAsync();

                infoDTO.Mensaje = "se a actualizado";
                return infoDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
