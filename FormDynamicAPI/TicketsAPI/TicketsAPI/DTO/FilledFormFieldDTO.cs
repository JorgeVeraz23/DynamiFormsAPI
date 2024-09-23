namespace TicketsAPI.DTO
{
    public class FilledFormFieldDTO
    {

        // ID del campo del formulario llenado
        public long IdFilledFormField { get; set; }

        // Valor booleano (si el campo es un checkbox)
        public bool? IsChecked { get; set; }

        // Valor de texto (si el campo es un campo de texto)
        public string? TextValue { get; set; }

        // Valor numérico (si el campo es un número)
        public decimal? NumericValue { get; set; }

        // Valor de fecha (si el campo es de tipo fecha)
        public DateTime? DateTimeValue { get; set; }

        // ID de la opción seleccionada
        public long? SelectedOptionId { get; set; }

        // Nombre de la opción seleccionada
        public string? SelectedOptionName { get; set; }

        // ID del campo en el formulario original
        public long FormFieldId { get; set; }

        // Nombre del campo de formulario
        public string FormFieldName { get; set; } = string.Empty;

        // Tipo de campo
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
