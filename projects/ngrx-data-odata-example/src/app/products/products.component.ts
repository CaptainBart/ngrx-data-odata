import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ProductService } from './product.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit {
  public products$ = this.productService.entities$;
  public isLoading$ = this.productService.loading$;
  public isLoaded$ = this.productService.loaded$;
  public totalCount$ = this.productService.totalCount$;
  public skipToken$ = this.productService.skipToken$;
  public pagedProducts$ = this.productService.entities$
    .pipe(
      map(products => products.slice(this.firstOnPage, this.lastOnPage))
    );

  displayedColumns: string[] = ['ProductName', 'QuantityPerUnit', 'UnitPrice', 'UnitsInStock', 'UnitsOnOrder', 'ReorderLevel', 'Discontinued'];

  @ViewChild(MatSort)
  public sort: MatSort;

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  constructor(private productService: ProductService) { }

  public get firstOnPage() {
    return this.paginator ? this.paginator.pageSize * this.paginator.pageIndex : 0;
  }

  public get lastOnPage() {
    return this.paginator ? this.paginator.pageSize * (this.paginator.pageIndex + 1) : 10;
  }

  ngOnInit(): void {
    this.productService.clearCache();
    this.getData();
  }

  sortData() {
    this.productService.clearCache();
    this.paginator.pageIndex = 0;
    this.getData();
  }

  pageChanged() {
    this.getData();
  }

  private getData() {
    const top = this.paginator?.pageSize ?? 0;
    const skip = this.firstOnPage;
    const orderBy = this.sort?.active;
    const orderByDirection = this.sort?.direction;

    this.productService.getWithODataQuery({count: true, select: ['ProductID', ...this.displayedColumns], skip, top, orderBy, orderByDirection });
  }
}
