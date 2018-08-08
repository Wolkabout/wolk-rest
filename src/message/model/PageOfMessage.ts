import Pageable from '../../model/Pageable';
import Message from './Message';
import Sort from '../../model/Sort';

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
