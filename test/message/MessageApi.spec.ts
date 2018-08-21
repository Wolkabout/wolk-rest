import { expect } from 'chai';
import { WolkREST } from '../../src';
import { getAuthenticatedWolkRestInstance } from '../utils';

describe('Message API', () => {
  let wolkRest: WolkREST;

  before(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  context('[GET] /api/messages', async () => {
    it('Should get paged messages, without any params', async () => {
      const { data: pageMessages, status } = await wolkRest.message().pageMessages();

      expect(status).to.equal(200);
      expect(pageMessages.content).to.be.an.instanceof(Array);
    });

    it('Should get paged messages with params', async () => {
      const params = {
        since: 0,
        to: 0,
        type: 'ALARM',
        query: '',
        read: false
      };
      const { data: pageMessages, status } = await wolkRest.message().pageMessages(params);

      expect(status).to.equal(200);
      expect(pageMessages.content).to.be.an.instanceof(Array);
    });

    it('Should get unread alarms', async () => {
      const { data: unreadAlarms, status } = await wolkRest.message().unreadAlarms();

      expect(status).to.equal(200);
      expect(unreadAlarms).to.be.an.instanceof(Array);
    });
  });

  context('[PUT] /api/messages/markAsRead', async () => {
    it('Should mark zero messages as read', async () => {
      const { status } = await wolkRest.message().markAsRead([]);

      expect(status).to.equal(200);
    });
  });

  context('[GET] /api/messages/unreadCount?type=ALARM', async () => {
    it('Should get number of unread ALARM messages', async () => {
      const { data: unreadAlarmsCount, status } = await wolkRest.message().countUnreadAlarms();

      expect(status).to.equal(200);
      expect(unreadAlarmsCount).to.be.a('number');
    });
  });

  context('[PUT] /api/messages/markAsReadAll', async () => {
    it('Should mark all messages as read', async () => {
      const { status } = await wolkRest.message().markAsReadAll();

      expect(status).to.equal(200);
    });
  });

});
