import { EntityCollection } from '@ngrx/data';

export interface ODataEntityCollection<T = any> extends EntityCollection<T> {
  totalCount: number;
  skipToken: string;
}
