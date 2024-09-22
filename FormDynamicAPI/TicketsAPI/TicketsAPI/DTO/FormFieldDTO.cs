using System.ComponentModel.DataAnnotations;

namespace TicketsAPI.DTO
{
    public class FormFieldDTO
    {
        public long IdFormField { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public int Index { get; set; }
        public bool IsOptional { get; set; }

        public long FieldTypeId { get; set; }
        public long FormGroupId { get; set; }

    }

    
    public class NewFormFieldDto
    {
        public long IdFormField { get; set; }
        public string Name { get; set; }
        public int Index { get; set; }
        public bool IsOptional { get; set; }
        public int FieldTypeId { get; set; }
        public int FormGroupId { get; set; }
        public List<DropdownOptionDto> DropdownOptions { get; set; }
    }

    public class DropdownOptionDto
    {
        public long IdOption { get; set; }
        public string Name { get; set; }
    }

}
