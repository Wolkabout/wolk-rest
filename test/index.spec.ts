import { SessionStorage } from '../src/model/SessionStorage';
import { BrowserLocalStorage, InMemoryStorage, WolkREST } from '../src/wolk-rest';

describe('Index', () => {
  test('Should export WolkREST Client', () => {
    expect(WolkREST).toEqual(WolkREST);
  });

  test('Should export InMemoryStorage', () => {
    expect(InMemoryStorage).toBeInstanceOf(Function);
  });

  test('Should export BrowserLocalStorage', () => {
    expect(BrowserLocalStorage).toBeInstanceOf(Function);
  });

  test('Should initialize WolkREST Client with default storage', () => {
    const instance = new WolkREST('https://example.com');

    expect(instance).toBeInstanceOf(Object);
    expect(() => {
      instance.auth();
    }).not.toThrow();
  });

  test('Should initialize WolkREST Client with custom storage', () => {
    const customStorage: SessionStorage = {
      getToken(): string {
        return '';
      },
      setToken(token: string): void {},
      clearToken(): void {}
    };
    const instance = new WolkREST('https://example.com', customStorage);

    expect(instance).toBeInstanceOf(Object);
    expect(() => {
      instance.auth();
    }).not.toThrow();
  });

  test('Should fail to initialize WolkREST Client with BrowserLocalStorage storage', () => {
    try {
      const localStorage = new BrowserLocalStorage();
      new WolkREST('https://example.com', localStorage);
    } catch (error) {
      expect(error.message).toEqual(
        'BrowserLocalStorage can only be initialized in browser with Local Storage support.'
      );
    }
  });
});
