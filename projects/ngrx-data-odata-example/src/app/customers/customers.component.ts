import { Component, OnInit } from '@angular/core';
import { CustomerService } from './customer.service';
import { Sort, SortDirection } from '@angular/material/sort';
import { MergeStrategy } from '@ngrx/data';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  public customers$ = this.customerService.entities$;
  public isLoading$ = this.customerService.loading$;
  public isLoaded$ = this.customerService.loaded$;

  displayedColumns: string[] = ['CompanyName', 'ContactName', 'Address', 'City', 'Country', 'Phone'];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.clearCache();
    this.customerService.getAll();
  }

  sortData(sort: Sort) {
    this.customerService.clearCache();
    const orderBy = `${sort.active} ${sort.direction}`;
    console.log(orderBy);
    this.customerService.getWithQuery({'$orderby': orderBy}, {});
  }
}
