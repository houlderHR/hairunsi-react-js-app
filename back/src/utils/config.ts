import { config } from 'dotenv';

const ENV = process.env.NODE_ENV;
let entities: string, migrations: string;
(() => {
  switch (ENV) {
    case 'dev':
      entities = 'src/entities/*.entity{.ts,.js}';
      migrations = 'src/migrations/**/*.ts';
      break;
    default:
      entities = 'build/entities/*.entity.js';
      migrations = 'build/migrations/**/*.js';
      break;
  }
})();
export { entities, migrations };

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
