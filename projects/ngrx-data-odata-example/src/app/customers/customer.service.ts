import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Customer } from './customer';
import { ODataEntityCollectionServiceBase } from 'ngrx-data-odata';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends ODataEntityCollectionServiceBase<Customer> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Customer', serviceElementsFactory);
  }
}
