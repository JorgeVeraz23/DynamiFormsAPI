using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TicketsAPI.DTO;
using TicketsAPI.Interfaces;

namespace TicketsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilledFormController : ControllerBase
    {

        private readonly FilledFormInterface _filledFormInterface;

        public FilledFormController(FilledFormInterface filledFormInterface)
        {
            _filledFormInterface = filledFormInterface;
        }


        [HttpGet("GetAllFilledForm")]
        public async Task<ActionResult> GetFilledForm()
        {
            var response = await _filledFormInterface.GetAllFilledForm();

            return Ok(response);
        }


        [HttpGet("GetFilledFormPorId")]
        public async Task<ActionResult> GetFilledFormPorId(long id)
        {

            var response = await _filledFormInterface.GetFilledForm(id);

            return Ok(response);

        }


        [HttpPost("CrearFilledForm")]
        public async Task<ActionResult> CrearFilledForm(FilledFormDTO filledForm)
        {
            var response = await _filledFormInterface.CreateFilledForm(filledForm);

            return Ok(response);
        }

        [HttpPut("ActualizarFilleForm")]
        public async Task<ActionResult> ActualizarFilledForm(FilledFormDTO filledFormDTO)
        {
            var response = await _filledFormInterface.UpdateFilledForm(filledFormDTO);

            return Ok(response);
        }


        [HttpDelete("DeleteFilledForm")]
        public async Task<ActionResult> DeleteFilledForm(long id)
        {
            var response = await _filledFormInterface.DeleteFilledForm(id);

            return Ok(response);
        }

        [HttpGet("SelectorFilledForm")]
        public async Task<ActionResult> SelectorFilledForm()
        {
            var response = await _filledFormInterface.SelectorFilledForm();


            return Ok(response);
        }


    }
}
