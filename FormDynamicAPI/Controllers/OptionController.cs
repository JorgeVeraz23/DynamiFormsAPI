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
    public class OptionController : ControllerBase
    {

        private readonly IMapper _mapper;
        private readonly IOptionRepository _optionRepository;
        private readonly string _nameController = "OptionController";

        public OptionController(IOptionRepository optionRepository, IMapper mapper)
        {
            _optionRepository = optionRepository;
            _mapper = mapper;
        }

        [HttpPost("CrearOpcion")]
        public async Task<ActionResult> CrearOpcion(OptionDTO optionDTO)
        {
            try
            {
                var optionEntity = _mapper.Map<Option>(optionDTO);
                var response = await _optionRepository.CreateOption(optionEntity);

                return StatusCode(response.Status, response);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar crear la opción."));
            }
        }

        [HttpPut("ActualizarOpcion")]
        public async Task<ActionResult> ActualizarOpcion(OptionDTO optionDTO)
        {
            try
            {
                var optionEntity = _mapper.Map<Option>(optionDTO);
                var response = await _optionRepository.UpdateOption(optionEntity);

                return StatusCode(response.Status, response);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar actualizar la opción."));
            }
        }

        [HttpDelete("EliminarOpcion")]
        public async Task<ActionResult> EliminarOpcion(long id)
        {
            try
            {
                var response = await _optionRepository.DeleteOption(id);

                return StatusCode(response.Status, response);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar eliminar la opción."));
            }
        }

        [HttpGet("ObtenerTodasLasOpciones")]
        public async Task<ActionResult<IEnumerable<OptionDTO>>> ObtenerTodasLasOpciones()
        {
            try
            {
                var options = await _optionRepository.GetAllOptions();
                var optionDTOs = _mapper.Map<IEnumerable<OptionDTO>>(options);

                return Ok(optionDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar mostrar todas las opciones."));
            }
        }

        [HttpGet("ObtenerOpcionPorId")]
        public async Task<ActionResult<OptionDTO>> ObtenerOpcionPorId(long id)
        {
            try
            {
                var option = await _optionRepository.GetOption(id);
                var optionDTO = _mapper.Map<OptionDTO>(option);

                return Ok(optionDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar mostrar la opción."));
            }
        }
    }
}
