using Microsoft.Extensions.Logging;
using NLog;
using System.Text.Json.Serialization;

namespace FormDynamicAPI.DTO.UtilitiesDTO
{
    public class MessageInfoDTO
    {
        [JsonIgnore]
        private static Logger? _log;
        public string? Message { get; set; }
        public Object? Detail { get; set; }
        public bool Success { get; set; } = true;
        public int Status { get; set; }

        public MessageInfoDTO ErrorInterno(Exception ex, string nombre, string mensaje)
        {
            _log = LogManager.GetLogger(nombre);

            Message = mensaje;
            Detail = "Message: " + ex.Message + " InnerException: " + ex.InnerException;
            _log.Error($"{mensaje} : {ex.Message}\nInnerException: {ex.InnerException}\nStacktrace: {ex.StackTrace}");
            Success = false;
            Status = StatusCodes.Status500InternalServerError;
            return this;

        }
        public MessageInfoDTO AccionCompletada(string mensaje)
        {
            Status = StatusCodes.Status200OK;
            Message = mensaje;
            Success = true;
            return this;
        }

        public MessageInfoDTO AccionFallida(string mensaje, int status)
        {
            _log = LogManager.GetLogger(mensaje);

            Message = mensaje;
            Success = false;
            Status = status;
            return this;
        }
    }
}
