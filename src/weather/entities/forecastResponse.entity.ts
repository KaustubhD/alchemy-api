import { ApiProperty } from "@nestjs/swagger";
import { Weather } from "./weather.entity";

export class ForecastResponse {
  @ApiProperty()
  count: number;

  @ApiProperty()
  unit: string;

  @ApiProperty()
  location: string;

  @ApiProperty({
    isArray: true,
    type: Weather,
  })
  data: Weather[];
}