using AutoMapper;
using FormDynamicAPI.DTO.UtilitiesDTO;
using FormDynamicAPI.DTO;
using FormDynamicAPI.Entity;
using FormDynamicAPI.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FormDynamicAPI.Repository;

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
        public async Task<ActionResult> CrearFormularioLleno([FromBody] FilledFormDTO filledFormDTO)
        {
            try
            {
                // Mapear DTO a entidades para almacenar los datos llenados
                var filledFormEntity = _mapper.Map<FilledForm>(filledFormDTO);

                var result = await _filledFormRepository.CreateFilledForm(filledFormEntity);

                if (result.Cod == "201")
                {
                    return Ok(new { Message = "Formulario guardado con éxito." });
                }

                return BadRequest(result.Cod == "204");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPut("ActualizarFormularioLleno")]
        public async Task<ActionResult> ActualizarFormularioLleno(FilledFormDTO filledFormDTO)
        {
            try
            {
                var filledFormEntity = _mapper.Map<FilledForm>(filledFormDTO);
                var response = await _filledFormRepository.UpdateFilledForm(filledFormEntity);

                return Ok(response);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpDelete("EliminarFormularioLleno")]
        public async Task<ActionResult> EliminarFormularioLleno(long id)
        {
            try
            {
                var response = await _filledFormRepository.DeleteFilledForm(id);

                return Ok(response);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
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
                throw new Exception(ex.Message);
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
                throw new Exception(ex.Message);
            }
        }
    }
}
