using FormDynamicAPI.DTO.UtilitiesDTO;
using FormDynamicAPI.DTO;
using FormDynamicAPI.Entity;
using FormDynamicAPI.Interface;
using Microsoft.EntityFrameworkCore;

namespace FormDynamicAPI.Repository
{
    public class FilledFormRepository : IFilledFormRepository
    {
        private readonly ApplicationDbContext _context;

        public FilledFormRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<MessageInfoDTO> CreateFilledForm(FilledForm filledForm)
        {
            try
            {
                _context.FilledForms.Add(filledForm);
                await _context.SaveChangesAsync();

                return new MessageInfoDTO { Cod = "201", Mensaje = "Formulario guardado exitosamente." };
            }
            catch (Exception ex)
            {
                return new MessageInfoDTO { Cod = "400", Mensaje = "Error al guardar el formulario llenado: " + ex.Message };
            }
        }

        public async Task<MessageInfoDTO> DeleteFilledForm(long id)
        {
            var infoDTO = new MessageInfoDTO();
            try
            {
                if (id <= 0)
                {
                    throw new ArgumentNullException(nameof(id), "Por favor ingrese el id requerido");
                }

                var filledFormToDelete = await _context.FilledForms
                    .Where(x => x.IdFilledForm == id)
                    .FirstOrDefaultAsync();

                if (filledFormToDelete != null)
                {
                    _context.FilledForms.Remove(filledFormToDelete);
                    await _context.SaveChangesAsync();

                    infoDTO.Mensaje = "FilledForm eliminado correctamente";
                }
                else
                {
                    infoDTO.Mensaje = "el FilledForm ingresado fue nulo";
                }

                return infoDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }

        public async Task<List<FilledForm>> GetAllFilledForms()
        {
            return await _context.FilledForms.ToListAsync();
        }

        public async Task<FilledForm> GetFilledForm(long id)
        {
            var filledForm = await _context.FilledForms
                .FirstOrDefaultAsync(x => x.IdFilledForm == id);

            if (filledForm == null)
            {
                throw new ArgumentNullException(nameof(id), "No existe el FilledForm seleccionado");
            }

            return filledForm;
        }

        public async Task<MessageInfoDTO> UpdateFilledForm(FilledForm filledForm)
        {
            var infoDTO = new MessageInfoDTO();
            try
            {
                var model = await _context.FilledForms
                    .FirstOrDefaultAsync(x => x.IdFilledForm == filledForm.IdFilledForm);

                if (model == null)
                {
                    infoDTO.Mensaje = "el filledForm ingresado fue nulo";
                    return infoDTO;
                }

                model.FillDate = filledForm.FillDate;
                model.FormId = filledForm.FormId;
                await _context.SaveChangesAsync();

                infoDTO.Mensaje = "FieldType actualizado correctamente";
                return infoDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
