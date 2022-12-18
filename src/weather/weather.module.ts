import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { HttpApiModule } from '../http-api/http-api.module';

@Module({
  imports: [HttpApiModule],
  controllers: [WeatherController],
  providers: [WeatherService]
})
export class WeatherModule {}
