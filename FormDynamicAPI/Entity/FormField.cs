using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FormDynamicAPI.Entity
{
    public class FormField : CrudEntities
    {
        [Key]
        public long IdFormField { get; set; }
        public string Name { get; set; }
        public int Index { get; set; }
        public bool IsOptional { get; set; }
        [ForeignKey("FieldType")]
        public long? TypeId { get; set; }
        public FieldType? FieldType { get; set; }
        [ForeignKey("FormGroup")]
        public long? FormGroupId { get; set; }
        public FormGroup? FormGroup { get; set; }

        public ICollection<OptionFormField>? OptionFormFields { get; set; }
    }
}
