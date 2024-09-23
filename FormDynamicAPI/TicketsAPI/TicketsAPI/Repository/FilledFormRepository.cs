using Microsoft.EntityFrameworkCore;
using TicketsAPI.DTO;
using TicketsAPI.Entities;
using TicketsAPI.Interfaces;

namespace TicketsAPI.Repository
{
    public class FilledFormRepository : FilledFormInterface
    {

        MessageInfoSolicitudDTO infoDTO = new MessageInfoSolicitudDTO();
        MessageInfoSolicitudIdDTO infoIdDTO = new MessageInfoSolicitudIdDTO();

        private readonly ApplicationDbContext _context;

        public FilledFormRepository(ApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<MessageInfoSolicitudIdDTO> CreateFilledForm(FilledFormDTO filledFormDTO)
        {
            FilledForm filledForm = new FilledForm
            {
                FillDate = DateTime.Now,
                FormId = filledFormDTO.FormId,
                Active = true,
                UserRegister = "SYSTEM",
                DateRegister = DateTime.Now,
            };

            await _context.FilledForms.AddAsync(filledForm);
            await _context.SaveChangesAsync();

            infoIdDTO.Cod = "201";
            infoIdDTO.Mensaje = "Filled Form Creado exitoamente";
            infoIdDTO.Id = filledForm.IdFilledForm;



            return infoIdDTO;

        }

        public async Task<List<KeyValueDTO>> GetFilledFormsKeyValueAsync()
        {
            return await _context.FilledForms
                .Include(ff => ff.Form) // Asegúrate de que la relación está configurada
                .Select(ff => new KeyValueDTO
                {
                    Key = ff.Form.IdForm,
                    Value = ff.Form.Name
                })
                .Distinct() // Elimina duplicados si es necesario
                .ToListAsync();
        }



        public async Task<MessageInfoSolicitudDTO> DeleteFilledForm(long id)
        {
            var ifExist = await _context.FilledForms.Where(x => x.Active).FirstOrDefaultAsync();

            if(infoDTO == null)
            {
                infoDTO.Cod = "400";
                infoDTO.Mensaje = "El formulario ingresado no existe";

                return infoDTO;
            }
            else
            {
                ifExist.Active = false;
                ifExist.DateDelete = DateTime.Now;
                ifExist.UserDelete = "SYSTEM";
                ifExist.IpDelete = "::1";

                await _context.SaveChangesAsync();

                infoDTO.Cod = "201";
                infoDTO.Mensaje = "Filled Form eliminado correctamente";

                return infoDTO;
            }
        }

        public async Task<List<FilledFormDTO>> GetAllFilledForm()
        {
            var filledFormList = await _context.FilledForms.Where(x => x.Active).Select(c => new FilledFormDTO
            {
                IdFilledForm = c.IdFilledForm,
                FormId = c.FormId,
            }).ToListAsync();
            
            return filledFormList;
        }

        public async Task<FilledFormDTO> GetFilledForm(long id)
        {
            var filledForm = await _context.FilledForms.Where(x => x.Active).Select(c => new FilledFormDTO
            {
                IdFilledForm = c.IdFilledForm,
                FormId = c.FormId
            }).FirstOrDefaultAsync();


            return filledForm;
        }

        public async Task<List<KeyValueDTO>> SelectorFilledForm()
        {
            var selectorFilledForm = await _context.FilledForms.Where(x => x.Active).Select(c => new KeyValueDTO
            {
                Key = c.IdFilledForm,
                Value = c.FormId.ToString()
            }).ToListAsync();

            return selectorFilledForm;
        }

        public async Task<MessageInfoSolicitudDTO> UpdateFilledForm(FilledFormDTO filledFormDTO)
        {
            var model = await _context.FilledForms.Where(x => x.Active && x.IdFilledForm == filledFormDTO.IdFilledForm).FirstOrDefaultAsync() ?? throw new ArgumentNullException("No existe el formulario que se intenta actualizar");

            model.IdFilledForm = filledFormDTO.IdFilledForm;
            model.FormId = filledFormDTO.FormId;

            model.DateModification = DateTime.Now;
            model.UserModification = "SYSTEM";
            model.IpModification = "::1";


            infoDTO.Cod = "201";
            infoDTO.Mensaje = "Se a actualizado el filledForm";

            return infoDTO;
            
        }

        public async Task<MessageInfoSolicitudDTO> SaveFilledFormAsync(FilledFormDynamicDTO filledFormDynamicDTO)
        {
            var filledForm = new FilledForm
            {
                FormId = filledFormDynamicDTO.FormId,
                FillDate = filledFormDynamicDTO.FillDate,
                FilledFormFields = filledFormDynamicDTO.FilledFormFields.Select(c => new FilledFormField
                {
                    IdFilledFormField = c.IdFilledFormField,
                    IsChecked = c.IsChecked,
                    TextValue = c.TextValue,
                    NumericValue = c.NumericValue,
                    DateTimeValue = c.DateTimeValue,
                    SelectedOptionId = c.SelectedOptionId
                }).ToList(),
            };

            await _context.FilledForms.AddAsync(filledForm);
            await _context.SaveChangesAsync();


            infoDTO.Cod = "201";
            infoDTO.Mensaje = "Formulario con llenado creado";

            return infoDTO;
        }
    }
}
