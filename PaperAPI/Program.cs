using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PaperAPI.Models;
using PaperAPI.Repositories;

public class Program 
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add CORS services
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAll",
                policyBuilder =>
                {
                    policyBuilder.AllowAnyOrigin() 
                                 .AllowAnyMethod()
                                 .AllowAnyHeader();
                });
        });

        builder.Services.AddDbContext<PaperDbContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

        builder.Services.AddScoped<IRepository<Customer>, CustomerRepository>();
        builder.Services.AddScoped<IPaperRepository, PaperRepository>();
        builder.Services.AddScoped<IOrderRepository, OrderRepository>();
        builder.Services.AddScoped<PaperPropertyRepository>();
        builder.Services.AddScoped<IPropertyRepository, PropertyRepository>(); 
        builder.Services.AddScoped<IRepository<OrderEntry>, OrderEntryRepository>();

        // Configure JSON options to handle circular references
        builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            });

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
