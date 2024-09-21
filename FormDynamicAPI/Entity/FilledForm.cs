using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FormDynamicAPI.Entity
{
    public class FilledForm : CrudEntities
    {
        [Key]
        public long IdFilledForm { get; set; }

        public DateTime FillDate { get; set; }

        // Relación con Form
        [ForeignKey("Form")]
        public long FormId { get; set; }
        public Form Form { get; set; }

        // Relación con FilledFormField
        public ICollection<FilledFormField> FilledFormFields { get; set; } = new List<FilledFormField>();
    }
}
