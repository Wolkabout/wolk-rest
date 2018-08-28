import { ReadingType } from '../../../src/readingType/model';
import * as fromModel from '../../../src/semantics/template/model';
import { HTTP_ERRORS } from '../../../src/utils/HTTPErrorsEnum';
import { WolkREST } from '../../../src/wolk-rest';
import { getAuthenticatedWolkRestInstance } from '../../utils';

describe('Data Semantics - Template API', () => {
  let wolkRest: WolkREST;
  let templateId: number;

  beforeAll(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  describe('[POST] /api/templates', async () => {
    let temperatureReadingType: ReadingType;
    let switchReadingType: ReadingType;
    let randomTemplateNumber: number;

    beforeAll(async () => {
      const { data: readingTypes } = await wolkRest.readingType().getList();
      temperatureReadingType = readingTypes.find(readingType => readingType.name === 'TEMPERATURE');
      switchReadingType = readingTypes.find(readingType => readingType.name === 'SWITCH(ACTUATOR)');
      randomTemplateNumber = Math.floor(Math.random() * 100); // to avoid creating same name template
    });

    test('Should create new template with attribute, feed, actuator and alarm', async () => {
      const templateDto: fromModel.Template = {
        name: `Template ${randomTemplateNumber}`,
        description: 'Template 1 Description',
        attributes: [
          {
            name: 'Website',
            type: fromModel.TemplateAttributeType.STRING,
            required: true
          }
        ],
        feeds: [
          {
            name: 'Temperature',
            readingType: temperatureReadingType,
            unit: temperatureReadingType.defaultUnit
          }
        ],
        actuators: [
          {
            name: 'Switch',
            readingType: switchReadingType,
            unit: switchReadingType.defaultUnit
          }
        ],
        alarms: [
          {
            name: 'Alarm'
          }
        ]
      };

      // Create new Template using Temperature Reading type and its default unit
      const { data: newTemplateId, status } = await wolkRest.template().createTemplate(templateDto);
      templateId = newTemplateId;

      expect(typeof newTemplateId).toBe('number');
      expect(status).toEqual(201);
    });

    test('Should fail to create template with same name', async () => {
      try {
        const templateDto: fromModel.Template = {
          name: `Template 1`,
          description: 'Template 1 Description IS CREATED',
          feeds: [],
          actuators: [],
          alarms: [],
          id: templateId
        };
        // Create new Template using Temperature Reading type and its default unit
        await wolkRest.template().createTemplate(templateDto);
      } catch ({ code, type, messages }) {
        expect(code).toEqual(HTTP_ERRORS.CONFLICT);
      }
    });
  });

  describe('[PUT] /api/templates', async () => {
    test('Should update template with attribute, feed, actuator and alarm', async () => {
      const templateDto: fromModel.Template = {
        name: `Template ${templateId}`,
        description: 'Template 1 Description IS UPDATED',
        feeds: [],
        actuators: [],
        alarms: [],
        id: templateId
      };
      // Create new Template using Temperature Reading type and its default unit
      const { status } = await wolkRest.template().updateTemplate(templateDto);

      expect(status).toEqual(200);
    });

    test('Should fail to update template', async () => {
      const templateDto: fromModel.Template = {
        name: `Template ${templateId}`,
        description: 'Template 1 Description IS UPDATED',
        feeds: [],
        actuators: [],
        alarms: [],
        id: templateId
      };
      try {
        await wolkRest.template().updateTemplate(templateDto);
      } catch ({ code }) {
        expect(code).toEqual(HTTP_ERRORS.NOT_FOUND);
      }
    });
  });

  describe('[DELETE] /api/templates', async () => {
    test('Should delete template', async () => {
      const { status } = await wolkRest.template().deleteTemplate(templateId);

      expect(status).toEqual(200);
    });

    test('Should fail to delete template', async () => {
      try {
        await wolkRest.template().deleteTemplate(templateId);
      } catch ({ code }) {
        expect(code).toEqual(HTTP_ERRORS.NOT_FOUND);
      }
    });
  });
});
