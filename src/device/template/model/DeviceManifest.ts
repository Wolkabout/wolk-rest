import { ActuatorManifest } from './ActuatorManifest';
import { Config } from './Config';
import { AlarmManifest } from './AlarmManifest';
import { FeedManifest } from './FeedManifest';

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
