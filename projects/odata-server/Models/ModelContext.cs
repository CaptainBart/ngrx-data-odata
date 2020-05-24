using Microsoft.EntityFrameworkCore;

namespace NgrxDataOdata.Example.OdataServer {
  public class ModelContext : DbContext {
    public ModelContext() {}
    public ModelContext(DbContextOptions<ModelContext> options): base(options) { }

    public DbSet<Airline> Airlines {get;set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
      modelBuilder.Entity<Airline>().HasData(new Airline { AirlineCode = "AA", Name = "American Airlines" });
      modelBuilder.Entity<Airline>().HasData(new Airline { AirlineCode = "FM", Name = "Shanghai Airline" });
      modelBuilder.Entity<Airline>().HasData(new Airline { AirlineCode = "MU", Name = "China Eastern Airlines" });
      modelBuilder.Entity<Airline>().HasData(new Airline { AirlineCode = "AF", Name = "Air France" });
      modelBuilder.Entity<Airline>().HasData(new Airline { AirlineCode = "AZ", Name = "Alitalia" });
      modelBuilder.Entity<Airline>().HasData(new Airline { AirlineCode = "AC", Name = "Air Canada" });
      modelBuilder.Entity<Airline>().HasData(new Airline { AirlineCode = "OS", Name = "Austrian Airlines" });
      modelBuilder.Entity<Airline>().HasData(new Airline { AirlineCode = "TK", Name = "Turkish Airlines" });
    }
  }
}
