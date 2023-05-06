import { DataSource, DataSourceOptions } from 'typeorm';
import { FriendRequestEntity, UserEntity } from '@app/shared';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URI,
  entities: [UserEntity, FriendRequestEntity],
  migrations: ['dist/apps/auth/apps/auth/src/db/migrations/*.js'],
};

export const dataSource = new DataSource(dataSourceOptions);
