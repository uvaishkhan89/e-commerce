import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guard/jwt.guard';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new JwtAuthGuard());

  // Set the API port and host
  const port = 3000; // Specify the desired port number
  const host = '0.0.0.0'; // Set the desired host (e.g., '0.0.0.0' for all available network interfaces)

  const options = new DocumentBuilder()
    .setTitle('E-Commerce App')
    .setDescription('E-Commerce NestApp Rest Api Docs')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT Token',
      in: 'header'
    }, 'JWT-auth')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  //await app.listen(port)//its for local

  //its for local server
  await app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
  });
}

bootstrap();

