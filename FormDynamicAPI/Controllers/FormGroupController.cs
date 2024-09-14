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
    public class FormGroupController : ControllerBase
    {

        private readonly IMapper _mapper;
        private readonly IFormGroupRepository _formGroupRepository;
        private readonly string _nameController = "FormGroupController";

        public FormGroupController(IFormGroupRepository formGroupRepository, IMapper mapper)
        {
            _formGroupRepository = formGroupRepository;
            _mapper = mapper;
        }

        [HttpPost("CrearGrupoDeFormulario")]
        public async Task<ActionResult> CrearGrupoDeFormulario(FormGroupDTO formGroupDTO)
        {
            try
            {
                var formGroupEntity = _mapper.Map<FormGroup>(formGroupDTO);
                var response = await _formGroupRepository.CreateFormGroup(formGroupEntity);

                return StatusCode(response.Status, response);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar crear el grupo de formulario."));
            }
        }

        [HttpPut("ActualizarGrupoDeFormulario")]
        public async Task<ActionResult> ActualizarGrupoDeFormulario(FormGroupDTO formGroupDTO)
        {
            try
            {
                var formGroupEntity = _mapper.Map<FormGroup>(formGroupDTO);
                var response = await _formGroupRepository.UpdateFormGroup(formGroupEntity);

                return StatusCode(response.Status, response);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar actualizar el grupo de formulario."));
            }
        }

        [HttpDelete("EliminarGrupoDeFormulario")]
        public async Task<ActionResult> EliminarGrupoDeFormulario(long id)
        {
            try
            {
                var response = await _formGroupRepository.DeleteFormGroup(id);

                return StatusCode(response.Status, response);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar eliminar el grupo de formulario."));
            }
        }

        [HttpGet("ObtenerTodosLosGruposDeFormulario")]
        public async Task<ActionResult<IEnumerable<FormGroupDTO>>> ObtenerTodosLosGruposDeFormulario()
        {
            try
            {
                var formGroups = await _formGroupRepository.GetAllFormGroups();
                var formGroupDTOs = _mapper.Map<IEnumerable<FormGroupDTO>>(formGroups);

                return Ok(formGroupDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar mostrar todos los grupos de formulario."));
            }
        }

        [HttpGet("ObtenerGrupoDeFormularioPorId")]
        public async Task<ActionResult<FormGroupDTO>> ObtenerGrupoDeFormularioPorId(long id)
        {
            try
            {
                var formGroup = await _formGroupRepository.GetFormGroup(id);
                var formGroupDTO = _mapper.Map<FormGroupDTO>(formGroup);

                return Ok(formGroupDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar mostrar el grupo de formulario."));
            }
        }

    }
}
