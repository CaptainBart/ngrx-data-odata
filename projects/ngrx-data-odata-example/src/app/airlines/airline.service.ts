import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Airline } from './airline';
import { ODataEntityCollectionServiceBase } from 'ngrx-data-odata';

@Injectable({
  providedIn: 'root'
})
export class AirlineService extends ODataEntityCollectionServiceBase<Airline> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Airline', serviceElementsFactory);
  }
}
