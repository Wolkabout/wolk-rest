export default interface WolkResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers?: any;
}
