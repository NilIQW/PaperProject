using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using PaperAPI.Models;
using PaperAPI.Repositories;
using PgCtx;
using Xunit;

namespace PaperAPI.xUnitTests.Tests
{
    public class PaperRepositoryTests : WebApplicationFactory<Program>
    {
        private readonly PgCtxSetup<PaperDbContext> _pgCtxSetup;

        public PaperRepositoryTests()
        {
            _pgCtxSetup = new PgCtxSetup<PaperDbContext>();
        }

        [Fact]
        public async Task GetAllAsync_ReturnsAllPapers()
        {
            // Arrange
            var repository = new PaperRepository(_pgCtxSetup.DbContextInstance);
            for (var i = 0; i < 5; i++)
            {
                var paper = TestObjects.GetPaper();
                await repository.AddAsync(paper);
            }

            // Act
            var papers = await repository.GetAllAsync();

            // Assert
            Assert.Equal(5, papers.Count());
        }

        [Fact]
        public async Task GetByIdAsync_ReturnsCorrectPaper()
        {
            // Arrange
            var repository = new PaperRepository(_pgCtxSetup.DbContextInstance);
            var paper = TestObjects.GetPaper();
            await repository.AddAsync(paper);

            // Act
            var result = await repository.GetByIdAsync(paper.Id);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(paper.Name, result.Name);
        }

        [Fact]
        public async Task AddAsync_CreatesNewPaper()
        {
            // Arrange
            var repository = new PaperRepository(_pgCtxSetup.DbContextInstance);
            var paper = TestObjects.GetPaper();

            // Act
            await repository.AddAsync(paper);
            var result = await repository.GetByIdAsync(paper.Id);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(paper.Name, result.Name);
        }

        [Fact]
        public async Task UpdateAsync_UpdatesExistingPaper()
        {
            // Arrange
            var repository = new PaperRepository(_pgCtxSetup.DbContextInstance);
            var paper = TestObjects.GetPaper();
            await repository.AddAsync(paper);

            paper.Name = "Updated Paper Name";
            // Act
            await repository.UpdateAsync(paper);
            var updatedPaper = await repository.GetByIdAsync(paper.Id);

            // Assert
            Assert.NotNull(updatedPaper);
            Assert.Equal("Updated Paper Name", updatedPaper.Name);
        }

        [Fact]
        public async Task DeleteAsync_RemovesPaper()
        {
            // Arrange
            var repository = new PaperRepository(_pgCtxSetup.DbContextInstance);
            var paper = TestObjects.GetPaper();
            await repository.AddAsync(paper);

            // Act
            await repository.DeleteAsync(paper.Id);
            var result = await repository.GetByIdAsync(paper.Id);

            // Assert
            Assert.Null(result);
        }
    }
}
