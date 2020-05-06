import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products$ = this.productService.entities$;
  public isLoading$ = this.productService.loading$;
  public isLoaded$ = this.productService.loaded$;

  displayedColumns: string[] = ['ProductName', 'QuantityPerUnit', 'UnitPrice', 'UnitsInStock', 'UnitsOnOrder', 'ReorderLevel', 'Discontinued'];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.clearCache();
    this.productService.getWithODataQuery({count: true});
  }

  sortData(sort: Sort) {
    this.productService.clearCache();
    this.productService.getWithODataQuery({count: true, orderBy: sort.active, orderByDirection: sort.direction });
  }
}
