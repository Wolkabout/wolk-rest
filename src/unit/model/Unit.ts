import { System } from './enumeration/System';

export interface Unit {
  symbol: string;
  readingTypeId: number;
  inUse: boolean;
  id?: number;
  system: System;
  name: string;
}
