import Client from './Client';
import AuthenticationApi from './authentication/AuthenticationApi';
import InfoApi from './info/InfoApi';
import DashboardApi from './dashboard/DashboardApi';
import BrandApi from './brand/BrandApi';
import ReadingTypeApi from './readingType/ReadingTypeApi';
import TemplateApi from './semantics/template/TemplateApi';

/**
 * Default constructor.
 * @param baseURL Your WolkAbout IoT Tool host.
 */
export default class WolkREST {
  private readonly client: Client;
  private readonly authenticationApi: AuthenticationApi;
  private readonly infoApi: InfoApi;
  private readonly dashboardApi: DashboardApi;
  private readonly brandApi: BrandApi;
  private readonly readingTypeApi: ReadingTypeApi;
  private readonly templateApi: TemplateApi;

  constructor(baseURL: string) {
    this.client = new Client(baseURL);
    this.authenticationApi = new AuthenticationApi(this.client);
    this.infoApi = new InfoApi(this.client);
    this.dashboardApi = new DashboardApi(this.client);
    this.brandApi = new BrandApi(this.client);
    this.readingTypeApi = new ReadingTypeApi(this.client);
    this.templateApi = new TemplateApi(this.client);
  }

  auth(): AuthenticationApi {
    return this.authenticationApi;
  }

  info(): InfoApi {
    return this.infoApi;
  }

  dashboard(): DashboardApi {
    return this.dashboardApi;
  }

  brand(): BrandApi {
    return this.brandApi;
  }

  readingType(): ReadingTypeApi {
    return this.readingTypeApi;
  }

  template(): TemplateApi {
    return this.templateApi;
  }
}
