import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerDocument = new DocumentBuilder()
  .setTitle('Tech Alchemy api')
  .setVersion('1.0')
  .addBearerAuth()
  .build();