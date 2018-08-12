import { Pageable } from '../../model/Pageable';
import { Sort } from '../../model/Sort';
import Message from './Message';

export default interface PageOfMessage {
  number: number;
  numberOfElements: number;
  last: boolean;
  size: number;
  totalPages: number;
  pageable: Pageable;
  sort: Sort;
  first: boolean;
  content?: Message[];
  totalElements: number;
}
