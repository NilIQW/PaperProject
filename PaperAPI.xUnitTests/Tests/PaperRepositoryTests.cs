using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using PaperAPI.Models;
using PaperAPI.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using PgCtx;
using Xunit;
using Xunit.Abstractions;

namespace PaperRepositoryTests
{
    public class PaperRepositoryTests : WebApplicationFactory<Program>
    {
        private readonly PgCtxSetup<PaperDbContext> _pgCtxSetup;
        private readonly ITestOutputHelper _outputHelper;

        public PaperRepositoryTests(ITestOutputHelper outputHelper)
        {
            _outputHelper = outputHelper;
            _pgCtxSetup = new PgCtxSetup<PaperDbContext>(); // Initialize your PgCtxSetup here
            Environment.SetEnvironmentVariable("DbConnectionString", _pgCtxSetup._postgres.GetConnectionString());
        }

        [Fact]
        public async Task GetAllAsync_ReturnsAllPapers()
        {
            // Arrange
            var paperRepo = new PaperRepository(_pgCtxSetup.DbContextInstance);
            await SeedPapersAsync(5); // Seed some test data

            // Act
            var papers = await paperRepo.GetAllAsync();

            // Assert
            Assert.Equal(5, papers.Count());
        }

        [Fact]
        public async Task GetByIdAsync_ReturnsPaper_WhenExists()
        {
            // Arrange
            var paperRepo = new PaperRepository(_pgCtxSetup.DbContextInstance);
            var paper = new Paper { Name = "Test Paper", Price = 10.0M, Stock = 100 };
            await paperRepo.AddAsync(paper);

            // Act
            var fetchedPaper = await paperRepo.GetByIdAsync(paper.Id);

            // Assert
            Assert.NotNull(fetchedPaper);
            Assert.Equal(paper.Name, fetchedPaper.Name);
        }

        [Fact]
        public async Task AddAsync_AddsPaper()
        {
            // Arrange
            var paperRepo = new PaperRepository(_pgCtxSetup.DbContextInstance);
            var newPaper = new Paper { Name = "New Paper", Price = 20.0M, Stock = 50 };

            // Act
            await paperRepo.AddAsync(newPaper);
            var fetchedPaper = await paperRepo.GetByIdAsync(newPaper.Id);

            // Assert
            Assert.NotNull(fetchedPaper);
            Assert.Equal(newPaper.Name, fetchedPaper.Name);
        }

        [Fact]
        public async Task UpdateAsync_UpdatesPaper()
        {
            // Arrange
            var paperRepo = new PaperRepository(_pgCtxSetup.DbContextInstance);
            var paper = new Paper { Name = "Old Paper", Price = 15.0M, Stock = 30 };
            await paperRepo.AddAsync(paper);
            paper.Name = "Updated Paper"; // Change the name for update

            // Act
            await paperRepo.UpdateAsync(paper);
            var updatedPaper = await paperRepo.GetByIdAsync(paper.Id);

            // Assert
            Assert.NotNull(updatedPaper);
            Assert.Equal("Updated Paper", updatedPaper.Name);
        }

        [Fact]
        public async Task DeleteAsync_RemovesPaper_WhenExists()
        {
            // Arrange
            var paperRepo = new PaperRepository(_pgCtxSetup.DbContextInstance);
            var paper = new Paper { Name = "Paper to Delete", Price = 25.0M, Stock = 60 };
            await paperRepo.AddAsync(paper);

            // Act
            await paperRepo.DeleteAsync(paper.Id);
            var deletedPaper = await paperRepo.GetByIdAsync(paper.Id);

            // Assert
            Assert.Null(deletedPaper); // Should be null after deletion
        }

        private async Task SeedPapersAsync(int count)
        {
            for (int i = 0; i < count; i++)
            {
                var paper = new Paper
                {
                    Name = $"Paper {i + 1}",
                    Price = 10.0M + i,
                    Stock = 100 + i
                };
                await _pgCtxSetup.DbContextInstance.Papers.AddAsync(paper);
            }
            await _pgCtxSetup.DbContextInstance.SaveChangesAsync();
        }
    }
}
