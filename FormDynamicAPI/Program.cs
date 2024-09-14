using Microsoft.EntityFrameworkCore;

using System.Text.Json.Serialization;
using Microsoft.Extensions.FileProviders;
using FormDynamicAPI;
using FormDynamicAPI.Interface;
using FormDynamicAPI.Repository;
using Microsoft.AspNetCore.Hosting;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});




// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program));
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))

    );

// Agregar política de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins(["http://localhost:5173", "http://localhost:3000", "http://localhost:7275"]) // URL de tu aplicación React
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddScoped<IFormRepository, FormRepository>();
builder.Services.AddScoped<IFieldTypeRepository, FieldTypeRepository>();    
builder.Services.AddScoped<IOptionRepository, OptionRepository>();
builder.Services.AddScoped<IFilledFormFieldRepository, FilledFormFieldRepository>();
builder.Services.AddScoped<IFormFieldRepository, FormFieldRepository>();
builder.Services.AddScoped<IFormGroupRepository, FormGroupRepository>();
builder.Services.AddScoped<IFilledFormRepository, FilledFormRepository>();


var app = builder.Build();

// Usar la política de CORS configurada
app.UseCors("AllowReactApp");

app.UseStaticFiles(); // Permite servir archivos estáticos

// Agrega esta línea para especificar la carpeta "uploads"
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "uploads")),
    RequestPath = "/uploads"
});


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();