using Bogus;

public class TestObjects
{
    public static Paper GetPaper()
    {
        return new Faker<Paper>()
            .RuleFor(p => p.Id, f => f.Random.Int(1, 1000)) // Random ID, assuming IDs are generated and unique
            .RuleFor(p => p.Name, f => f.Commerce.ProductName()) // Generates a random product name
            .RuleFor(p => p.Discontinued, f => f.Random.Bool()) // Randomly set discontinued status
            .RuleFor(p => p.Stock, f => f.Random.Int(0, 100)) // Random stock quantity
            .RuleFor(p => p.Price, f => f.Random.Double(1.0, 100.0)) // Random price between 1.0 and 100.0
            .RuleFor(p => p.SheetsPerPacket, f => f.Random.Int(50, 500)) // Random sheets per packet
            .RuleFor(p => p.ImageUrl, f => f.Image.PicsumUrl()); // Generates a random image URL
    }
}