import { ReadingType } from '../../../src/readingType/model';
import * as fromModel from '../../../src/semantics/template/model';
import { HTTP_ERRORS } from '../../../src/utils/HTTPErrorsEnum';
import { WolkREST } from '../../../src/wolk-rest';
import { getAuthenticatedWolkRestInstance } from '../../utils';

describe('Data Semantics - Template API', () => {
  let wolkRest: WolkREST;
  let templateDto: fromModel.Template;

  beforeAll(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();

    // Prepare template dto
    try {
      const { data: readingTypes } = await wolkRest.readingType().getList();
      const temperatureReadingType = readingTypes.find(readingType => readingType.name === 'TEMPERATURE');
      const switchReadingType = readingTypes.find(readingType => readingType.name === 'SWITCH(ACTUATOR)');
      templateDto = {
        name: `WRT Template`,
        description: 'WRT Template Description',
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
    } catch (error) {
      // failed test preparation
    }
  });

  describe('[GET] /api/templates', async () => {
    test('Should get templates', async () => {
      const { status } = await wolkRest.template().getTemplates();

      expect(status).toEqual(200);
    });
  });

  describe('[GET] /api/templates (short)', async () => {
    test('Should get templates (short)', async () => {
      const { status } = await wolkRest.template().getTemplatesShort();

      expect(status).toEqual(200);
    });
  });

  describe('[GET] /api/templates (paged)', async () => {
    test('Should get templates (paged)', async () => {
      const { data: pagedTemplates, status } = await wolkRest.template().getTemplatesPaged();

      expect(status).toEqual(200);
      expect(typeof pagedTemplates).toBe('object');
      expect(Object.keys(pagedTemplates)).toContain('content');
    });
  });

  describe('[POST] /api/templates', async () => {
    beforeAll(async () => {
      try {
        const { data } = await wolkRest.template().getTemplates(templateDto.name);
        const [templateExist] = data;

        if (templateExist) {
          await wolkRest.template().deleteTemplate(templateExist.id);
        }
      } catch (error) {
        // create template test preparation failed
      }
    });

    test('Should create new template with attribute, feed, actuator and alarm', async () => {
      const { data: newTemplateId, status } = await wolkRest.template().createTemplate(templateDto);

      expect(typeof newTemplateId).toBe('number');
      expect(status).toEqual(201);
    });

    test('Should fail to create template with same name', async () => {
      try {
        await wolkRest.template().createTemplate(templateDto);
      } catch ({ code, type, messages }) {
        expect(code).toEqual(HTTP_ERRORS.CONFLICT);
      }
    });
  });

  describe('[PUT] /api/templates', async () => {
    let existingTemplateId: Number;

    beforeAll(async () => {
      try {
        const { data } = await wolkRest.template().getTemplates(templateDto.name);
        const [templateExist] = data;

        if (templateExist) {
          existingTemplateId = templateExist.id;
        } else {
          const { data } = await wolkRest.template().createTemplate(templateDto);
          existingTemplateId = data;
        }
      } catch (error) {
        // create template test preparation failed
      }
    });

    test('Should update template with attribute, feed, actuator and alarm', async () => {
      // Create new Template using Temperature Reading type and its default unit
      const updateTemplateDto = Object.assign(templateDto, {
        id: existingTemplateId
      });
      const { status } = await wolkRest.template().updateTemplate(updateTemplateDto);
      expect(status).toEqual(200);
    });
  });

  describe('[DELETE] /api/templates', async () => {
    let templateId: Number;

    beforeAll(async () => {
      try {
        const { data } = await wolkRest.template().getTemplates(templateDto.name);
        const [templateExist] = data;

        if (templateExist) {
          templateId = templateExist.id;
        } else {
          const { data } = await wolkRest.template().createTemplate(templateDto);
          templateId = data;
        }
      } catch (error) {
        // create template test preparation failed
      }
    });

    test('Should delete template', async () => {
      const { status } = await wolkRest.template().deleteTemplate(templateId);

      expect(status).toEqual(200);
    });
  });
});
