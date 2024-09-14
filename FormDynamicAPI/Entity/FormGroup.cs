using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FormDynamicAPI.Entity
{
    public class FormGroup : CrudEntities
    {
        [Key]
        public long IdFormGroup { get; set; }
        public string Name { get; set; }
        public int Index { get; set; }
        [ForeignKey("Form")]
        public long FormId { get; set; }
        public Form? Form { get; set; }

        public ICollection<FormField>? FormFields { get; set; }
    }
}
