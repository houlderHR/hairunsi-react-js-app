import 'reflect-metadata';
import { DataSource } from 'typeorm';
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
config({ path: getenv(ENV) });
console.log(ENV);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT!),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS],
});
AppDataSource.initialize()
  .then(() => {
    console.log('Connection success');
  })
  .catch((e) => console.error(e));
