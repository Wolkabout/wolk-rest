import { expect } from 'chai';
import { SessionStorage } from '../src/model/SessionStorage';
import { BrowserLocalStorage, InMemoryStorage, WolkREST } from '../src/wolk-rest';

describe('Index', () => {
  it('Should export WolkREST Client', () => {
    expect(WolkREST).to.equal(WolkREST);
  });

  it('Should export InMemoryStorage', () => {
    expect(InMemoryStorage).to.be.a('function');
  });

  it('Should export BrowserLocalStorage', () => {
    expect(BrowserLocalStorage).to.be.a('function');
  });

  it('Should initialize WolkREST Client with default storage', () => {
    const instance = new WolkREST('https://example.com');

    expect(instance).to.be.an('object');
    expect(instance.auth()).to.not.throw;
  });

  it('Should initialize WolkREST Client with custom storage', () => {
    const customStorage: SessionStorage = {
      getToken(): string {
        return '';
      },
      setToken(token: string): void {
      },
      clearToken(): void {
      }
    };
    const instance = new WolkREST('https://example.com', customStorage);

    expect(instance).to.be.an('object');
    expect(instance.auth()).to.not.throw;
  });

  it('Should fail to initialize WolkREST Client with BrowserLocalStorage storage', () => {
    try {
      const localStorage = new BrowserLocalStorage();
      new WolkREST('https://example.com', localStorage);
    } catch (error) {
      expect(error.message).to.be.equal(
        'BrowserLocalStorage can only be initialized in browser with Local Storage support.'
      );

    }
  });
});
