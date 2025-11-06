import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./common";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // CORS 설정
  app.enableCors();

  // Validation 파이프
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  // Global Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle("지하철 알림 API")
    .setDescription("서울시 지하철 실시간 도착 정보 API")
    .setVersion("1.0")
    .addTag("subway", "지하철 알림 관련 API")
    .build();

  const docment = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, docment);

  await app.listen(process.env.PORT || 3000);
  console.log(
    `🚀 Server running on http://localhost:${process.env.PORT || 3000}`
  );
  console.log(`📚 Swagger: http://localhost:${process.env.PORT || 3000}/api`);
}
bootstrap();
