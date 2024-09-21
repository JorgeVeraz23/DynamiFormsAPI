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
       
               

                CreateMap<FormField, FormFieldDTO>()
                    .ReverseMap();

      
                CreateMap<FieldType, FieldTypeDTO>()
                    .ReverseMap();

       
                CreateMap<Option, OptionDTO>()
                    .ReverseMap();

        
                CreateMap<FormGroup, FormGroupDTO>()
                    .ReverseMap();

      
                CreateMap<FilledForm, FilledFormDTO>()
                    .ReverseMap();

                CreateMap<FilledFormField, FilledFormFieldDTO>()
                    .ReverseMap();

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
