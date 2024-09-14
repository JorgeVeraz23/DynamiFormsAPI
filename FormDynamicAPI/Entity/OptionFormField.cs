using System.ComponentModel.DataAnnotations.Schema;

namespace FormDynamicAPI.Entity
{
    public class OptionFormField : CrudEntities
    {
        [ForeignKey("Option")]
        public long OptionId { get; set; }
        public Option? Option { get; set; }

        [ForeignKey("FormField")]
        public long? FormFieldId { get; set; }
        public FormField? FormField { get; set; }
    }
}
