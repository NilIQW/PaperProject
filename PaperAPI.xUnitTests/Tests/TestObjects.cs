using Bogus;

public class TestObjects
{
    public static Paper GetPaper()
    {
        return new Faker<Paper>()
            .RuleFor(p => p.Name, f => f.Commerce.ProductName() ?? throw new InvalidOperationException("Name cannot be null."))
            .RuleFor(p => p.Discontinued, f => f.Random.Bool())
            .RuleFor(p => p.Stock, f => f.Random.Int(0, 1000))
            .RuleFor(p => p.Price, f => f.Random.Double(0.01, 100.00))
            .RuleFor(p => p.SheetsPerPacket, f => f.Random.Int(1, 500))
            .RuleFor(p => p.ImageUrl, f => f.Internet.UrlWithPath());
    }
}