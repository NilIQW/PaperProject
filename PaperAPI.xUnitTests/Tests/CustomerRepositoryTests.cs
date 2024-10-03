using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Xunit;
using PaperAPI.Models;
using PaperAPI.Repositories;
using Microsoft.Extensions.Configuration;
using PgCtx;

public class CustomerRepositoryTests
{
    public PgCtxSetup<PaperDbContext> setup = new();
    private readonly DbContextOptions<PaperDbContext> _options;
    private readonly IConfiguration _configuration;

    public CustomerRepositoryTests()
    {
        _configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string>
            {
                { "DbConnectionString", Environment.GetEnvironmentVariable("DbConnectionString") } 
            })
            .Build();

        _options = new DbContextOptionsBuilder<PaperDbContext>()
            .UseNpgsql(_configuration["DbConnectionString"]) 
            .Options;
    }

    [Fact]
    public async Task AddAsync_ShouldAddCustomer()
    {
        // Arrange
        await using var context = setup.DbContextInstance;
        var repository = new CustomerRepository(context);
        var customer = new Customer { Name = "John Doe", Address = "123 Elm St", Phone = "123456789", Email = "john@example.com" };

        // Act
        await repository.AddAsync(customer);
        var result = await repository.GetAllAsync();

        // Assert
        Assert.Single(result);
        Assert.Equal("John Doe", result.First().Name);
    }

    [Fact]
    public async Task GetAllAsync_ShouldReturnAllCustomers()
    {
        // Arrange
        await using var context = setup.DbContextInstance;
        var repository = new CustomerRepository(context);
        await repository.AddAsync(new Customer { Name = "John Doe" });
        await repository.AddAsync(new Customer { Name = "Jane Doe" });

        // Act
        var result = await repository.GetAllAsync();

        // Assert
        Assert.Equal(2, result.Count());
    }
}
