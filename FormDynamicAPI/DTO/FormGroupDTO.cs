using FormDynamicAPI.Entity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace FormDynamicAPI.DTO
{
    public class FormGroupDTO
    {
        public long IdFormGroup { get; set; }
        public string Name { get; set; }
        public int Index { get; set; }
        public long FormId { get; set; }
        public ICollection<FormFieldDTO> FormFields { get; set; }

    }
}
