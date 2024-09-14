using System.ComponentModel.DataAnnotations;

namespace FormDynamicAPI.Entity
{
    public class Option : CrudEntities
    {
        [Key]
        public long IdOption { get; set; }
        public string Name { get; set; }

        public ICollection<OptionFormField>? OptionFormFields { get; set; }
    }
}

