using AutoMapper;
using FormDynamicAPI.DTO.UtilitiesDTO;
using FormDynamicAPI.DTO;
using FormDynamicAPI.Entity;
using FormDynamicAPI.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FormDynamicAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormFieldController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IFormFieldRepository _formFieldRepository;
        private readonly string _nameController = "FormFieldController";

        public FormFieldController(IFormFieldRepository formFieldRepository, IMapper mapper)
        {
            _formFieldRepository = formFieldRepository;
            _mapper = mapper;
        }

        [HttpPost("CrearCampoDeFormulario")]
        public async Task<ActionResult> CrearCampoDeFormulario(FormFieldDTO formFieldDTO)
        {
            try
            {
                var formFieldEntity = _mapper.Map<FormField>(formFieldDTO);
                var response = await _formFieldRepository.CreateFormField(formFieldEntity);

                return Ok(response);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPut("ActualizarCampoDeFormulario")]
        public async Task<ActionResult> ActualizarCampoDeFormulario(FormFieldDTO formFieldDTO)
        {
            try
            {
                var formFieldEntity = _mapper.Map<FormField>(formFieldDTO);
                var response = await _formFieldRepository.UpdateFormField(formFieldEntity);

                return Ok(response);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpDelete("EliminarCampoDeFormulario")]
        public async Task<ActionResult> EliminarCampoDeFormulario(long id)
        {
            try
            {
                var response = await _formFieldRepository.DeleteFormField(id);

                return Ok(response);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("ObtenerTodosLosCamposDeFormulario")]
        public async Task<ActionResult<IEnumerable<FormFieldDTO>>> ObtenerTodosLosCamposDeFormulario()
        {
            try
            {
                var formFields = await _formFieldRepository.GetAllFormFields();
                var formFieldDTOs = _mapper.Map<IEnumerable<FormFieldDTO>>(formFields);

                return Ok(formFieldDTOs);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet("ObtenerCampoDeFormularioPorId")]
        public async Task<ActionResult<FormFieldDTO>> ObtenerCampoDeFormularioPorId(long id)
        {
            try
            {
                var formField = await _formFieldRepository.GetFormField(id);
                var formFieldDTO = _mapper.Map<FormFieldDTO>(formField);

                return Ok(formFieldDTO);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
