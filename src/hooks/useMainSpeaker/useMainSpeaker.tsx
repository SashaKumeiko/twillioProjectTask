import useVideoContext from '../useVideoContext/useVideoContext';
import useParticipants from '../useParticipants/useParticipants';
import useScreenShareParticipant from '../useScreenShareParticipant/useScreenShareParticipant';
import useSelectedParticipant from '../../components/VideoProvider/useSelectedParticipant/useSelectedParticipant';
import { useEffect, useState } from 'react';
import { Participant } from 'twilio-video';

export default function useMainSpeaker() {
  const [selectedParticipant] = useSelectedParticipant();
  const screenShareParticipant = useScreenShareParticipant();
  const participants = useParticipants();
  const {
    room: { localParticipant },
  } = useVideoContext();

  const [attachedUser, setAttachedUser] = useState<Participant>();
  useEffect(() => {
    if (!attachedUser) {
      const attUser = participants.find(user => {
        return user.identity === '1';
      });
      setAttachedUser(attUser);
    }
  }, []);

  // The participant that is returned is displayed in the main video area. Changing the order of the following
  // variables will change the how the main speaker is determined.
  return selectedParticipant || screenShareParticipant || attachedUser || localParticipant;
}
