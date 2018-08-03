import System from './enumeration/System';

interface Unit {
  symbol: string;
  readingTypeId: number;
  inUse: boolean;
  id?: number;
  system: System;
  name: string;
}

export default Unit;
