namespace FormDynamicAPI.DTO
{
    public class FilledFormDTO
    {
        public long IdFilledForm { get; set; }
        public DateTime FillDate { get; set; }
        public long? FormId { get; set; }
        public FormDTO Form { get; set; }
        public ICollection<FilledFormFieldDTO> FilledFormFields { get; set; }
    }
}
