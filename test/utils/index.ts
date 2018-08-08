import WolkREST from '../../src';
import environment from '../resources/environment';
import user from '../authentication/resources/user';

export function isTypeofBoolean(n: any) {
  return typeof n === 'boolean';
}

/**
 * Helper function to be used for test preparation
 * @returns {Promise<WolkREST>} Authenticated instance of WolkREST Class
 */
export async function getAuthenticatedWolkRestInstance(): Promise<WolkREST> {
  const wolkRest = new WolkREST(environment.baseURL);

  await wolkRest.auth().emailSignIn({
    username: user.valid.email,
    password: user.valid.password
  });

  return wolkRest;
}
