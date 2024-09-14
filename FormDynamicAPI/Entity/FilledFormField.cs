using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FormDynamicAPI.Entity
{
    public class FilledFormField : CrudEntities
    {
        [Key]
        public long IdFilledFormField { get; set; }
        public bool? IsChecked { get; set; }
        public string TextValue { get; set; }
        public decimal? NumericValue { get; set; }
        public DateTime? DateTimeValue { get; set; }
        [ForeignKey("FilledForm")]
        public long? FilledFormId { get; set; }
        public FilledForm? FilledForm { get; set; }
        [ForeignKey("FormField")]
        public long? FormFieldId { get; set; }
        public FormField? FormField { get; set; }
        [ForeignKey("SelectedOption")]
        public long? SelectedOptionId { get; set; }
        public Option? SelectedOption { get; set; }
    }
}
