import { Injectable, Optional, Inject } from '@angular/core';
import { EntityDefinitionService, ENTITY_METADATA_TOKEN, EntityMetadataMap, EntityDefinition, EntityMetadata, createEntityDefinition } from '@ngrx/data';

@Injectable()
export class ODataEntityDefinitionService extends EntityDefinitionService {
  constructor(
    @Optional()
    @Inject(ENTITY_METADATA_TOKEN)
    entityMetadataMaps: EntityMetadataMap[]
  ) {
    super(entityMetadataMaps);
  }

  public registerMetadata(metadata: EntityMetadata) {
    if (metadata) {
      const definition = createODataEntityDefinition(metadata);
      this.registerDefinition(definition);
    }
  }
}

export function createODataEntityDefinition<T, S extends object>(
  metadata: EntityMetadata<T, S>
): EntityDefinition<T> {
  metadata.additionalCollectionState = {...metadata.additionalCollectionState, totalCount: 0, skipToken: ''};

  const definition = createEntityDefinition(metadata);
  return definition;
}
