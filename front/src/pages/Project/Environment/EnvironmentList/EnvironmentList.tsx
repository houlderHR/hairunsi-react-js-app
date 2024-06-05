import ENVIRONMENTS from '../constant';
import EnvDetail from './EnvDetail';

const EnvironmentList = () =>
  ENVIRONMENTS.length > 0 &&
  ENVIRONMENTS.map((env: { label: string; link: string }, key: number) => (
    <EnvDetail item={env} key={`${key.toString()} `} />
  ));
export default EnvironmentList;
