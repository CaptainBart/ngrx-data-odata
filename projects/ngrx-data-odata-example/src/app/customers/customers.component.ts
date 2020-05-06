import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CustomerService } from './customer.service';
import { Sort } from '@angular/material/sort';
import { take, skip } from 'rxjs/operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersComponent implements OnInit {
  public customers$ = this.customerService.entities$;
  public isLoading$ = this.customerService.loading$;
  public isLoaded$ = this.customerService.loaded$;
  public totalCount$ = this.customerService.totalCount$;
  public skipToken$ = this.customerService.skipToken$;

  displayedColumns: string[] = ['CompanyName', 'ContactName', 'Address', 'City', 'Country', 'Phone'];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.clearCache();
    this.customerService.getWithODataQuery({count: true, select: ['CustomerID', ...this.displayedColumns]});
  }

  sortData(sort: Sort) {
    this.customerService.clearCache();
    this.customerService.getWithODataQuery({count: true, select: ['CustomerID', ...this.displayedColumns], orderBy: sort.active, orderByDirection: sort.direction });
  }

  more(skipToken: string) {
    this.customerService.getWithODataQuery({count: true, skipToken, select: ['CustomerID', ...this.displayedColumns]});
  }
}
