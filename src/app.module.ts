import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { sqliteDbConfig } from './config/db.config';
import { UsersModule } from './users/users.module';
import { WeatherModule } from './weather/weather.module';
import { NewsModule } from './news/news.module';
import { HttpApiModule } from './http-api/http-api.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(sqliteDbConfig),
    UsersModule,
    AuthModule,
    WeatherModule,
    NewsModule,
    HttpApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
