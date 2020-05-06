import { Injectable, Optional, Inject } from '@angular/core';
import { EntityDefinitionService, ENTITY_METADATA_TOKEN, EntityMetadataMap, EntityDefinition } from '@ngrx/data';
import { ODataEntityCollection } from './odata-entity-collection';

@Injectable()
export class ODataEntityDefinitionService extends EntityDefinitionService {
  constructor(
    @Optional()
    @Inject(ENTITY_METADATA_TOKEN)
    entityMetadataMaps: EntityMetadataMap[]
  ) {
    super(entityMetadataMaps);
  }

  public getDefinition<T>(entityName: string, shouldThrow = true): EntityDefinition<T> {
    const definition = super.getDefinition<T>(entityName, shouldThrow);
    const state = (definition.initialState as ODataEntityCollection);
    state.count = 0;
    state.skipToken = '';
    return definition;
  }
}
