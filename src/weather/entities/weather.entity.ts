import { ApiProperty } from "@nestjs/swagger";

export class Weather {
  @ApiProperty()

  date: string;

  @ApiProperty()
  main: string;

  @ApiProperty()
  temp: number;
}
