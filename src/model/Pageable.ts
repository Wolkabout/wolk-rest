import { Sort } from './Sort';

export interface Pageable {
  paged: boolean;
  pageNumber: number;
  offset: number;
  pageSize: number;
  unpaged: boolean;
  sort: Sort;
}
