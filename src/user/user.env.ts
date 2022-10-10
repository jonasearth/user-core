import * as dotenv from 'dotenv';

dotenv.config();

const env = {
  USER_DB_HOST: process.env.USER_DB_HOST as string,
  USER_DB_PORT: parseInt(process.env.USER_DB_PORT ?? '5432', 10),
  USER_DB_USERNAME: process.env.USER_DB_USERNAME as string,
  USER_DB_PASSWORD: process.env.USER_DB_PASSWORD as string,
  USER_DB_DATABASE: process.env.USER_DB_DATABASE as string,
  USER_DB_SSL: (process.env.USER_DB_SSL ?? 'false') === 'true',
  USER_DB_IGNORE_SERVER_IDENTITY:
    (process.env.USER_DB_IGNORE_SERVER_IDENTITY ?? 'false') === 'true',
  USER_DB_POOL_MAX: parseInt(process.env.USER_DB_POOL_MAX ?? '1', 10),
  USER_DB_POOL_MIN: parseInt(process.env.USER_DB_POOL_MIN ?? '1', 10),
};

export default Object.freeze(env);
