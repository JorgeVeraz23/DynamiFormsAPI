namespace FormDynamicAPI.DTO
{
    public class FormCreateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Active { get; set; }
        public string UserRegister { get; set; }
        public string IpRegister { get; set; }
        public IEnumerable<FormGroupDto> FormGroups { get; set; }
    }

    public class FormGroupDto
    {
        public string Name { get; set; }
        public int Index { get; set; }
        public bool Active { get; set; }
        public string UserRegister { get; set; }
        public string IpRegister { get; set; }
        public IEnumerable<FormFieldDto> FormFields { get; set; }
    }

    public class FormFieldDto
    {
        public string Name { get; set; }
        public int Index { get; set; }
        public bool IsOptional { get; set; }
        public int TypeId { get; set; }
        public bool Active { get; set; }
        public string UserRegister { get; set; }
        public string IpRegister { get; set; }
        public IEnumerable<OptionDto> Options { get; set; }
    }

    public class OptionDto
    {
        public string Name { get; set; }
        public bool Active { get; set; }
        public string UserRegister { get; set; }
        public string IpRegister { get; set; }
    }
}
