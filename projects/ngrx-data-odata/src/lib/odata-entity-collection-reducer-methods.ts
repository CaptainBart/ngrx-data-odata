import { Injectable } from '@angular/core';
import {
  EntityCollectionReducerMethods,
  EntityDefinition,
  EntityCollection,
  EntityAction,
  EntityDefinitionService,
  EntityCollectionReducerMethodMap
} from '@ngrx/data';
import { ODataEntityCollection } from './odata-entity-collection';
import { ODataEntityActionPayload } from './odata-entity-action-payload';

export class ODataEntityCollectionReducerMethods<T> extends EntityCollectionReducerMethods<T> {
  constructor(public entityName: string, public definition: EntityDefinition<T>) {
    super(entityName, definition);
  }
   protected queryManySuccess(collection: EntityCollection<T>, action: EntityAction<T[]>): EntityCollection<T> {
    const ec = super.queryManySuccess(collection, action) as ODataEntityCollection<T>;
    const payload = action.payload as ODataEntityActionPayload<T[]>;
    if (payload.count) {
      ec.count = payload.count;
    }

    if (payload.skipToken) {
      ec.skipToken = payload.skipToken;
    }

    return ec;
  }

  protected removeAll(collection: EntityCollection<T>, action: EntityAction<T>): EntityCollection<T> {
    const ec = super.removeAll(collection, action) as ODataEntityCollection<T>;

    if (ec.count) {
      ec.count = 0;
    }

    if (ec.skipToken) {
      ec.skipToken = '';
    }

    return ec;
  }

}

@Injectable()
export class ODataEntityCollectionReducerMethodsFactory {
  constructor(private entityDefinitionService: EntityDefinitionService) {}
  create<T>(entityName: string): EntityCollectionReducerMethodMap<T> {
    const definition = this.entityDefinitionService.getDefinition<T>(entityName);
    const methodsClass = new ODataEntityCollectionReducerMethods(entityName, definition);
    return methodsClass.methods;
  }
}
