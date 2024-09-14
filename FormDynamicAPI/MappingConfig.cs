using AutoMapper;
using FormDynamicAPI.DTO;
using FormDynamicAPI.Entity;

namespace FormDynamicAPI
{
    public class MappingConfig : Profile
    {
        public MappingConfig()
        {
            try
            {
                // Mapeo entre Form y FormDTO
                CreateMap<Form, FormDTO>()
                    .ReverseMap(); // Habilita el mapeo bidireccional

                // Mapeo entre FormField y FormFieldDTO
                CreateMap<FormField, FormFieldDTO>()
                    .ReverseMap();

                // Mapeo entre FieldType y FieldTypeDTO
                CreateMap<FieldType, FieldTypeDTO>()
                    .ReverseMap();

                // Mapeo entre Option y OptionDTO
                CreateMap<Option, OptionDTO>()
                    .ReverseMap();

                // Mapeo entre FormGroup y FormGroupDTO
                CreateMap<FormGroup, FormGroupDTO>()
                    .ReverseMap();

                // Mapeo entre FilledForm y FilledFormDTO
                CreateMap<FilledForm, FilledFormDTO>()
                    .ReverseMap();

                // Mapeo entre FilledFormField y FilledFormFieldDTO
                CreateMap<FilledFormField, FilledFormFieldDTO>()
                    .ReverseMap();

                // Mapeo entre OptionFormField y OptionFormFieldDTO
                CreateMap<OptionFormField, OptionFormFieldDTO>()
                    .ReverseMap();

            }
            catch (Exception ex)
            {
                throw new Exception($"Error al configurar AutoMapper: {ex.Message}");

            }
        }
    }
}
