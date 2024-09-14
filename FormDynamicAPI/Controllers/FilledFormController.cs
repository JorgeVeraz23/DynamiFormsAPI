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
    public class FilledFormController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IFilledFormRepository _filledFormRepository;
        private readonly string _nameController = "FilledFormController";

        public FilledFormController(IFilledFormRepository filledFormRepository, IMapper mapper)
        {
            _filledFormRepository = filledFormRepository;
            _mapper = mapper;
        }

        [HttpPost("CrearFormularioLleno")]
        public async Task<ActionResult> CrearFormularioLleno(FilledFormDTO filledFormDTO)
        {
            try
            {
                var filledFormEntity = _mapper.Map<FilledForm>(filledFormDTO);
                var response = await _filledFormRepository.CreateFilledForm(filledFormEntity);

                return StatusCode(response.Status, response);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar crear el formulario lleno."));
            }
        }

        [HttpPut("ActualizarFormularioLleno")]
        public async Task<ActionResult> ActualizarFormularioLleno(FilledFormDTO filledFormDTO)
        {
            try
            {
                var filledFormEntity = _mapper.Map<FilledForm>(filledFormDTO);
                var response = await _filledFormRepository.UpdateFilledForm(filledFormEntity);

                return StatusCode(response.Status, response);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar actualizar el formulario lleno."));
            }
        }

        [HttpDelete("EliminarFormularioLleno")]
        public async Task<ActionResult> EliminarFormularioLleno(long id)
        {
            try
            {
                var response = await _filledFormRepository.DeleteFilledForm(id);

                return StatusCode(response.Status, response);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar eliminar el formulario lleno."));
            }
        }

        [HttpGet("ObtenerTodosLosFormulariosLlenos")]
        public async Task<ActionResult<IEnumerable<FilledFormDTO>>> ObtenerTodosLosFormulariosLlenos()
        {
            try
            {
                var filledForms = await _filledFormRepository.GetAllFilledForms();
                var filledFormDTOs = _mapper.Map<IEnumerable<FilledFormDTO>>(filledForms);

                return Ok(filledFormDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar mostrar todos los formularios llenos."));
            }
        }

        [HttpGet("ObtenerFormularioLlenoPorId")]
        public async Task<ActionResult<FilledFormDTO>> ObtenerFormularioLlenoPorId(long id)
        {
            try
            {
                var filledForm = await _filledFormRepository.GetFilledForm(id);
                var filledFormDTO = _mapper.Map<FilledFormDTO>(filledForm);

                return Ok(filledFormDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar mostrar el formulario lleno."));
            }
        }
    }
}
