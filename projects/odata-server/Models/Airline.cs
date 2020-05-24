using System.ComponentModel.DataAnnotations;

namespace NgrxDataOdata.Example.OdataServer {
public class Airline {
  [Key]
  public string AirlineCode {get;set;}
  public string Name {get;set;}
}
}
