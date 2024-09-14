using AutoMapper;
using FormDynamicAPI.DTO;
using FormDynamicAPI.DTO.UtilitiesDTO;
using FormDynamicAPI.Entity;
using FormDynamicAPI.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FormDynamicAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormController : ControllerBase
    {

        private readonly IMapper _mapper;
        private readonly IFormRepository _formRepository;
        private readonly string _nameController = "FormController";

        public FormController(IFormRepository formRepository, IMapper mapper)
        {
            _formRepository = formRepository;
            _mapper = mapper;
        }


        [HttpPost("CrearFormulario")]
        public async Task<ActionResult> CrearFormulario(FormDTO formDTO)
        {
            try
            {
                // Utiliza el mapper para convertir FormDTO a Form
                var formEntity = _mapper.Map<Form>(formDTO);
                var response = await _formRepository.CreateForm(formEntity); // Añadir await

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar crear el formulario."));
            }
        }


        [HttpPut("ActualizarFormulario")]
        public async Task<ActionResult> ActualizarFormulario(FormDTO formDTO)
        {
            try
            {
                var formEntity = _mapper.Map<Form>(formDTO);
                var response = await _formRepository.UpdateForm(formEntity);

                return Ok(response);

            }catch(Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar actualizar el formulario."));
            }
        }

        [HttpDelete("EliminarFormulario")]
        public async Task<ActionResult> EliminarFormulario(long id)
        {
            try
            {
                var response = await _formRepository.DeleteForm(id);

                return Ok(response);

            }catch(Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar eliminar el formulario."));

            }
        }

        [HttpGet("ObtenerTodosLosFormularios")]
        public async Task<ActionResult<IEnumerable<FormDTO>>> ObtenerTodosLosFormularios()
        {
            try
            {
                var response = await _formRepository.GetAllForm();

                // Mapear cada entidad a FormDTO
                var formDTOs = _mapper.Map<IEnumerable<FormDTO>>(response);

                return Ok(formDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar mostrar todos los formularios."));
            }
        }


        [HttpGet("ObtenerFormularioPorId")]
        public async Task<ActionResult<FormDTO>> ObtenerFormulario(long id)
        {
            try
            {
                
                var response = await _formRepository.GetForm(id);

                if(response == null){
                    return NotFound();
                }

                var formDTO = _mapper.Map<FormDTO>(response);   

                return Ok(formDTO);


            }catch(Exception ex)
            {
                return StatusCode(400, new MessageInfoDTO().ErrorInterno(ex, _nameController, "Se produjo una excepción al intentar mostrar el formulario."));

            }
        }

    }
}
