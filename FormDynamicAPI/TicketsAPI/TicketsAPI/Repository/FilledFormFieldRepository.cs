using Microsoft.EntityFrameworkCore;
using Microsoft.SqlServer.Server;
using TicketsAPI.DTO;
using TicketsAPI.Entities;
using TicketsAPI.Interfaces;

namespace TicketsAPI.Repository
{
    public class FilledFormFieldRepository : FilledFormFieldInterface
    {

        MessageInfoSolicitudDTO infoDTO = new MessageInfoSolicitudDTO();
        private readonly ApplicationDbContext _context;

        public FilledFormFieldRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<MessageInfoSolicitudDTO> CreateFilledFormField(CreateFilledFormFieldDTO createFilledFormFieldDTO)
        {

            if (createFilledFormFieldDTO.SelectedOptionId == 0)
            {
                createFilledFormFieldDTO.SelectedOptionId = null;
            }

            FilledFormField filledFormField = new FilledFormField
            {
                IsChecked = createFilledFormFieldDTO.IsChecked,
                TextValue = createFilledFormFieldDTO.TextValue,
                NumericValue = createFilledFormFieldDTO.NumericValue,
                DateTimeValue = createFilledFormFieldDTO.DateTimeValue,
                SelectedOptionId = createFilledFormFieldDTO.SelectedOptionId,
                FilledFormId = createFilledFormFieldDTO.FilledFormId,

                Active = true,
                DateRegister = DateTime.Now,
                UserRegister = "SYSTEM",
                IpRegister = "::1",
            };

            await _context.FilledFormField.AddAsync(filledFormField);
            await _context.SaveChangesAsync();


            infoDTO.Cod = "201";
            infoDTO.Mensaje = "Filled Form Field creado exitosamente";

            return infoDTO;


        }

        public async Task<MessageInfoSolicitudDTO> EditFilledFormField(EditFilledFormFieldDTO editFilledFormFieldDTO)
        {
            var model = await _context.FilledFormField.Where(x => x.Active && x.IdFilledFormField == editFilledFormFieldDTO.IdFilledFormField).FirstOrDefaultAsync() ?? throw new ArgumentNullException("Error al intentar editar filled form field");

            model.IsChecked = editFilledFormFieldDTO.IsChecked;
            model.TextValue = editFilledFormFieldDTO.TextValue;
            model.NumericValue = editFilledFormFieldDTO.NumericValue;
            model.DateTimeValue = editFilledFormFieldDTO.DateTimeValue;
            model.SelectedOptionId = editFilledFormFieldDTO?.SelectedOptionId;
            model.FilledFormId = editFilledFormFieldDTO.FormFieldId;

            await _context.SaveChangesAsync();

            infoDTO.Cod = "201";
            infoDTO.Mensaje = "Filled Form Field editado correctamente";

            return infoDTO;

        }

        public async Task<MessageInfoSolicitudDTO> EliminarFilledFormField(long id)
        {
            var ifExist = await _context.FilledFormField.Where(x => x.Active && x.IdFilledFormField == id).FirstOrDefaultAsync() ?? throw new ArgumentNullException("El filled form field ingresado no existe");

            ifExist.Active = false;

            ifExist.DateDelete = DateTime.Now;
            ifExist.UserDelete = "SYSTEM";
            ifExist.IpDelete = "::1";

            await _context.SaveChangesAsync();

            infoDTO.Cod = "201";
            infoDTO.Mensaje = "Filled Form Field eliminado exitosamente";


            return infoDTO;
        }

        public async Task<List<FilledFormFieldDTO>> GetAlFilledFormField()
        {
            var listaFilledFormField = await _context.FilledFormField.Where(x => x.Active).Select(c => new FilledFormFieldDTO
            {
                IdFilledFormField = c.IdFilledFormField,
                IsChecked = c.IsChecked,
                TextValue = c.TextValue,
                NumericValue = c.NumericValue,
                DateTimeValue = c.DateTimeValue,
                SelectedOptionId = c.SelectedOptionId,
                SelectedOptionName = c.SelectedOption.Name,
            }).ToListAsync();


            return listaFilledFormField;
        }

