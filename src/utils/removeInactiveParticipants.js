import dayjs from 'dayjs';
import participantRepository from '../repositories/participant.repository.js';
import messageRepository from '../repositories/message.repository.js';

function removeInactiveParticipants() {
  setInterval(async () => {
    try {
      const tenSecondsAgo = Date.now() - 10000;
      const inactiveUsers = await participantRepository.find(tenSecondsAgo);
      const inactiveUsersId = inactiveUsers.map((user) => user._id);

      if (inactiveUsers.length > 0) {
        console.log(inactiveUsers);
        await participantRepository.destroy(inactiveUsersId);

        const inactiveUsersLogoutMsg = inactiveUsers.map((i) => (
          {
            from: i.name,
            to: 'Todos',
            text: 'sai da sala...',
            type: 'status',
            time: dayjs(Date.now()).format('HH:mm:ss'),
          }
        ));
        await messageRepository.createMsgs(inactiveUsersLogoutMsg);
      }
    } catch (err) {
      console.log(err.message);
    }
  }, 15000);
}

export default removeInactiveParticipants;
