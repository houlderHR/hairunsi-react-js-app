require('dotenv').config({ path: '.env.test' });
import { DataSource } from 'typeorm';
import { entities, migrations } from '../../utils/config';

const testDataSource = new DataSource({
  type: 'postgres',
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  entities: [entities],
  migrations: [migrations],
  synchronize: false,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  port: +process.env.DATABASE_PORT,
});

export default testDataSource;
