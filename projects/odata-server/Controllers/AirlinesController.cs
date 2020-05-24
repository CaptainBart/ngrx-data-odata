using System;
using System.Collections.Generic;
using Microsoft.AspNet.OData;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace NgrxDataOdata.Example.OdataServer
{
  public class AirlinesController : ODataController {
    private ModelContext _context;
    public AirlinesController(ModelContext context) {
      _context = context;
    }

    [EnableQuery]
    public IQueryable<Airline> Get() {
      return _context.Airlines;
    }

    [EnableQuery]
    public SingleResult<Airline> Get([FromODataUri] string key) {
      var airlines = _context.Airlines.Where(a => a.AirlineCode == key);
      return SingleResult.Create(airlines);
    }

    public async Task<IActionResult> Post([FromBody]Airline airline)
    {
        if (!this.ModelState.IsValid)
        {
            return this.BadRequest(ModelState);
        }

        _context.Airlines.Add(airline);
        await _context.SaveChangesAsync();

        return this.Created(airline);
    }

    public async Task<IActionResult> Put([FromODataUri] string key, [FromBody]Airline airline)
    {
        if (!this.ModelState.IsValid)
        {
            return this.BadRequest(ModelState);
        }

        if (key != airline.AirlineCode)
        {
            return this.BadRequest();
        }

        _context.Entry(airline).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await this.AirlineExistsAsyc(key))
            {
                return this.NotFound();
            }

            throw;
        }

        return this.Updated(airline);
    }

    public async Task<IActionResult> Patch([FromODataUri] string key, [FromBody]Delta<Airline> patch) {
      if (!this.ModelState.IsValid)
        {
            return this.BadRequest(ModelState);
        }

        var airline = await _context.Airlines.FindAsync(key);
        if (airline == null)
        {
            return this.NotFound();
        }

        patch.Patch(airline);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await this.AirlineExistsAsyc(key))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return this.Updated(airline);
    }

    public async Task<IActionResult> Delete([FromODataUri] string key)
    {
      var airline = await _context.Airlines.FindAsync(key);
      if(airline == null)
      {
        return this.NotFound();
      }

      _context.Airlines.Remove(airline);
      await _context.SaveChangesAsync();
      return this.NoContent();
    }

    private Task<bool> AirlineExistsAsyc(string key)
    {
        return _context.Airlines.AnyAsync(a => a.AirlineCode == key);
    }
  }
}
