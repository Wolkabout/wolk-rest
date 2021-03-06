import AuthenticationApi from './authentication/AuthenticationApi';
import BrandApi from './brand/BrandApi';
import Client from './Client';
import DashboardApi from './dashboard/DashboardApi';
import WidgetApi from './dashboard/WidgetApi';
import DeviceApi from './device/DeviceApi';
import DeviceManifestApi from './device/template/DeviceManifestApi';
import EndpointApi from './endpoint/EndpointApi';
import InfoApi from './info/InfoApi';
import MessageApi from './message/MessageApi';
import { SessionStorage } from './model/SessionStorage';
import ProfileApi from './profile/ProfileApi';
import ReadingTypeApi from './readingType/ReadingTypeApi';
import ReportApi from './report/ReportApi';
import TemplateApi from './semantics/template/TemplateApi';
import UnitApi from './unit/UnitApi';
import BrowserLocalStorage from './utils/BrowserLocalStorage';
import InMemoryStorage from './utils/InMemoryStorage';

/**
 * Default constructor.
 * @param baseURL Your WolkAbout IoT Tool host.
 */
export class WolkREST {
  private readonly authenticationApi: AuthenticationApi;
  private readonly brandApi: BrandApi;
  private readonly client: Client;
  private readonly dashboardApi: DashboardApi;
  private readonly deviceApi: DeviceApi;
  private readonly deviceManifestApi: DeviceManifestApi;
  private readonly endpointApi: EndpointApi;
  private readonly infoApi: InfoApi;
  private readonly messageApi: MessageApi;
  private readonly profileApi: ProfileApi;
  private readonly readingTypeApi: ReadingTypeApi;
  private readonly reportApi: ReportApi;
  private readonly templateApi: TemplateApi;
  private readonly widgetApi: WidgetApi;
  private readonly unitApi: UnitApi;

  constructor(baseURL: string, storage: SessionStorage = new InMemoryStorage()) {
    this.client = new Client(baseURL, storage);

    // APIs
    this.authenticationApi = new AuthenticationApi(this.client);
    this.brandApi = new BrandApi(this.client);
    this.dashboardApi = new DashboardApi(this.client);
    this.deviceApi = new DeviceApi(this.client);
    this.deviceManifestApi = new DeviceManifestApi(this.client);
    this.endpointApi = new EndpointApi(this.client);
    this.infoApi = new InfoApi(this.client);
    this.messageApi = new MessageApi(this.client);
    this.profileApi = new ProfileApi(this.client);
    this.readingTypeApi = new ReadingTypeApi(this.client);
    this.reportApi = new ReportApi(this.client);
    this.templateApi = new TemplateApi(this.client);
    this.widgetApi = new WidgetApi(this.client);
    this.unitApi = new UnitApi(this.client);
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
  device(): DeviceApi {
    return this.deviceApi;
  }
  deviceManifest(): DeviceManifestApi {
    return this.deviceManifestApi;
  }
  info(): InfoApi {
    return this.infoApi;
  }
  endpoint(): EndpointApi {
    return this.endpointApi;
  }
  message(): MessageApi {
    return this.messageApi;
  }
  profile(): ProfileApi {
    return this.profileApi;
  }
  readingType(): ReadingTypeApi {
    return this.readingTypeApi;
  }
  report(): ReportApi {
    return this.reportApi;
  }
  template(): TemplateApi {
    return this.templateApi;
  }
  unit(): UnitApi {
    return this.unitApi;
  }
  widget(): WidgetApi {
    return this.widgetApi;
  }
}

export { BrowserLocalStorage, InMemoryStorage };
