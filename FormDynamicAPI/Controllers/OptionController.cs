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

                return Ok(response);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPut("ActualizarOpcion")]
        public async Task<ActionResult> ActualizarOpcion(OptionDTO optionDTO)
        {
            try
            {
                var optionEntity = _mapper.Map<Option>(optionDTO);
                var response = await _optionRepository.UpdateOption(optionEntity);

                return Ok(response);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpDelete("EliminarOpcion")]
        public async Task<ActionResult> EliminarOpcion(long id)
        {
            try
            {
                var response = await _optionRepository.DeleteOption(id);

                return Ok(response);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
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
                throw new Exception(ex.Message);
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
                throw new Exception(ex.Message);
            }
        }
    }
}
