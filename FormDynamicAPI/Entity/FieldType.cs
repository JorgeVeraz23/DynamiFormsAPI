using System.ComponentModel.DataAnnotations;

namespace FormDynamicAPI.Entity
{
    public class FieldType : CrudEntities
    {
        [Key]
        public long IdFieldType { get; set; }
        public string Name { get; set; }

    }
}
