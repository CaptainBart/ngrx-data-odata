import { DefaultPersistenceResultHandler, EntityAction } from '@ngrx/data';
import { Action } from '@ngrx/store';

const skipTokenName = '$skiptoken=';
export class ODataPersistenceResultHandler extends DefaultPersistenceResultHandler {
  handleSuccess(originalAction: EntityAction): (data: any) => Action {
    const actionHandler = super.handleSuccess(originalAction);

    return function(data: any) {
      const dataArray = data.value instanceof Array ? data.value : data;

      const action = actionHandler.call(this, dataArray);
      if (action) {
        if (data['@odata.count']) {
          action.payload.count = data['@odata.count'];
        }

        if (data['@odata.nextLink']) {
          const nextLink = data['@odata.nextLink'] as string;
          const tokenIndex = nextLink.indexOf(skipTokenName);
          if (tokenIndex > -1) {
            const skipToken = nextLink.substr(tokenIndex + skipTokenName.length);
            action.payload.skipToken = skipToken;
          }
        }
      }

      return action;
    };
  }
}

export interface ODataResult<T> {
  value: T[];
  '@odata.count': number;
}
