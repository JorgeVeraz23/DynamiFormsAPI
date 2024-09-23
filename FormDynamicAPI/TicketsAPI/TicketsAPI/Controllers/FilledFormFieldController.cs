using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TicketsAPI.DTO;
using TicketsAPI.Interfaces;

namespace TicketsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilledFormFieldController : ControllerBase
    {

        private readonly FilledFormFieldInterface _filledFormFieldInterace;

        public FilledFormFieldController(FilledFormFieldInterface filledFormFieldInterface)
        {
            _filledFormFieldInterace = filledFormFieldInterface;
        }


        [HttpGet("GetAllFilledFormField")]
        public async Task<ActionResult> GetAllFilledFormField()
        {
            var response = await _filledFormFieldInterace.GetAlFilledFormField();   

            return Ok(response);
        }


        [HttpGet("GetFilledFormField")]
        public async Task<ActionResult> GetFilledFormField(long id)
        {
            var response = await _filledFormFieldInterace.GetFilledFormField(id);

            return Ok(response);
        }

        [HttpGet("GetFormWithGroupsAndFieldsAndResponsesAsync")]
        public async Task<ActionResult> GetFormWithGroupsAndFieldsAndResponsesAsync(long id)
        {
            var response = await _filledFormFieldInterace.GetFormWithGroupsAndFieldsAndResponsesAsync(id);

            return Ok(response);
        }

        [HttpGet("GetFormWithGroupsAndFieldsAndResponsesAsyncNew")]
        public async Task<ActionResult> GetFormWithGroupsAndFieldsAndResponsesAsyncNew(long id)
        {
            var response = await _filledFormFieldInterace.GetFormWithGroupsAndFieldsAndResponsesAsyncNew(id);

            return Ok(response);
        }



        [HttpPost("CrearFilledFormField")]
        public async Task<ActionResult> CrearFilledFormField(CreateFilledFormFieldDTO createFilledFormFieldDTO)
        {
            var response = await _filledFormFieldInterace.CreateFilledFormField(createFilledFormFieldDTO);

            return Ok(response);
        }


        [HttpPut("ActualizarFilledFormField")]
        public async Task<ActionResult> ActualizarFilledFormField(EditFilledFormFieldDTO editFilledFormFieldDTO)
        {
            var response = await _filledFormFieldInterace.EditFilledFormField(editFilledFormFieldDTO);

            return Ok(response);
        }


        [HttpDelete("EliminarFilledFormField")]
        public async Task<ActionResult> EliminarFilledFormField(long id)
        {
            var response = await _filledFormFieldInterace.EliminarFilledFormField(id);

            return Ok(response);
        }


    }
}
