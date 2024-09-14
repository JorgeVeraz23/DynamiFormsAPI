using FormDynamicAPI.DTO.UtilitiesDTO;
using FormDynamicAPI.DTO;
using FormDynamicAPI.Entity;
using Microsoft.EntityFrameworkCore;
using FormDynamicAPI.Interface;

namespace FormDynamicAPI.Repository
{
    public class FormFieldRepository : IFormFieldRepository
    {
        private readonly ApplicationDbContext _context;

        public FormFieldRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<MessageInfoDTO> CreateFormField(FormField formField)
        {
            var infoDTO = new MessageInfoDTO();
            try
            {
                if (formField == null)
                {
                    throw new ArgumentNullException(nameof(formField), "FormField cannot be null");
                }

                _context.FormFields.Add(formField);
                await _context.SaveChangesAsync();

                infoDTO.Success = true;
                infoDTO.Message = "FormField creado exitosamente!";
                infoDTO.Status = 201;
                infoDTO.Detail = new FormFieldDTO
                {
                    IdFormField = formField.IdFormField,
                    Name = formField.Name,
                    Index = formField.Index,
                    IsOptional = formField.IsOptional
                };

                return infoDTO;
            }
            catch (Exception ex)
            {
                return infoDTO.ErrorInterno(ex, "FormFieldRepository", "Error al intentar agregar el FormField");
            }
        }

        public async Task<MessageInfoDTO> DeleteFormField(long id)
        {
            var infoDTO = new MessageInfoDTO();
            try
            {
                if (id <= 0)
                {
                    throw new ArgumentNullException(nameof(id), "Por favor ingrese el id requerido");
                }

                var formFieldToDelete = await _context.FormFields
                    .Where(x => x.IdFormField == id)
                    .FirstOrDefaultAsync();

                if (formFieldToDelete != null)
                {
                    _context.FormFields.Remove(formFieldToDelete);
                    await _context.SaveChangesAsync();

                    infoDTO.AccionCompletada("Se ha eliminado el FormField!");
                }
                else
                {
                    infoDTO.AccionFallida("No se encontró el FormField ingresado", 404);
                }

                return infoDTO;
            }
            catch (Exception ex)
            {
                return infoDTO.ErrorInterno(ex, "FormFieldRepository", "Error al intentar eliminar el FormField");
            }
        }

        public async Task<List<FormField>> GetAllFormFields()
        {
            return await _context.FormFields.ToListAsync();
        }

        public async Task<FormField> GetFormField(long id)
        {
            var formField = await _context.FormFields
                .FirstOrDefaultAsync(x => x.IdFormField == id);

            if (formField == null)
            {
                throw new ArgumentNullException(nameof(id), "No existe el FormField seleccionado");
            }

            return formField;
        }

        public async Task<MessageInfoDTO> UpdateFormField(FormField formField)
        {
            var infoDTO = new MessageInfoDTO();
            try
            {
                var model = await _context.FormFields
                    .FirstOrDefaultAsync(x => x.IdFormField == formField.IdFormField);

                if (model == null)
                {
                    infoDTO.AccionFallida("No se encuentra el FormField que se intenta actualizar", 404);
                    return infoDTO;
                }

                model.Name = formField.Name;
                model.Index = formField.Index;
                model.IsOptional = formField.IsOptional;
                await _context.SaveChangesAsync();

                infoDTO.AccionCompletada("Se ha actualizado el FormField");
                return infoDTO;
            }
            catch (Exception ex)
            {
                return infoDTO.ErrorInterno(ex, "FormFieldRepository", "Error al intentar editar el FormField");
            }
        }
    }
}
