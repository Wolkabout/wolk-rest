export default interface WolkResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers?: any;
}
