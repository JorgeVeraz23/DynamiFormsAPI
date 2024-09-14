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

                infoDTO.Success = true;
                infoDTO.Message = "FieldType creado exitosamente!";
                infoDTO.Status = 201;
                infoDTO.Detail = new FieldTypeDTO
                {
                    IdFieldType = fieldType.IdFieldType,
                    Name = fieldType.Name
                };

                return infoDTO;
            }
            catch (Exception ex)
            {
                return infoDTO.ErrorInterno(ex, "FieldTypeRepository", "Error al intentar agregar el FieldType");
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

                    infoDTO.AccionCompletada("Se ha eliminado el FieldType!");
                }
                else
                {
                    infoDTO.AccionFallida("No se encontró el FieldType ingresado", 404);
                }

                return infoDTO;
            }
            catch (Exception ex)
            {
                return infoDTO.ErrorInterno(ex, "FieldTypeRepository", "Error al intentar eliminar el FieldType");
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

        public async Task<MessageInfoDTO> UpdateFieldType(FieldType fieldType)
        {
            var infoDTO = new MessageInfoDTO();
            try
            {
                var model = await _context.FieldTypes
                    .FirstOrDefaultAsync(x => x.IdFieldType == fieldType.IdFieldType);

                if (model == null)
                {
                    infoDTO.AccionFallida("No se encuentra el FieldType que se intenta actualizar", 404);
                    return infoDTO;
                }

                model.Name = fieldType.Name;
                await _context.SaveChangesAsync();

                infoDTO.AccionCompletada("Se ha actualizado el FieldType");
                return infoDTO;
            }
            catch (Exception ex)
            {
                return infoDTO.ErrorInterno(ex, "FieldTypeRepository", "Error al intentar editar el FieldType");
            }
        }
    }
}
