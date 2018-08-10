export interface AlarmManifest {
  severity: string;
  reference: string;
  name: string;
  description: string;
  id: number;
  message: string;
}

export interface DeviceAlarm {
  severity: string;
  reference: string;
  connected: boolean;
  path: string;
  name: string;
  id: number;
  message: string;
  value: string;
  deviceName: string;
  status: string;
}
