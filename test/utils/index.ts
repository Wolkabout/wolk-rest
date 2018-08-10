import WolkREST from '../../src';
import * as fromConfig from '../../src/utils/config';

export function isTypeofBoolean(n: any) {
  return typeof n === 'boolean';
}

/**
 * Helper function to be used for test preparation
 * @returns {Promise<WolkREST>} Authenticated instance of WolkREST Class
 */
export async function getAuthenticatedWolkRestInstance(): Promise<WolkREST> {
  const wolkRest = new WolkREST(fromConfig.WA_TEST_BASEURL);

  await wolkRest.auth().emailSignIn({
    username: fromConfig.WA_TEST_USER,
    password: fromConfig.WA_TEST_PASS
  });

  return wolkRest;
}
