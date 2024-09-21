using FormDynamicAPI.DTO;
using FormDynamicAPI.DTO.UtilitiesDTO;
using FormDynamicAPI.Entity;
using FormDynamicAPI.Interface;
using Microsoft.EntityFrameworkCore;

namespace FormDynamicAPI.Repository
{
    public class FilledFormFieldRepository : IFilledFormFieldRepository
    {
        private readonly ApplicationDbContext _context;

        public FilledFormFieldRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<MessageInfoDTO> CreateFilledFormField(FilledFormField filledFormField)
        {
            var infoDTO = new MessageInfoDTO();
            try
            {
                if (filledFormField == null)
                {
                    throw new ArgumentNullException(nameof(filledFormField), "FilledFormField cannot be null");
                }

                _context.FilledFormFields.Add(filledFormField);
                await _context.SaveChangesAsync();

          
                infoDTO.Mensaje = "FilledFormField creado exitosamente!";
                infoDTO.Cod = "201";
                

                return infoDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<MessageInfoDTO> DeleteFilledFormField(long id)
        {
            var infoDTO = new MessageInfoDTO();
            try
            {
                if (id <= 0)
                {
                    throw new ArgumentNullException(nameof(id), "Por favor ingrese el id requerido");
                }

                var filledFormFieldToDelete = await _context.FilledFormFields
                    .Where(x => x.IdFilledFormField == id)
                    .FirstOrDefaultAsync();

                if (filledFormFieldToDelete != null)
                {
                    _context.FilledFormFields.Remove(filledFormFieldToDelete);
                    await _context.SaveChangesAsync();

                    infoDTO.Mensaje = "FieldType eliminado correctamente";
                }
                else
                {
                    infoDTO.Mensaje = "el fieldType ingresado fue nulo";
                }

                return infoDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<List<FilledFormField>> GetAllFilledFormFields()
        {
            return await _context.FilledFormFields.ToListAsync();
        }

        public async Task<FilledFormField> GetFilledFormField(long id)
        {
            var filledFormField = await _context.FilledFormFields
                .FirstOrDefaultAsync(x => x.IdFilledFormField == id);

            if (filledFormField == null)
            {
                throw new ArgumentNullException(nameof(id), "No existe el FilledFormField seleccionado");
            }

            return filledFormField;
        }

        public async Task<MessageInfoDTO> UpdateFilledFormField(FilledFormField filledFormField)
        {
            var infoDTO = new MessageInfoDTO();
            try
            {
                var model = await _context.FilledFormFields
                    .FirstOrDefaultAsync(x => x.IdFilledFormField == filledFormField.IdFilledFormField);

                if (model == null)
                {
                    infoDTO.Mensaje = "el fieldType ingresado fue nulo";
                    return infoDTO;
                }


                model.FilledFormId = filledFormField.FilledFormId;
                model.FormFieldId = filledFormField.FormFieldId;
                await _context.SaveChangesAsync();

                infoDTO.Mensaje = "se a actualizado correctamente";
                return infoDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

    }
}
