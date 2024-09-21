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


                infoDTO.Mensaje = "Option creada exitosamente!";
                infoDTO.Cod = "201";
                

                return infoDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
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

                    infoDTO.Mensaje = "Option eliminado correctamente";
                }
                else
                {
                    infoDTO.Mensaje = "el Option ingresado fue nulo";
                }

                return infoDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
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
                    infoDTO.Mensaje = "el FormGroup ingresado fue nulo";
                    return infoDTO;
                }

                model.Name = option.Name;
                await _context.SaveChangesAsync();

                infoDTO.Mensaje = "el FormGroup ingresado fue nulo";
                return infoDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex);
            }
        }
    }
}
