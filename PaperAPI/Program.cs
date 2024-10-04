using Microsoft.EntityFrameworkCore;
using PaperAPI.Models;
using PaperAPI.Repositories;

public class Program // Explicitly declare this class as public
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add CORS services
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAll",
                builder =>
                {
                    builder.AllowAnyOrigin() // Allow any origin
                        .AllowAnyMethod() // Allow any HTTP method
                        .AllowAnyHeader(); // Allow any header
                });
        });

        builder.Services.AddDbContext<PaperDbContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

        builder.Services.AddScoped<IRepository<Customer>, CustomerRepository>();
        builder.Services.AddScoped<IRepository<Paper>, PaperRepository>();
        builder.Services.AddScoped<PaperPropertyRepository>();

        builder.Services.AddControllers(); 
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        // Enable CORS
        app.UseCors("AllowAll");

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => 
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "PaperAPI v1");
                c.RoutePrefix = string.Empty;
            });
        }
        else
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseAuthorization();
        app.MapControllers();
        app.Run();
    }
}