using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("properties")]
public partial class Property
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("property_name")]
    [StringLength(255)]
    public string PropertyName { get; set; } = null!;

    [InverseProperty("Property")]
    public virtual ICollection<PaperProperty> PaperProperties { get; set; } = new List<PaperProperty>();
}