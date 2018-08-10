export interface Config {
  id: number;
  name: string;
  reference: string;
  defaultValue: string;
  nullValue?: string | null;
  description?: string | null;
  minimum?: number | null;
  maximum?: number | null;
  dataType: string;
  size: number;
  labels: string[] | null;
}
