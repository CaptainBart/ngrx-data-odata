import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  EntityMetadataMap,
  ENTITY_METADATA_TOKEN,
} from '@ngrx/data';

import { ODataEntityDefinitionService } from './odata-entity-definition.service';
import { ODataEntityCollection } from 'ngrx-data-odata';

@NgModule({})
class LazyModule {
  lazyMetadataMap = {
    Sidekick: {},
  };

  constructor(entityDefinitionService: ODataEntityDefinitionService) {
    entityDefinitionService.registerMetadataMap(this.lazyMetadataMap);
  }
}

describe('EntityDefinitionService', () => {
  let service: ODataEntityDefinitionService;
  let metadataMap: EntityMetadataMap;

  beforeEach(() => {
    metadataMap = {
      Hero: {},
      Villain: {},
    };

    TestBed.configureTestingModule({
      // Not actually lazy but demonstrates a module that registers metadata
      imports: [LazyModule],
      providers: [
        ODataEntityDefinitionService,
        { provide: ENTITY_METADATA_TOKEN, multi: true, useValue: metadataMap },
      ],
    });
    service = TestBed.inject(ODataEntityDefinitionService);
  });

  describe('#registerMetadata(Map)', () => {
    it('state contains odata properties', () => {
      service.registerMetadata({ entityName: 'Foo' });

      const def = service.getDefinition('Foo');
      expect(def).toBeDefined();

      const initialState = (def.initialState as ODataEntityCollection);
      expect(initialState.totalCount).toBeDefined();
      expect(initialState.skipToken).toBeDefined();
    });
  });
});