        public async Task<FilledFormFieldDTO> GetFilledFormField(long id)
        {
            var ifExist = await _context.FilledFormField.Where(x => x.Active && x.IdFilledFormField == id).Select(c => new FilledFormFieldDTO
            {
                IdFilledFormField = c.IdFilledFormField,
                IsChecked = c.IsChecked,
                TextValue = c.TextValue,
                NumericValue = c.NumericValue,
                DateTimeValue = c.DateTimeValue,
                SelectedOptionId = c.SelectedOptionId,
                SelectedOptionName = c.SelectedOption.Name,
            }).FirstOrDefaultAsync() ?? throw new ArgumentNullException("Filled form field ingresado no existe");


            return ifExist;
        }

        public async Task<FormWithResponsesDto> GetFormWithGroupsAndFieldsAndResponsesAsync(long filledFormId)
        {
            var filledForm = await _context.FilledForms
                .Include(ff => ff.FilledFormFields)
                .FirstOrDefaultAsync(ff => ff.IdFilledForm == filledFormId);

            if (filledForm == null) return null;

            var form = await _context.Forms
                .Include(f => f.FormGroups)
                .ThenInclude(g => g.FormFields)
                .FirstOrDefaultAsync(f => f.IdForm == filledForm.FormId); // Usa el formId del filledForm

            if (form == null) return null;

            var formDto = new FormWithResponsesDto
            {
                IdForm = form.IdForm,
                Name = form.Name,
                Description = form.Description,
                Responses = filledForm.FilledFormFields.Select(ff => new FilledFormFieldRDto
                {
                    IdFilledFormField = ff.IdFilledFormField,
                    TextValue = ff.TextValue,
                    NumericValue = ff.NumericValue,
                    DateTimeValue = ff.DateTimeValue,
                    IsChecked = ff.IsChecked,
                    SelectedOptionId = ff.SelectedOptionId
                }).ToList()
            };

            return formDto;
        }


        public async Task<List<FormNewDto>> GetFormWithGroupsAndFieldsAndResponsesAsyncNew(long idForm)
        {
            var form = await _context.Forms
                .Include(f => f.FormGroups)
                    .ThenInclude(fg => fg.FormFields)
                        .ThenInclude(ff => ff.FieldType)
                .Include(f => f.FilledForms)
                    .ThenInclude(ff => ff.FilledFormFields)
                .Where(x => x.IdForm == idForm)
                .Select(f => new FormNewDto
                {
                    IdForm = f.IdForm,
                    Name = f.Name,
                    Description = f.Description,
                    FormGroups = f.FormGroups.Select(fg => new FormGroupNewDto
                    {
                        IdFormGroup = fg.IdFormGroup,
                        Name = fg.Name,
                        FormFields = fg.FormFields.Select(ff => new FormFieldNewDto
                        {
                            IdFormField = ff.IdFormField,
                            Name = ff.Name,
                            FieldType = ff.FieldType.Name // Aquí se asume que FieldType tiene una propiedad Name
                        }).ToList()
                    }).ToList(),
                    FilledForms = f.FilledForms.Select(fff => new FilledFormNewDto
                    {
                        IdFilledForm = fff.IdFilledForm,
                        FillDate = fff.FillDate,
                        FilledFormFields = fff.FilledFormFields.Select(fff => new FilledFormFieldNewDto
                        {
                            IdFilledFormField = fff.IdFilledFormField,
                            IsChecked = fff.IsChecked,
                            TextValue = fff.TextValue,
                            NumericValue = fff.NumericValue,
                            DateTimeValue = fff.DateTimeValue,
                            SelectedOptionId = fff.SelectedOptionId
                        }).ToList()
                    }).ToList()
                })
                .ToListAsync();

            return form;
        }



    }
}
