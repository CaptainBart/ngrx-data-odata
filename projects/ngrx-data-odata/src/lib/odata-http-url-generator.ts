import { DefaultHttpUrlGenerator, HttpResourceUrls, normalizeRoot, Pluralizer } from '@ngrx/data';
import { Injectable } from '@angular/core';

@Injectable()
export class ODataHttpUrlGenerator extends DefaultHttpUrlGenerator {
    constructor(private pluralizzer: Pluralizer) {
        super(pluralizzer);
    }

    protected getResourceUrls(entityName: string, root: string): HttpResourceUrls {
        let resourceUrls = this.knownHttpResourceUrls[entityName];
        if (!resourceUrls) {
          const normalizedRoot = normalizeRoot(root);
          const pluralEntityName = this.pluralizzer.pluralize(entityName);
          const collectionUrl = `${normalizedRoot}/${pluralEntityName}`
          resourceUrls = {
            entityResourceUrl: collectionUrl,
            collectionResourceUrl: collectionUrl,
          };
          this.registerHttpResourceUrls({ [entityName]: resourceUrls });
        }
        return resourceUrls;
      }
}