export interface Config {
  id: number;
  name: string;
  reference: string;
  defaultValue: string;
  nullValue?: string;
  description?: string;
  minimum?: number;
  maximum?: number;
  dataType: string;
  size: number;
  labels: string[];
}
