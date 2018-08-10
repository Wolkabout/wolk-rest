import { DeviceActuator } from './Actuator';
import { DeviceAlarm } from './Alarm';
import { DeviceConfig } from './Config';
import { DeviceSensor } from './Feed';

export interface CreateDeviceDTO {
  defaultBinding: Boolean;
  name: string;
  deviceKey: string;
}

export interface SendCredentialsDTO {
  name: string;
  deviceKey: string;
  password: string;
}

export interface ServiceStatus {
  extras: string;
  id: number;
  error: string;
  type: string;
  status: string;
}

export interface Creator {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
}

export interface DeviceDTO {
  accessListActive: boolean;
  actuators : DeviceActuator[];
  activationTimestamp: number;
  alarms: DeviceAlarm[];
  configs: DeviceConfig[];
  contextId: number;
  creator: Creator;
  creatorName: string;
  connectionState: string;
  connector: string;
  deviceAlarms: DeviceAlarm[];
  deviceActuators: DeviceActuator[];
  deviceSensors: DeviceSensor[];
  feeds: DeviceSensor[];
  gatewayDevices: any[];
  gateway: boolean;
  deviceKey: string;
  heartbeat: number;
  id: number;
  manifest: {
    id: number;
    name: string;
  };
  message: string;
  name: string;
  path : string;
  password : string;
  serviceStatuses: ServiceStatus[];
}
