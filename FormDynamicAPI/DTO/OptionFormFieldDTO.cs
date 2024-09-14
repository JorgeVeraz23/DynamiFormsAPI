namespace FormDynamicAPI.DTO
{
    public class OptionFormFieldDTO
    {
        public long OptionId { get; set; }
        public OptionDTO Option { get; set; }
        public long? FormFieldId { get; set; }
        public FormFieldDTO FormField { get; set; }
    }
}
