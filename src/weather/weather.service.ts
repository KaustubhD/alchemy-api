import { Injectable } from '@nestjs/common';
import { HttpApiService } from '../http-api/http-api.service';
import { DayForecastDto } from './dto/dayForecast.dto';
import { ForecastResponse } from './entities/forecastResponse.entity';
import { Weather } from './entities/weather.entity';

@Injectable()
export class WeatherService {
  public readonly forecastForDays = 5;
  public readonly lat = 18.51;
  public readonly long = 73.85;
  public readonly units = 'metric';

  public constructor(
    private httpService: HttpApiService,
  ) { }

  public async getForecast(): Promise<ForecastResponse> {
    const apiUrl = this.getBaseUrl();
    this.setDefaultParams(apiUrl);

    const apiResponse = await this.httpService.getWeatherForecast(apiUrl);
    const dailyForecast = this.parseHourlyToDaily(apiResponse.list);
    const sanitisedResponse: ForecastResponse = {
      count: this.forecastForDays,
      location: apiResponse.city.name,
      unit: this.units,
      data: dailyForecast.map(this.sanitiseForecastData),
      
    }
    return sanitisedResponse;
  }


  private setDefaultParams(url: URL): void {
    url.searchParams.set('lat', this.lat.toString());
    url.searchParams.set('lon', this.long.toString());
    url.searchParams.set('units', this.units);
  }

  private getBaseUrl(): URL {
    return new URL(process.env.WEATHER_FORECAST_URL);
  }

  private parseHourlyToDaily(forecastArray: DayForecastDto[]): DayForecastDto[] {
    const today = new Date(forecastArray[0].dt_txt);
    const dates = this.getFutureDates(today, this.forecastForDays);

    return dates.map(date => {
      return forecastArray.find(forecast => new Date(forecast.dt_txt).toDateString() == date.toDateString());
    });
  }

  private sanitiseForecastData(forecastResponse: DayForecastDto): Weather {
    return {
      date: new Date(forecastResponse.dt * 1000).toDateString(),
      main: forecastResponse.weather[0].main, //Temporary. Needs more exploration
      temp: forecastResponse.main.temp,
    };
  }

  private getFutureDates(currentDate: Date, numDates: number): Date[] {
    const dates = [currentDate];
    for (let i = 0; i < numDates; i++) {
      const newDate = new Date();
      newDate.setDate(currentDate.getDate() + i + 1);
      dates.push(newDate);
    }

    return dates;
  }

}