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

                return Ok(response);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPut("ActualizarGrupoDeFormulario")]
        public async Task<ActionResult> ActualizarGrupoDeFormulario(FormGroupDTO formGroupDTO)
        {
            try
            {
                var formGroupEntity = _mapper.Map<FormGroup>(formGroupDTO);
                var response = await _formGroupRepository.UpdateFormGroup(formGroupEntity);

                return Ok(response);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpDelete("EliminarGrupoDeFormulario")]
        public async Task<ActionResult> EliminarGrupoDeFormulario(long id)
        {
            try
            {
                var response = await _formGroupRepository.DeleteFormGroup(id);

                return Ok(response);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
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
                throw new Exception(ex.Message);
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
                throw new Exception(ex.Message);
            }
        }

    }
}
