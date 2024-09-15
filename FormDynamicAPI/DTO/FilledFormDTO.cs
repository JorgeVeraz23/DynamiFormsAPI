namespace FormDynamicAPI.DTO
{
    public class FilledFormDTO
    {
        public long IdForm { get; set; }
        public List<FilledFormGroupDTO> FilledFormGroups { get; set; }
    }

    public class FilledFormGroupDTO
    {
        public long IdFormGroup { get; set; }
        public List<FilledFormFieldDTO> FilledFormFields { get; set; }
    }

    public class FilledFormFieldDTO
    {
        public long IdFormField { get; set; }
        public string Value { get; set; } // El valor ingresado por el usuario
    }

}
