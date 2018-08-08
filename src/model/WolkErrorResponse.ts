export default interface WolkErrorResponse {
  data?: WolkErrorData;
  status: number;
  statusText: string;
  headers?: any;
}

interface WolkErrorData {
  code?: string;
  messages?: string[];
}
