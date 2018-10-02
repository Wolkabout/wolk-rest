import { DeviceManifest } from '../../../../src/device/template/model';
import { ConnectivityType, DeviceType } from './../../../../src/device/template/model/DeviceManifest';
export const deviceManifest: DeviceManifest = {
  actuators: [
    {
      description: '',
      id: 48,
      maximum: 1,
      minimum: 0,
      name: 'Switch',
      readingType: {
        dataType: 'BOOLEAN',
        iconName: 'ico_switcher',
        id: 31,
        labels: null,
        name: 'SWITCH(ACTUATOR)',
        precision: 1,
        size: 1
      },
      reference: 'SW',
      unit: {
        context: null,
        id: 145,
        inUse: true,
        name: 'BOOLEAN(ACTUATOR)',
        readingTypeId: 31,
        symbol: null,
        system: 'CUSTOM'
      }
    },
    {
      description: '',
      id: 49,
      maximum: 100,
      minimum: 0,
      name: 'Slider',
      readingType: {
        dataType: 'NUMERIC',
        iconName: 'ico_slider',
        id: 13,
        labels: null,
        name: 'COUNT(ACTUATOR)',
        precision: 1,
        size: 1
      },
      reference: 'SL',
      unit: {
        context: null,
        id: 141,
        inUse: true,
        name: 'COUNT(ACTUATOR)',
        readingTypeId: 13,
        symbol: 'count',
        system: 'CUSTOM'
      }
    },
    {
      description: '',
      id: 50,
      maximum: null,
      minimum: null,
      name: 'String',
      readingType: {
        dataType: 'STRING',
        iconName: 'ico_string',
        id: 30,
        labels: null,
        name: 'STRING(ACTUATOR)',
        precision: 1,
        size: 1
      },
      reference: 'ST',
      unit: {
        context: null,
        id: 144,
        inUse: true,
        name: 'TEXT(ACTUATOR)',
        readingTypeId: 30,
        symbol: null,
        system: 'CUSTOM'
      }
    }
  ],
  alarms: [
    {
      description: 'Sensor has reported a high level of humidity',
      id: 27,
      message: 'High humidity has been detected',
      name: 'High Humidity',
      reference: 'HH',
      severity: 'ALERT'
    }
  ],
  configs: [
    {
      dataType: 'NUMERIC',
      defaultValue: '',
      description: '',
      id: 32,
      labels: null,
      maximum: 100,
      minimum: 0,
      name: 'configuration_1',
      nullValue: null,
      reference: 'config_1',
      size: 1
    },
    {
      dataType: 'BOOLEAN',
      defaultValue: '',
      description: null,
      id: 33,
      labels: null,
      maximum: null,
      minimum: null,
      name: 'configuration_2',
      nullValue: null,
      reference: 'config_2',
      size: 1
    },
    {
      dataType: 'STRING',
      defaultValue: '',
      description: null,
      id: 34,
      labels: null,
      maximum: null,
      minimum: null,
      name: 'configuration_3',
      nullValue: null,
      reference: 'config_3',
      size: 1
    },
    {
      dataType: 'STRING',
      defaultValue: '',
      description: null,
      id: 35,
      labels: ['a', 'b', 'c'],
      maximum: null,
      minimum: null,
      name: 'configuration_4',
      nullValue: null,
      reference: 'config_4',
      size: 3
    }
  ],
  connectivityType: ConnectivityType.MQTT_BROKER,
  contextId: 17,
  description: 'Manifest with all supported features',
  deviceType: DeviceType.STANDARD,
  feeds: [
    {
      description: '',
      id: 174,
      maximum: 85,
      minimum: -40,
      name: 'Temperature',
      readingType: {
        dataType: 'NUMERIC',
        iconName: 'ico_temperature',
        id: 2,
        labels: null,
        name: 'TEMPERATURE',
        precision: 1,
        size: 1
      },
      reference: 'T',
      unit: { context: null, id: 31, inUse: true, name: 'CELSIUS', readingTypeId: 2, symbol: '℃', system: 'SI' }
    },
    {
      description: '',
      id: 175,
      maximum: 1100,
      minimum: 300,
      name: 'Pressure',
      readingType: {
        dataType: 'NUMERIC',
        iconName: 'ico_pressure',
        id: 3,
        labels: null,
        name: 'PRESSURE',
        precision: 1,
        size: 1
      },
      reference: 'P',
      unit: { context: null, id: 112, inUse: true, name: 'MILLIBAR', readingTypeId: 3, symbol: 'mb', system: 'NON_SI' }
    },
    {
      description: '',
      id: 176,
      maximum: 100,
      minimum: 0,
      name: 'Humidity',
      readingType: {
        dataType: 'NUMERIC',
        iconName: 'ico_humidity',
        id: 4,
        labels: null,
        name: 'HUMIDITY',
        precision: 1,
        size: 1
      },
      reference: 'H',
      unit: {
        context: null,
        id: 124,
        inUse: true,
        name: 'HUMIDITY_PERCENT',
        readingTypeId: 4,
        symbol: '%',
        system: 'NON_SI'
      }
    },
    {
      description: '',
      id: 177,
      maximum: 100,
      minimum: 0,
      name: 'Accelerometer',
      readingType: {
        dataType: 'NUMERIC',
        iconName: 'ico_accelerometer',
        id: 8,
        labels: ['x', 'y', 'z'],
        name: 'ACCELEROMETER',
        precision: 1,
        size: 3
      },
      reference: 'ACL',
      unit: {
        context: null,
        id: 24,
        inUse: true,
        name: 'METRES_PER_SQUARE_SECOND',
        readingTypeId: 8,
        symbol: 'm/s²',
        system: 'SI'
      }
    },
    {
      description: '',
      id: 178,
      maximum: 1,
      minimum: 0,
      name: 'Location',
      readingType: {
        dataType: 'NUMERIC',
        iconName: 'ico_location',
        id: 11,
        labels: ['lat', 'long'],
        name: 'LOCATION',
        precision: 7,
        size: 2
      },
      reference: 'LOC',
      unit: { context: null, id: 139, inUse: true, name: 'LOCATION', readingTypeId: 11, symbol: null, system: 'CUSTOM' }
    }
  ],
  firmwareUpdateType: 'DFU',
  generallyAvailable: true,
  id: 84,
  name: 'QA device simulator',
  protocol: 'JsonSingleReferenceProtocol',
  published: true
};

export const deviceManifestFailName = 'Python Simulator 88';

export const deviceManifestFail: DeviceManifest = {
  id: 2000,
  name: 'Dummy Manifest for Failing',
  protocol: 'JsonSingleReferenceProtocol',
  connectivityType: ConnectivityType.MQTT_BROKER,
  contextId: 17,
  deviceType: DeviceType.STANDARD,
  firmwareUpdateType: 'DFU',
  description: 'Manifest with non supported features',
  published: false,
  feeds: [],
  actuators: [],
  alarms: [],
  configs: [],
  generallyAvailable: true
};

export const updateDto = {
  feeds: [],
  actuators: [],
  alarms: [],
  configs: [],
  name: 'WRT - Manifest to delete',
  description: `You shouldn't see this manifest. Test failed`
};
