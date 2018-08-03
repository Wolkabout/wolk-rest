import Brand from '../../brand/model/Brand';

interface ServerDetails {
  maxRulesPerContext: number;
  addOns: {
    supportNewsletter?: boolean
  };
  minSupportedVersion: string;
  userManagementEnabled: boolean;
  maxDashboardsPerContext: number;
  version: string;
  whiteLabeling: Brand;
  privacyPolicyUrl: string;
  maxDevicesPerContext: number;
  modules: string[];
  termsUrl: string;
  organization: string;
  multipleContexts: boolean;
  maxReportsPerContext: number;
  expiration: number;
  dataProtocols: string[];
}

export default ServerDetails;
