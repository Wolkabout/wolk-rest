import Client from './Client';
import AuthenticationApi from './authentication/AuthenticationApi';
import InfoApi from './info/InfoApi';
import DashboardApi from './dashboard/DashboardApi';
import BrandApi from './brand/BrandApi';
import ReadingTypeApi from './readingType/ReadingTypeApi';
import TemplateApi from './semantics/template/TemplateApi';
import DeviceManifestApi from './device/template/DeviceManifestApi';
import MessageApi from './message/MessageApi';
import WidgetApi from './dashboard/WidgetApi';

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
  private readonly deviceManifestApi: DeviceManifestApi;
  private readonly messageApi: MessageApi;
  private readonly widgetApi: WidgetApi;

  constructor(baseURL: string) {
    this.client = new Client(baseURL);
    this.authenticationApi = new AuthenticationApi(this.client);
    this.infoApi = new InfoApi(this.client);
    this.dashboardApi = new DashboardApi(this.client);
    this.brandApi = new BrandApi(this.client);
    this.readingTypeApi = new ReadingTypeApi(this.client);
    this.templateApi = new TemplateApi(this.client);
    this.deviceManifestApi = new DeviceManifestApi(this.client);
    this.messageApi = new MessageApi(this.client);
    this.widgetApi = new WidgetApi(this.client);
  }

  auth(): AuthenticationApi {
    return this.authenticationApi;
  }
  brand(): BrandApi {
    return this.brandApi;
  }
  dashboard(): DashboardApi {
    return this.dashboardApi;
  }
  deviceManifest(): DeviceManifestApi {
    return this.deviceManifestApi;
  }
  info(): InfoApi {
    return this.infoApi;
  }
  readingType(): ReadingTypeApi {
    return this.readingTypeApi;
  }

  template(): TemplateApi {
    return this.templateApi;
  }

  widget(): WidgetApi {
    return this.widgetApi;
  }

  message(): MessageApi {
    return this.messageApi;
  }
}
