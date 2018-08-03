import { expect } from 'chai';
import WolkREST from '../../../src';
import environment from '../../resources/environment';
import user from '../../authentication/resources/user';
import ReadingType from '../../../src/readingType/model/ReadingType';
import Template from '../../../src/semantics/template/model/Template';
import TemplateAttributeType from '../../../src/semantics/template/model/enumeration/TemplateAttributeType';

describe('ReadingType API', () => {
  let wolkRest: WolkREST;

  before(async () => {
    wolkRest = new WolkREST(environment.baseURL);
    await wolkRest.auth().emailSignIn({
      username: user.valid.email,
      password: user.valid.password
    });
  });

  context('[POST] /api/templates', async () => {
    it('Should create new template with attribute, feed, actuator and alarm', async () => {
      const readingTypes: ReadingType[] = await wolkRest.readingType().getList();
      const temperatureReadingType = readingTypes.find(readingType => readingType.name === 'TEMPERATURE');
      const switchReadingType = readingTypes.find(readingType => readingType.name === 'SWITCH(ACTUATOR)');

      const templateDto: Template = {
        name: 'Template 1',
        description: 'Template 1 Description',
        attributes: [
          {
            name: 'Website',
            type: TemplateAttributeType.STRING,
            required: true
          }
        ],
        feeds: [
          {
            name: 'Temperature',
            readingType: temperatureReadingType,
            unit: temperatureReadingType!.defaultUnit
          }
        ],
        actuators: [
          {
            name: 'Switch',
            readingType: switchReadingType,
            unit: switchReadingType!.defaultUnit
          }
        ],
        alarms: [
          {
            name: 'Alarm'
          }
        ]
      };

      // Create new Template using Temperature Reading type and its default unit
      const newTemplateId = await wolkRest.template().createTemplate(templateDto);

      expect(newTemplateId).to.be.a('number');
    });
  });

});
