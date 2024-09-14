using System.ComponentModel.DataAnnotations;

namespace FormDynamicAPI.Entity
{
    public class Form : CrudEntities
    {
        [Key]
        public long IdForm { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public ICollection<FormGroup>? FormGroups { get; set; }
        public ICollection<FilledForm>? FilledForms { get; set; }
    }
}
