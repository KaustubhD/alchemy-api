import { ApiProperty } from "@nestjs/swagger";

export class News {
  @ApiProperty()
  public headline: string;

  @ApiProperty()
  public url: string;
}