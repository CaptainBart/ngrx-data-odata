import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Product } from './product';
import { ODataEntityCollectionServiceBase } from 'ngrx-data-odata';

@Injectable({
  providedIn: 'root'
})
export class ProductService  extends ODataEntityCollectionServiceBase<Product> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Product', serviceElementsFactory);
  }
}
