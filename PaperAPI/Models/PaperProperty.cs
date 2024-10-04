using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("paper_properties")]
public partial class PaperProperty
{
    [Column("paper_id")]
    public int PaperId { get; set; }

    [Column("property_id")]
    public int PropertyId { get; set; }

    [ForeignKey("PaperId")]
    [InverseProperty("PaperProperties")]
    public virtual Paper Paper { get; set; } = null!;

    [ForeignKey("PropertyId")]
    [InverseProperty("PaperProperties")]
    public virtual Property Property { get; set; } = null!;
}