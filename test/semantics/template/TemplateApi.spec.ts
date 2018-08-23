import { expect } from 'chai';
import { WolkREST } from '../../../src';
import { ReadingType } from '../../../src/readingType/model';
import * as fromModel from '../../../src/semantics/template/model';
import { HTTP_ERRORS } from '../../../src/utils/HTTPErrorsEnum';
import { getAuthenticatedWolkRestInstance } from '../../utils';

describe('Data Semantics - Template API', () => {
  let wolkRest: WolkREST;
  let templateId: number;

  before(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  context('[POST] /api/templates', async () => {

    let temperatureReadingType: ReadingType;
    let switchReadingType: ReadingType;
    let randomTemplateNumber: number;

    before(async () => {
      const { data: readingTypes } = await wolkRest.readingType().getList();
      temperatureReadingType = readingTypes.find(readingType => readingType.name === 'TEMPERATURE') as ReadingType;
      switchReadingType = readingTypes.find(readingType => readingType.name === 'SWITCH(ACTUATOR)') as ReadingType;
      randomTemplateNumber = Math.floor(Math.random() * 100); // to avoid creating same name template
    });

    it('Should create new template with attribute, feed, actuator and alarm', async () => {

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

      expect(newTemplateId).to.be.a('number');
      expect(status).to.equals(201);
    });

    it('Should fail to create template with same name', async () => {
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
        expect(code).to.equals(HTTP_ERRORS.CONFLICT);
      }
    });

  });

  context('[PUT] /api/templates', async () => {
    it('Should update template with attribute, feed, actuator and alarm', async () => {
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

      expect(status).to.equals(200);
    });

    it('Should fail to update template', async () => {
      const templateDto: fromModel.Template = {
        name: `Template ${templateId}`,
        description: 'Template 1 Description IS UPDATED',
        feeds: [],
        actuators: [],
        alarms: [],
        id: templateId
      };
      const failingDto = Object.assign({}, templateDto, { id: 20000 });
      try {
        await wolkRest.template().updateTemplate(templateDto);
      } catch ({ code }) {
        expect(code).to.equals(HTTP_ERRORS.NOT_FOUND);
      }
    });

  });

  context('[DELETE] /api/templates', async () => {
    it('Should delete template', async () => {
      const { status } = await wolkRest.template().deleteTemplate(templateId);

      expect(status).to.equals(200);
    });

    it('Should fail to delete template', async () => {
      try {
        await wolkRest.template().deleteTemplate(templateId);
      } catch ({ code }) {
        expect(code).to.equals(HTTP_ERRORS.NOT_FOUND);
      }
    });
  });

});
