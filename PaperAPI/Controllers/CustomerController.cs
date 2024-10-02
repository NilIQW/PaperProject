using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using PaperAPI.DTOs;
using PaperAPI.Models;
using PaperAPI.Repositories;

namespace PaperAPI.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IRepository<Customer> _customerRepository;

        public CustomerController(IRepository<Customer> customerRepository)
        {
            _customerRepository = customerRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerDTO>>> GetAllCustomers()
        {
            var customers = await _customerRepository.GetAllAsync();

            // Manual mapping of Customer entities to CustomerDto
            var customerDto =  customers.Select(c => new CustomerDTO
            {
                Id = c.Id,
                Name = c.Name,
                Address = c.Address,
                Phone = c.Phone,
                Email = c.Email
            }).ToList();

            return Ok(customerDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDTO>> GetCustomerById(int id)
        {
            var customer = await _customerRepository.GetByIdAsync(id);

            if (customer == null) return NotFound();

            var customerDto = new CustomerDTO
            {
                Id = customer.Id,
                Name = customer.Name,
                Address = customer.Address,
                Phone = customer.Phone,
                Email = customer.Email
            };
            return Ok(customerDto);
        }

        [HttpPost]
        public async Task<ActionResult<CustomerDTO>> PostCustomer(CreateCustomerDTO createCustomerDto)
        {
            var customer = new Customer
            {
                Name = createCustomerDto.Name,
                Address = createCustomerDto.Address,
                Phone = createCustomerDto.Phone,
                Email = createCustomerDto.Email
            };
            await _customerRepository.AddAsync(customer);

            var customerDto = new CustomerDTO
            {
                Id = customer.Id,
                Name = customer.Name,
                Address = customer.Address,
                Phone = customer.Phone,
                Email = customer.Email
            };
            return CreatedAtAction(nameof(GetCustomerById), new { id = customer.Id }, customerDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, UpdateCustomerDTO updateCustomerDto)
        {
            var existingCustomer = await _customerRepository.GetByIdAsync(id);
            if (existingCustomer == null) return NotFound();

            // Manual mapping to update the existing customer
            existingCustomer.Name = updateCustomerDto.Name ?? existingCustomer.Name;
            existingCustomer.Address = updateCustomerDto.Address ?? existingCustomer.Address;
            existingCustomer.Phone = updateCustomerDto.Phone ?? existingCustomer.Phone;
            existingCustomer.Email = updateCustomerDto.Email ?? existingCustomer.Email;

            await _customerRepository.UpdateAsync(existingCustomer);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var existingCustomer = await _customerRepository.GetByIdAsync(id);

            if (existingCustomer == null) return NotFound();

            await _customerRepository.DeleteAsync(id);

            return NoContent();
        }


    }
}