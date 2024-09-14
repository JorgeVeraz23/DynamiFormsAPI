namespace FormDynamicAPI.DTO
{
    public class FilledFormFieldDTO
    {
        public long IdFilledFormField { get; set; }
        public bool? IsChecked { get; set; }
        public string TextValue { get; set; }
        public decimal? NumericValue { get; set; }
        public DateTime? DateTimeValue { get; set; }
        public long? FilledFormId { get; set; }
        public FilledFormDTO FilledForm { get; set; }
        public long? FormFieldId { get; set; }
        public FormFieldDTO FormField { get; set; }
        public long? SelectedOptionId { get; set; }
        public OptionDTO SelectedOption { get; set; }
    }
}
