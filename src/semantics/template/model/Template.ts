import ActuatorTemplate from './ActuatorTemplate';
import AlarmTemplate from './AlarmTemplate';
import FeedTemplate from './FeedTemplate';
import TemplateAttribute from './TemplateAttribute';

interface Template {
  actuators?: ActuatorTemplate[];
  alarms?: AlarmTemplate[];
  name: string;
  feeds?: FeedTemplate[];
  description: string;
  attributes?: TemplateAttribute[];
  id?: number;
}

export default Template;
