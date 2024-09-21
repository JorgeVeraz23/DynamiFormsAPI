using FormDynamicAPI.Entity;
using Microsoft.EntityFrameworkCore;

namespace FormDynamicAPI
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext()
        {
            
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Form> Forms { get; set; }
        public DbSet<FormGroup> FormGroups { get; set; }
        public DbSet<FormField> FormFields { get; set; }
        public DbSet<FieldType> FieldTypes { get; set; }
        public DbSet<Option> Options { get; set; }
        public DbSet<FilledForm> FilledForms { get; set; }
        public DbSet<FilledFormField> FilledFormFields { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

           
            base.OnModelCreating(modelBuilder);

            


        }
    }
}
