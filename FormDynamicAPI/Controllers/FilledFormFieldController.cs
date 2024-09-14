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
    public class FilledFormFieldController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IFilledFormFieldRepository _filledFormFieldRepository;
        private readonly string _nameController = "FilledFormFieldController";

        public FilledFormFieldController(IFilledFormFieldRepository filledFormFieldRepository, IMapper mapper)
        {
            _filledFormFieldRepository = filledFormFieldRepository;
            _mapper = mapper;
        }

        [HttpPost("CrearCampoFormularioLleno")]
        public async Task<ActionResult> CrearCampoFormularioLleno(FilledFormFieldDTO filledFormFieldDTO)
        {
            try
            {
                var filledFormFieldEntity = _mapper.Map<FilledFormField>(filledFormFieldDTO);
                var response = await _filledFormFieldRepository.CreateFilledFormField(filledFormFieldEntity);

                return StatusCode(response.Status, response);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar crear el campo de formulario lleno."));
            }
        }

        [HttpPut("ActualizarCampoFormularioLleno")]
        public async Task<ActionResult> ActualizarCampoFormularioLleno(FilledFormFieldDTO filledFormFieldDTO)
        {
            try
            {
                var filledFormFieldEntity = _mapper.Map<FilledFormField>(filledFormFieldDTO);
                var response = await _filledFormFieldRepository.UpdateFilledFormField(filledFormFieldEntity);

                return StatusCode(response.Status, response);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar actualizar el campo de formulario lleno."));
            }
        }

        [HttpDelete("EliminarCampoFormularioLleno")]
        public async Task<ActionResult> EliminarCampoFormularioLleno(long id)
        {
            try
            {
                var response = await _filledFormFieldRepository.DeleteFilledFormField(id);

                return StatusCode(response.Status, response);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar eliminar el campo de formulario lleno."));
            }
        }

        [HttpGet("ObtenerTodosLosCamposFormularioLleno")]
        public async Task<ActionResult<IEnumerable<FilledFormFieldDTO>>> ObtenerTodosLosCamposFormularioLleno()
        {
            try
            {
                var filledFormFields = await _filledFormFieldRepository.GetAllFilledFormFields();
                var filledFormFieldDTOs = _mapper.Map<IEnumerable<FilledFormFieldDTO>>(filledFormFields);

                return Ok(filledFormFieldDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar mostrar todos los campos de formulario lleno."));
            }
        }

        [HttpGet("ObtenerCampoFormularioLlenoPorId")]
        public async Task<ActionResult<FilledFormFieldDTO>> ObtenerCampoFormularioLlenoPorId(long id)
        {
            try
            {
                var filledFormField = await _filledFormFieldRepository.GetFilledFormField(id);
                var filledFormFieldDTO = _mapper.Map<FilledFormFieldDTO>(filledFormField);

                return Ok(filledFormFieldDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar mostrar el campo de formulario lleno."));
            }
        }
    }
}
