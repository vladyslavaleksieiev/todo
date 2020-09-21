import { NestFactory } from '@nestjs/core';
import { getLogger } from 'log4js';
import { connect } from 'mongoose';

import { CONFIG } from './constants/database';
import { PORT } from './constants/env';

import { AppModule } from './app.module';

const logger = getLogger();
logger.level = 'debug';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await connect(
    `mongodb://${CONFIG.mongoName}:${CONFIG.mongoPassword}@mongo:27017`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  logger.debug('database successfully connected');

  await app.listen(PORT, () => {
    logger.debug(`listening on port ${PORT}`);
  });
}
bootstrap();
