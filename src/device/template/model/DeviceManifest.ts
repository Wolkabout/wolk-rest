import { Config } from './Config';
import { Alarm } from '../../../alarms/model/Alarm';
import { Actuator } from '../../../actuator/model/Actuator';
import { Feed } from '../../../feed/model/Feed';

export default interface DeviceManifest {
  generallyAvailable: boolean;
  configs: Config[];
  alarms: Alarm[];
  description: string;
  published: boolean;
  protocol: string;
  actuators: Actuator[];
  inUse: boolean;
  firmwareUpdateProtocol: string;
  name: string;
  feeds: Feed[];
}
