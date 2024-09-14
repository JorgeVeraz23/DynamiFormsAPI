using AutoMapper;
using FormDynamicAPI.DTO.UtilitiesDTO;
using FormDynamicAPI.DTO;
using FormDynamicAPI.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FormDynamicAPI.Entity;

namespace FormDynamicAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FieldTypeController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IFieldTypeRepository _fieldTypeRepository;
        private readonly string _nameController = "FieldTypeController";

        public FieldTypeController(IFieldTypeRepository fieldTypeRepository, IMapper mapper)
        {
            _fieldTypeRepository = fieldTypeRepository;
            _mapper = mapper;
        }

        [HttpPost("CrearTipoDeCampo")]
        public async Task<ActionResult> CrearTipoDeCampo(FieldTypeDTO fieldTypeDTO)
        {
            try
            {
                var fieldTypeEntity = _mapper.Map<FieldType>(fieldTypeDTO);
                var response = await _fieldTypeRepository.CreateFieldType(fieldTypeEntity);

                return StatusCode(response.Status, response);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar crear el tipo de campo."));
            }
        }

        [HttpPut("ActualizarTipoDeCampo")]
        public async Task<ActionResult> ActualizarTipoDeCampo(FieldTypeDTO fieldTypeDTO)
        {
            try
            {
                var fieldTypeEntity = _mapper.Map<FieldType>(fieldTypeDTO);
                var response = await _fieldTypeRepository.UpdateFieldType(fieldTypeEntity);

                return StatusCode(response.Status, response);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar actualizar el tipo de campo."));
            }
        }

        [HttpDelete("EliminarTipoDeCampo")]
        public async Task<ActionResult> EliminarTipoDeCampo(long id)
        {
            try
            {
                var response = await _fieldTypeRepository.DeleteFieldType(id);

                return StatusCode(response.Status, response);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar eliminar el tipo de campo."));
            }
        }

        [HttpGet("ObtenerTodosLosTiposDeCampo")]
        public async Task<ActionResult<IEnumerable<FieldTypeDTO>>> ObtenerTodosLosTiposDeCampo()
        {
            try
            {
                var fieldTypes = await _fieldTypeRepository.GetAllFieldTypes();
                var fieldTypeDTOs = _mapper.Map<IEnumerable<FieldTypeDTO>>(fieldTypes);

                return Ok(fieldTypeDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar mostrar todos los tipos de campo."));
            }
        }

        [HttpGet("ObtenerTipoDeCampoPorId")]
        public async Task<ActionResult<FieldTypeDTO>> ObtenerTipoDeCampoPorId(long id)
        {
            try
            {
                var fieldType = await _fieldTypeRepository.GetFieldType(id);
                var fieldTypeDTO = _mapper.Map<FieldTypeDTO>(fieldType);

                return Ok(fieldTypeDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar mostrar el tipo de campo."));
            }
        }

    }
}
