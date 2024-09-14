namespace FormDynamicAPI.DTO
{
    public class OptionDTO
    {
        public long IdOption { get; set; }
        public string Name { get; set; }
        public ICollection<OptionFormFieldDTO> OptionFormFields { get; set; }
    }
}
