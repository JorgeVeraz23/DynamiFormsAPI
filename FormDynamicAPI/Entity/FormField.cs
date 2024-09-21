using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FormDynamicAPI.Entity
{
    public class FormField : CrudEntities
    {
        [Key]
        public long IdFormField { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public int Index { get; set; }
        public bool IsOptional { get; set; }

        // Relación con FieldType
        [ForeignKey("FieldType")]
        public long FieldTypeId { get; set; }
        public FieldType FieldType { get; set; }

        // Relación con FormGroup
        [ForeignKey("FormGroup")]
        public long FormGroupId { get; set; }
        public FormGroup FormGroup { get; set; }

        // Relación con OptionFormField
        public ICollection<Option> Options { get; set; } = new List<Option>();

        // Relación con FilledFormField
        public ICollection<FilledFormField> FilledFormFields { get; set; } = new List<FilledFormField>();
    }
}
