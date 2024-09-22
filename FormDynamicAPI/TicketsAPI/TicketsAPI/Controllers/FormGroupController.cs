using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TicketsAPI.DTO;
using TicketsAPI.Interfaces;
using TicketsAPI.Repository;

namespace TicketsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormGroupController : ControllerBase
    {
        private readonly FormGroupInterface _formGroupInterface;

        public FormGroupController(FormGroupInterface formGroupInterface)
        {
            _formGroupInterface = formGroupInterface; 
        }

        [HttpPost("CrearGrupoDeFormulario")]
        public async Task<ActionResult> CrearGrupoDeFormulario(FormGroupDTO formGroupDTO)
        {
            var response = await _formGroupInterface.CrearFormGroup(formGroupDTO);

            return Ok(response);    
        }

        [HttpPut("ActualizarGrupoDeFormulario")]
        public async Task<ActionResult> ActualizarGrupoDeFormulario(FormGroupDTO formGroup)
        {
            var response = await _formGroupInterface.ActualizarFormulario(formGroup);

            return Ok(response);
        }


        [HttpGet("ObtenerTodosLosGruposFormularios")]
        public async Task<ActionResult> ObtenerTodosLosGruposFormularios()
        {
            var response = await _formGroupInterface.ObtenerTodosLosFormularios();

            return Ok(response);    
        }

        [HttpGet("ObtenerGruposFormularioPorId")]
        public async Task<ActionResult> ObtenerGruposFormularioPorId(long id)
        {
            var response = await _formGroupInterface.ObtenerFormularioPorId(id);

            return Ok(response);
        }

        [HttpDelete("EliminarGrupoFormulario")]
        public async Task<ActionResult> EliminarGrupoFormulario(long id)
        {
            var response = await _formGroupInterface.EliminarFormGroup(id);

            return Ok(response);
        }

        [HttpGet("SelectorGrupoFormulario")]
        public async Task<ActionResult> SelectorFormulario()
        {
            var response = await _formGroupInterface.KeyValueFormGroup();

            return Ok(response);
        }
    }
}
