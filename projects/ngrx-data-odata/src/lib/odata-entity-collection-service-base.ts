import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { ODataQueryOptions } from './odata-query-options';
import { ODataEntitySelectors } from './odata-entity-selectors-factory';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

export class ODataEntityCollectionServiceBase<T> extends EntityCollectionServiceBase<T> {
  public totalCount$: Observable<number> | Store<number>;
  public skipToken$: Observable<string> | Store<string>;

  constructor(entityName: string, serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super(entityName, serviceElementsFactory);

    const odataSelectors = this.selectors as ODataEntitySelectors<T>;
    this.totalCount$ = this.store.pipe(select(odataSelectors.selectTotalCount));
    this.skipToken$ = this.store.pipe(select(odataSelectors.selectSkipToken));
  }

  public getWithODataQuery(odataOptions?: ODataQueryOptions) {
    const opts: any = {};

    if (odataOptions.count) {
      opts.$count = 'true';
    }

    if (odataOptions.skipToken) {
      opts.$skiptoken = odataOptions.skipToken;
    }

    if (odataOptions.top) {
      opts.$top = odataOptions.top;
    }

    if (odataOptions.skip) {
      opts.$skip = odataOptions.skip;
    }

    if (odataOptions.orderBy) {
      opts.$orderby = `${odataOptions.orderBy} ${odataOptions.orderByDirection}`;
    }

    if (odataOptions.filter) {
      opts.$filter = odataOptions.filter;
    }

    if (odataOptions.expand) {
      opts.$expand = odataOptions.expand;
    }

    if (odataOptions.select) {
      opts.$select = odataOptions.select instanceof Array ? odataOptions.select.join(',') : odataOptions.select;
    }

    return this.getWithQuery(opts);
  }
}
