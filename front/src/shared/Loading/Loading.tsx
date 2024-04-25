import { Player } from '@lottiefiles/react-lottie-player';
import { FC } from 'react';

const Loading: FC = () => (
  <div className="h-30 w-full flex justify-center items-center">
    <Player
      src="lotties/loading-2.json"
      className="player w-md p-0 m-0"
      style={{ height: '80px', width: '80px' }}
      loop
      autoplay
    />
  </div>
);

export default Loading;
