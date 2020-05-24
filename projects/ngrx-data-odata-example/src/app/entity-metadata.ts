import { EntityMetadataMap, DefaultDataServiceConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Customer: {
    selectId: (customer) => customer.CustomerID
  },
  Product: {
    selectId: (product) => product.ProductID
  },
  Airline: {
    selectId: (airLine) => airLine.AirlineCode
  }
};

const pluralNames = { };

export const entityConfig = {
  entityMetadata,
  pluralNames
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
    root : 'https://services.odata.org/V4/Northwind/Northwind.svc',
    entityHttpResourceUrls: {
      Airline: {
        collectionResourceUrl: '/odata/Airlines',
        entityResourceUrl: '/odata/Airlines' // <-- will be ignored, but interface requires
      }
    }
  };
