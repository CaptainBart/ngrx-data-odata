import { EntityMetadataMap, DefaultDataServiceConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Customer: {
    selectId: (customer) => customer.CustomerID
  },
  Product: {
    selectId: (product) => product.ProductID
  }
};

const pluralNames = { };

export const entityConfig = {
  entityMetadata,
  pluralNames
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
    root : 'https://services.odata.org/V4/Northwind/Northwind.svc',
  };
