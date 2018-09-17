import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Homework API')
    .setDescription('API Documentation')
    .setVersion('1.0.0')
    .setSchemes(AppModule.isDev ? 'http' : 'https')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/v1/docs', app, document);

  await app.listen(AppModule.port);
  
}
bootstrap();
