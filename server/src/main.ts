import { NestFactory } from '@nestjs/core';
import { connect } from 'mongoose';
import { getLogger } from 'log4js';

import { AppModule } from './app.module';
import { PORT } from './constants/env';
import { CONFIG } from './constants/database';

const logger = getLogger();
logger.level = 'debug';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await connect(
    `mongodb+srv://${CONFIG.mongoName}:${CONFIG.mongoPassword}@cluster.zo5oj.mongodb.net/${CONFIG.mongoDatabase}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  );
  logger.debug('database successfully connected');

  await app.listen(PORT, () => {
    logger.debug(`listening on port ${PORT}`);
  });
}
bootstrap();
