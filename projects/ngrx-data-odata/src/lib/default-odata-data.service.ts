import { Injectable, Optional } from '@angular/core';
import {
  DefaultDataService,
  HttpUrlGenerator,
  DefaultDataServiceConfig,
  EntityCollectionDataService,
  QueryParams
} from '@ngrx/data';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Update } from '@ngrx/entity';

export class DefaultODataDataService<T> extends DefaultDataService<T> {
  constructor(
    entityName: string,
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    config?: DefaultDataServiceConfig
  ) {
    super(entityName, http, httpUrlGenerator, config);

    if (this.entitiesUrl.endsWith('/')) {
      this.entitiesUrl = this.entitiesUrl.substr(0, this.entitiesUrl.length - 1);
      this.entityUrl = this.entityUrl.substr(0, this.entityUrl.length - 1);
    }
  }

  public formatEntityUrl(key: any) {
    if (typeof(key) === 'number') {
      return `${this.entitiesUrl}(${key})`;
    }

    return `${this.entitiesUrl}('${key}')`;
  }

  // public add(entity: T): Observable<T> {
  //   const entityOrError = entity || new Error(`No "${this.entityName}" entity to add`);
  //   return this.execute('POST', this.entityUrl, entityOrError);
  // }

  public delete(key: number | string): Observable<number | string> {
    let err: Error | undefined;
    if (key == null) {
      err = new Error(`No "${this.entityName}" key to delete`);
    }

    const entityUrl = this.formatEntityUrl(key);
    return this.execute('DELETE', entityUrl, err).pipe(
      // forward the id of deleted entity as the result of the HTTP DELETE
      map(result => key as number | string)
    );
  }

  public getAll() {
    return this.execute('GET', this.entitiesUrl);
  }

  public getById(key: number | string): Observable<T> {
    let err: Error | undefined;
    if (key == null) {
      err = new Error(`No "${this.entityName}" key to get`);
    }

    const entityUrl = this.formatEntityUrl(key);
    return this.execute('GET', entityUrl, err);
  }

  public getWithQuery(queryParams: QueryParams | string): Observable<T[]> {
    const qParams = typeof queryParams === 'string' ? { fromString: queryParams } : { fromObject: queryParams };
    const params = new HttpParams(qParams);
    return this.execute('GET', this.entitiesUrl, undefined, { params });
  }

  public update(update: Update<T>): Observable<T> {
    const id = update && update.id;
    const updateOrError = id == null ? new Error(`No "${this.entityName}" update data or id`) : update.changes;

    const entityUrl = this.formatEntityUrl(id);
    return this.execute('PUT', entityUrl, updateOrError);
  }

  public upsert(entity: T): Observable<T> {
    const entityOrError = entity || new Error(`No "${this.entityName}" entity to upsert`);
    return this.execute('POST', this.entityUrl, entityOrError);
  }
}

@Injectable()
export class DefaultODataDataServiceFactory {
  constructor(
    protected http: HttpClient,
    protected httpUrlGenerator: HttpUrlGenerator,
    @Optional() protected config?: DefaultDataServiceConfig
  ) {
    config = config || {};
    httpUrlGenerator.registerHttpResourceUrls(config.entityHttpResourceUrls);
  }

  /**
   * Create a default {EntityCollectionDataService} for the given entity type
   * @param entityName {string} Name of the entity type for this data service
   */
  create<T>(entityName: string): EntityCollectionDataService<T> {
    return new DefaultODataDataService<T>(
      entityName,
      this.http,
      this.httpUrlGenerator,
      this.config
    );
  }
}
