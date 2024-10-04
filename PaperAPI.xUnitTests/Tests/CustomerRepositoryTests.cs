using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Xunit;
using PaperAPI.Models;
using PaperAPI.Repositories;
using Microsoft.Extensions.Configuration;
using PgCtx;
using Xunit.Abstractions;
using Microsoft.AspNetCore.Mvc.Testing;

public class CustomersRepositoryTests : WebApplicationFactory<Program>
    {
        private readonly PgCtxSetup<PaperDbContext> _pgCtxSetup = new();
        private readonly ITestOutputHelper _outputHelper;

        public CustomersRepositoryTests(ITestOutputHelper outputHelper)
        {
            _outputHelper = outputHelper;
            Environment.SetEnvironmentVariable("DbConnectionString", 
                _pgCtxSetup._postgres.GetConnectionString());
        }

        [Theory]
        [InlineData(0, 2)]
        public async Task GetAllCustomers_Pagination_Can_Limit_And_Skip(int startAt, int limit)
        {
            var customers = new List<Customer>();
            for (var i = 0; i < 10; i++)
            {
                var customer = new Customer
                {
                    Name = $"Customer {i}",
                    Address = "123 Main St",
                    Phone = "123456789",
                    Email = $"customer{i}@example.com"
                };
                customers.Add(customer);

                var entry = _pgCtxSetup.DbContextInstance.Customers.Attach(customer);
                entry.State = EntityState.Added;
            }
            await _pgCtxSetup.DbContextInstance.SaveChangesAsync();

            var customersResponse = await CreateClient()
                .GetAsync($"api/{nameof(Customer)}?startAt={startAt}&limit={limit}")
                .Result.Content.ReadAsStringAsync();

            var customersList = JsonSerializer.Deserialize<List<Customer>>(customersResponse, 
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

            var expected = customers.OrderBy(c => c.Id).Skip(startAt).Take(limit).ToList();
            Assert.Equivalent(expected.Select(c => c.Id), customersList.Select(c => c.Id));
        }

        [Fact]
        public async Task GetAllCustomers_Can_Get_All_Customers_And_Status_OK()
        {
            var customer = new Customer
            {
                Name = "John Doe",
                Address = "123 Elm St",
                Phone = "123456789",
                Email = "john@example.com"
            };
            _pgCtxSetup.DbContextInstance.Customers.Add(customer);
            await _pgCtxSetup.DbContextInstance.SaveChangesAsync();

            var response = await CreateClient().GetAsync("/api/Customer");

            var returnedCustomers = JsonSerializer.Deserialize<List<Customer>>(
                await response.Content.ReadAsStringAsync(),
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            var customerList = new List<Customer> { customer };
            Assert.Equivalent(customerList, returnedCustomers);
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task CreateCustomer_Can_Persist_Customer_To_DB()
        {
            var testCustomer = new Customer
            {
                Name = "Jane Doe",
                Address = "456 Oak St",
                Phone = "987654321",
                Email = "jane@example.com"
            };

            var response = await CreateClient()
                .PostAsJsonAsync("/api/" + nameof(Customer), testCustomer);

            var returnedCustomer = JsonSerializer.Deserialize<Customer>(
                await response.Content.ReadAsStringAsync(),
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) 
                ?? throw new InvalidOperationException();

            var customerInDb = _pgCtxSetup.DbContextInstance.Customers.First();

            Assert.Equal(testCustomer.Name, returnedCustomer.Name);
            Assert.Equal(testCustomer.Address, returnedCustomer.Address);
            Assert.Equal(testCustomer.Phone, returnedCustomer.Phone);
            Assert.Equal(testCustomer.Email, returnedCustomer.Email);

            Assert.Equal(testCustomer.Name, customerInDb.Name);
            Assert.Equal(testCustomer.Address, customerInDb.Address);
            Assert.Equal(testCustomer.Phone, customerInDb.Phone);
            Assert.Equal(testCustomer.Email, customerInDb.Email);
        }
    }

