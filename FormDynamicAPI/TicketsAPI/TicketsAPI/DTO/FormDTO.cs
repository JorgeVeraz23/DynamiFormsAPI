using System.ComponentModel.DataAnnotations;
using TicketsAPI.Entities;

namespace TicketsAPI.DTO
{
    public class FormDTO
    {

        public long IdForm { get; set; }


        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

    }


    public class FormDynamicDTO
    {
        public long IdForm { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public List<FormGroupDynamicDTO> FormGroups { get; set; } = new List<FormGroupDynamicDTO>();



    }

    public class FormWithResponsesDto
    {
        public long IdForm { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public List<FilledFormFieldRDto> Responses { get; set; } = new List<FilledFormFieldRDto>();
    }

    public class FilledFormFieldRDto
    {
        public long IdFilledFormField { get; set; }
        public string? TextValue { get; set; }
        public decimal? NumericValue { get; set; }
        public DateTime? DateTimeValue { get; set; }
        public bool? IsChecked { get; set; }
        public long? SelectedOptionId { get; set; }
        public string? OptionName { get; set; }
    }


    public class FormGroupDynamicDTO
    {
        public long IdFormGroup { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<FormFielDynamicDTO> FormFields { get; set; } = new List<FormFielDynamicDTO>();
    }

    public class FormFielDynamicDTO
    {
        public long IdFormField { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Index { get; set; }
        public bool IsOptional { get; set; }
        public string FieldType { get; set; } = string.Empty;
        public List<OptionDynamicDTO>? Options { get; set; } // Opciones para campos select

        // Valor llenado (respuesta) para el campo
        public string? FilledValue { get; set; }
    }

    public class OptionDynamicDTO
    {
        public long IdOption { get; set; }
        public string Name { get; set; } = string.Empty;
    }

    public class  FilledFormDynamicDTO
    {
        public long IdFilledForm { get; set; }
        public string Name { get; set; }
        public long FormId { get; set; }
        public DateTime FillDate { get; set; }
        public List<FilledFormFieldDynamicDTO> FilledFormFields { get; set; } = new List<FilledFormFieldDynamicDTO>();
    }




    public class FilledFormFieldDynamicDTO
    {
        public long IdFilledFormField { get; set; }
        public string? Name { get; set; }
        public long FormFieldId {  get; set; }  
        public bool? IsChecked { get; set; }    
        public string? TextValue {  get; set; }
        public decimal? NumericValue {  get; set; } 
        public DateTime? DateTimeValue { get; set; }
        public long? SelectedOptionId { get; set; }
        public string? SelectedOptionName { get; set; } 

    }

}
