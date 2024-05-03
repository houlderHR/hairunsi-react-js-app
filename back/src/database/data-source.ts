import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

import '../utils/config';

import { entities, factories, migrations, seeds } from '../utils/config';
import { SeederOptions, runSeeders } from 'typeorm-extension';
import logger from '../utils/logger';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT!),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: false,
  seedTracking: false,
  entities: [entities],
  migrations: [migrations],
  seeds: [seeds],
  factories: [factories],
};

export const AppDataSource = new DataSource(options);
AppDataSource.initialize()
  .then(async () => {
    await runSeeders(AppDataSource);
    logger.info('Connection success');
  })
  .catch((e) => logger.error(e));
