import { StorageType } from './enumeration/StorageType';
import { SessionStorage } from './SessionStorage';

export interface SessionStorageConfig {
  custom?: SessionStorage;
  autoSave: boolean;
  type: StorageType;
}
