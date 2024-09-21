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

                
                infoDTO.Mensaje = "FormGroup creado exitosamente!";
                infoDTO.Cod = "201";
                

                return infoDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
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

                    infoDTO.Mensaje = "FormGroup eliminado correctamente";
                }
                else
                {
                    infoDTO.Mensaje = "el FormGroup ingresado fue nulo";
                }

                return infoDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
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
                    infoDTO.Mensaje = "el FormGroup ingresado fue nulo";
                    return infoDTO;
                }

                model.Name = formGroup.Name;
                await _context.SaveChangesAsync();

                infoDTO.Mensaje = "FormGroup eliminado correctamente";
                return infoDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
