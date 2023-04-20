import { DataSource, DataSourceOptions } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URI,
  entities: [UserEntity],
  migrations: ['dist/apps/auth/apps/auth/src/db/migrations/*.js'],
};

export const dataSource = new DataSource(dataSourceOptions);
