import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CustomerService } from './customer.service';
import { MatSort } from '@angular/material/sort';

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

  @ViewChild(MatSort)
  public sort: MatSort;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customerService.clearCache();
    this.getData();
  }

  sortData() {
    this.customerService.clearCache();
    this.getData();
  }

  more(skipToken: string) {
    this.getData(skipToken);
  }

  private getData(skipToken?: string) {
    const orderBy = this.sort?.active;
    const orderByDirection = this.sort?.direction;

    this.customerService.getWithODataQuery({count: true, skipToken, orderBy, orderByDirection, select: ['CustomerID', ...this.displayedColumns] });
  }
}
