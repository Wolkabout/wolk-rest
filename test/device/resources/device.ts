import { Connectivity, ConnectivityType, DeviceType } from '../../../src/device/template/model';

export const deviceCreationDto = {
  connectivityType: Connectivity.MQTT_BROKER,
  defaultBinding: false,
  deviceKey: '',
  firmwareUpdateType: null,
  name: 'WRT - CREATED WITHOUTH MANIFEST',
  protocol: 'JsonProtocol',
  type: DeviceType.STANDARD
};

export const failCreationDto = {
  connectivityType: Connectivity.MQTT_BROKER,
  defaultBinding: false,
  deviceKey: '',
  firmwareUpdateType: null,
  name: 'WRT - CREATED WITHOUTH MANIFEST',
  protocol: 'JsonProtocol',
  type: 'SREM'
};

export const jasperCreationDto = {
  connectivityParameters: { ICCID: '89462036051001511713' },
  connectivityType: Connectivity.MQTT_JASPER as Connectivity.MQTT_JASPER,
  defaultBinding: false,
  deviceKey: 'WRTJASPER',
  firmwareUpdateType: null,
  name: 'WRT - JASPER',
  protocol: 'JsonProtocol',
  type: DeviceType.STANDARD
};

export const loRaCreationDto = {
  connectivityParameters: { appKey: 'EFEFEFEFEFEFEFEFEFEFEFEFEFEEFEFF' },
  connectivityType: <Connectivity.TTN>Connectivity.TTN,
  defaultBinding: false,
  deviceKey: 'ABAABBABABBABBAB',
  firmwareUpdateType: null,
  name: 'WRT-LoRa_Device',
  protocol: 'JsonMultiReferenceProtocol',
  type: DeviceType.STANDARD
};
