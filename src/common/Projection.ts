export enum BasicProjection {
  /**
   * Named projection
   */
  NAMED_ENTITY_PROJECTION = 'NamedEntity',
  /**
   * Id projection
   */
  ID_PROJECTION = 'Id'
}

export enum DeviceProjection {
  DEVICE_ACTUATOR_BASIC = 'deviceActuatorBasic',
  DEVICE_ALARM_BASIC = 'DeviceAlarmBasic',
  DEVICE_CONFIG_BASIC = 'DeviceConfigBasic',
  DEVICE_SENSOR_BASIC = 'DeviceSensorBasic',
  DEVICE_BASIC = 'DeviceBasic',
  DEVICE_EXTENDED = 'DeviceExtended'
}

export type DeviceProjectionUnion = BasicProjection | DeviceProjection;
