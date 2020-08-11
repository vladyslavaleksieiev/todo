import { config } from 'dotenv';

interface IConfig {
  mongoName: string;
  mongoPassword: string;
  mongoDatabase: string;
}

interface IConfigMap {
  development: IConfig;
  production: IConfig;
}

config();

const configMap: IConfigMap = {
  development: {
    mongoName: process.env.MONGO_DEV_NAME,
    mongoPassword: process.env.MONGO_DEV_PASSWORD,
    mongoDatabase: process.env.MONGO_DEV_DATABASE,
  },
  production: {
    mongoName: process.env.MONGO_NAME,
    mongoPassword: process.env.MONGO_PASSWORD,
    mongoDatabase: process.env.MONGO_DATABASE,
  },
};

export const CONFIG: IConfig = configMap[process.env.STAGE || 'development'];
