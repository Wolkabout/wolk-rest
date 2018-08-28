import { WolkREST } from '../../src/wolk-rest';
import { getAuthenticatedWolkRestInstance } from '../utils';

describe('Message API', () => {
  let wolkRest: WolkREST;

  beforeAll(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  describe('[GET] /api/messages', async () => {
    test('Should get paged messages, without any params', async () => {
      const { data: pageMessages, status } = await wolkRest.message().pageMessages();

      expect(status).toEqual(200);
      expect(pageMessages.content).toBeInstanceOf(Array);
    });

    test('Should get paged messages with params', async () => {
      const params = {
        since: 0,
        to: 0,
        type: 'ALARM',
        query: '',
        read: false
      };
      const { data: pageMessages, status } = await wolkRest.message().pageMessages(params);

      expect(status).toEqual(200);
      expect(pageMessages.content).toBeInstanceOf(Array);
    });

    test('Should get unread alarms', async () => {
      const { data: unreadAlarms, status } = await wolkRest.message().unreadAlarms();

      expect(status).toEqual(200);
      expect(unreadAlarms).toBeInstanceOf(Array);
    });
  });

  describe('[PUT] /api/messages/markAsRead', async () => {
    test('Should mark zero messages as read', async () => {
      const { status } = await wolkRest.message().markAsRead([]);

      expect(status).toEqual(200);
    });
  });

  describe('[GET] /api/messages/unreadCount?type=ALARM', async () => {
    test('Should get number of unread ALARM messages', async () => {
      const { data: unreadAlarmsCount, status } = await wolkRest.message().countUnreadAlarms();

      expect(status).toEqual(200);
      expect(typeof unreadAlarmsCount).toEqual('number');
    });
  });

  describe('[PUT] /api/messages/markAsReadAll', async () => {
    test('Should mark all messages as read', async () => {
      const { status } = await wolkRest.message().markAsReadAll();

      expect(status).toEqual(200);
    });
  });
});
