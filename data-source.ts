import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/src/db/migrations/*.js'],
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
