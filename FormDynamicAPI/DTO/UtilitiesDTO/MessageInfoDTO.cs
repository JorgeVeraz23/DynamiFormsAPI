using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using NLog;

namespace FormDynamicAPI.DTO.UtilitiesDTO
{
    public class MessageInfoDTO
    {
        public string Cod { get; set; }
        public string Mensaje { get; set; }
    }
}
