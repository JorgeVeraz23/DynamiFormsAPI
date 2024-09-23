namespace TicketsAPI.DTO
{
    public class FilledFormFieldDTO
    {

        public long IdFilledFormField { get; set; }


        public bool? IsChecked { get; set; }

        public string? TextValue { get; set; }


        public decimal? NumericValue { get; set; }


        public DateTime? DateTimeValue { get; set; }


        public long? SelectedOptionId { get; set; }

    
        public string? SelectedOptionName { get; set; }

        public long FormFieldId { get; set; }

     
        public string FormFieldName { get; set; } = string.Empty;

        public string FieldType { get; set; } = string.Empty;
    }

    public class EditFilledFormFieldDTO
    {
        // ID del campo llenado que se va a editar
        public long IdFilledFormField { get; set; }

        // Valor booleano (si el campo es un checkbox)
        public bool? IsChecked { get; set; }

        // Valor de texto (si el campo es un campo de texto)
        public string? TextValue { get; set; }

        // Valor numérico (si el campo es un número)
        public decimal? NumericValue { get; set; }

        // Valor de fecha (si el campo es de tipo fecha)
        public DateTime? DateTimeValue { get; set; }

        // ID de la opción seleccionada (si el campo es de tipo opción)
        public long? SelectedOptionId { get; set; }

        // ID del campo en el formulario original
        public long FormFieldId { get; set; }
    }


    public class CreateFilledFormFieldDTO
    {
        // Valor booleano (si el campo es un checkbox)
        public bool? IsChecked { get; set; }

        // Valor de texto (si el campo es un campo de texto)
        public string? TextValue { get; set; }

        // Valor numérico (si el campo es un número)
        public decimal? NumericValue { get; set; }

        // Valor de fecha (si el campo es de tipo fecha)
        public DateTime? DateTimeValue { get; set; }

        // ID de la opción seleccionada (si el campo es de tipo opción)
        public long? SelectedOptionId { get; set; }

        // ID del campo en el formulario original
        public long FilledFormId { get; set; }
    }


}
