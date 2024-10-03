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

namespace PaperApi.Tests.Repositories
{
    public class PaperRepositoryTests
    {
        
        public PgCtxSetup<PaperDbContext> setup = new();

        private readonly DbContextOptions<PaperDbContext> _options;
        private readonly IConfiguration _configuration;

        public PaperRepositoryTests()
        {
            // Set up the configuration to read the connection string from environment variable
            _configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(new Dictionary<string, string>
                {
                    { "DbConnectionString", Environment.GetEnvironmentVariable("DbConnectionString") }
                })
                .Build();

            // Use the connection string from the configuration
            _options = new DbContextOptionsBuilder<PaperDbContext>()
                .UseNpgsql(_configuration["DbConnectionString"]) // Use your preferred database provider
                .Options;
        }

        [Fact]
        public async Task AddAsync_ShouldAddPaper()
        {
            // Arrange
            await using var context = setup.DbContextInstance;
            var repository = new PaperRepository(context);
            var paper = new Paper { Name = "A4 Paper", Price = 10.00, Stock = 100 };

            // Act
            await repository.AddAsync(paper);
            var result = await repository.GetAllAsync();

            // Assert
            Assert.Single(result);
            Assert.Equal("A4 Paper", result.First().Name);
        }

        [Fact]
        public async Task GetAllAsync_ShouldReturnAllPapers()
        {
            // Arrange
            await using var context = setup.DbContextInstance;
            var repository = new PaperRepository(context);
            await repository.AddAsync(new Paper { Name = "A4 Paper" });
            await repository.AddAsync(new Paper { Name = "A3 Paper" });

            // Act
            var result = await repository.GetAllAsync();

            // Assert
            Assert.Equal(2, result.Count());
        }
    }
}
