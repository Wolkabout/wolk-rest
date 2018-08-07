export default ({
  id: 228,
  name: 'Python Simulator Manifest 88',
  protocol: 'JsonMultiReferenceProtocol',
  description: 'New Python Simulator Manifest',
  published: true,
  feeds: [
    {
      id: 139,
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
      maximum: 80,
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
      id: 140,
      name: 'Pritisak',
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
      minimum: 900,
      maximum: 1100,
      readingType: {
        id: 3,
        name: 'PRESSURE',
        dataType: 'NUMERIC',
        size: 1,
        precision: 1,
        labels: null
      }
    }
  ],
  actuators: [
    {
      id: 133,
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
      id: 134,
      name: 'Slajder',
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
    }
  ],
  alarms: [
    {
      id: 45,
      name: 'Temperature High',
      description: 'Eto sto sam vruc',
      message: 'Ala je vruce',
      severity: 'CRITICAL',
      reference: 'TH'
    },
    {
      id: 46,
      name: 'Visoka Vlaznost',
      description: 'So damp',
      message: 'Very moist',
      severity: 'ERROR',
      reference: 'ALM'
    }
  ],
  configs: [],
  inUse: true,
  generallyAvailable: false
});
