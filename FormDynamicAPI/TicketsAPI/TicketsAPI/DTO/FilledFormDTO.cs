using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using TicketsAPI.Entities;

namespace TicketsAPI.DTO
{
    public class FilledFormDTO
    {
        public long IdFilledForm { get; set; }


        public long FormId { get; set; }

    }
}
