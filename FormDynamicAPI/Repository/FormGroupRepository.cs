using FormDynamicAPI.DTO.UtilitiesDTO;
using FormDynamicAPI.DTO;
using FormDynamicAPI.Entity;
using FormDynamicAPI.Interface;
using Microsoft.EntityFrameworkCore;

namespace FormDynamicAPI.Repository
{
    public class FormGroupRepository : IFormGroupRepository
    {
        private readonly ApplicationDbContext _context;

        public FormGroupRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<MessageInfoDTO> CreateFormGroup(FormGroup formGroup)
        {
            var infoDTO = new MessageInfoDTO();
            try
            {
                if (formGroup == null)
                {
                    throw new ArgumentNullException(nameof(formGroup), "FormGroup cannot be null");
                }

                _context.FormGroups.Add(formGroup);
                await _context.SaveChangesAsync();

                infoDTO.Success = true;
                infoDTO.Message = "FormGroup creado exitosamente!";
                infoDTO.Status = 201;
                infoDTO.Detail = new FormGroupDTO
                {
                    IdFormGroup = formGroup.IdFormGroup,
                    Name = formGroup.Name,
                    Index = formGroup.Index
                };

                return infoDTO;
            }
            catch (Exception ex)
            {
                return infoDTO.ErrorInterno(ex, "FormGroupRepository", "Error al intentar agregar el FormGroup");
            }
        }

        public async Task<MessageInfoDTO> DeleteFormGroup(long id)
        {
            var infoDTO = new MessageInfoDTO();
            try
            {
                if (id <= 0)
                {
                    throw new ArgumentNullException(nameof(id), "Por favor ingrese el id requerido");
                }

                var formGroupToDelete = await _context.FormGroups
                    .Where(x => x.IdFormGroup == id)
                    .FirstOrDefaultAsync();

                if (formGroupToDelete != null)
                {
                    _context.FormGroups.Remove(formGroupToDelete);
                    await _context.SaveChangesAsync();

                    infoDTO.AccionCompletada("Se ha eliminado el FormGroup!");
                }
                else
                {
                    infoDTO.AccionFallida("No se encontró el FormGroup ingresado", 404);
                }

                return infoDTO;
            }
            catch (Exception ex)
            {
                return infoDTO.ErrorInterno(ex, "FormGroupRepository", "Error al intentar eliminar el FormGroup");
            }
        }

        public async Task<List<FormGroup>> GetAllFormGroups()
        {
            return await _context.FormGroups.ToListAsync();
        }

        public async Task<FormGroup> GetFormGroup(long id)
        {
            var formGroup = await _context.FormGroups
                .FirstOrDefaultAsync(x => x.IdFormGroup == id);

            if (formGroup == null)
            {
                throw new ArgumentNullException(nameof(id), "No existe el FormGroup seleccionado");
            }

            return formGroup;
        }

        public async Task<MessageInfoDTO> UpdateFormGroup(FormGroup formGroup)
        {
            var infoDTO = new MessageInfoDTO();
            try
            {
                var model = await _context.FormGroups
                    .FirstOrDefaultAsync(x => x.IdFormGroup == formGroup.IdFormGroup);

                if (model == null)
                {
                    infoDTO.AccionFallida("No se encuentra el FormGroup que se intenta actualizar", 404);
                    return infoDTO;
                }

                model.Name = formGroup.Name;
                model.Index = formGroup.Index;
                await _context.SaveChangesAsync();

                infoDTO.AccionCompletada("Se ha actualizado el FormGroup");
                return infoDTO;
            }
            catch (Exception ex)
            {
                return infoDTO.ErrorInterno(ex, "FormGroupRepository", "Error al intentar editar el FormGroup");
            }
        }
    }
}
