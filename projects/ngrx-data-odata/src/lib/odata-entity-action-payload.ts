import { EntityActionPayload } from '@ngrx/data';

export interface ODataEntityActionPayload<P = any> extends EntityActionPayload<P> {
  totalCount: number;
  skipToken: string;
}
