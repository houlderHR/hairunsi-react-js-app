import { config } from 'dotenv';

const ENV = process.env.NODE_ENV;

const getenv = (env): string => {
  switch (env) {
    case 'local':
      return '.env.production';
    case 'prod':
      return '.env.local';

    default:
      return '.env';
  }
};
const configEnv = config({ path: getenv(ENV) });

export default configEnv;
