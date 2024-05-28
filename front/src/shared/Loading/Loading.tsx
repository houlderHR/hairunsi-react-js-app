import Lottie from 'lottie-react';
import { FC } from 'react';
import loading from '../../assets/lotties/loading.json';

const Loading: FC = () => (
  <div className="h-30 w-full flex justify-center items-center">
    <Lottie animationData={loading} style={{ height: '80px', width: '80px' }} loop />
  </div>
);

export default Loading;
