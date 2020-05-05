import { NgModule } from '@angular/core';
import { DefaultDataServiceFactory, HttpUrlGenerator } from '@ngrx/data';
import { DefaultODataDataServiceFactory } from './default-odata-data.service';
import { ODataHttpUrlGenerator } from './odata-http-url-generator';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    { provide: DefaultDataServiceFactory, useClass: DefaultODataDataServiceFactory },
    { provide: DefaultDataServiceFactory, useClass: DefaultODataDataServiceFactory },
    { provide: HttpUrlGenerator, useClass: ODataHttpUrlGenerator },
  ],
})
export class NgrxDataOdataModule { }
