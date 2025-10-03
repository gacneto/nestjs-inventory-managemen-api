import './shims/crypto-shim';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Estoque API')
    .setDescription('API para gestão de estoque')
    .setVersion('1.0')
    .addTag('auth', 'Operações realacionadas a autenticação')
    .addTag('products', 'Operações relacionadas a produtos')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = configService.get<number>('APP_PORT') || 3000;
  await app.listen(port);

  console.log(`🚀 Aplicação rodando na porta: ${port}`);
  console.log(
    `📚 Documentação disponível em: http://localhost:${port}/api-docs`,
  );
}
bootstrap();
