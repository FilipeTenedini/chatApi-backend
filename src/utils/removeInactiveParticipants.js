import dayjs from 'dayjs';
import participantService from '../services/participant.service.js';
import messageService from '../services/message.service.js';

async function removeInactiveParticipants() {
  setInterval(async () => {
    try {
      const tenSecondsAgo = Date.now() - 10000;
      const inactiveUsers = await participantService.find(tenSecondsAgo);
      const inactiveUsersId = inactiveUsers.map((user) => user._id);

      if (inactiveUsers) {
        await participantService.destroy(inactiveUsersId);

        const inactiveUsersLogoutMsg = inactiveUsers.map((i) => (
          {
            from: i.name,
            to: 'Todos',
            text: 'sai da sala...',
            type: 'status',
            time: dayjs(Date.now()).format('HH:mm:ss'),
          }
        ));
        await messageService.createMsgs(inactiveUsersLogoutMsg);
      }
    } catch (err) {
      console.log(err.message);
    }
  }, 15000);
}

export default removeInactiveParticipants;
