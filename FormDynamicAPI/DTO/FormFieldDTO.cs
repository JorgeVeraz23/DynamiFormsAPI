using FormDynamicAPI.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FormDynamicAPI.DTO
{
    public class FormFieldDTO
    {
        public long IdFormField { get; set; }
        public string Name { get; set; }
        public int Index { get; set; }
        public bool IsOptional { get; set; }
        public long TypeId { get; set; }
        public FieldTypeDTO FieldType { get; set; }
        public long FormGroupId { get; set; }


    }
}
