import { Knex } from 'knex';
import * as path from 'path';
import { ConnectionOptions } from 'tls';
import env from '../user.env';

let ssl: ConnectionOptions | boolean = env.USER_DB_SSL;

if (ssl && env.USER_DB_IGNORE_SERVER_IDENTITY) {
  ssl = {
    checkServerIdentity: () => undefined,
  };
}

const knexConfigs: Knex.Config = {
  client: 'pg',
  connection: {
    host: env.USER_DB_HOST,
    user: env.USER_DB_USERNAME,
    password: env.USER_DB_PASSWORD,
    database: env.USER_DB_DATABASE,
    port: env.USER_DB_PORT,
    pool: {
      testOnBorrow: true,
      min: env.USER_DB_POOL_MIN,
      max: env.USER_DB_POOL_MAX,
    },
    ssl,
  },
  migrations: {
    tableName: 'migrations',
    directory: path.join(__dirname, 'migrations'),
  },
  seeds: {
    timestampFilenamePrefix: false,
    directory: path.join(__dirname, 'seeds'),
  },
};

export default Object.freeze(knexConfigs);
