using FormDynamicAPI.DTO;
using FormDynamicAPI.DTO.UtilitiesDTO;
using FormDynamicAPI.Entity;
using FormDynamicAPI.Interface;
using Microsoft.EntityFrameworkCore;

namespace FormDynamicAPI.Repository
{
    public class FormRepository : IFormRepository
    {
        private readonly ApplicationDbContext _context;

        public FormRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<MessageInfoDTO> CreateForm(Form form)
        {
            var infoDTO = new MessageInfoDTO(); // Crear una nueva instancia
            try
            {
                if (form == null)
                {
                    throw new ArgumentNullException(nameof(form), "FormDTO cannot be null");
                }

                form = new Form
                {
                    IdForm = form.IdForm,
                    Name = form.Name,
                    Description = form.Description,
                    Active = true,
                    DateRegister = DateTime.Now,
                };

                _context.Forms.Add(form);
                await _context.SaveChangesAsync();

                infoDTO.Success = true;
                infoDTO.Message = "Formulario creado exitosamente!";
                infoDTO.Status = 201;
                infoDTO.Detail = new FormDTO
                {
                    IdForm = form.IdForm,
                    Name = form.Name,
                    Description = form.Description
                };

                return infoDTO;
            }
            catch (Exception ex)
            {
                return infoDTO.ErrorInterno(ex, "FormRepository", "Error al intentar agregar el formulario");
            }
        }

        public async Task<MessageInfoDTO> DeleteForm(long id)
        {
            var infoDTO = new MessageInfoDTO(); // Crear una nueva instancia
            try
            {
                if (id <= 0)
                {
                    throw new ArgumentNullException(nameof(id), "Por favor ingrese el id requerido");
                }

                var formularioToDelete = await _context.Forms
                    .Where(x => x.Active && x.IdForm == id)
                    .FirstOrDefaultAsync();

                if (formularioToDelete != null)
                {
                    formularioToDelete.Active = false;
                    formularioToDelete.DateDelete = DateTime.Now;
                    await _context.SaveChangesAsync();

                    infoDTO.AccionCompletada("Se ha eliminado el formulario!");
                }
                else
                {
                    infoDTO.AccionFallida("No se encontró el formulario ingresado", 404);
                }

                return infoDTO;
            }
            catch (Exception ex)
            {
                return infoDTO.ErrorInterno(ex, "FormRepository", "Error al intentar eliminar el formulario");
            }
        }

        public async Task<List<Form>> GetAllForm()
        {
            return await _context.Forms.Where(x => x.Active).ToListAsync();
        }

        public async Task<Form> GetForm(long id)
        {
            var formularioSeleccionado = await _context.Forms
                .FirstOrDefaultAsync(x => x.Active && x.IdForm == id);

            if (formularioSeleccionado == null)
            {
                throw new ArgumentNullException(nameof(id), "No existe el formulario seleccionado");
            }

            return formularioSeleccionado;
        }

        public async Task<MessageInfoDTO> UpdateForm(Form formDTO)
        {
            var infoDTO = new MessageInfoDTO(); // Crear una nueva instancia
            try
            {
                var model = await _context.Forms
                    .FirstOrDefaultAsync(x => x.Active && x.IdForm == formDTO.IdForm);

                if (model == null)
                {
                    infoDTO.AccionFallida("No se encuentra el formulario que se intenta actualizar", 404);
                    return infoDTO;
                }

                model.Name = formDTO.Name;
                model.Description = formDTO.Description;
                model.DateModification = DateTime.Now;

                await _context.SaveChangesAsync();

                infoDTO.AccionCompletada("Se ha actualizado el formulario");
                return infoDTO;
            }
            catch (Exception ex)
            {
                return infoDTO.ErrorInterno(ex, "FormRepository", "Error al intentar editar el formulario");
            }
        }
    }

}
