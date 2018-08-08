import Sort from './Sort';

export default interface Pageable {
  paged: boolean;
  pageNumber: number;
  offset: number;
  pageSize: number;
  unpaged: boolean;
  sort: Sort;
}
