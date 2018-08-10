import { DeviceManifest } from '../../../../src/device/template/model';
export const deviceManifest: DeviceManifest = {
  id: 84,
  name: 'QA device simulator',
  protocol: 'JsonSingleReferenceProtocol',
  firmwareUpdateProtocol: 'DFUProtocol',
  description: 'Manifest with all supported features',
  published: true,
  feeds: [
    {
      id: 174,
      name: 'Temperature',
      reference: 'T',
      description: '',
      unit: {
        id: 31,
        name: 'CELSIUS',
        symbol: '℃',
        readingTypeId: 2,
        system: 'SI',
        context: null,
        inUse: true
      },
      minimum: -40,
      maximum: 85,
      readingType: {
        id: 2,
        name: 'TEMPERATURE',
        dataType: 'NUMERIC',
        size: 1,
        precision: 1,
        labels: null
      }
    },
    {
      id: 175,
      name: 'Pressure',
      reference: 'P',
      description: '',
      unit: {
        id: 112,
        name: 'MILLIBAR',
        symbol: 'mb',
        readingTypeId: 3,
        system: 'NON_SI',
        context: null,
        inUse: true
      },
      minimum: 300,
      maximum: 1100,
      readingType: {
        id: 3,
        name: 'PRESSURE',
        dataType: 'NUMERIC',
        size: 1,
        precision: 1,
        labels: null
      }
    },
    {
      id: 176,
      name: 'Humidity',
      reference: 'H',
      description: '',
      unit: {
        id: 124,
        name: 'HUMIDITY_PERCENT',
        symbol: '%',
        readingTypeId: 4,
        system: 'NON_SI',
        context: null,
        inUse: true
      },
      minimum: 0,
      maximum: 100,
      readingType: {
        id: 4,
        name: 'HUMIDITY',
        dataType: 'NUMERIC',
        size: 1,
        precision: 1,
        labels: null
      }
    },
    {
      id: 177,
      name: 'Accelerometer',
      reference: 'ACL',
      description: '',
      unit: {
        id: 24,
        name: 'METRES_PER_SQUARE_SECOND',
        symbol: 'm/s²',
        readingTypeId: 8,
        system: 'SI',
        context: null,
        inUse: true
      },
      minimum: 0,
      maximum: 100,
      readingType: {
        id: 8,
        name: 'ACCELEROMETER',
        dataType: 'NUMERIC',
        size: 3,
        precision: 1,
        labels: [
          'x',
          'y',
          'z'
        ]
      }
    },
    {
      id: 178,
      name: 'Location',
      reference: 'LOC',
      description: '',
      unit: {
        id: 139,
        name: 'LOCATION',
        symbol: null,
        readingTypeId: 11,
        system: 'CUSTOM',
        context: null,
        inUse: true
      },
      minimum: 0,
      maximum: 1,
      readingType: {
        id: 11,
        name: 'LOCATION',
        dataType: 'NUMERIC',
        size: 2,
        precision: 7,
        labels: [
          'lat',
          'long'
        ]
      }
    }
  ],
  actuators: [
    {
      id: 48,
      name: 'Switch',
      reference: 'SW',
      description: '',
      unit: {
        id: 145,
        name: 'BOOLEAN(ACTUATOR)',
        symbol: null,
        readingTypeId: 31,
        system: 'CUSTOM',
        context: null,
        inUse: true
      },
      minimum: 0,
      maximum: 1,
      readingType: {
        id: 31,
        name: 'SWITCH(ACTUATOR)',
        dataType: 'BOOLEAN',
        size: 1,
        precision: 1,
        labels: null
      }
    },
    {
      id: 49,
      name: 'Slider',
      reference: 'SL',
      description: '',
      unit: {
        id: 141,
        name: 'COUNT(ACTUATOR)',
        symbol: 'count',
        readingTypeId: 13,
        system: 'CUSTOM',
        context: null,
        inUse: true
      },
      minimum: 0,
      maximum: 100,
      readingType: {
        id: 13,
        name: 'COUNT(ACTUATOR)',
        dataType: 'NUMERIC',
        size: 1,
        precision: 1,
        labels: null
      }
    },
    {
      id: 50,
      name: 'String',
      reference: 'ST',
      description: '',
      unit: {
        id: 144,
        name: 'TEXT(ACTUATOR)',
        symbol: null,
        readingTypeId: 30,
        system: 'CUSTOM',
        context: null,
        inUse: true
      },
      minimum: null,
      maximum: null,
      readingType: {
        id: 30,
        name: 'STRING(ACTUATOR)',
        dataType: 'STRING',
        size: 1,
        precision: 1,
        labels: null
      }
    }
  ],
  alarms: [
    {
      id: 27,
      name: 'High Humidity',
      description: 'Sensor has reported a high level of humidity',
      message: 'High humidity has been detected',
      severity: 'ALERT',
      reference: 'HH'
    }
  ],
  configs: [
    {
      id: 32,
      name: 'configuration_1',
      reference: 'config_1',
      defaultValue: '',
      nullValue: null,
      description: '',
      minimum: 0,
      maximum: 100,
      dataType: 'NUMERIC',
      size: 1,
      labels: null
    },
    {
      id: 33,
      name: 'configuration_2',
      reference: 'config_2',
      defaultValue: '',
      nullValue: null,
      description: null,
      minimum: null,
      maximum: null,
      dataType: 'BOOLEAN',
      size: 1,
      labels: null
    },
    {
      id: 34,
      name: 'configuration_3',
      reference: 'config_3',
      defaultValue: '',
      nullValue: null,
      description: null,
      minimum: null,
      maximum: null,
      dataType: 'STRING',
      size: 1,
      labels: null
    },
    {
      id: 35,
      name: 'configuration_4',
      reference: 'config_4',
      defaultValue: '',
      nullValue: null,
      description: null,
      minimum: null,
      maximum: null,
      dataType: 'STRING',
      size: 3,
      labels: [
        'a',
        'b',
        'c'
      ]
    }
  ],
  inUse: true,
  generallyAvailable: true
};

export const deviceManifestFailName = 'Python Simulator 88';

export const deviceManifestFail: DeviceManifest = {
  id: 2000,
  name: 'Dummy Manifest for Failing',
  protocol: 'JsonSingleReferenceProtocol',
  firmwareUpdateProtocol: 'DFUProtocol',
  description: 'Manifest with non supported features',
  published: false,
  feeds: [],
  actuators: [],
  alarms: [],
  configs: [],
  inUse: false,
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
