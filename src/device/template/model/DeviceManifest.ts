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
  firmwareUpdateType: string;
  connectivityType: ConnectivityType;
  contextId: number;
  deviceType: DeviceType;
  name: string;
  feeds: FeedManifest[];
  id?: number;
}
/**
 * Defines all possible values for ConnectivityType.
 * Available types will be sent in server info
 * @default MQTT_BROKER - Usual connection type
 */
export enum ConnectivityType {
  /**
   * Usual connection type.
   */
  MQTT_BROKER = 'MQTT_BROKER',
  /**
   * Connected via Tele2 Jasper
   */
  MQTT_JASPER = 'MQTT_JASPER',
  /**
   * Gateway device
   */
  MQTT_GATEWAY = 'MQTT_GATEWAY',
  /**
   * Device connected via gateway to platform.
   */
  MQTT_SUB_DEVICE = 'MQTT_SUB_DEVICE',
  /**
   * Device connected via LoRa
   */
  TTN = 'TTN'
}

/**
 * Types of devices supported on our platform.
 */
export enum DeviceType {
  WOLKSENSOR = 'WOLKSENSOR',
  STANDARD = 'STANDARD'
}
