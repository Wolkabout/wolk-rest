export interface SessionStorage {
  getToken(): string;
  setToken(token: string): void;
  clearToken(): void;
}
