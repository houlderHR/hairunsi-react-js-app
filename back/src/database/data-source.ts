import 'reflect-metadata';
import { DataSource } from 'typeorm';

import '../utils/config';

import { entities, migrations } from '../utils/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT!),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: [entities],
  migrations: [migrations],
});
AppDataSource.initialize()
  .then(() => {
    console.log('Connection success');
  })
  .catch((e) => console.error(e));
