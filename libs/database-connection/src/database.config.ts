import { registerAs } from '@nestjs/config';

const DATABASE = 'database';

export interface DatabaseConfig {
  database: {
    uri: string;
  };
}

export default registerAs(DATABASE, () => ({
  uri: process.env.DATABASE_URI,
}));
