export default interface Message {
  severity: string;
  sourceId: number;
  path: string;
  read: boolean;
  data: string;
  sourceType: string;
  description: string;
  contextId: number;
  type: string;
  userId: number;
  timestamp: number;
}
