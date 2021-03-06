import * as fromConfig from '../../src/utils/config';
import { WolkREST } from '../../src/wolk-rest';

/**
 * Check if provided parameter is typeof 'boolean'
 * @param n Can be anything
 * @returns {Boolean} true or false
 */
export function isTypeofBoolean(n: any) {
  return typeof n === 'boolean';
}

/**
 * @returns Returns string containing exactly 5 random characters
 */
export function getRandomString() {
  return Math.random()
    .toString(36)
    .substr(2, 5);
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

/**
 * Helper function to be used for test preparation
 * @returns {Promise<WolkREST>} Authenticated user with no rights on platform
 */
export async function getUserWithNoRights(): Promise<WolkREST> {
  const wolkRest = new WolkREST(fromConfig.WA_TEST_BASEURL);

  await wolkRest.auth().emailSignIn({
    username: fromConfig.WA_TEST_USER_NO_ACCESS,
    password: fromConfig.WA_TEST_PASS_NO_ACCESS
  });

  return wolkRest;
}
