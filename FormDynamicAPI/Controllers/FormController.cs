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
        public async Task<ActionResult> CreateForm([FromBody] CreateFormDTO formDTO)
        {

            try
            {
                var response = _formRepository.CreateForm(formDTO);


                return Ok(response);

            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
            //var form = new Form
            //{
            //    Name = formDTO.Name,
            //    Description = formDTO.Description,
            //    FormGroups = formDTO.FormGroups.Select(g => new FormGroup
            //    {
            //        Name = g.Name,
            //        Index = g.Index,
            //        FormFields = g.FormFields.Select(f => new FormField
            //        {
            //            Name = f.Name,
            //            Index = f.Index,
            //            IsOptional = f.IsOptional,
            //            FieldType = new FieldType { IdFieldType = f.TypeId }
            //        }).ToList()
            //    }).ToList()
            //};

            //var result = await _formRepository.CreateForm(form);

            //if (result.Success)
            //{

            //    return CreatedAtAction(nameof(GetForm), new { id = form.IdForm }, form);
            //}

            //return BadRequest(result.Message);
        }


        [HttpPut("ActualizarFormulario")]
        public async Task<IActionResult> UpdateForm(long id, [FromBody] FormDTO formDTO)
        {
            var existingForm = await _formRepository.GetForm(id);
            if (existingForm == null)
            {
                return NotFound();
            }

            existingForm.Name = formDTO.Name;
            existingForm.Description = formDTO.Description;

            foreach (var groupDTO in formDTO.FormGroups)
            {
                var group = existingForm.FormGroups.FirstOrDefault(g => g.IdFormGroup == groupDTO.IdFormGroup);

                if (group == null)
                {
                    group = new FormGroup
                    {
                        Name = groupDTO.Name,
                        FormFields = groupDTO.FormFields.Select(f => new FormField
                        {
                            Name = f.Name,
                            Index = f.Index,
                            IsOptional = f.IsOptional,
                            FieldType = new FieldType { IdFieldType = f.TypeId }
                        }).ToList()
                    };
                    existingForm.FormGroups.Add(group);
                }
                else
                {
                    group.Name = groupDTO.Name;

                    foreach (var fieldDTO in groupDTO.FormFields)
                    {
                        var field = group.FormFields.FirstOrDefault(f => f.IdFormField == fieldDTO.IdFormField);
                        if (field == null)
                        {
                            field = new FormField
                            {
                                Name = fieldDTO.Name,
                                Index = fieldDTO.Index,
                                IsOptional = fieldDTO.IsOptional,
                                FieldType = new FieldType { IdFieldType = fieldDTO.TypeId }
                            };
                            group.FormFields.Add(field);
                        }
                        else
                        {
     
                            field.Name = fieldDTO.Name;
                            field.Index = fieldDTO.Index;
                            field.IsOptional = fieldDTO.IsOptional;
                        }
                    }
                }
            }

            var result = await _formRepository.UpdateForm(existingForm);
            if (result.Cod == "204" )
            {
                return NoContent();
            }

            return BadRequest(result.Cod == "204");
        }


        [HttpDelete("EliminarFormulario")]
        public async Task<IActionResult> DeleteForm(long id)
        {
            var result = await _formRepository.DeleteForm(id);
            if (result.Cod == "204")
            {
                return NoContent();
            }

            return NotFound(result.Cod == "404");
        }



        [HttpGet("ObtenerFormularioPorId")]
        public async Task<IActionResult> GetForm(long id)
        {
            var form = await _formRepository.GetForm(id);
            if (form == null)
            {
                return NotFound();
            }

            var formDTO = new FormDTO
            {
                IdForm = form.IdForm,
                Name = form.Name,
                Description = form.Description,
                FormGroups = form.FormGroups.Select(g => new FormGroupDTO
                {
                    IdFormGroup = g.IdFormGroup,
                    Name = g.Name,
                    FormId = g.FormId,
                    FormFields = g.FormFields.Select(f => new FormFieldDTO
                    {
                        IdFormField = f.IdFormField,
                        Name = f.Name,
                        Index = f.Index,
                        IsOptional = f.IsOptional,

                        FieldType = new FieldTypeDTO { IdFieldType = f.FieldType.IdFieldType, Name = f.FieldType.Name },
                        FormGroupId = g.IdFormGroup
                    }).ToList()
                }).ToList()
            };

            return Ok(formDTO);
        }




        [HttpGet("ObtenerTodosLosFormularios")]
        public async Task<IActionResult> GetAllForms()
        {
            var forms = await _formRepository.GetAllForm();
            var formsDTO = forms.Select(f => new FormDTO
            {
                IdForm = f.IdForm,
                Name = f.Name,
                Description = f.Description,
                FormGroups = f.FormGroups.Select(g => new FormGroupDTO
                {
                    IdFormGroup = g.IdFormGroup,
                    Name = g.Name,

                     FormFields = g.FormFields.Select(f => new FormFieldDTO
                     {
                         IdFormField = f.IdFormField,
                         Name = f.Name,
                         Index = f.Index,
                         IsOptional = f.IsOptional,
                         FieldType = new FieldTypeDTO { IdFieldType = f.FieldType.IdFieldType, Name = f.FieldType.Name },
                         FormGroupId = g.IdFormGroup
                     }).ToList()
                }).ToList()
            }).ToList();

            return Ok(formsDTO);
        }
    }


    }


