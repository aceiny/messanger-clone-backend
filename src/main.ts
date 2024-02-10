import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as serveStatic from 'serve-static';
import { TokenExpiredFilter } from './auth/jwt.expired';
import { JsonWebTokenFilter } from './auth/jwt.error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/uploads', serveStatic('uploads'));
  app.useGlobalFilters(new TokenExpiredFilter() , new JsonWebTokenFilter());
  app.enableCors();
  await app.listen(3005);
}
bootstrap();