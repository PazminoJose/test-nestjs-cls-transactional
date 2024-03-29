import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import morgan from "morgan";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  );

  app.setGlobalPrefix("api");
  app.use(morgan("dev"));

  const config = new DocumentBuilder()
    .setTitle("Test prisma with CLS transactional")
    .setDescription("API documentation test backend")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("documentation", app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
