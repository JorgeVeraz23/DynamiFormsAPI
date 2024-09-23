using Microsoft.EntityFrameworkCore;
using Microsoft.SqlServer.Server;
using System.Reflection.Metadata.Ecma335;
using TicketsAPI.DTO;
using TicketsAPI.Entities;
using TicketsAPI.Interfaces;

namespace TicketsAPI.Repository
{
    public class FormRepository : FormInterface
    {

        private readonly ApplicationDbContext _context;
        MessageInfoSolicitudDTO infoDTO = new MessageInfoSolicitudDTO();
        public FormRepository(ApplicationDbContext context) {
            _context = context;

        }

        public async Task<MessageInfoSolicitudDTO> ActualizarFormulario(FormDTO formDTO)
        {
            var model = await _context.Forms.FirstOrDefaultAsync(x => x.IdForm == formDTO.IdForm) ?? throw new ArgumentNullException("Formulario ingresado no existe");



            model.Name = formDTO.Name;
            model.Description = formDTO.Description;

            model.DateModification = DateTime.Now;
            model.UserModification = "SYSTEM";
            model.IpModification = "::1";

            await _context.SaveChangesAsync();
            infoDTO.Cod = "201";
            infoDTO.Mensaje = "Formulario actualizado correactamente";


            return infoDTO;

        }

        public async Task<MessageInfoSolicitudDTO> CrearFormulario(FormDTO formDTO)
        {
            // Crear una instancia de la entidad Form
            Form form = new Form();
            form.Name = formDTO.Name;
            form.Description = formDTO.Description;
            form.Active = true;
            form.DateRegister = DateTime.Now;


            // Agregar el nuevo formulario al contexto
            await _context.Forms.AddAsync(form);

            // Guardar los cambios en la base de datos
            await _context.SaveChangesAsync();

            // Crear el mensaje de respuesta
            var message = new MessageInfoSolicitudDTO
            {
                Cod = "201",
                Mensaje = "Formulario creado exitosamente"
            };

            // Retornar el mensaje de respuesta
            return message;
        }

        public async Task<MessageInfoSolicitudDTO> ELiminarFormulario(long id)
        {

            var formularioBusqueda = await _context.Forms.Where(x => x.Active && x.IdForm == id).FirstOrDefaultAsync();

            if (formularioBusqueda == null)
            {
                infoDTO.Cod = "400";
                infoDTO.Mensaje = "No existe el formulario a eliminar";
            }

            formularioBusqueda.Active = false;
            formularioBusqueda.DateDelete = DateTime.Now;
            formularioBusqueda.UserDelete = "SYSTEM";
            formularioBusqueda.IpDelete = "::1";

            await _context.SaveChangesAsync();
            infoDTO.Cod = "201";
            infoDTO.Mensaje = "Formulario eliminado correctamente";

            return infoDTO;
        }

        public async Task<List<KeyValueDTO>> KeyValueFormuario()
        {
            var selectorFormulario = await _context.Forms.Where(x => x.Active).Select(c => new KeyValueDTO
            {
                Key = c.IdForm,
                Value = c.Name,
            }).ToListAsync();

            return selectorFormulario;
        }

        public async Task<FormDynamicDTO> MostrarFormularioConGruposYCampos(long idForm)
        {
            // Consulta a la base de datos con Include y ThenInclude
            //var form = await _context.Forms
            //    .Include(f => f.FormGroups)                // Incluye los grupos de formulario relacionados
            //        .ThenInclude(fg => fg.FormFields)      // Incluye los campos de formulario dentro de cada grupo
            //            .ThenInclude(ff => ff.FieldType)   // Incluye el tipo de campo relacionado con cada FormField
            //    .FirstOrDefaultAsync(f => f.IdForm == idForm);  // Filtra por el Id del formulario

            var form = await _context.Forms
        .Include(f => f.FormGroups)
            .ThenInclude(fg => fg.FormFields)
                .ThenInclude(ff => ff.FieldType)
        .Include(f => f.FormGroups)
            .ThenInclude(fg => fg.FormFields)
                .ThenInclude(ff => ff.Options) // Incluir las opciones aquí
        .FirstOrDefaultAsync(f => f.IdForm == idForm);

            if (form == null)
            {
                 throw new ArgumentNullException("formulario ingresado es invalido");
            }

            // Creación de un DTO para devolver los datos relevantes
            var formDto = new FormDynamicDTO
            {
                IdForm = form.IdForm,
                Name = form.Name,
                Description = form.Description,
                FormGroups = form.FormGroups.Select(group => new FormGroupDynamicDTO
                {
                    IdFormGroup = group.IdFormGroup,
                    Name = group.Name,
                    FormFields = group.FormFields.Select(field => new FormFielDynamicDTO
                    {
                        IdFormField = field.IdFormField,
                        Name = field.Name,
                        IsOptional = field.IsOptional,
                        Index = field.Index,
                        FieldType = field.FieldType.Name, // Incluimos el tipo de campo (FieldType)
                        Options = field.Options.Select(option => new OptionDynamicDTO
                        {
                            IdOption = option.IdOption,
                            Name = option.Name,
                        }).ToList(),
                    }).ToList()
                }).ToList()
            };


            return formDto;
        }



        public async Task<FormDTO> ObtenerFormularioPorId(long id)
        {
            var busqueda = await _context.Forms.Where(x => x.IdForm == id).Select(c => new FormDTO
            {
                IdForm = c.IdForm,
                Name = c.Name,
                Description = c.Description
            }).FirstOrDefaultAsync() ?? throw new ArgumentNullException("No hay resultados");



            if(busqueda == null)
            {
                infoDTO.Cod = "400";
                infoDTO.Mensaje = "No existe el formulario solicitado";

            }

            return busqueda;



        }

        public async Task<List<FormDTO>> ObtenerFormularios()
        {
            var listaDeFormularios = await _context.Forms.Where(x => x.Active).Select(c => new FormDTO
            {
                IdForm = c.IdForm,
                Name = c.Name,
                Description = c.Description
            }).ToListAsync();

            return listaDeFormularios;
        }
    }
}
