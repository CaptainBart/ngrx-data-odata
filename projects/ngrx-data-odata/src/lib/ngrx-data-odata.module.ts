import { NgModule } from '@angular/core';
import {
  DefaultDataServiceFactory,
  HttpUrlGenerator,
  EntityCollectionReducerMethodsFactory,
  PersistenceResultHandler,
  EntityDefinitionService
} from '@ngrx/data';

import { DefaultODataDataServiceFactory } from './default-odata-data.service';
import { ODataHttpUrlGenerator } from './odata-http-url-generator';
import { ODataEntityCollectionReducerMethodsFactory } from './odata-entity-collection-reducer-methods';
import { ODataPersistenceResultHandler } from './odata-persistence-result-handler';
import { ODataEntityDefinitionService } from './odata-entity-definition.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    { provide: DefaultDataServiceFactory, useClass: DefaultODataDataServiceFactory },
    { provide: DefaultDataServiceFactory, useClass: DefaultODataDataServiceFactory },
    { provide: HttpUrlGenerator, useClass: ODataHttpUrlGenerator },
    { provide: PersistenceResultHandler, useClass: ODataPersistenceResultHandler },
    { provide: EntityCollectionReducerMethodsFactory, useClass: ODataEntityCollectionReducerMethodsFactory},
    { provide: EntityDefinitionService, useClass: ODataEntityDefinitionService },
  ],
})
export class NgrxDataOdataModule { }
