using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FormDynamicAPI.Entity
{
    public class FormGroup : CrudEntities
    {
        [Key]
        public long IdFormGroup { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [ForeignKey("Form")]
        public long FormId { get; set; }
        public Form Form { get; set; }

        // Relación con FormField
        public ICollection<FormField> FormFields { get; set; } = new List<FormField>();
    }
}
