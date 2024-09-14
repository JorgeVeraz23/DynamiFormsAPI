using FormDynamicAPI.DTO.UtilitiesDTO;
using FormDynamicAPI.DTO;
using FormDynamicAPI.Entity;
using FormDynamicAPI.Interface;
using Microsoft.EntityFrameworkCore;

namespace FormDynamicAPI.Repository
{
    public class OptionRepository : IOptionRepository
    {
        private readonly ApplicationDbContext _context;

        public OptionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<MessageInfoDTO> CreateOption(Option option)
        {
            var infoDTO = new MessageInfoDTO();
            try
            {
                if (option == null)
                {
                    throw new ArgumentNullException(nameof(option), "Option cannot be null");
                }

                _context.Options.Add(option);
                await _context.SaveChangesAsync();

                infoDTO.Success = true;
                infoDTO.Message = "Option creada exitosamente!";
                infoDTO.Status = 201;
                infoDTO.Detail = new OptionDTO
                {
                    IdOption = option.IdOption,
                    Name = option.Name
                };

                return infoDTO;
            }
            catch (Exception ex)
            {
                return infoDTO.ErrorInterno(ex, "OptionRepository", "Error al intentar agregar la Option");
            }
        }

        public async Task<MessageInfoDTO> DeleteOption(long id)
        {
            var infoDTO = new MessageInfoDTO();
            try
            {
                if (id <= 0)
                {
                    throw new ArgumentNullException(nameof(id), "Por favor ingrese el id requerido");
                }

                var optionToDelete = await _context.Options
                    .Where(x => x.IdOption == id)
                    .FirstOrDefaultAsync();

                if (optionToDelete != null)
                {
                    _context.Options.Remove(optionToDelete);
                    await _context.SaveChangesAsync();

                    infoDTO.AccionCompletada("Se ha eliminado la Option!");
                }
                else
                {
                    infoDTO.AccionFallida("No se encontró la Option ingresada", 404);
                }

                return infoDTO;
            }
            catch (Exception ex)
            {
                return infoDTO.ErrorInterno(ex, "OptionRepository", "Error al intentar eliminar la Option");
            }
        }

        public async Task<List<Option>> GetAllOptions()
        {

        return await _context.Options.ToListAsync();
        }

        public async Task<Option> GetOption(long id)
        {
            var option = await _context.Options
                .FirstOrDefaultAsync(x => x.IdOption == id);

            if (option == null)
            {
                throw new ArgumentNullException(nameof(id), "No existe la Option seleccionada");
            }

            return option;
        }

        public async Task<MessageInfoDTO> UpdateOption(Option option)
        {
            var infoDTO = new MessageInfoDTO();
            try
            {
                var model = await _context.Options
                    .FirstOrDefaultAsync(x => x.IdOption == option.IdOption);

                if (model == null)
                {
                    infoDTO.AccionFallida("No se encuentra la Option que se intenta actualizar", 404);
                    return infoDTO;
                }

                model.Name = option.Name;
                await _context.SaveChangesAsync();

                infoDTO.AccionCompletada("Se ha actualizado la Option");
                return infoDTO;
            }
            catch (Exception ex)
            {
                return infoDTO.ErrorInterno(ex, "OptionRepository", "Error al intentar editar la Option");
            }
        }
    }
}
