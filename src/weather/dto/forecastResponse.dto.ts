import { DayForecastDto } from "./dayForecast.dto";

export class ForecastResponseDto {
  cod: string;
  message: number;
  cnt: number;
  city: {
    id: number,
    name: string,
    country: string,
    population: number,
    timezone: number
  };
  list: DayForecastDto[];
}