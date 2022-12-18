import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags} from '@nestjs/swagger';
import { ForecastResponse } from './entities/forecastResponse.entity';
import { WeatherService } from './weather.service';

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('forecast')
  @ApiResponse({ type: ForecastResponse, status: HttpStatus.OK })
  public getForecast(): Promise<ForecastResponse> {
    return this.weatherService.getForecast();
  }
}
