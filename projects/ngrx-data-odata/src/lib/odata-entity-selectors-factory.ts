import { Injectable, Inject, Optional } from '@angular/core';
import { EntitySelectorsFactory, EntityCollectionCreator, EntityCacheSelector, ENTITY_CACHE_SELECTOR_TOKEN, EntityCollection, CollectionSelectors, EntityMetadata, EntitySelectors$, EntitySelectors } from '@ngrx/data';
import { Selector, MemoizedSelector } from '@ngrx/store';
import { ODataEntityCollection } from './odata-entity-collection';

export interface ODataCollectionSelectors<T> extends CollectionSelectors<T> {
  readonly selectTotalCount: Selector<EntityCollection<T>, number>;
  readonly selectSkipToken: Selector<EntityCollection<T>, string>;
}

export interface ODataEntitySelectors<T> extends EntitySelectors<T> {
  // tslint:disable-next-line: ban-types
  readonly selectTotalCount: MemoizedSelector<Object, number>;
  // tslint:disable-next-line: ban-types
  readonly selectSkipToken: MemoizedSelector<Object, string>;
}

@Injectable()
export class ODataEntitySelectorsFactory extends EntitySelectorsFactory {
  constructor(
    @Optional() entityCollectionCreator?: EntityCollectionCreator,
    @Optional()
    @Inject(ENTITY_CACHE_SELECTOR_TOKEN)
    selectEntityCache?: EntityCacheSelector
  ) {
    super(entityCollectionCreator, selectEntityCache);
  }

  createCollectionSelectors<T, S extends ODataCollectionSelectors<T> = ODataCollectionSelectors<T>>(metadataOrName: EntityMetadata<T> | string): S {
    const selectors = (typeof(metadataOrName) === 'string') ? super.createCollectionSelectors<T, S>(metadataOrName) : super.createCollectionSelectors<T, S>(metadataOrName);

    const selectTotalCount = (c: ODataEntityCollection<T>) => c.count;
    const selectSkipToken = (c: ODataEntityCollection<T>) => c.skipToken;

    return {
      ...selectors,
      selectTotalCount,
      selectSkipToken
    };
  }
}
