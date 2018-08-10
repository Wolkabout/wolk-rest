import { System } from './enumeration/System';

export interface Unit {
  symbol: string | null;
  readingTypeId: number;
  inUse: boolean;
  id?: number;
  system: System;
  name: string;
  context?: number | null;
}
