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

        public async Task<MessageInfoDTO> CreateForm(Form form)
        {
            var message = new MessageInfoDTO();
            try
            {
                _context.Forms.Add(form);
                await _context.SaveChangesAsync();
                message.Success = true;
                message.Message = "Form created successfully.";
            }
            catch (Exception ex)
            {
                message.Success = false;
                message.Message = ex.Message;
            }
            return message;
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
                    message.Success = true;
                    message.Message = "Form marked as inactive successfully.";
                }
                else
                {
                    message.Success = false;
                    message.Message = "Form not found.";
                }
            }
            catch (Exception ex)
            {
                message.Success = false;
                message.Message = ex.Message;
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
                message.Success = true;
                message.Message = "Form updated successfully.";
            }
            catch (Exception ex)
            {
                message.Success = false;
                message.Message = ex.Message;
            }
            return message;
        }
    }

}
