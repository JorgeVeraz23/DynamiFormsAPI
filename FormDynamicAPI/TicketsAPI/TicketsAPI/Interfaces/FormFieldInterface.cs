﻿using TicketsAPI.DTO;
using TicketsAPI.Entities;

namespace TicketsAPI.Interfaces
{
    public interface FormFieldInterface
    {
        public Task<MessageInfoSolicitudDTO> CrearFormField(FormFieldDTO formFieldDTO);
        public Task<MessageInfoSolicitudDTO> ActualizarFormField(FormFieldDTO formFieldDTO);
        Task<FormField> CreateFormFieldAsync(NewFormFieldDto formFieldDto);
        public Task<MessageInfoSolicitudDTO> EliminarFormField(long id);
        public Task<FormFieldDTO> ObtenerFormField(long id);
        public Task<List<FormFieldDTO>> ObtenerTodosLosFormField();
        public Task<List<KeyValueDTO>> SelectorFormField();
    }
}
