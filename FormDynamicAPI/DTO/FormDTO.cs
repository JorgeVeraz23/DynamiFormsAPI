using FormDynamicAPI.Entity;

namespace FormDynamicAPI.DTO
{
    public class FormDTO
    {
        public long IdForm { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<FormGroupDTO> FormGroups { get; set; }
        public ICollection<FilledFormDTO> FilledForms { get; set; }
    }
}
