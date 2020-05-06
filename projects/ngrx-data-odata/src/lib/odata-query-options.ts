export interface ODataQueryOptions {
  count?: boolean;
  top?: number;
  skip?: number;
  orderBy?: string;
  orderByDirection?: 'asc' | 'desc' | '';
  filter?: string;
  select?: string | string[];
  expand?: string;
  skipToken?: string;
}
