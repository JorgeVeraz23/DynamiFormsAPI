namespace TicketsAPI.DTO
{
    public class FormNewDto
    {
        public long IdForm { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public List<FormGroupNewDto> FormGroups { get; set; } = new List<FormGroupNewDto>();
        public List<FilledFormNewDto> FilledForms { get; set; } = new List<FilledFormNewDto>();
    }

    public class FormGroupNewDto
    {
        public long IdFormGroup { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<FormFieldNewDto> FormFields { get; set; } = new List<FormFieldNewDto>();
    }

    public class FormFieldNewDto
    {
        public long IdFormField { get; set; }
        public string Name { get; set; } = string.Empty;
        public string FieldType { get; set; } = string.Empty; 
    }

    public class FilledFormNewDto
    {
        public long IdFilledForm { get; set; }
        public DateTime FillDate { get; set; }
        public List<FilledFormFieldNewDto> FilledFormFields { get; set; } = new List<FilledFormFieldNewDto>();
    }

    public class FilledFormFieldNewDto
    {
        public long IdFilledFormField { get; set; }
        public bool? IsChecked { get; set; }
        public string? TextValue { get; set; }
        public decimal? NumericValue { get; set; }
        public DateTime? DateTimeValue { get; set; }
        public long? SelectedOptionId { get; set; }
    }


}
