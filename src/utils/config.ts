import { config } from 'dotenv';

const configLoaded = config();

if (configLoaded.error) {
  // tslint:disable-next-line: no-console
  console.error('Failed to load config.', configLoaded.error);
  throw configLoaded.error;
}

export const WA_TEST_BASEURL = String(process.env.WA_TEST_BASEURL);
export const WA_TEST_USER = String(process.env.WA_TEST_USER);
export const WA_TEST_PASS = String(process.env.WA_TEST_PASS);

export const WA_TEST_USER_NO_ACCESS = String(process.env.WA_TEST_USER_NO_ACCESS);
export const WA_TEST_PASS_NO_ACCESS = String(process.env.WA_TEST_PASS_NO_ACCESS);
