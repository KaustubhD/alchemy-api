export class DayForecastDto {
  dt: number;
  dt_txt: string;
  weather: [
    {
      id: number,
      main: string,
      description: string,  
    }
  ];
  main: {
    temp: number,
    feels_like: number,
  };
}