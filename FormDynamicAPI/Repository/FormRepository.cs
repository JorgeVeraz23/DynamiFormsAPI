using FormDynamicAPI.DTO;
using FormDynamicAPI.DTO.UtilitiesDTO;
using FormDynamicAPI.Entity;
using FormDynamicAPI.Interface;
using Microsoft.EntityFrameworkCore;

namespace FormDynamicAPI.Repository
{
    public class FormRepository : IFormRepository
    {
        private readonly ApplicationDbContext _context;

        public FormRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        //public async Task<MessageInfoDTO> CreateForm(Form form)
        //{
        //    var message = new MessageInfoDTO();
        //    try
        //    {
        //        _context.Forms.Add(form);
        //        await _context.SaveChangesAsync();
        //        message.Success = true;
        //        message.Message = "Form created successfully.";
        //    }
        //    catch (Exception ex)
        //    {
        //        message.Success = false;
        //        message.Message = ex.Message;
        //    }
        //    return message;
        //}

        public async Task<bool> CreateForm(CreateFormDTO formDTO)
        {
            // Asegúrate de que el contexto no se utilice fuera de este método
            var form = new Form
            {
                Active = true,
                Name = formDTO.Name,
                Description = formDTO.Description,
                DateRegister = DateTime.Now,
                UserRegister = "SYSTEM",
                IpRegister = "127.0.0.1"
            };

            await _context.Forms.AddAsync(form);
            await _context.SaveChangesAsync();

            
            return true;
        }

        public async Task<MessageInfoDTO> DeleteForm(long id)
        {
            var message = new MessageInfoDTO();
            try
            {
                var form = await _context.Forms.FindAsync(id);
                if (form != null)
                {
                    form.Active = false;
                    _context.Forms.Update(form);
                    await _context.SaveChangesAsync();

                    message.Mensaje = "Form marked as inactive successfully.";
                }
                else
                {
                    message.Mensaje = "Form not found.";
                }
            }
            catch (Exception ex)
            {
                message.Mensaje = ex.Message;
            }
            return message;
        }


        public async Task<List<Form>> GetAllForm()
        {
            return await _context.Forms
            .Include(f => f.FormGroups)
                .ThenInclude(g => g.FormFields)
                    .ThenInclude(ff => ff.FieldType)
            .ToListAsync();
        }

        public async Task<Form> GetForm(long id)
        {
            return await _context.Forms
            .Include(f => f.FormGroups)
                .ThenInclude(g => g.FormFields)
                    .ThenInclude(ff => ff.FieldType)
            .FirstOrDefaultAsync(f => f.IdForm == id);
        }

        public async Task<MessageInfoDTO> UpdateForm(Form form)
        {
            var message = new MessageInfoDTO();
            try
            {
                _context.Forms.Update(form);
                await _context.SaveChangesAsync();

                message.Mensaje = "Form updated successfully.";
            }
            catch (Exception ex)
            {
    
                message.Mensaje = ex.Message;
            }
            return message;
        }
    }

}
