import { expect } from 'chai';
import WolkREST from '../src';

describe('Index', () => {
  it('Should export WolkREST Client', () => {
    expect(WolkREST).to.equal(WolkREST);
  });
});
