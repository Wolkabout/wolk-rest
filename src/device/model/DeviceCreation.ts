import { Connectivity, ConnectivityType } from '../template/model/DeviceManifest';

export interface DeviceCreationDto {
  name: string;
  deviceKey: string;
  protocol: string;
  defaultBinding: boolean;
  type: string;
  connectivityType: ConnectivityType;
  firmwareUpdateType: string;
  connectivityParameters?: any;
  deviceTypeParameters?: any;
  firmwareUpdateParameters?: any;
}

export interface JasperCreationDto extends DeviceCreationDto {
  connectivityType: Connectivity.MQTT_JASPER;
  connectivityParameters: { ICCID: string };
}

export interface LoRaCreationDto extends DeviceCreationDto {
  connectivityType: Connectivity.TTN;
  connectivityParameters: { appKey: string };
}
