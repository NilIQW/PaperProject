using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Xunit;
using PaperAPI.Models;
using PaperAPI.Repositories;
using Microsoft.Extensions.Configuration;

public class CustomerRepositoryTests
{
    private readonly DbContextOptions<PaperDbContext> _options;
    private readonly IConfiguration _configuration;

    public CustomerRepositoryTests()
    {
        // Set up the configuration to read the connection string from the environment variable
        _configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string>
            {
                { "DbConnectionString", Environment.GetEnvironmentVariable("DbConnectionString") } // Use environment variable
            })
            .Build();

        // Use the connection string from the configuration
        _options = new DbContextOptionsBuilder<PaperDbContext>()
            .UseNpgsql(_configuration["DbConnectionString"]) // Use your preferred database provider
            .Options;
    }

    [Fact]
    public async Task AddAsync_ShouldAddCustomer()
    {
        // Arrange
        await using var context = new PaperDbContext(_options, _configuration);
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
        await using var context = new PaperDbContext(_options, _configuration);
        var repository = new CustomerRepository(context);
        await repository.AddAsync(new Customer { Name = "John Doe" });
        await repository.AddAsync(new Customer { Name = "Jane Doe" });

        // Act
        var result = await repository.GetAllAsync();

        // Assert
        Assert.Equal(2, result.Count());
    }
}
