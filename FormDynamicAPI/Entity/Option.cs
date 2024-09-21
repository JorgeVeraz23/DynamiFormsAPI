using System.ComponentModel.DataAnnotations;

namespace FormDynamicAPI.Entity
{
    public class Option : CrudEntities
    {
        [Key]
        public long IdOption { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

 
    }
}

