import { config } from 'dotenv';

const ENV = process.env.NODE_ENV;
let entities: string, migrations: string;
let seeds: string, factories: string;
(() => {
  switch (ENV) {
    case 'dev':
      entities = 'src/entities/*.entity{.ts,.js}';
      migrations = 'src/migrations/**/*.ts';
      seeds = 'src/database/seeds/*.seed{.ts,.js}';
      factories = 'src/database/factories/*.factory{.ts,.js}';
      break;
    default:
      entities = 'build/entities/*.entity.js';
      migrations = 'build/migrations/**/*.js';
      seeds = 'build/database/seeds/*.seed.js';
      factories = 'build/database/factories/*.factory.js';
      break;
  }
})();
export { entities, migrations, seeds, factories };

const getenv = (env): string => {
  switch (env) {
    case 'local':
      return '.env.production';
    case 'prod':
      return '.env.production';
    default:
      return '.env';
  }
};
const configEnv = config({ path: getenv(ENV) });

export default configEnv;
