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

                return new MessageInfoDTO { Success = true, Message = "Formulario guardado exitosamente." };
            }
            catch (Exception ex)
            {
                return new MessageInfoDTO { Success = false, Message = "Error al guardar el formulario llenado: " + ex.Message };
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

                    infoDTO.AccionCompletada("Se ha eliminado el FilledForm!");
                }
                else
                {
                    infoDTO.AccionFallida("No se encontró el FilledForm ingresado", 404);
                }

                return infoDTO;
            }
            catch (Exception ex)
            {
                return infoDTO.ErrorInterno(ex, "FilledFormRepository", "Error al intentar eliminar el FilledForm");
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
                    infoDTO.AccionFallida("No se encuentra el FilledForm que se intenta actualizar", 404);
                    return infoDTO;
                }

                model.FillDate = filledForm.FillDate;
                model.FormId = filledForm.FormId;
                await _context.SaveChangesAsync();

                infoDTO.AccionCompletada("Se ha actualizado el FilledForm");
                return infoDTO;
            }
            catch (Exception ex)
            {
                return infoDTO.ErrorInterno(ex, "FilledFormRepository", "Error al intentar editar el FilledForm");
            }
        }
    }
}
