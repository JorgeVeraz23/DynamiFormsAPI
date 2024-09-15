namespace FormDynamicAPI.DTO
{
    public class FilledFormFieldDTO2
    {
        public long IdFilledFormField { get; set; }
        public bool? IsChecked { get; set; }
        public string TextValue { get; set; }
        public decimal? NumericValue { get; set; }
        public DateTime? DateTimeValue { get; set; }
        public long FormFieldId { get; set; }
        public OptionDTO SelectedOption { get; set; }
    }
}
