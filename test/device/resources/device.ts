import { ConnectivityType } from '../../../src/device/template/model';

export const deviceCreationDto = {
  connectivityType: ConnectivityType.MQTT_BROKER,
  deviceKey: '',
  name: 'WRT - CREATED WITHOUTH MANIFEST',
  protocol: 'JsonProtocol',
  type: 'STANDARD',
  defaultBinding: false,
  firmwareUpdateType: null
};

export const failCreationDto = {
  connectivityType: ConnectivityType.MQTT_BROKER,
  deviceKey: '',
  name: 'WRT - CREATED WITHOUTH MANIFEST',
  protocol: 'JsonProtocol',
  type: 'SREM',
  defaultBinding: false,
  firmwareUpdateType: null
};
