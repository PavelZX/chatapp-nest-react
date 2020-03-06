import { ConnectionOptions } from 'typeorm';
import { SignOptions } from 'jsonwebtoken';

require('dotenv').config();

export const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'database_username',
  password: process.env.DB_PASS || 'database_password',
  database: process.env.DB_NAME || 'database_name',
  entities: [__dirname + '/**/*{.ts,.js}'],
  synchronize: true,
  migrationsRun: true,
  logging: true,
  logger: 'file',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export const jwtOptions: SignOptions = {
  issuer: process.env.JWT_ISS || 'Chat App',
  audience: process.env.JWT_AUD || 'Chat App',
  expiresIn: process.env.JWT_EXP || '60s',
};
