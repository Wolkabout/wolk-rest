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

export interface DeviceConfig {
  dataType: string;
  deviceName: string;
  labels: string;
  reference: string;
  connected: boolean;
  path: string;
  size: number;
  name: string;
  maximum: number;
  id: number;
  minimum: number;
  value: string;
  status: string;
}
