import { ActuatorManifest } from './Actuator';
import { AlarmManifest } from './Alarm';
import { Config } from './Config';
import { FeedManifest } from './Feed';

export interface DeviceManifest {
  generallyAvailable: boolean;
  configs: Config[];
  alarms: AlarmManifest[];
  description: string;
  published: boolean;
  protocol: string;
  actuators: ActuatorManifest[];
  inUse: boolean;
  firmwareUpdateProtocol: string;
  name: string;
  feeds: FeedManifest[];
  id?: number;
}
